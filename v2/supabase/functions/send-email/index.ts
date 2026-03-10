// Send Email Edge Function
// =========================
// Processes email queue and sends via Customer.IO
// Supports transactional and marketing emails

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Email templates (imported inline for edge function)
const EMAIL_TEMPLATES: Record<string, { subject: string; preheader?: string }> = {
  welcome: { subject: 'Welcome to Elevare Health, {{first_name}}', preheader: 'Your journey to optimized health starts now' },
  appointment_confirmed: { subject: 'Your Appointment is Confirmed - {{appointment_date}}', preheader: 'Video consultation with {{provider_name}}' },
  appointment_reminder: { subject: 'Reminder: Appointment Tomorrow at {{appointment_time}}', preheader: "Don't forget your video visit" },
  lab_order_placed: { subject: 'Your Lab Work Has Been Ordered', preheader: 'Schedule your blood draw at your convenience' },
  lab_results_ready: { subject: 'Your Lab Results Are In', preheader: 'View your results and provider notes' },
  prescription_shipped: { subject: 'Your Medication Has Shipped', preheader: 'Track your package - arriving {{delivery_date}}' },
  refill_reminder: { subject: 'Time to Refill Your {{medication_name}}', preheader: '7 days of medication remaining' },
  treatment_approved: { subject: 'Great News - Your Treatment Has Been Approved', preheader: 'Your personalized treatment plan is ready' },
  assessment_complete: { subject: 'Your Health Assessment Results', preheader: 'Review your personalized recommendations' },
  message_received: { subject: 'New Message from {{sender_name}}', preheader: '{{message_preview}}' }
};

interface EmailRequest {
  template_id: string;
  recipient_email: string;
  variables: Record<string, any>;
  from_email?: string;
  from_name?: string;
}

