// Elevare Health Email Templates
// ================================
// These templates are designed for Customer.IO or any transactional email provider
// All templates support variable interpolation using {{variable}} syntax

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  preheader?: string;
  html: string;
  text: string;
}

// Base styles shared across all emails
const baseStyles = `
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #1a1a1a;
      background-color: #f5f5f0;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background: #ffffff;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    }
    .header {
      background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
      padding: 32px 24px;
      text-align: center;
    }
    .header img {
      height: 40px;
      width: auto;
    }
    .header h1 {
      color: #ffffff;
      font-size: 24px;
      font-weight: 600;
      margin: 16px 0 0 0;
    }
    .content {
      padding: 32px 24px;
    }
    .content h2 {
      color: #1a1a1a;
      font-size: 20px;
      font-weight: 600;
      margin: 0 0 16px 0;
    }
    .content p {
      color: #4a4a4a;
      font-size: 16px;
      margin: 0 0 16px 0;
    }
    .button {
      display: inline-block;
      background: #8B7355;
      color: #ffffff !important;
      text-decoration: none;
      padding: 14px 32px;
      border-radius: 8px;
      font-weight: 600;
      font-size: 16px;
      margin: 16px 0;
    }
    .button:hover {
      background: #7a6449;
    }
    .card {
      background: #f9f9f7;
      border-radius: 8px;
      padding: 20px;
      margin: 16px 0;
      border-left: 4px solid #8B7355;
    }
    .card-title {
      font-weight: 600;
      color: #1a1a1a;
      margin: 0 0 8px 0;
    }
    .card-text {
      color: #666666;
      font-size: 14px;
      margin: 0;
    }
    .badge {
      display: inline-block;
      background: #d4af37;
      color: #1a1a1a;
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 600;
      text-transform: uppercase;
    }
    .footer {
      background: #f5f5f0;
      padding: 24px;
      text-align: center;
      font-size: 12px;
      color: #888888;
    }
    .footer a {
      color: #8B7355;
      text-decoration: none;
    }
    .divider {
      height: 1px;
      background: #e5e5e5;
      margin: 24px 0;
    }
    .highlight {
      color: #8B7355;
      font-weight: 600;
    }
    .list {
      margin: 16px 0;
      padding-left: 20px;
    }
    .list li {
      margin: 8px 0;
      color: #4a4a4a;
    }
    .appointment-card {
      background: linear-gradient(135deg, #f9f9f7 0%, #f5f5f0 100%);
      border: 1px solid #e5e5e5;
      border-radius: 12px;
      padding: 24px;
      margin: 20px 0;
    }
    .appointment-time {
      font-size: 28px;
      font-weight: 700;
      color: #1a1a1a;
      margin: 0;
    }
    .appointment-date {
      font-size: 16px;
      color: #666666;
      margin: 4px 0 16px 0;
    }
    .info-row {
      display: flex;
      justify-content: space-between;
      padding: 12px 0;
      border-bottom: 1px solid #e5e5e5;
    }
    .info-label {
      color: #888888;
      font-size: 14px;
    }
    .info-value {
      color: #1a1a1a;
      font-weight: 500;
      font-size: 14px;
    }
  </style>
`;

const header = `
  <div class="header">
    <img src="https://elevarehealth.com/logo-white.png" alt="Elevare Health" />
  </div>
`;

const footer = `
  <div class="footer">
    <p>Elevare Health | Austin, TX</p>
    <p>
      <a href="https://elevarehealth.com/privacy">Privacy Policy</a> |
      <a href="https://elevarehealth.com/terms">Terms of Service</a> |
      <a href="{{unsubscribe_url}}">Unsubscribe</a>
    </p>
    <p style="margin-top: 16px; color: #aaa;">
      This email contains protected health information (PHI).
      If you received this in error, please delete it immediately.
    </p>
  </div>
`;

// ==========================================
// EMAIL TEMPLATES
// ==========================================

