-- Email Queue and Webhook Infrastructure
-- ========================================
-- Supports transactional email sending and webhook event logging

-- ==========================================
-- EMAIL QUEUE TABLE
-- ==========================================
-- Stores emails to be sent, with scheduling support

CREATE TABLE IF NOT EXISTS email_queue (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  template_id TEXT NOT NULL,
  recipient_email TEXT NOT NULL,
  variables JSONB DEFAULT '{}',
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'sent', 'failed', 'cancelled')),
  scheduled_for TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  sent_at TIMESTAMP WITH TIME ZONE,
  delivery_id TEXT,
  error TEXT,
  retry_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for efficient queue processing
CREATE INDEX IF NOT EXISTS idx_email_queue_status ON email_queue(status);
CREATE INDEX IF NOT EXISTS idx_email_queue_scheduled ON email_queue(scheduled_for) WHERE status = 'pending';
CREATE INDEX IF NOT EXISTS idx_email_queue_recipient ON email_queue(recipient_email);

-- ==========================================
-- WEBHOOK EVENTS TABLE
-- ==========================================
-- Audit log for all incoming webhooks

CREATE TABLE IF NOT EXISTS webhook_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source TEXT NOT NULL, -- 'healthie', 'stripe', 'docusign', 'labcorp', 'customerio'
  event_type TEXT NOT NULL,
  resource_type TEXT,
  resource_id TEXT,
  payload JSONB,
  processed BOOLEAN DEFAULT FALSE,
  processed_at TIMESTAMP WITH TIME ZONE,
  error TEXT,
  received_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for webhook lookup
CREATE INDEX IF NOT EXISTS idx_webhook_events_source ON webhook_events(source);
CREATE INDEX IF NOT EXISTS idx_webhook_events_type ON webhook_events(event_type);
CREATE INDEX IF NOT EXISTS idx_webhook_events_resource ON webhook_events(resource_id);
CREATE INDEX IF NOT EXISTS idx_webhook_events_received ON webhook_events(received_at);

-- ==========================================
-- EMAIL LOGS TABLE UPDATES
-- ==========================================
-- Add missing columns if they don't exist

DO $$
BEGIN
  -- Add delivery_id column if not exists
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'email_logs' AND column_name = 'delivery_id') THEN
    ALTER TABLE email_logs ADD COLUMN delivery_id TEXT;
  END IF;

  -- Add error column if not exists
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'email_logs' AND column_name = 'error') THEN
    ALTER TABLE email_logs ADD COLUMN error TEXT;
  END IF;
END $$;

-- ==========================================
-- PATIENTS TABLE UPDATES
-- ==========================================
-- Add email preferences

DO $$
BEGIN
  -- Add email_unsubscribed column if not exists
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'patients' AND column_name = 'email_unsubscribed') THEN
    ALTER TABLE patients ADD COLUMN email_unsubscribed BOOLEAN DEFAULT FALSE;
  END IF;

  -- Add last_visit_date column if not exists
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'patients' AND column_name = 'last_visit_date') THEN
    ALTER TABLE patients ADD COLUMN last_visit_date TIMESTAMP WITH TIME ZONE;
  END IF;
END $$;

-- ==========================================
-- LAB APPOINTMENT TYPES
-- ==========================================
-- Reference table for lab appointment options

