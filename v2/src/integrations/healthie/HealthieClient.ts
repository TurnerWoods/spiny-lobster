// Healthie API Integration for Elevare Health
// =============================================
// Healthie uses GraphQL API with OAuth2 authentication
// Sandbox URL: https://staging-api.gethealthie.com/graphql
// Production URL: https://api.gethealthie.com/graphql

// SETUP INSTRUCTIONS:
// 1. Go to Healthie → Settings → API Access
// 2. Create new API key (select scopes needed)
// 3. For sandbox, use staging-api.gethealthie.com
// 4. Store API key in Supabase secrets (see below)

export interface HealthieConfig {
  apiKey: string;
  apiUrl: string; // staging-api.gethealthie.com or api.gethealthie.com
}

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

export interface HealthieAppointment {
  id?: string;
  user_id: string;
  appointment_type_id: string;
  datetime: string;
  notes?: string;
}

export class HealthieClient {
  private apiKey: string;
  private apiUrl: string;

  constructor(config: HealthieConfig) {
    this.apiKey = config.apiKey;
    this.apiUrl = config.apiUrl || 'https://staging-api.gethealthie.com/graphql';
  }

  private async query(query: string, variables?: Record<string, any>): Promise<any> {
    const response = await fetch(this.apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${this.apiKey}`,
        'AuthorizationSource': 'API'
      },
      body: JSON.stringify({ query, variables })
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Healthie API Error: ${response.status} - ${error}`);
    }

    const result = await response.json();
    if (result.errors) {
      throw new Error(`Healthie GraphQL Error: ${JSON.stringify(result.errors)}`);
    }