export const EMAIL_TEMPLATES: Record<string, EmailTemplate> = {
  // 1. Welcome Email
  welcome: {
    id: 'welcome',
    name: 'Welcome Email',
    subject: 'Welcome to Elevare Health, {{first_name}}',
    preheader: 'Your journey to optimized health starts now',
    html: `
      <!DOCTYPE html>
      <html>
      <head>${baseStyles}</head>
      <body>
        <div class="container">
          ${header}
          <div class="content">
            <h2>Welcome to Elevare Health, {{first_name}}!</h2>
            <p>We're excited to have you join the Elevare family. You've taken the first step toward optimizing your health and performance.</p>

            <div class="card">
              <p class="card-title">What happens next?</p>
              <p class="card-text">Our medical team will review your assessment within 24 hours and reach out with personalized recommendations.</p>
            </div>

            <p>Here's what you can expect:</p>
            <ul class="list">
              <li><strong>24-Hour Response</strong> - A licensed Texas physician will review your case</li>
              <li><strong>Personalized Plan</strong> - Treatment tailored to your goals and health profile</li>
              <li><strong>Discreet Delivery</strong> - Medications shipped free to your door</li>
              <li><strong>Ongoing Support</strong> - Direct messaging with your care team</li>
            </ul>

            <p style="text-align: center;">
              <a href="https://elevarehealth.com/dashboard" class="button">View Your Dashboard</a>
            </p>

            <div class="divider"></div>

            <p>Questions? Reply to this email or message us directly through your patient portal.</p>

            <p>Here's to your best self,<br><span class="highlight">The Elevare Health Team</span></p>
          </div>
          ${footer}
        </div>
      </body>
      </html>
    `,
    text: `
Welcome to Elevare Health, {{first_name}}!

We're excited to have you join the Elevare family. You've taken the first step toward optimizing your health and performance.

WHAT HAPPENS NEXT?
Our medical team will review your assessment within 24 hours and reach out with personalized recommendations.

Here's what you can expect:
- 24-Hour Response: A licensed Texas physician will review your case
- Personalized Plan: Treatment tailored to your goals and health profile
- Discreet Delivery: Medications shipped free to your door
- Ongoing Support: Direct messaging with your care team

View Your Dashboard: https://elevarehealth.com/dashboard

Questions? Reply to this email or message us directly through your patient portal.

Here's to your best self,
The Elevare Health Team
    `
  },

  // 2. Appointment Confirmed
  appointment_confirmed: {
    id: 'appointment_confirmed',
    name: 'Appointment Confirmation',
    subject: 'Your Appointment is Confirmed - {{appointment_date}}',
    preheader: 'Video consultation with {{provider_name}}',
    html: `
      <!DOCTYPE html>
      <html>
      <head>${baseStyles}</head>
      <body>
        <div class="container">
          ${header}
          <div class="content">
            <span class="badge">Confirmed</span>
            <h2 style="margin-top: 16px;">Your Appointment is Scheduled</h2>

            <div class="appointment-card">
              <p class="appointment-time">{{appointment_time}}</p>
              <p class="appointment-date">{{appointment_date}}</p>

              <div class="info-row">
                <span class="info-label">Provider</span>
                <span class="info-value">{{provider_name}}, {{provider_credentials}}</span>
              </div>
              <div class="info-row">
                <span class="info-label">Type</span>
                <span class="info-value">{{appointment_type}}</span>
              </div>
              <div class="info-row">
                <span class="info-label">Duration</span>
                <span class="info-value">{{duration}} minutes</span>
              </div>
              <div class="info-row" style="border-bottom: none;">
                <span class="info-label">Location</span>
                <span class="info-value">Video Call (Zoom)</span>
              </div>
            </div>

            <p style="text-align: center;">
              <a href="{{zoom_join_url}}" class="button">Join Video Call</a>
            </p>

            <div class="card">
              <p class="card-title">Before Your Appointment</p>
              <p class="card-text">
                - Find a quiet, private space with good lighting<br>
                - Have your current medications list ready<br>
                - Test your camera and microphone<br>
                - Join 5 minutes early
              </p>
            </div>

            <p style="text-align: center; margin-top: 24px;">
              <a href="{{reschedule_url}}" style="color: #8B7355; text-decoration: none; margin-right: 20px;">Reschedule</a>
              <a href="{{cancel_url}}" style="color: #888888; text-decoration: none;">Cancel</a>
            </p>
          </div>
          ${footer}
        </div>
      </body>
      </html>
    `,
    text: `
YOUR APPOINTMENT IS CONFIRMED

{{appointment_time}} on {{appointment_date}}

Provider: {{provider_name}}, {{provider_credentials}}
Type: {{appointment_type}}
Duration: {{duration}} minutes
Location: Video Call (Zoom)

Join Video Call: {{zoom_join_url}}

BEFORE YOUR APPOINTMENT:
- Find a quiet, private space with good lighting
- Have your current medications list ready
- Test your camera and microphone
- Join 5 minutes early

Need to reschedule? {{reschedule_url}}
Need to cancel? {{cancel_url}}
    `
  },

  // 3. Appointment Reminder (24hr)
  appointment_reminder: {
    id: 'appointment_reminder',
    name: 'Appointment Reminder',
    subject: 'Reminder: Appointment Tomorrow at {{appointment_time}}',
    preheader: "Don't forget your video visit with {{provider_name}}",
    html: `
      <!DOCTYPE html>
      <html>
      <head>${baseStyles}</head>
      <body>
        <div class="container">
          ${header}
          <div class="content">
            <span class="badge">Tomorrow</span>
            <h2 style="margin-top: 16px;">Your Appointment is Tomorrow</h2>

            <p>Hi {{first_name}},</p>
            <p>Just a friendly reminder about your upcoming appointment:</p>

            <div class="appointment-card">
              <p class="appointment-time">{{appointment_time}}</p>
              <p class="appointment-date">{{appointment_date}}</p>
              <p style="margin: 0; color: #666;">with {{provider_name}}</p>
            </div>

            <p style="text-align: center;">
              <a href="{{zoom_join_url}}" class="button">Join Video Call</a>
            </p>

            <p style="font-size: 14px; color: #888; text-align: center;">
              We'll send another reminder 1 hour before your appointment.
            </p>
          </div>
          ${footer}
        </div>
      </body>
      </html>
    `,
    text: `
APPOINTMENT REMINDER

Hi {{first_name}},

Your appointment is tomorrow!

{{appointment_time}} on {{appointment_date}}
with {{provider_name}}

Join Video Call: {{zoom_join_url}}

We'll send another reminder 1 hour before your appointment.
    `
  },

  // 4. Lab Order Placed
  lab_order_placed: {
    id: 'lab_order_placed',
    name: 'Lab Order Placed',
    subject: 'Your Lab Work Has Been Ordered',
    preheader: 'Schedule your blood draw at your convenience',
    html: `
      <!DOCTYPE html>
      <html>
      <head>${baseStyles}</head>
      <body>
        <div class="container">
          ${header}
          <div class="content">
            <span class="badge">Lab Order</span>
            <h2 style="margin-top: 16px;">Your Lab Work Has Been Ordered</h2>

            <p>Hi {{first_name}},</p>
            <p>Your provider has ordered lab work for you. Choose the option that works best for your schedule:</p>

            <div class="card" style="border-left-color: #d4af37;">
              <p class="card-title" style="display: flex; align-items: center;">
                <span style="background: #d4af37; color: white; padding: 2px 8px; border-radius: 4px; font-size: 10px; margin-right: 8px;">RECOMMENDED</span>
                In-Home Lab Draw
              </p>
              <p class="card-text">A licensed phlebotomist comes to your home. Most convenient option - no waiting rooms.</p>
              <a href="{{in_home_schedule_url}}" class="button" style="margin-top: 12px;">Schedule In-Home Visit</a>
            </div>

            <div class="card">
              <p class="card-title">LabCorp Patient Service Center</p>
              <p class="card-text">Visit any of 2,000+ LabCorp locations. Walk-ins welcome or schedule ahead.</p>
              <a href="{{psc_schedule_url}}" style="color: #8B7355; text-decoration: none; font-weight: 600;">Find a Location &rarr;</a>
            </div>

            <div class="divider"></div>

            <h3 style="font-size: 16px; margin-bottom: 12px;">Tests Ordered</h3>
            <p style="background: #f9f9f7; padding: 16px; border-radius: 8px; font-family: monospace; font-size: 14px;">
              {{test_panel}}
            </p>

            <div class="card">
              <p class="card-title">Preparation Instructions</p>
              <p class="card-text">
                {{#if fasting_required}}
                <strong>Fasting Required:</strong> No food or drinks (except water) for 12 hours before your draw.<br>
                {{/if}}
                - Stay hydrated - drink plenty of water<br>
                - Bring your photo ID<br>
                - Wear a short-sleeved shirt
              </p>
            </div>

            <p>Your requisition is attached to this email and will be available at your appointment.</p>
          </div>
          ${footer}
        </div>
      </body>
      </html>
    `,
    text: `
YOUR LAB WORK HAS BEEN ORDERED

Hi {{first_name}},

Your provider has ordered lab work for you.

OPTION 1: IN-HOME LAB DRAW (Recommended)
A licensed phlebotomist comes to your home. Most convenient option.
Schedule: {{in_home_schedule_url}}

OPTION 2: LABCORP PATIENT SERVICE CENTER
Visit any of 2,000+ LabCorp locations.
Find a Location: {{psc_schedule_url}}

TESTS ORDERED:
{{test_panel}}

PREPARATION:
{{#if fasting_required}}
- Fasting Required: No food or drinks (except water) for 12 hours before your draw
{{/if}}
- Stay hydrated - drink plenty of water
- Bring your photo ID
- Wear a short-sleeved shirt
    `
  },

  // 5. Lab Results Ready
  lab_results_ready: {
    id: 'lab_results_ready',
    name: 'Lab Results Ready',
    subject: 'Your Lab Results Are In',
    preheader: 'View your results and provider notes',
    html: `
      <!DOCTYPE html>
      <html>
      <head>${baseStyles}</head>
      <body>
        <div class="container">
          ${header}
          <div class="content">
            <span class="badge" style="background: #22c55e;">Results Ready</span>
            <h2 style="margin-top: 16px;">Your Lab Results Are In</h2>

            <p>Hi {{first_name}},</p>
            <p>Your lab results have been reviewed by your provider and are now available in your patient portal.</p>

            <p style="text-align: center;">
              <a href="{{results_url}}" class="button">View Your Results</a>
            </p>

            {{#if provider_notes}}
            <div class="card">
              <p class="card-title">Provider Notes</p>
              <p class="card-text">{{provider_notes}}</p>
            </div>
            {{/if}}

            {{#if follow_up_recommended}}
            <div class="card" style="border-left-color: #f59e0b;">
              <p class="card-title">Follow-Up Recommended</p>
              <p class="card-text">Your provider would like to discuss your results. Please schedule a follow-up visit.</p>
              <a href="{{schedule_url}}" style="color: #8B7355; text-decoration: none; font-weight: 600;">Schedule Now &rarr;</a>
            </div>
            {{/if}}

            <p style="font-size: 14px; color: #888;">
              Have questions about your results? Message your provider directly through your patient portal.
            </p>
          </div>
          ${footer}
        </div>
      </body>
      </html>
    `,
    text: `
YOUR LAB RESULTS ARE IN

Hi {{first_name}},

Your lab results have been reviewed by your provider and are now available.

View Your Results: {{results_url}}

{{#if provider_notes}}
PROVIDER NOTES:
{{provider_notes}}
{{/if}}

{{#if follow_up_recommended}}
FOLLOW-UP RECOMMENDED:
Your provider would like to discuss your results.
Schedule Now: {{schedule_url}}
{{/if}}

Have questions? Message your provider through your patient portal.
    `
  },

  // 6. Prescription Shipped
  prescription_shipped: {
    id: 'prescription_shipped',
    name: 'Prescription Shipped',
    subject: 'Your Medication Has Shipped',
    preheader: 'Track your package - arriving {{delivery_date}}',
    html: `
      <!DOCTYPE html>
      <html>
      <head>${baseStyles}</head>
      <body>
        <div class="container">
          ${header}
          <div class="content">
            <span class="badge" style="background: #3b82f6;">Shipped</span>
            <h2 style="margin-top: 16px;">Your Medication Has Shipped</h2>

            <p>Hi {{first_name}},</p>
            <p>Great news! Your medication is on its way and will arrive in discreet packaging.</p>

            <div class="appointment-card">
              <p class="info-label">Estimated Delivery</p>
              <p class="appointment-time">{{delivery_date}}</p>

              <div class="divider"></div>

              <div class="info-row">
                <span class="info-label">Carrier</span>
                <span class="info-value">{{carrier}}</span>
              </div>
              <div class="info-row">
                <span class="info-label">Tracking #</span>
                <span class="info-value">{{tracking_number}}</span>
              </div>
            </div>

            <p style="text-align: center;">
              <a href="{{tracking_url}}" class="button">Track Your Package</a>
            </p>

            <h3 style="font-size: 16px; margin: 24px 0 12px 0;">What's in Your Package</h3>
            {{#each medications}}
            <div style="display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #e5e5e5;">
              <span>{{name}}</span>
              <span style="color: #888;">{{dosage}}</span>
            </div>
            {{/each}}

            <div class="card" style="margin-top: 24px;">
              <p class="card-title">Need Help Getting Started?</p>
              <p class="card-text">Your package includes detailed instructions. You can also view injection tutorials in your patient portal.</p>
            </div>
          </div>
          ${footer}
        </div>
      </body>
      </html>
    `,
    text: `
YOUR MEDICATION HAS SHIPPED

Hi {{first_name}},

Your medication is on its way!

Estimated Delivery: {{delivery_date}}
Carrier: {{carrier}}
Tracking #: {{tracking_number}}

Track Your Package: {{tracking_url}}

WHAT'S IN YOUR PACKAGE:
{{#each medications}}
- {{name}} ({{dosage}})
{{/each}}

Your package includes detailed instructions. View injection tutorials in your patient portal.
    `
  },

  // 7. Refill Reminder
  refill_reminder: {
    id: 'refill_reminder',
    name: 'Refill Reminder',
    subject: 'Time to Refill Your {{medication_name}}',
    preheader: '7 days of medication remaining',
    html: `
      <!DOCTYPE html>
      <html>
      <head>${baseStyles}</head>
      <body>
        <div class="container">
          ${header}
          <div class="content">
            <span class="badge" style="background: #f59e0b;">Refill Due</span>
            <h2 style="margin-top: 16px;">Time for Your Refill</h2>

            <p>Hi {{first_name}},</p>
            <p>You have approximately <strong>7 days</strong> of {{medication_name}} remaining. Order now to ensure uninterrupted treatment.</p>

            <div class="card">
              <p class="card-title">{{medication_name}}</p>
              <p class="card-text">
                Dosage: {{dosage}}<br>
                Last filled: {{last_fill_date}}<br>
                Refills remaining: {{refills_remaining}}
              </p>
            </div>

            <p style="text-align: center;">
              <a href="{{refill_url}}" class="button">Request Refill</a>
            </p>

            {{#if requires_labs}}
            <div class="card" style="border-left-color: #ef4444;">
              <p class="card-title">Lab Work Required</p>
              <p class="card-text">Updated labs are needed before your next refill. Schedule your blood work now to avoid delays.</p>
              <a href="{{lab_schedule_url}}" style="color: #8B7355; text-decoration: none; font-weight: 600;">Schedule Labs &rarr;</a>
            </div>
            {{/if}}

            <p style="font-size: 14px; color: #888;">
              Questions about your medication? Message your provider directly.
            </p>
          </div>
          ${footer}
        </div>
      </body>
      </html>
    `,
    text: `
TIME FOR YOUR REFILL

Hi {{first_name}},

You have approximately 7 days of {{medication_name}} remaining.

{{medication_name}}
Dosage: {{dosage}}
Last filled: {{last_fill_date}}
Refills remaining: {{refills_remaining}}

Request Refill: {{refill_url}}

{{#if requires_labs}}
LAB WORK REQUIRED:
Updated labs are needed before your next refill.
Schedule Labs: {{lab_schedule_url}}
{{/if}}
    `
  },

  // 8. Treatment Approved
  treatment_approved: {
    id: 'treatment_approved',
    name: 'Treatment Approved',
    subject: 'Great News - Your Treatment Has Been Approved',
    preheader: 'Your personalized treatment plan is ready',
    html: `
      <!DOCTYPE html>
      <html>
      <head>${baseStyles}</head>
      <body>
        <div class="container">
          ${header}
          <div class="content">
            <span class="badge" style="background: #22c55e;">Approved</span>
            <h2 style="margin-top: 16px;">Your Treatment Has Been Approved</h2>

            <p>Hi {{first_name}},</p>
            <p>Great news! {{provider_name}} has reviewed your case and approved your personalized treatment plan.</p>

            <div class="card">
              <p class="card-title">Your Treatment Plan</p>
              <p class="card-text">
                <strong>{{treatment_type}}</strong><br>
                {{treatment_description}}
              </p>
            </div>

            <h3 style="font-size: 16px; margin: 24px 0 12px 0;">Prescribed Medications</h3>
            {{#each medications}}
            <div style="background: #f9f9f7; padding: 16px; border-radius: 8px; margin-bottom: 12px;">
              <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                <strong>{{name}}</strong>
                <span style="color: #8B7355; font-weight: 600;">{{price}}/mo</span>
              </div>
              <p style="margin: 0; font-size: 14px; color: #666;">{{dosage}} - {{instructions}}</p>
            </div>
            {{/each}}

            <p style="text-align: center;">
              <a href="{{checkout_url}}" class="button">Complete Your Order</a>
            </p>

            <div class="divider"></div>

            <p style="font-size: 14px; color: #888;">
              Your medications will ship within 24-48 hours of payment. Free priority shipping included.
            </p>
          </div>
          ${footer}
        </div>
      </body>
      </html>
    `,
    text: `
YOUR TREATMENT HAS BEEN APPROVED

Hi {{first_name}},

Great news! {{provider_name}} has reviewed your case and approved your personalized treatment plan.

YOUR TREATMENT PLAN:
{{treatment_type}}
{{treatment_description}}

PRESCRIBED MEDICATIONS:
{{#each medications}}
- {{name}} ({{dosage}}) - {{price}}/mo
  {{instructions}}
{{/each}}

Complete Your Order: {{checkout_url}}

Your medications will ship within 24-48 hours of payment. Free priority shipping included.
    `
  },

  // 9. Assessment Complete
  assessment_complete: {
    id: 'assessment_complete',
    name: 'Assessment Complete',
    subject: 'Your Health Assessment Results',
    preheader: 'Review your personalized recommendations',
    html: `
      <!DOCTYPE html>
      <html>
      <head>${baseStyles}</head>
      <body>
        <div class="container">
          ${header}
          <div class="content">
            <h2>Your Assessment Results</h2>

            <p>Hi {{first_name}},</p>
            <p>Thank you for completing your {{assessment_type}}. Here's a summary of your results:</p>

            <div class="appointment-card">
              <div style="text-align: center; margin-bottom: 16px;">
                <span style="font-size: 48px; font-weight: 700; color: {{score_color}};">{{score}}</span>
                <p style="margin: 4px 0 0 0; color: #666;">{{score_label}}</p>
              </div>

              {{#each categories}}
              <div class="info-row">
                <span class="info-label">{{name}}</span>
                <span class="info-value" style="color: {{color}};">{{status}}</span>
              </div>
              {{/each}}
            </div>

            <h3 style="font-size: 16px; margin: 24px 0 12px 0;">Recommendations</h3>
            <ul class="list">
              {{#each recommendations}}
              <li>{{this}}</li>
              {{/each}}
            </ul>

            <p style="text-align: center;">
              <a href="{{full_results_url}}" class="button">View Full Results</a>
            </p>

            <div class="card">
              <p class="card-title">Next Step</p>
              <p class="card-text">{{next_step}}</p>
            </div>
          </div>
          ${footer}
        </div>
      </body>
      </html>
    `,
    text: `
YOUR ASSESSMENT RESULTS

Hi {{first_name}},

Thank you for completing your {{assessment_type}}.

SCORE: {{score}} - {{score_label}}

{{#each categories}}
{{name}}: {{status}}
{{/each}}

RECOMMENDATIONS:
{{#each recommendations}}
- {{this}}
{{/each}}

View Full Results: {{full_results_url}}

NEXT STEP:
{{next_step}}
    `
  },

  // 10. Message Received
  message_received: {
    id: 'message_received',
    name: 'Message Received',
    subject: 'New Message from {{sender_name}}',
    preheader: '{{message_preview}}',
    html: `
      <!DOCTYPE html>
      <html>
      <head>${baseStyles}</head>
      <body>
        <div class="container">
          ${header}
          <div class="content">
            <h2>New Message</h2>

            <p>Hi {{first_name}},</p>
            <p>You have a new message from your care team:</p>

            <div class="card">
              <div style="display: flex; align-items: center; margin-bottom: 12px;">
                <div style="width: 40px; height: 40px; background: #8B7355; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: 600; margin-right: 12px;">
                  {{sender_initials}}
                </div>
                <div>
                  <p style="margin: 0; font-weight: 600;">{{sender_name}}</p>
                  <p style="margin: 0; font-size: 12px; color: #888;">{{sender_role}}</p>
                </div>
              </div>
              <p class="card-text">{{message_preview}}</p>
            </div>

            <p style="text-align: center;">
              <a href="{{message_url}}" class="button">View & Reply</a>
            </p>

            <p style="font-size: 14px; color: #888; text-align: center;">
              For urgent matters, please call (512) 555-0123.
            </p>
          </div>
          ${footer}
        </div>
      </body>
      </html>
    `,
    text: `
NEW MESSAGE

Hi {{first_name}},

You have a new message from {{sender_name}} ({{sender_role}}):

"{{message_preview}}"

View & Reply: {{message_url}}

For urgent matters, please call (512) 555-0123.
    `
  }
};

