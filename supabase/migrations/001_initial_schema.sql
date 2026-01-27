-- Supabase Migration: Create tables for Elevare Health
-- Run this in Supabase SQL Editor or via CLI

-- =============================================
-- PATIENTS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS patients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  first_name TEXT,
  last_name TEXT,
  phone TEXT,
  dob DATE,
  gender TEXT,
  
  -- Healthie integration
  healthie_patient_id TEXT UNIQUE,
  
  -- Lead tracking
  source TEXT, -- 'hormone_assessment', 'treatment_match', 'calculator', etc.
  lead_score INTEGER DEFAULT 0,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for fast email lookups
CREATE INDEX IF NOT EXISTS idx_patients_email ON patients(email);
CREATE INDEX IF NOT EXISTS idx_patients_healthie_id ON patients(healthie_patient_id);

-- =============================================
-- TOOL RESULTS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS tool_results (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
  
  tool_type TEXT NOT NULL, -- 'hormone_assessment', 'treatment_match', 'lab_interpreter', 'tdee', 'bmi', etc.
  results JSONB NOT NULL,
  
  -- Healthie sync status
  synced_to_healthie BOOLEAN DEFAULT FALSE,
  healthie_note_id TEXT,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for fast lookups
CREATE INDEX IF NOT EXISTS idx_tool_results_patient ON tool_results(patient_id);
CREATE INDEX IF NOT EXISTS idx_tool_results_type ON tool_results(tool_type);

-- =============================================
-- LAB ORDERS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS lab_orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
  
  -- Healthie reference
  healthie_order_id TEXT,
  
  -- Labcorp reference
  labcorp_order_id TEXT UNIQUE,
  labcorp_appointment_id TEXT,
  
  -- Order details
  test_panel TEXT NOT NULL, -- 'male_hormone_panel', 'comprehensive_metabolic', etc.
  status TEXT DEFAULT 'pending', -- 'pending', 'scheduled', 'collected', 'processing', 'complete', 'cancelled'
  
  -- Scheduling
  scheduled_date TIMESTAMP WITH TIME ZONE,
  address_line1 TEXT,
  address_line2 TEXT,
  city TEXT,
  state TEXT,
  zip TEXT,
  special_instructions TEXT,
  
  -- Results
  results JSONB,
  results_received_at TIMESTAMP WITH TIME ZONE,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_lab_orders_patient ON lab_orders(patient_id);
CREATE INDEX IF NOT EXISTS idx_lab_orders_status ON lab_orders(status);

-- =============================================
-- SUBSCRIPTIONS TABLE (for Stripe)
-- =============================================
CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
  
  -- Stripe reference
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT UNIQUE,
  
  -- Subscription details
  treatment_type TEXT NOT NULL, -- 'trt', 'glp1', 'peptides', etc.
  plan_duration TEXT NOT NULL, -- 'monthly', 'quarterly', 'biannual'
  amount DECIMAL(10,2) NOT NULL,
  
  -- Status
  status TEXT DEFAULT 'active', -- 'active', 'paused', 'cancelled', 'past_due'
  current_period_start TIMESTAMP WITH TIME ZONE,
  current_period_end TIMESTAMP WITH TIME ZONE,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_subscriptions_patient ON subscriptions(patient_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_stripe ON subscriptions(stripe_subscription_id);

-- =============================================
-- DOCUMENTS TABLE (for DocuSign)
-- =============================================
CREATE TABLE IF NOT EXISTS documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
  
  -- Document details
  document_type TEXT NOT NULL, -- 'telehealth_consent', 'hipaa_authorization', 'treatment_agreement'
  document_url TEXT NOT NULL,
  
  -- DocuSign reference
  docusign_envelope_id TEXT,
  
  -- Status
  status TEXT DEFAULT 'pending', -- 'pending', 'sent', 'signed', 'declined', 'expired'
  signed_at TIMESTAMP WITH TIME ZONE,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_documents_patient ON documents(patient_id);

-- =============================================
-- EMAIL LOGS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS email_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
  
  -- Email details
  email_type TEXT NOT NULL, -- 'welcome', 'results', 'reminder', 'nurture_1', etc.
  subject TEXT NOT NULL,
  template_id TEXT,
  
  -- Tracking
  sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  opened_at TIMESTAMP WITH TIME ZONE,
  clicked_at TIMESTAMP WITH TIME ZONE,
  
  -- Status
  status TEXT DEFAULT 'sent' -- 'sent', 'delivered', 'opened', 'clicked', 'bounced', 'failed'
);

CREATE INDEX IF NOT EXISTS idx_email_logs_patient ON email_logs(patient_id);

-- =============================================
-- SECRETS TABLE (for storing API keys server-side)
-- =============================================
-- Note: Use Supabase Vault for production secrets
-- This table is for reference/backup only

CREATE TABLE IF NOT EXISTS app_secrets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key_name TEXT UNIQUE NOT NULL,
  key_value TEXT NOT NULL, -- Should be encrypted in production
  description TEXT,
  environment TEXT DEFAULT 'development', -- 'development', 'staging', 'production'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert placeholder secrets (replace with real values)
-- IMPORTANT: In production, use Supabase Vault instead!
INSERT INTO app_secrets (key_name, key_value, description, environment) VALUES
  ('HEALTHIE_API_KEY', 'your-healthie-api-key-here', 'Healthie API key for patient sync', 'development'),
  ('HEALTHIE_API_URL', 'https://staging-api.gethealthie.com/graphql', 'Healthie API endpoint (staging)', 'development'),
  ('HEALTHIE_WEBHOOK_SECRET', 'your-webhook-secret-here', 'Secret for verifying Healthie webhooks', 'development'),
  ('LABCORP_API_KEY', 'your-labcorp-api-key-here', 'Labcorp API key for lab orders', 'development'),
  ('STRIPE_SECRET_KEY', 'sk_test_your-stripe-key', 'Stripe secret key', 'development'),
  ('DOCUSIGN_INTEGRATION_KEY', 'your-docusign-key', 'DocuSign integration key', 'development'),
  ('ANTHROPIC_API_KEY', 'your-claude-api-key', 'Claude API key for AI tools', 'development')
ON CONFLICT (key_name) DO NOTHING;

-- =============================================
-- ROW LEVEL SECURITY
-- =============================================

-- Enable RLS on all tables
ALTER TABLE patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE tool_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE lab_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE app_secrets ENABLE ROW LEVEL SECURITY;

-- Policies for service role (Edge Functions can access everything)
CREATE POLICY "Service role can do anything on patients" ON patients
  FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

CREATE POLICY "Service role can do anything on tool_results" ON tool_results
  FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

CREATE POLICY "Service role can do anything on lab_orders" ON lab_orders
  FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

CREATE POLICY "Service role can do anything on subscriptions" ON subscriptions
  FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

CREATE POLICY "Service role can do anything on documents" ON documents
  FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

CREATE POLICY "Service role can do anything on email_logs" ON email_logs
  FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

-- Secrets should ONLY be accessible by service role
CREATE POLICY "Only service role can access secrets" ON app_secrets
  FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

-- =============================================
-- FUNCTIONS
-- =============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Add triggers for updated_at
CREATE TRIGGER update_patients_updated_at
  BEFORE UPDATE ON patients
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_lab_orders_updated_at
  BEFORE UPDATE ON lab_orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_subscriptions_updated_at
  BEFORE UPDATE ON subscriptions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to calculate lead score based on tool interactions
CREATE OR REPLACE FUNCTION calculate_lead_score(patient_uuid UUID)
RETURNS INTEGER AS $$
DECLARE
  score INTEGER := 0;
  tool_count INTEGER;
  has_hormone_assessment BOOLEAN;
  has_treatment_match BOOLEAN;
BEGIN
  -- Base score for each tool submission
  SELECT COUNT(*) INTO tool_count FROM tool_results WHERE patient_id = patient_uuid;
  score := score + (tool_count * 10);
  
  -- Bonus for hormone assessment (high intent)
  SELECT EXISTS(SELECT 1 FROM tool_results WHERE patient_id = patient_uuid AND tool_type = 'hormone_assessment') INTO has_hormone_assessment;
  IF has_hormone_assessment THEN
    score := score + 25;
  END IF;
  
  -- Bonus for treatment match (very high intent)
  SELECT EXISTS(SELECT 1 FROM tool_results WHERE patient_id = patient_uuid AND tool_type = 'treatment_match') INTO has_treatment_match;
  IF has_treatment_match THEN
    score := score + 30;
  END IF;
  
  -- Update patient's lead score
  UPDATE patients SET lead_score = score WHERE id = patient_uuid;
  
  RETURN score;
END;
$$ LANGUAGE plpgsql;

-- Trigger to recalculate lead score on new tool result
CREATE OR REPLACE FUNCTION trigger_calculate_lead_score()
RETURNS TRIGGER AS $$
BEGIN
  PERFORM calculate_lead_score(NEW.patient_id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER after_tool_result_insert
  AFTER INSERT ON tool_results
  FOR EACH ROW EXECUTE FUNCTION trigger_calculate_lead_score();