    return result.data;
  }

  // ==========================================
  // PATIENT MANAGEMENT
  // ==========================================

  /**
   * Create a new patient in Healthie
   */
  async createPatient(patient: HealthiePatient): Promise<{ id: string }> {
    const mutation = `
      mutation createClient($input: createClientInput!) {
        createClient(input: $input) {
          user {
            id
            email
            first_name
            last_name
          }
          messages {
            field
            message
          }
        }
      }
    `;

    const variables = {
      input: {
        first_name: patient.first_name,
        last_name: patient.last_name,
        email: patient.email,
        phone_number: patient.phone_number,
        dob: patient.dob,
        gender: patient.gender,
        timezone: patient.timezone || 'America/Chicago' // Default to Central for Texas
      }
    };

    const data = await this.query(mutation, variables);
    
    if (data.createClient.messages?.length > 0) {
      throw new Error(`Healthie Error: ${data.createClient.messages.map((m: any) => m.message).join(', ')}`);
    }

    return { id: data.createClient.user.id };
  }

  /**
   * Get patient by email
   */
  async getPatientByEmail(email: string): Promise<HealthiePatient | null> {
    const query = `
      query getUsers($email: String) {
        users(email: $email, offset: 0) {
          id
          email
          first_name
          last_name
          phone_number
          dob
        }
      }
    `;

    const data = await this.query(query, { email });
    return data.users?.[0] || null;
  }

  /**
   * Get patient by ID
   */
  async getPatient(id: string): Promise<HealthiePatient | null> {
    const query = `
      query getUser($id: ID!) {
        user(id: $id) {
          id
          email
          first_name
          last_name
          phone_number
          dob
          gender
        }
      }
    `;

    const data = await this.query(query, { id });
    return data.user;
  }

  /**
   * Update patient information
   */
  async updatePatient(id: string, updates: Partial<HealthiePatient>): Promise<void> {
    const mutation = `
      mutation updateClient($input: updateClientInput!) {
        updateClient(input: $input) {
          user {
            id
          }
          messages {
            field
            message
          }
        }
      }
    `;

    const variables = {
      input: {
        id,
        ...updates
      }
    };

    const data = await this.query(mutation, variables);
    
    if (data.updateClient.messages?.length > 0) {
      throw new Error(`Healthie Error: ${data.updateClient.messages.map((m: any) => m.message).join(', ')}`);
    }
  }

  // ==========================================
  // APPOINTMENT MANAGEMENT
  // ==========================================

  /**
   * Get available appointment types
   */
  async getAppointmentTypes(): Promise<any[]> {
    const query = `
      query getAppointmentTypes {
        appointmentTypes {
          id
          name
          length
          available_contact_types
          pricing {
            price
          }
        }
      }
    `;

    const data = await this.query(query);
    return data.appointmentTypes;
  }

  /**
   * Get available time slots for an appointment type
   */
  async getAvailableSlots(
    appointmentTypeId: string,
    startDate: string,
    endDate: string,
    providerId?: string
  ): Promise<any[]> {
    const query = `
      query getAvailabilities(
        $appointment_type_id: ID!
        $start_date: String!
        $end_date: String!
        $provider_id: ID
      ) {
        availabilities(
          appointment_type_id: $appointment_type_id
          start_date: $start_date
          end_date: $end_date
          provider_id: $provider_id
        ) {
          date
          slots {
            start_time
            end_time
            provider {
              id
              full_name
            }
          }
        }
      }
    `;

    const data = await this.query(query, {
      appointment_type_id: appointmentTypeId,
      start_date: startDate,
      end_date: endDate,
      provider_id: providerId
    });

    return data.availabilities;
  }

  /**
   * Book an appointment
   */
  async createAppointment(appointment: HealthieAppointment): Promise<{ id: string }> {
    const mutation = `
      mutation createAppointment($input: createAppointmentInput!) {
        createAppointment(input: $input) {
          appointment {
            id
            date
            start_time
            location
            zoom_join_url
          }
          messages {
            field
            message
          }
        }
      }
    `;

    const variables = {
      input: {
        user_id: appointment.user_id,
        appointment_type_id: appointment.appointment_type_id,
        datetime: appointment.datetime,
        notes: appointment.notes
      }
    };

    const data = await this.query(mutation, variables);
    
    if (data.createAppointment.messages?.length > 0) {
      throw new Error(`Healthie Error: ${data.createAppointment.messages.map((m: any) => m.message).join(', ')}`);
    }

    return { 
      id: data.createAppointment.appointment.id,
      ...data.createAppointment.appointment
    };
  }

  /**
   * Get patient's appointments
   */
  async getPatientAppointments(userId: string): Promise<any[]> {
    const query = `
      query getAppointments($user_id: ID!) {
        appointments(user_id: $user_id) {
          id
          date
          start_time
          end_time
          appointment_type {
            name
          }
          provider {
            full_name
          }
          zoom_join_url
        }
      }
    `;

    const data = await this.query(query, { user_id: userId });
    return data.appointments;
  }

  // ==========================================
  // CHART NOTES & DOCUMENTATION
  // ==========================================

  /**
   * Create a chart note (for syncing tool results)
   */
  async createFormAnswerGroup(
    userId: string,
    formId: string,
    answers: Record<string, any>
  ): Promise<{ id: string }> {
    const mutation = `
      mutation createFormAnswerGroup($input: createFormAnswerGroupInput!) {
        createFormAnswerGroup(input: $input) {
          form_answer_group {
            id
          }
          messages {
            field
            message
          }
        }
      }
    `;

    // Convert answers object to Healthie's expected format
    const formattedAnswers = Object.entries(answers).map(([questionId, answer]) => ({
      custom_module_id: questionId,
      answer: typeof answer === 'string' ? answer : JSON.stringify(answer)
    }));

    const variables = {
      input: {
        user_id: userId,
        custom_module_form_id: formId,
        form_answers: formattedAnswers,
        finished: true
      }
    };

    const data = await this.query(mutation, variables);
    return { id: data.createFormAnswerGroup.form_answer_group.id };
  }

  /**
   * Add a note to patient chart
   */
  async addChartNote(
    userId: string,
    content: string,
    noteType: string = 'general'
  ): Promise<{ id: string }> {
    const mutation = `
      mutation createNote($input: createNoteInput!) {
        createNote(input: $input) {
          note {
            id
          }
          messages {
            field
            message
          }
        }
      }
    `;

    const variables = {
      input: {
        user_id: userId,
        content,
        note_type: noteType
      }
    };

    const data = await this.query(mutation, variables);
    return { id: data.createNote.note.id };
  }

  // ==========================================
  // PROVIDERS
  // ==========================================

  /**
   * Get all providers
   */
  async getProviders(): Promise<any[]> {
    const query = `
      query getProviders {
        organizationMembers(licensed_in_state: "TX") {
          id
          full_name
          email
          qualifications
        }
      }
    `;

    const data = await this.query(query);
    return data.organizationMembers;
  }

  // ==========================================
  // MESSAGING
  // ==========================================

  /**
   * Send a message to patient
   */
  async sendMessage(
    userId: string,
    content: string,
    providerId?: string
  ): Promise<{ id: string }> {
    const mutation = `
      mutation createConversation($input: createConversationInput!) {
        createConversation(input: $input) {
          conversation {
            id
          }
          messages {
            field
            message
          }
        }
      }
    `;

    const variables = {
      input: {
        recipient_ids: [userId],
        simple_added_users: providerId ? [providerId] : undefined,
        initial_message: content
      }
    };

    const data = await this.query(mutation, variables);
    return { id: data.createConversation.conversation.id };
  }

  // ==========================================
  // LAB ORDERS
  // ==========================================

  /**
   * Create a lab order for a patient
   */
  async createLabOrder(
    userId: string,
    testPanel: string,
    labType: 'in_home' | 'psc' | 'mobile' = 'in_home',
    address?: {
      line1: string;
      line2?: string;
      city: string;
      state: string;
      zip: string;
    },
    specialInstructions?: string
  ): Promise<{ id: string; requisitionUrl?: string }> {
    const mutation = `
      mutation createLabOrder($input: createLabOrderInput!) {
        createLabOrder(input: $input) {
          lab_order {
            id
            requisition_url
            status
          }
          messages {
            field
            message
          }
        }
      }
    `;

    const variables = {
      input: {
        user_id: userId,
        lab_type: labType,
        test_panel: testPanel,
        address: address ? {
          line1: address.line1,
          line2: address.line2,
          city: address.city,
          state: address.state,
          zip: address.zip
        } : undefined,
        special_instructions: specialInstructions
      }
    };

    const data = await this.query(mutation, variables);

    if (data.createLabOrder.messages?.length > 0) {
      throw new Error(`Healthie Error: ${data.createLabOrder.messages.map((m: any) => m.message).join(', ')}`);
    }

    return {
      id: data.createLabOrder.lab_order.id,
      requisitionUrl: data.createLabOrder.lab_order.requisition_url
    };
  }

  /**
   * Get lab order results
   */
  async getLabResults(orderId: string): Promise<any> {
    const query = `
      query getLabOrder($id: ID!) {
        labOrder(id: $id) {
          id
          status
          test_panel
          results
          results_pdf_url
          ordered_at
          completed_at
        }
      }
    `;

    const data = await this.query(query, { id: orderId });
    return data.labOrder;
  }

  /**
   * Get all lab orders for a patient
   */
  async getPatientLabOrders(userId: string): Promise<any[]> {
    const query = `
      query getLabOrders($user_id: ID!) {
        labOrders(user_id: $user_id) {
          id
          status
          test_panel
          ordered_at
          completed_at
        }
      }
    `;

    const data = await this.query(query, { user_id: userId });
    return data.labOrders;
  }

  // ==========================================
  // PRESCRIPTIONS
  // ==========================================

  /**
   * Create a prescription for a patient
   */
  async createPrescription(
    userId: string,
    medication: string,
    dosage: string,
    instructions: string,
    quantity?: number,
    refills?: number
  ): Promise<{ id: string }> {
    const mutation = `
      mutation createPrescription($input: createPrescriptionInput!) {
        createPrescription(input: $input) {
          prescription {
            id
            medication
            dosage
            status
          }
          messages {
            field
            message
          }
        }
      }
    `;

    const variables = {
      input: {
        user_id: userId,
        medication,
        dosage,
        instructions,
        quantity: quantity || 30,
        refills: refills || 0
      }
    };

    const data = await this.query(mutation, variables);

    if (data.createPrescription.messages?.length > 0) {
      throw new Error(`Healthie Error: ${data.createPrescription.messages.map((m: any) => m.message).join(', ')}`);
    }

    return { id: data.createPrescription.prescription.id };
  }

  /**
   * Get prescription history for a patient
   */
  async getPrescriptionHistory(userId: string): Promise<any[]> {
    const query = `
      query getPrescriptions($user_id: ID!) {
        prescriptions(user_id: $user_id) {
          id
          medication
          dosage
          instructions
          quantity
          refills_remaining
          status
          prescribed_at
          pharmacy {
            name
            address
          }
        }
      }
    `;

    const data = await this.query(query, { user_id: userId });
    return data.prescriptions;
  }

  // ==========================================
  // DOCUMENTS
  // ==========================================

  /**
   * Upload a document to patient chart
   */
  async uploadDocument(
    userId: string,
    fileName: string,
    fileBase64: string,
    documentType: string = 'general'
  ): Promise<{ id: string; url: string }> {
    const mutation = `
      mutation createDocument($input: createDocumentInput!) {
        createDocument(input: $input) {
          document {
            id
            display_name
            file_url
          }
          messages {
            field
            message
          }
        }
      }
    `;

    const variables = {
      input: {
        user_id: userId,
        display_name: fileName,
        file: fileBase64,
        document_type: documentType
      }
    };

    const data = await this.query(mutation, variables);

    if (data.createDocument.messages?.length > 0) {
      throw new Error(`Healthie Error: ${data.createDocument.messages.map((m: any) => m.message).join(', ')}`);
    }

    return {
      id: data.createDocument.document.id,
      url: data.createDocument.document.file_url
    };
  }

  /**
   * Get all documents for a patient
   */
  async getPatientDocuments(userId: string): Promise<any[]> {
    const query = `
      query getDocuments($user_id: ID!) {
        documents(user_id: $user_id) {
          id
          display_name
          file_url
          document_type
          created_at
        }
      }
    `;

    const data = await this.query(query, { user_id: userId });
    return data.documents;
  }

  // ==========================================
  // TASKS & FOLLOW-UPS
  // ==========================================

  /**
   * Create a task/follow-up for provider
   */
  async createTask(
    providerId: string,
    patientId: string,
    description: string,
    dueDate: string,
    priority: 'low' | 'medium' | 'high' = 'medium'
  ): Promise<{ id: string }> {
    const mutation = `
      mutation createTask($input: createTaskInput!) {
        createTask(input: $input) {
          task {
            id
            content
            due_date
          }
          messages {
            field
            message
          }
        }
      }
    `;

    const variables = {
      input: {
        user_id: patientId,
        assigned_to_id: providerId,
        content: description,
        due_date: dueDate,
        priority
      }
    };

    const data = await this.query(mutation, variables);

    if (data.createTask.messages?.length > 0) {
      throw new Error(`Healthie Error: ${data.createTask.messages.map((m: any) => m.message).join(', ')}`);
    }

    return { id: data.createTask.task.id };
  }

  /**
   * Get tasks for a provider
   */
  async getProviderTasks(providerId: string, status?: 'pending' | 'completed'): Promise<any[]> {
    const query = `
      query getTasks($assigned_to_id: ID!, $status: String) {
        tasks(assigned_to_id: $assigned_to_id, status: $status) {
          id
          content
          due_date
          priority
          status
          user {
            id
            full_name
          }
        }
      }
    `;

    const data = await this.query(query, { assigned_to_id: providerId, status });
    return data.tasks;
  }

  // ==========================================
  // INSURANCE VERIFICATION
  // ==========================================

  /**
   * Verify patient insurance (future use)
   */
  async verifyInsurance(
    userId: string,
    insuranceInfo: {
      payer_id: string;
      member_id: string;
      group_number?: string;
      subscriber_name: string;
      subscriber_dob: string;
    }
  ): Promise<{ verified: boolean; details?: any }> {
    const mutation = `
      mutation createInsuranceAuthorization($input: createInsuranceAuthorizationInput!) {
        createInsuranceAuthorization(input: $input) {
          insurance_authorization {
            id
            status
            verified
          }
          messages {
            field
            message
          }
        }
      }
    `;

    const variables = {
      input: {
        user_id: userId,
        ...insuranceInfo
      }
    };

    const data = await this.query(mutation, variables);

    return {
      verified: data.createInsuranceAuthorization.insurance_authorization.verified,
      details: data.createInsuranceAuthorization.insurance_authorization
    };
  }

  // ==========================================
  // FORMS
  // ==========================================

  /**
   * Get available forms/questionnaires
   */
  async getForms(): Promise<any[]> {
    const query = `
      query getForms {
        customModuleForms {
          id
          name
          description
          is_intake_form
        }
      }
    `;

    const data = await this.query(query);
    return data.customModuleForms;
  }

  /**
   * Get form by ID with questions
   */
  async getForm(formId: string): Promise<any> {
    const query = `
      query getForm($id: ID!) {
        customModuleForm(id: $id) {
          id
          name
          description
          custom_modules {
            id
            label
            mod_type
            options
            required
          }
        }
      }
    `;

    const data = await this.query(query, { id: formId });
    return data.customModuleForm;
  }

  // ==========================================
  // WEBHOOKS
  // ==========================================

  /**
   * Verify webhook signature using HMAC-SHA256
   * Call this in your webhook handler before processing events
   */
  static async verifyWebhookSignature(
    payload: string,
    signature: string,
    secret: string
  ): Promise<boolean> {
    try {
      const encoder = new TextEncoder();
      const keyData = encoder.encode(secret);
      const payloadData = encoder.encode(payload);

      // Import the secret key for HMAC
      const key = await crypto.subtle.importKey(
        'raw',
        keyData,
        { name: 'HMAC', hash: 'SHA-256' },
        false,
        ['sign']
      );

      // Generate HMAC signature
      const signatureBuffer = await crypto.subtle.sign('HMAC', key, payloadData);
      const signatureArray = new Uint8Array(signatureBuffer);

      // Convert to hex string
      const computedSignature = Array.from(signatureArray)
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');

      // Constant-time comparison to prevent timing attacks
      if (signature.length !== computedSignature.length) {
        return false;
      }

      let result = 0;
      for (let i = 0; i < signature.length; i++) {
        result |= signature.charCodeAt(i) ^ computedSignature.charCodeAt(i);
      }

      return result === 0;
    } catch (error) {
      console.error('Webhook signature verification failed:', error);
      return false;
    }
  }

  /**
   * Parse and validate webhook event
   */
  static parseWebhookEvent(payload: string): {
    event_type: string;
    resource_type: string;
    resource_id: string;
    data: any;
    timestamp: string;
  } {
    const parsed = JSON.parse(payload);
    return {
      event_type: parsed.event_type,
      resource_type: parsed.resource_type,
      resource_id: parsed.resource_id,
      data: parsed.data,
      timestamp: parsed.created_at
    };
  }
}

