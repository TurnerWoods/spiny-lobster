import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { getPromptForTool } from "./prompts.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Extract lead data from conversation using tool calling
async function extractLeadData(messages: any[], apiKey: string): Promise<any | null> {
  try {
    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-lite",
        messages: [
          {
            role: "system",
            content: "Extract structured lead data from this conversation. Only extract if a treatment recommendation was made."
          },
          ...messages.slice(-10) // Last 10 messages for context
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "save_lead",
              description: "Save lead data when a treatment recommendation has been made",
              parameters: {
                type: "object",
                properties: {
                  primary_concern: {
                    type: "string",
                    description: "User's main health concern (e.g., fatigue, weight loss, hair loss)"
                  },
                  symptoms: {
                    type: "array",
                    items: { type: "string" },
                    description: "List of symptoms mentioned"
                  },
                  age_range: {
                    type: "string",
                    description: "User's age range if mentioned (30s, 40s, 50s, 60+)"
                  },
                  duration: {
                    type: "string",
                    description: "How long they've had symptoms"
                  },
                  recommended_treatment: {
                    type: "string",
                    enum: ["Hormones/TRT", "Weight Loss", "Strength & Peptides", "Anti-Aging", "Hair", "Skin", "Mood & Cognition"]
                  },
                  recommended_price: {
                    type: "string",
                    description: "Price mentioned (e.g., $149/mo)"
                  },
                  conversation_summary: {
                    type: "string",
                    description: "Brief 1-2 sentence summary of the conversation"
                  }
                },
                required: ["primary_concern", "recommended_treatment"]
              }
            }
          }
        ],
        tool_choice: "auto"
      }),
    });

    if (!response.ok) return null;
    
    const data = await response.json();
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
    
    if (toolCall?.function?.name === "save_lead") {
      return JSON.parse(toolCall.function.arguments);
    }
    return null;
  } catch (e) {
    console.error("Lead extraction error:", e);
    return null;
  }
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, saveLead, sessionId, getVisitorContext, saveContact, tool, toolData } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const supabase = SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY 
      ? createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)
      : null;

    // If requesting visitor context, look up previous leads
    if (getVisitorContext && sessionId && supabase) {
      const { data: previousLeads } = await supabase
        .from("chat_leads")
        .select("primary_concern, recommended_treatment, created_at, conversation_summary, email")
        .eq("session_id", sessionId)
        .order("created_at", { ascending: false })
        .limit(1);

      return new Response(
        JSON.stringify({ visitorContext: previousLeads?.[0] || null }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // If saving contact info, update the most recent lead for this session
    if (saveContact && sessionId && supabase) {
      const { email, phone } = saveContact;
      
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (email && !emailRegex.test(email)) {
        return new Response(
          JSON.stringify({ error: "Invalid email format" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      // Validate phone format (basic - digits, spaces, dashes, parens)
      const phoneRegex = /^[\d\s\-\(\)\+]{10,20}$/;
      if (phone && !phoneRegex.test(phone.replace(/\s/g, ''))) {
        return new Response(
          JSON.stringify({ error: "Invalid phone format" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      // Update the most recent lead with contact info
      const { data: existingLead } = await supabase
        .from("chat_leads")
        .select("id")
        .eq("session_id", sessionId)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (existingLead) {
        await supabase
          .from("chat_leads")
          .update({ 
            email: email?.toLowerCase().trim(), 
            phone: phone?.trim() 
          })
          .eq("id", existingLead.id);
      } else {
        // Create a new lead with just contact info if none exists
        await supabase.from("chat_leads").insert({
          email: email?.toLowerCase().trim(),
          phone: phone?.trim(),
          session_id: sessionId,
          source: "chat_widget"
        });
      }

      return new Response(
        JSON.stringify({ success: true }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // If saveLead flag is true, extract and save lead data
    if (saveLead && supabase) {
      const leadData = await extractLeadData(messages, LOVABLE_API_KEY);
      
      if (leadData) {
        await supabase.from("chat_leads").insert({
          primary_concern: leadData.primary_concern,
          symptoms: leadData.symptoms || [],
          age_range: leadData.age_range,
          duration: leadData.duration,
          recommended_treatment: leadData.recommended_treatment,
          recommended_price: leadData.recommended_price,
          conversation_summary: leadData.conversation_summary,
          session_id: sessionId,
          source: "chat_widget"
        });
      }
    }

    // Handle tool-specific AI requests (non-streaming)
    if (tool && toolData) {
      const toolPrompt = getPromptForTool(tool);
      const userMessage = JSON.stringify(toolData, null, 2);
      
      const toolResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [
            { role: "system", content: toolPrompt },
            { role: "user", content: userMessage },
          ],
          stream: false,
        }),
      });

      if (!toolResponse.ok) {
        const errorText = await toolResponse.text();
        console.error("Tool AI error:", toolResponse.status, errorText);
        return new Response(
          JSON.stringify({ error: "AI service error", details: errorText }),
          { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      const toolResult = await toolResponse.json();
      const aiContent = toolResult.choices?.[0]?.message?.content || "";

      // Return the appropriate field based on tool type
      const responseFieldMap: Record<string, string> = {
        hormone_assessment: "analysis",
        treatment_match: "recommendation",
        lab_interpreter: "analysis",
        meal_planner: "mealPlan",
        workout_generator: "workoutPlan",
        progress_predictor: "predictions",
        calculator_context: "context",
      };
      const responseField = responseFieldMap[tool] || "response";

      return new Response(
        JSON.stringify({ [responseField]: aiContent }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Get the appropriate system prompt for the chat widget
    const systemPrompt = getPromptForTool("chat_widget");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "We're experiencing high demand. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Service temporarily unavailable. Please try again later." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(
        JSON.stringify({ error: "AI service error" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("Chat error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});