// ==========================================
// EMAIL UTILITY FUNCTIONS
// ==========================================

/**
 * Interpolate variables in template
 */
export function interpolateTemplate(template: string, variables: Record<string, any>): string {
  let result = template;

  // Handle simple variables {{variable}}
  Object.entries(variables).forEach(([key, value]) => {
    const regex = new RegExp(`{{${key}}}`, 'g');
    result = result.replace(regex, String(value ?? ''));
  });

  // Handle conditionals {{#if variable}}...{{/if}}
  result = result.replace(/{{#if (\w+)}}([\s\S]*?){{\/if}}/g, (match, variable, content) => {
    return variables[variable] ? content : '';
  });

  // Handle loops {{#each array}}...{{/each}}
  result = result.replace(/{{#each (\w+)}}([\s\S]*?){{\/each}}/g, (match, arrayName, itemTemplate) => {
    const array = variables[arrayName];
    if (!Array.isArray(array)) return '';

    return array.map((item: any) => {
      let itemResult = itemTemplate;
      if (typeof item === 'object') {
        Object.entries(item).forEach(([key, value]) => {
          itemResult = itemResult.replace(new RegExp(`{{${key}}}`, 'g'), String(value ?? ''));
        });
      } else {
        itemResult = itemResult.replace(/{{this}}/g, String(item));
      }
      return itemResult;
    }).join('');
  });

  return result;
}

/**
 * Get template by ID with variables interpolated
 */
export function getEmailTemplate(
  templateId: string,
  variables: Record<string, any>
): { subject: string; html: string; text: string } {
  const template = EMAIL_TEMPLATES[templateId];
  if (!template) {
    throw new Error(`Email template '${templateId}' not found`);
  }

  return {
    subject: interpolateTemplate(template.subject, variables),
    html: interpolateTemplate(template.html, variables),
    text: interpolateTemplate(template.text, variables)
  };
}

export default EMAIL_TEMPLATES;
