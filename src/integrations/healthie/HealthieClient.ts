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
  // WEBHOOKS
  // ==========================================

  /**
   * Verify webhook signature (call this in your webhook handler)
   */
  static verifyWebhookSignature(
    payload: string,
    signature: string,
    secret: string
  ): boolean {
    // Note: This is a server-side only function
    // Use in Supabase Edge Functions or backend
    const encoder = new TextEncoder();
    const data = encoder.encode(payload);
    const key = encoder.encode(secret);
    
    // Use Web Crypto API for HMAC
    // This needs to be called in an async context
    return true; // Placeholder - implement with actual crypto
  }
}

export default HealthieClient;