interface CustomerIOResponse {
  success: boolean;
  delivery_id?: string;
  error?: string;
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const customerioApiKey = Deno.env.get("CUSTOMERIO_TRANSACTIONAL_API_KEY");
    if (!customerioApiKey) {
      throw new Error("CUSTOMERIO_TRANSACTIONAL_API_KEY not configured");
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Check if this is a manual send or queue processing
    const body = await req.json();

    if (body.process_queue) {
      // Process pending emails from queue
      return await processEmailQueue(supabase, customerioApiKey);
    } else {
      // Send single email immediately
      const emailRequest: EmailRequest = body;
      const result = await sendEmail(emailRequest, customerioApiKey, supabase);

      return new Response(
        JSON.stringify(result),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

  } catch (error) {
    console.error("Send email error:", error);
    return new Response(
      JSON.stringify({ error: (error as Error).message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

// ==========================================
// EMAIL SENDING
// ==========================================

async function sendEmail(
  request: EmailRequest,
  apiKey: string,
  supabase: any
): Promise<CustomerIOResponse> {
  const { template_id, recipient_email, variables, from_email, from_name } = request;

  // Get template metadata
  const template = EMAIL_TEMPLATES[template_id];
  if (!template) {
    throw new Error(`Unknown template: ${template_id}`);
  }

  // Interpolate subject
  const subject = interpolateVariables(template.subject, variables);
  const preheader = template.preheader ? interpolateVariables(template.preheader, variables) : undefined;

  // Prepare Customer.IO payload
  const payload = {
    transactional_message_id: template_id,
    to: recipient_email,
    identifiers: {
      email: recipient_email
    },
    message_data: {
      ...variables,
      preheader
    },
    from: from_email || "hello@elevarehealth.com",
    reply_to: "support@elevarehealth.com",
    subject,
    // If using Customer.IO templates:
    // body: "<html>...</html>", // Or use their template system
  };

  // Send via Customer.IO Transactional API
  const response = await fetch("https://api.customer.io/v1/send/email", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  const result = await response.json();

  // Log email to database
  await logEmail(supabase, {
    recipient_email,
    template_id,
    subject,
    status: response.ok ? "sent" : "failed",
    delivery_id: result.delivery_id,
    error: result.error
  });

  if (!response.ok) {
    console.error("Customer.IO error:", result);
    return { success: false, error: result.meta?.error || "Failed to send email" };
  }

  console.log(`Email sent: ${template_id} to ${recipient_email}`);
  return { success: true, delivery_id: result.delivery_id };
}

async function processEmailQueue(supabase: any, apiKey: string): Promise<Response> {
  // Get pending emails that are due
  const { data: pendingEmails, error } = await supabase
    .from("email_queue")
    .select("*")
    .eq("status", "pending")
    .lte("scheduled_for", new Date().toISOString())
    .order("scheduled_for", { ascending: true })
    .limit(50);

  if (error) {
    throw error;
  }

  if (!pendingEmails || pendingEmails.length === 0) {
    return new Response(
      JSON.stringify({ processed: 0, message: "No pending emails" }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  let sent = 0;
  let failed = 0;
  const results: any[] = [];

  for (const email of pendingEmails) {
    try {
      // Mark as processing
      await supabase
        .from("email_queue")
        .update({ status: "processing" })
        .eq("id", email.id);

      // Send email
      const result = await sendEmail({
        template_id: email.template_id,
        recipient_email: email.recipient_email,
        variables: email.variables
      }, apiKey, supabase);

      // Update status
      await supabase
        .from("email_queue")
        .update({
          status: result.success ? "sent" : "failed",
          sent_at: result.success ? new Date().toISOString() : null,
          error: result.error,
          delivery_id: result.delivery_id
        })
        .eq("id", email.id);

      if (result.success) {
        sent++;
      } else {
        failed++;
      }

      results.push({
        id: email.id,
        template: email.template_id,
        recipient: email.recipient_email,
        ...result
      });

    } catch (err) {
      failed++;
      await supabase
        .from("email_queue")
        .update({
          status: "failed",
          error: (err as Error).message,
          retry_count: (email.retry_count || 0) + 1
        })
        .eq("id", email.id);

      results.push({
        id: email.id,
        template: email.template_id,
        recipient: email.recipient_email,
        success: false,
        error: (err as Error).message
      });
    }

    // Small delay between emails
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  console.log(`Email queue processed: ${sent} sent, ${failed} failed`);

  return new Response(
    JSON.stringify({
      processed: pendingEmails.length,
      sent,
      failed,
      results
    }),
    { headers: { ...corsHeaders, "Content-Type": "application/json" } }
  );
}

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

function interpolateVariables(template: string, variables: Record<string, any>): string {
  let result = template;
  Object.entries(variables).forEach(([key, value]) => {
    const regex = new RegExp(`{{${key}}}`, 'g');
    result = result.replace(regex, String(value ?? ''));
  });
  return result;
}

async function logEmail(supabase: any, data: {
  recipient_email: string;
  template_id: string;
  subject: string;
  status: string;
  delivery_id?: string;
  error?: string;
}): Promise<void> {
  // Get patient ID if exists
  const { data: patient } = await supabase
    .from("patients")
    .select("id")
    .eq("email", data.recipient_email)
    .single();

  await supabase.from("email_logs").insert({
    patient_id: patient?.id,
    email_type: data.template_id,
    subject: data.subject,
    template_id: data.template_id,
    status: data.status,
    delivery_id: data.delivery_id,
    error: data.error,
    sent_at: data.status === "sent" ? new Date().toISOString() : null
  });
}

// ==========================================
// WEBHOOK HANDLER FOR EMAIL EVENTS
// ==========================================
// Customer.IO can send webhooks for opens, clicks, bounces, etc.

export async function handleEmailWebhook(req: Request): Promise<Response> {
  const body = await req.json();
  const { event_type, delivery_id, timestamp } = body;

  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const supabase = createClient(supabaseUrl, supabaseKey);

  switch (event_type) {
    case "email_opened":
      await supabase
        .from("email_logs")
        .update({ opened_at: timestamp })
        .eq("delivery_id", delivery_id);
      break;

    case "email_clicked":
      await supabase
        .from("email_logs")
        .update({ clicked_at: timestamp })
        .eq("delivery_id", delivery_id);
      break;

    case "email_bounced":
    case "email_dropped":
      await supabase
        .from("email_logs")
        .update({ status: "bounced" })
        .eq("delivery_id", delivery_id);
      break;

    case "email_unsubscribed":
      // Handle unsubscribe
      const { data: log } = await supabase
        .from("email_logs")
        .select("patient_id")
        .eq("delivery_id", delivery_id)
        .single();

      if (log?.patient_id) {
        await supabase
          .from("patients")
          .update({ email_unsubscribed: true })
          .eq("id", log.patient_id);
      }
      break;
  }

  return new Response(JSON.stringify({ received: true }), {
    headers: { ...corsHeaders, "Content-Type": "application/json" }
  });
}