// ==========================================
// APPOINTMENT TYPES CONFIGURATION
// ==========================================
// Configure these in Healthie dashboard or via API

export const APPOINTMENT_TYPES = {
  // Lab appointments - In-Home is TOP PRIORITY
  LAB_IN_HOME: {
    name: 'In-Home Lab Draw',
    description: 'LabCorp mobile phlebotomist comes to your home',
    duration: 30,
    price: 0,
    priority: 1, // Highest priority - show first
    contactType: 'In-Person'
  },
  LAB_PSC: {
    name: 'LabCorp Patient Service Center',
    description: 'Visit your nearest LabCorp location',
    duration: 15,
    price: 0,
    priority: 2,
    contactType: 'In-Person'
  },
  LAB_MOBILE: {
    name: 'Mobile Lab Draw',
    description: 'Mobile phlebotomist at your location',
    duration: 30,
    price: 25,
    priority: 3,
    contactType: 'In-Person'
  },

  // Telehealth appointments
  INITIAL_CONSULTATION: {
    name: 'Initial Consultation',
    description: 'First-time patient video consultation',
    duration: 30,
    price: 0,
    priority: 1,
    contactType: 'Video'
  },
  FOLLOW_UP: {
    name: 'Follow-up Visit',
    description: 'Established patient check-in',
    duration: 15,
    price: 0,
    priority: 2,
    contactType: 'Video'
  },
  LAB_REVIEW: {
    name: 'Lab Results Review',
    description: 'Review lab results with provider',
    duration: 15,
    price: 0,
    priority: 3,
    contactType: 'Video'
  },
  URGENT_CHECKIN: {
    name: 'Urgent Check-in',
    description: 'Same-day urgent consultation',
    duration: 10,
    price: 0,
    priority: 4,
    contactType: 'Video'
  }
};

