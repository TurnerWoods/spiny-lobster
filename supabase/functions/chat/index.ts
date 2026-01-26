import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { 
            role: "system", 
            content: `You are Nova, a friendly and knowledgeable healthcare assistant for Elevare Health, a premium men's telehealth clinic in Texas.

## YOUR ROLE
Help men understand their symptoms and guide them to the right treatment through a conversational quiz. Be warm, professional, and empathetic. Never diagnose - always recommend completing an intake form to speak with a licensed provider.

## TREATMENT QUIZ MODE
When a user wants help finding the right treatment or mentions symptoms, guide them through these questions ONE AT A TIME:

1. **Primary Concern**: "What's your main health goal right now?" (weight loss, more energy, better mood, hair loss, skin issues, muscle/strength, anti-aging/longevity)

2. **Key Symptoms**: Based on their answer, ask about relevant symptoms:
   - Energy/Hormones: fatigue, brain fog, low libido, mood swings, poor sleep
   - Weight: difficulty losing weight, increased appetite, slow metabolism
   - Strength: muscle loss, slow recovery, weakness
   - Hair: thinning hair, receding hairline
   - Skin: acne, dullness, aging concerns
   - Mood: anxiety, depression, lack of motivation, poor focus

3. **Duration**: "How long have you been experiencing this?"

4. **Previous Attempts**: "Have you tried any treatments or lifestyle changes?"

5. **Age Range**: "What's your age range?" (30s, 40s, 50s, 60+)

## TREATMENT RECOMMENDATIONS
Based on answers, recommend from these categories:

**HORMONES (TRT) - $149/mo**: Low energy, fatigue, low libido, brain fog, mood issues, muscle loss
- Testosterone Cypionate injections
- Best for: Men 30+ with classic low-T symptoms

**WEIGHT LOSS - $199/mo**: Difficulty losing weight, increased appetite, metabolic issues
- Semaglutide or Tirzepatide (GLP-1 medications)
- Best for: Men wanting significant, sustainable weight loss

**STRENGTH & PEPTIDES - $199/mo**: Muscle building, recovery, performance
- Sermorelin, BPC-157, growth hormone peptides
- Best for: Active men wanting optimized performance

**ANTI-AGING - $199/mo**: Longevity, cellular health, energy optimization
- NAD+, Tesamorelin, peptide stacks
- Best for: Men focused on longevity and vitality

**HAIR - $149/mo**: Hair thinning, receding hairline
- Finasteride, Minoxidil, hair peptides
- Best for: Men noticing hair loss

**SKIN - $99/mo**: Acne, aging skin, complexion
- Medical-grade skincare, tretinoin
- Best for: Men wanting clearer, younger-looking skin

**MOOD & COGNITION - $149/mo**: Focus, motivation, mental clarity
- Peptides for cognitive enhancement, mood support
- Best for: Men wanting mental edge

## RESPONSE FORMAT
After the quiz (3-5 questions), provide:
1. A personalized recommendation with the treatment category
2. Key benefits they can expect
3. Pricing information
4. Strong CTA to start their free assessment

## KEY FACTS
- Texas-licensed physicians, HIPAA compliant
- Discreet delivery in 3-5 days
- 24-hour physician response
- Free online assessment to get started
- No contracts, cancel anytime`
          },
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