CREATE TABLE IF NOT EXISTS lab_appointment_types (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  price_cents INTEGER DEFAULT 0,
  priority INTEGER DEFAULT 99, -- Lower = higher priority (shown first)
  is_active BOOLEAN DEFAULT TRUE,
  requires_address BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default lab appointment types with IN-HOME as TOP PRIORITY
INSERT INTO lab_appointment_types (code, name, description, price_cents, priority, requires_address) VALUES
  ('in_home', 'In-Home Lab Draw', 'A licensed LabCorp phlebotomist comes to your home. Most convenient option - no waiting rooms, no travel.', 0, 1, TRUE),
  ('psc', 'LabCorp Patient Service Center', 'Visit any of 2,000+ LabCorp locations nationwide. Walk-ins welcome or schedule ahead.', 0, 2, FALSE),
  ('mobile', 'Mobile Phlebotomy', 'Mobile phlebotomist meets you at your preferred location (office, hotel, etc.).', 2500, 3, TRUE),
  ('concierge', 'Concierge Lab Service', 'Premium white-glove service with flexible scheduling and results consultation.', 5000, 4, TRUE)
ON CONFLICT (code) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  price_cents = EXCLUDED.price_cents,
  priority = EXCLUDED.priority,
  requires_address = EXCLUDED.requires_address;

-- ==========================================
-- HEALTHIE FORMS REFERENCE
-- ==========================================
-- Maps local form types to Healthie form IDs

CREATE TABLE IF NOT EXISTS healthie_forms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  healthie_form_id TEXT, -- Set after creating in Healthie dashboard
  is_intake BOOLEAN DEFAULT FALSE,
  is_required BOOLEAN DEFAULT FALSE,
  display_order INTEGER DEFAULT 99,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default forms (healthie_form_id to be updated after Healthie setup)
INSERT INTO healthie_forms (code, name, description, is_intake, is_required, display_order) VALUES
  ('medical_history', 'Medical History Questionnaire', 'Comprehensive health history for new patients', TRUE, TRUE, 1),
  ('trt_intake', 'TRT Intake Form', 'Testosterone therapy candidacy assessment', TRUE, TRUE, 2),
  ('weight_loss_intake', 'Weight Loss Intake', 'GLP-1 therapy candidacy and goals', TRUE, TRUE, 3),
  ('peptide_intake', 'Peptide Therapy Intake', 'Performance peptide candidacy assessment', TRUE, FALSE, 4),
  ('lab_consent', 'Lab Work Authorization', 'LabCorp blood draw consent and authorization', FALSE, TRUE, 5),
  ('telehealth_consent', 'Telehealth Consent', 'Texas telemedicine informed consent', FALSE, TRUE, 6),
  ('controlled_substance_agreement', 'Controlled Substance Agreement', 'Schedule III medication agreement (TRT)', FALSE, TRUE, 7)
ON CONFLICT (code) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  is_intake = EXCLUDED.is_intake,
  is_required = EXCLUDED.is_required,
  display_order = EXCLUDED.display_order;

-- ==========================================
-- APPOINTMENT TYPES REFERENCE
-- ==========================================
-- Maps local appointment types to Healthie

CREATE TABLE IF NOT EXISTS appointment_types (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  duration_minutes INTEGER DEFAULT 30,
  price_cents INTEGER DEFAULT 0,
  contact_type TEXT DEFAULT 'video' CHECK (contact_type IN ('video', 'phone', 'in_person')),
  healthie_appointment_type_id TEXT, -- Set after creating in Healthie
  is_active BOOLEAN DEFAULT TRUE,
  display_order INTEGER DEFAULT 99,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default appointment types
INSERT INTO appointment_types (code, name, description, duration_minutes, contact_type, display_order) VALUES
  ('initial_consultation', 'Initial Consultation', 'First-time patient video consultation with Texas-licensed physician', 30, 'video', 1),
  ('follow_up', 'Follow-up Visit', 'Established patient check-in and treatment adjustment', 15, 'video', 2),
  ('lab_review', 'Lab Results Review', 'Review lab results and discuss findings with provider', 15, 'video', 3),
  ('urgent_checkin', 'Urgent Check-in', 'Same-day urgent consultation for treatment concerns', 10, 'video', 4),
  ('med_adjustment', 'Medication Adjustment', 'Dosage adjustment or protocol change discussion', 15, 'video', 5)
ON CONFLICT (code) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  duration_minutes = EXCLUDED.duration_minutes,
  contact_type = EXCLUDED.contact_type,
  display_order = EXCLUDED.display_order;

-- ==========================================
-- ROW LEVEL SECURITY
-- ==========================================

-- Email queue - service role only
ALTER TABLE email_queue ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Service role only" ON email_queue FOR ALL USING (auth.role() = 'service_role');

-- Webhook events - service role only
ALTER TABLE webhook_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Service role only" ON webhook_events FOR ALL USING (auth.role() = 'service_role');

-- Lab appointment types - public read
ALTER TABLE lab_appointment_types ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read" ON lab_appointment_types FOR SELECT USING (TRUE);

-- Healthie forms - public read
ALTER TABLE healthie_forms ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read" ON healthie_forms FOR SELECT USING (TRUE);

-- Appointment types - public read
ALTER TABLE appointment_types ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read" ON appointment_types FOR SELECT USING (TRUE);

-- ==========================================
-- FUNCTIONS
-- ==========================================

-- Function to get available lab appointment types (in-home first)
CREATE OR REPLACE FUNCTION get_lab_appointment_types()
RETURNS TABLE (
  code TEXT,
  name TEXT,
  description TEXT,
  price_cents INTEGER,
  requires_address BOOLEAN
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    lat.code,
    lat.name,
    lat.description,
    lat.price_cents,
    lat.requires_address
  FROM lab_appointment_types lat
  WHERE lat.is_active = TRUE
  ORDER BY lat.priority ASC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to process email queue (called by cron)
CREATE OR REPLACE FUNCTION get_pending_emails(batch_size INTEGER DEFAULT 50)
RETURNS TABLE (
  id UUID,
  template_id TEXT,
  recipient_email TEXT,
  variables JSONB,
  scheduled_for TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    eq.id,
    eq.template_id,
    eq.recipient_email,
    eq.variables,
    eq.scheduled_for
  FROM email_queue eq
  WHERE eq.status = 'pending'
    AND eq.scheduled_for <= NOW()
  ORDER BY eq.scheduled_for ASC
  LIMIT batch_size;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permissions
GRANT EXECUTE ON FUNCTION get_lab_appointment_types() TO anon, authenticated;
GRANT EXECUTE ON FUNCTION get_pending_emails(INTEGER) TO service_role;
