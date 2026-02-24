// Healthie Integration Types
// ===========================

// ==========================================
// PATIENT TYPES
// ==========================================

export interface HealthiePatient {
  id?: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number?: string;
  dob?: string;
  gender?: string;
  timezone?: string;
}

export interface PatientAddress {
  line1: string;
  line2?: string;
  city: string;
  state: string;
  zip: string;
}

// ==========================================
// APPOINTMENT TYPES
// ==========================================

export interface HealthieAppointment {
  id?: string;
  user_id: string;
  appointment_type_id: string;
  datetime: string;
  notes?: string;
}

export interface AppointmentSlot {
  start_time: string;
  end_time: string;
  provider: {
    id: string;
    full_name: string;
  };
}

export interface AppointmentType {
  id: string;
  name: string;
  length: number;
  available_contact_types: string[];
  pricing?: {
    price: number;
  };
}

// ==========================================
// LAB TYPES
// ==========================================

export type LabType = 'in_home' | 'psc' | 'mobile' | 'concierge';

export interface LabOrder {
  id: string;
  patient_id: string;
  healthie_order_id?: string;
  labcorp_order_id?: string;
  test_panel: string;
  lab_type: LabType;
  status: 'pending' | 'ordered' | 'scheduled' | 'collected' | 'processing' | 'completed' | 'cancelled';
  scheduled_date?: string;
  address?: PatientAddress;
  special_instructions?: string;
  results?: LabResults;
  results_received_at?: string;
}

export interface LabResults {
  [key: string]: {
    value: number | string;
    unit: string;
    reference_range: string;
    flag?: 'H' | 'L' | 'N'; // High, Low, Normal
  };
}

export interface LabAppointmentOption {
  code: LabType;
  name: string;
  description: string;
  price_cents: number;
  priority: number;
  requires_address: boolean;
}

// ==========================================
// PRESCRIPTION TYPES
// ==========================================

export interface Prescription {
  id: string;
  patient_id: string;
  medication: string;
  dosage: string;
  instructions: string;
  quantity: number;
  refills_remaining: number;
  status: 'pending' | 'approved' | 'filled' | 'shipped' | 'delivered' | 'cancelled';
  prescribed_at: string;
  pharmacy?: {
    name: string;
    address: string;
  };
}

// ==========================================
// FORM TYPES
// ==========================================

export interface HealthieForm {
  id: string;
  name: string;
  description?: string;
  is_intake_form: boolean;
  custom_modules?: FormQuestion[];
}

export interface FormQuestion {
  id: string;
  label: string;
  mod_type: 'text' | 'textarea' | 'radio' | 'checkbox' | 'select' | 'number' | 'date';
  options?: string[];
  required: boolean;
}

export interface FormSubmission {
  id: string;
  user_id: string;
  form_id: string;
  answers: Record<string, any>;
  completed_at: string;
}

// ==========================================
// PROVIDER TYPES
// ==========================================

export interface HealthieProvider {
  id: string;
  full_name: string;
  email: string;
  qualifications?: string;
  licensed_states?: string[];
}

// ==========================================
// MESSAGE TYPES
// ==========================================

export interface HealthieMessage {
  id: string;
  conversation_id: string;
  sender_id: string;
  recipient_id: string;
  content: string;
  created_at: string;
  read_at?: string;
}

// ==========================================
// TASK TYPES
// ==========================================

export interface HealthieTask {
  id: string;
  content: string;
  user_id: string;
  assigned_to_id: string;
  due_date: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'completed';
}

// ==========================================
// WEBHOOK TYPES
// ==========================================

export type HealthieWebhookEvent =
  | 'appointment.created'
  | 'appointment.updated'
  | 'appointment.cancelled'
  | 'appointment.completed'
  | 'form_answer_group.created'
  | 'message.created'
  | 'patient.created'
  | 'patient.updated'
  | 'chart_note.created'
  | 'chart_note.signed'
  | 'lab_order.created'
  | 'lab_order.completed'
  | 'prescription.created'
  | 'prescription.filled'
  | 'task.created'
  | 'task.completed';

export interface HealthieWebhookPayload {
  event_type: HealthieWebhookEvent;
  resource_type: string;
  resource_id: string;
  data: any;
  created_at: string;
}

// ==========================================
// DOCUMENT TYPES
// ==========================================

export interface HealthieDocument {
  id: string;
  display_name: string;
  file_url: string;
  document_type: string;
  created_at: string;
}

// ==========================================
// INSURANCE TYPES
// ==========================================

export interface InsuranceInfo {
  payer_id: string;
  member_id: string;
  group_number?: string;
  subscriber_name: string;
  subscriber_dob: string;
}

export interface InsuranceVerification {
  verified: boolean;
  coverage_type?: string;
  copay?: number;
  deductible?: number;
  details?: any;
}

// ==========================================
// CONFIG TYPES
// ==========================================

export interface HealthieConfig {
  apiKey: string;
  apiUrl: string;
  webhookSecret?: string;
  environment?: 'staging' | 'production';
}

// ==========================================
// TREATMENT TYPES
// ==========================================

export type TreatmentStatus =
  | 'pending'
  | 'under_review'
  | 'approved'
  | 'active'
  | 'paused'
  | 'completed'
  | 'cancelled';

export interface Treatment {
  id: string;
  patient_id: string;
  treatment_type: string;
  medication: string;
  dosage: string;
  status: TreatmentStatus;
  start_date?: string;
  next_refill_date?: string;
  notes?: string;
}

// ==========================================
// EMAIL TYPES
// ==========================================

export type EmailTemplateId =
  | 'welcome'
  | 'appointment_confirmed'
  | 'appointment_reminder'
  | 'lab_order_placed'
  | 'lab_results_ready'
  | 'prescription_shipped'
  | 'refill_reminder'
  | 'treatment_approved'
  | 'assessment_complete'
  | 'message_received';

export interface EmailQueueItem {
  id: string;
  template_id: EmailTemplateId;
  recipient_email: string;
  variables: Record<string, any>;
  status: 'pending' | 'processing' | 'sent' | 'failed' | 'cancelled';
  scheduled_for: string;
  sent_at?: string;
  delivery_id?: string;
  error?: string;
}