// ==========================================
// HEALTHIE FORMS CONFIGURATION
// ==========================================
// These should be created in Healthie dashboard

export const HEALTHIE_FORMS = {
  MEDICAL_HISTORY: {
    id: 'form_medical_history', // Replace with actual Healthie form ID
    name: 'Medical History Questionnaire',
    description: 'Comprehensive health history for new patients'
  },
  TRT_INTAKE: {
    id: 'form_trt_intake',
    name: 'TRT Intake Form',
    description: 'Testosterone therapy candidacy assessment'
  },
  WEIGHT_LOSS_INTAKE: {
    id: 'form_weight_loss',
    name: 'Weight Loss Intake',
    description: 'GLP-1 therapy candidacy and goals'
  },
  PEPTIDE_INTAKE: {
    id: 'form_peptide_intake',
    name: 'Peptide Therapy Intake',
    description: 'Performance peptide candidacy assessment'
  },
  LAB_CONSENT: {
    id: 'form_lab_consent',
    name: 'Lab Work Authorization',
    description: 'LabCorp blood draw consent and authorization'
  },
  TELEHEALTH_CONSENT: {
    id: 'form_telehealth_consent',
    name: 'Telehealth Consent',
    description: 'Texas telemedicine informed consent'
  },
  CONTROLLED_SUBSTANCE_AGREEMENT: {
    id: 'form_csa',
    name: 'Controlled Substance Agreement',
    description: 'Schedule III medication agreement (TRT)'
  }
};

// ==========================================
// WEBHOOK EVENTS TO SUBSCRIBE
// ==========================================

export const HEALTHIE_WEBHOOK_EVENTS = [
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

export default HealthieClient;
