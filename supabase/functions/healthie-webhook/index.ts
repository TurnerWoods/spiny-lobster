// Healthie Webhook Handler
// =========================
// Processes webhook events from Healthie EHR
// Events: appointments, forms, messages, labs, prescriptions

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-healthie-signature",
};

// Webhook event types we handle
const HANDLED_EVENTS = [
  'appointment.created',
  'appointment.updated',
  'appointment.cancelled',
  'appointment.completed',
  'form_answer_group.created',
  'message.created',
  'patient.created',
  'patient.updated',
  'chart_note.created',
  'chart_note.signed',
  'lab_order.created',
  'lab_order.completed',
  'prescription.created',
  'prescription.filled',
  'task.created',
  'task.completed'
];

// HMAC-SHA256 signature verification
async function verifySignature(payload: string, signature: string, secret: string): Promise<boolean> {
  try {
    const encoder = new TextEncoder();
    const keyData = encoder.encode(secret);
    const payloadData = encoder.encode(payload);

    const key = await crypto.subtle.importKey(
      'raw',
      keyData,
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    );

    const signatureBuffer = await crypto.subtle.sign('HMAC', key, payloadData);
    const signatureArray = new Uint8Array(signatureBuffer);

    const computedSignature = Array.from(signatureArray)
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');

    // Constant-time comparison
    if (signature.length !== computedSignature.length) {
      return false;
    }

    let result = 0;
    for (let i = 0; i < signature.length; i++) {
      result |= signature.charCodeAt(i) ^ computedSignature.charCodeAt(i);
    }

    return result === 0;
  } catch (error) {
    console.error('Signature verification error:', error);
    return false;
  }
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const webhookSecret = Deno.env.get("HEALTHIE_WEBHOOK_SECRET");
    if (!webhookSecret) {
      throw new Error("HEALTHIE_WEBHOOK_SECRET not configured");
    }

    // Get raw payload for signature verification
    const rawPayload = await req.text();
    const signature = req.headers.get("x-healthie-signature") || "";

    // Verify webhook signature
    const isValid = await verifySignature(rawPayload, signature, webhookSecret);
    if (!isValid) {
      console.error("Invalid webhook signature");
      return new Response(
        JSON.stringify({ error: "Invalid signature" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Parse the verified payload
    const event = JSON.parse(rawPayload);
    const eventType = event.event_type;
    const resourceType = event.resource_type;
    const resourceId = event.resource_id;
    const data = event.data;
    const timestamp = event.created_at;

    console.log(`Processing Healthie webhook: ${eventType}`, { resourceId, timestamp });

    // Skip unhandled events
    if (!HANDLED_EVENTS.includes(eventType)) {
      console.log(`Skipping unhandled event type: ${eventType}`);
      return new Response(
        JSON.stringify({ received: true, handled: false }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Log webhook event for audit trail
    await supabase.from("webhook_events").insert({
      source: "healthie",
      event_type: eventType,
      resource_type: resourceType,
      resource_id: resourceId,
      payload: data,
      received_at: new Date().toISOString()
    });

    // Process event based on type
    switch (eventType) {
      // ==========================================
      // APPOINTMENT EVENTS
      // ==========================================
      case 'appointment.created':
        await handleAppointmentCreated(supabase, data);
        break;

      case 'appointment.updated':
        await handleAppointmentUpdated(supabase, data);
        break;

      case 'appointment.cancelled':
        await handleAppointmentCancelled(supabase, data);
        break;

      case 'appointment.completed':
        await handleAppointmentCompleted(supabase, data);
        break;

      // ==========================================
      // FORM EVENTS
      // ==========================================
      case 'form_answer_group.created':
        await handleFormSubmitted(supabase, data);
        break;

      // ==========================================
      // MESSAGE EVENTS
      // ==========================================
      case 'message.created':
        await handleMessageCreated(supabase, data);
        break;

      // ==========================================
      // PATIENT EVENTS
      // ==========================================
      case 'patient.created':
      case 'patient.updated':
        await handlePatientSync(supabase, data);
        break;

      // ==========================================
      // LAB ORDER EVENTS
      // ==========================================
      case 'lab_order.created':
        await handleLabOrderCreated(supabase, data);
        break;

      case 'lab_order.completed':
        await handleLabResultsReady(supabase, data);
        break;

      // ==========================================
      // PRESCRIPTION EVENTS
      // ==========================================
      case 'prescription.created':
        await handlePrescriptionCreated(supabase, data);
        break;

      case 'prescription.filled':
        await handlePrescriptionFilled(supabase, data);
        break;

      // ==========================================
      // TASK EVENTS
      // ==========================================
      case 'task.created':
      case 'task.completed':
        await handleTaskEvent(supabase, eventType, data);
        break;

      default:
        console.log(`Unhandled event type: ${eventType}`);
    }

    return new Response(
      JSON.stringify({ received: true, handled: true, event_type: eventType }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Webhook processing error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

// ==========================================
// EVENT HANDLERS
// ==========================================

async function handleAppointmentCreated(supabase: any, data: any) {
  const { id, user_id, appointment_type, date, start_time, provider, zoom_join_url } = data;

  // Get patient email from Healthie user_id
  const { data: patient } = await supabase
    .from("patients")
    .select("email, first_name")
    .eq("healthie_patient_id", user_id)
    .single();

  if (!patient) {
    console.log("Patient not found for appointment:", user_id);
    return;
  }

  // Queue confirmation email
  await supabase.from("email_queue").insert({
    template_id: "appointment_confirmed",
    recipient_email: patient.email,
    variables: {
      first_name: patient.first_name,
      appointment_date: formatDate(date),
      appointment_time: formatTime(start_time),
      appointment_type: appointment_type?.name || "Consultation",
      provider_name: provider?.full_name || "Your Provider",
      provider_credentials: provider?.qualifications || "MD",
      duration: appointment_type?.length || 30,
      zoom_join_url: zoom_join_url || "",
      reschedule_url: `https://elevarehealth.com/appointments/${id}/reschedule`,
      cancel_url: `https://elevarehealth.com/appointments/${id}/cancel`
    },
    scheduled_for: new Date().toISOString()
  });

  // Schedule 24hr reminder
  const reminderDate = new Date(date);
  reminderDate.setDate(reminderDate.getDate() - 1);

  await supabase.from("email_queue").insert({
    template_id: "appointment_reminder",
    recipient_email: patient.email,
    variables: {
      first_name: patient.first_name,
      appointment_date: formatDate(date),
      appointment_time: formatTime(start_time),
      provider_name: provider?.full_name || "Your Provider",
      zoom_join_url: zoom_join_url || ""
    },
    scheduled_for: reminderDate.toISOString()
  });

  console.log("Appointment confirmation and reminder queued for:", patient.email);
}

async function handleAppointmentUpdated(supabase: any, data: any) {
  // Handle rescheduled appointments
  const { id, user_id, date, start_time, provider } = data;

  const { data: patient } = await supabase
    .from("patients")
    .select("email, first_name")
    .eq("healthie_patient_id", user_id)
    .single();

  if (!patient) return;

  await supabase.from("email_queue").insert({
    template_id: "appointment_confirmed",
    recipient_email: patient.email,
    variables: {
      first_name: patient.first_name,
      appointment_date: formatDate(date),
      appointment_time: formatTime(start_time),
      provider_name: provider?.full_name || "Your Provider"
    },
    scheduled_for: new Date().toISOString()
  });
}

async function handleAppointmentCancelled(supabase: any, data: any) {
  const { user_id, date, start_time } = data;

  const { data: patient } = await supabase
    .from("patients")
    .select("email, first_name")
    .eq("healthie_patient_id", user_id)
    .single();

  if (!patient) return;

  // Cancel any pending reminder emails for this appointment
  await supabase
    .from("email_queue")
    .update({ status: "cancelled" })
    .eq("recipient_email", patient.email)
    .eq("template_id", "appointment_reminder")
    .eq("status", "pending");

  console.log("Appointment cancelled, reminders removed for:", patient.email);
}

async function handleAppointmentCompleted(supabase: any, data: any) {
  const { user_id, appointment_type } = data;

  // Update patient's last visit date
  await supabase
    .from("patients")
    .update({ last_visit_date: new Date().toISOString() })
    .eq("healthie_patient_id", user_id);

  console.log("Appointment completed for patient:", user_id);
}

async function handleFormSubmitted(supabase: any, data: any) {
  const { user_id, custom_module_form, form_answers } = data;

  // Get patient
  const { data: patient } = await supabase
    .from("patients")
    .select("id, email, first_name")
    .eq("healthie_patient_id", user_id)
    .single();

  if (!patient) return;

  // Store form submission
  await supabase.from("intake_forms").insert({
    patient_id: patient.id,
    form_type: custom_module_form?.name || "intake",
    responses: form_answers,
    healthie_form_id: data.id,
    completed_at: new Date().toISOString()
  });

  console.log("Form submission recorded for:", patient.email);
}

async function handleMessageCreated(supabase: any, data: any) {
  const { recipient_id, sender, content } = data;

  const { data: patient } = await supabase
    .from("patients")
    .select("email, first_name")
    .eq("healthie_patient_id", recipient_id)
    .single();

  if (!patient) return;

  // Queue message notification email
  await supabase.from("email_queue").insert({
    template_id: "message_received",
    recipient_email: patient.email,
    variables: {
      first_name: patient.first_name,
      sender_name: sender?.full_name || "Your Care Team",
      sender_role: sender?.qualifications || "Provider",
      sender_initials: getInitials(sender?.full_name || "CT"),
      message_preview: truncate(content, 100),
      message_url: "https://elevarehealth.com/messages"
    },
    scheduled_for: new Date().toISOString()
  });

  console.log("Message notification queued for:", patient.email);
}

async function handlePatientSync(supabase: any, data: any) {
  const { id, email, first_name, last_name, phone_number, dob } = data;

  // Upsert patient record
  await supabase.from("patients").upsert({
    email,
    first_name,
    last_name,
    phone: phone_number,
    dob,
    healthie_patient_id: id,
    updated_at: new Date().toISOString()
  }, { onConflict: "healthie_patient_id" });

  console.log("Patient synced from Healthie:", email);
}

async function handleLabOrderCreated(supabase: any, data: any) {
  const { id, user_id, test_panel, lab_type } = data;

  const { data: patient } = await supabase
    .from("patients")
    .select("id, email, first_name")
    .eq("healthie_patient_id", user_id)
    .single();

  if (!patient) return;

  // Create lab order record
  await supabase.from("lab_orders").insert({
    patient_id: patient.id,
    healthie_order_id: id,
    test_panel,
    status: "ordered"
  });

  // Queue lab order email
  await supabase.from("email_queue").insert({
    template_id: "lab_order_placed",
    recipient_email: patient.email,
    variables: {
      first_name: patient.first_name,
      test_panel,
      fasting_required: requiresFasting(test_panel),
      in_home_schedule_url: "https://elevarehealth.com/labs/schedule?type=in_home",
      psc_schedule_url: "https://www.labcorp.com/labs-and-appointments-702"
    },
    scheduled_for: new Date().toISOString()
  });

  console.log("Lab order created and email queued for:", patient.email);
}

async function handleLabResultsReady(supabase: any, data: any) {
  const { id, user_id, results, results_pdf_url } = data;

  const { data: patient } = await supabase
    .from("patients")
    .select("id, email, first_name")
    .eq("healthie_patient_id", user_id)
    .single();

  if (!patient) return;

  // Update lab order with results
  await supabase
    .from("lab_orders")
    .update({
      status: "completed",
      results,
      results_received_at: new Date().toISOString()
    })
    .eq("healthie_order_id", id);

  // Queue results ready email
  await supabase.from("email_queue").insert({
    template_id: "lab_results_ready",
    recipient_email: patient.email,
    variables: {
      first_name: patient.first_name,
      results_url: `https://elevarehealth.com/labs/${id}/results`,
      follow_up_recommended: needsFollowUp(results),
      schedule_url: "https://elevarehealth.com/appointments/schedule"
    },
    scheduled_for: new Date().toISOString()
  });

  console.log("Lab results ready email queued for:", patient.email);
}

async function handlePrescriptionCreated(supabase: any, data: any) {
  const { user_id, medication, dosage, status } = data;

  const { data: patient } = await supabase
    .from("patients")
    .select("email, first_name")
    .eq("healthie_patient_id", user_id)
    .single();

  if (!patient) return;

  // Queue treatment approved email
  await supabase.from("email_queue").insert({
    template_id: "treatment_approved",
    recipient_email: patient.email,
    variables: {
      first_name: patient.first_name,
      provider_name: "Your Elevare Provider",
      treatment_type: medication,
      treatment_description: `${dosage} - prescribed by your provider`,
      medications: [{ name: medication, dosage, price: "See invoice" }],
      checkout_url: "https://elevarehealth.com/checkout"
    },
    scheduled_for: new Date().toISOString()
  });

  console.log("Prescription created email queued for:", patient.email);
}

async function handlePrescriptionFilled(supabase: any, data: any) {
  const { user_id, medication, tracking_number, carrier, estimated_delivery } = data;

  const { data: patient } = await supabase
    .from("patients")
    .select("email, first_name")
    .eq("healthie_patient_id", user_id)
    .single();

  if (!patient) return;

  // Queue shipped email
  await supabase.from("email_queue").insert({
    template_id: "prescription_shipped",
    recipient_email: patient.email,
    variables: {
      first_name: patient.first_name,
      delivery_date: formatDate(estimated_delivery),
      carrier: carrier || "USPS",
      tracking_number: tracking_number || "See portal",
      tracking_url: getTrackingUrl(carrier, tracking_number),
      medications: [{ name: medication, dosage: "As prescribed" }]
    },
    scheduled_for: new Date().toISOString()
  });

  console.log("Prescription shipped email queued for:", patient.email);
}

async function handleTaskEvent(supabase: any, eventType: string, data: any) {
  console.log(`Task event: ${eventType}`, data);
  // Tasks are internal - no patient emails needed
  // Could notify providers via Slack/internal channels
}

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

function formatTime(timeStr: string): string {
  const [hours, minutes] = timeStr.split(':');
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const hour12 = hour % 12 || 12;
  return `${hour12}:${minutes} ${ampm}`;
}

function getInitials(name: string): string {
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
}

function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.slice(0, length) + '...';
}

function requiresFasting(testPanel: string): boolean {
  const fastingTests = ['lipid', 'glucose', 'metabolic', 'cholesterol', 'triglyceride'];
  return fastingTests.some(test => testPanel.toLowerCase().includes(test));
}

function needsFollowUp(results: any): boolean {
  // Check if any values are out of range
  if (!results) return false;
  // Implement logic based on your result structure
  return false;
}

function getTrackingUrl(carrier: string, trackingNumber: string): string {
  if (!trackingNumber) return 'https://elevarehealth.com/orders';

  switch (carrier?.toLowerCase()) {
    case 'usps':
      return `https://tools.usps.com/go/TrackConfirmAction?tLabels=${trackingNumber}`;
    case 'ups':
      return `https://www.ups.com/track?tracknum=${trackingNumber}`;
    case 'fedex':
      return `https://www.fedex.com/fedextrack/?trknbr=${trackingNumber}`;
    default:
      return 'https://elevarehealth.com/orders';
  }
}
