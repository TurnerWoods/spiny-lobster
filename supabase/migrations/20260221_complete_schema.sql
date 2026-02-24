-- =============================================
-- ELEVARE HEALTH - COMPLETE DATABASE SCHEMA
-- Includes: Lovable core tables + Healthie EMR + Lead scoring
-- =============================================

-- =============================================
-- ENUMS
-- =============================================
CREATE TYPE app_role AS ENUM ('patient', 'provider', 'admin');
CREATE TYPE treatment_status AS ENUM ('pending', 'under_review', 'approved', 'active', 'completed', 'cancelled');

-- =============================================
-- PROFILES TABLE (from Lovable auth)
-- =============================================
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name TEXT,
  last_name TEXT,
  phone TEXT,
  date_of_birth DATE,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Auto-create profile + assign patient role on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id) VALUES (NEW.id);
  INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'patient');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- =============================================
-- USER ROLES TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role DEFAULT 'patient',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, role)
);

CREATE OR REPLACE FUNCTION public.has_role(_role app_role, _user_id UUID)
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM user_roles WHERE user_id = _user_id AND role = _role
  );
$$ LANGUAGE sql STABLE SECURITY DEFINER;

-- =============================================
-- MESSAGES TABLE (patient-provider messaging)
-- =============================================
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  sender_role app_role NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- INTAKE FORMS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS intake_forms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  primary_goal TEXT NOT NULL,
  secondary_goals TEXT[],
  target_timeline TEXT,
  current_medications TEXT,
  allergies TEXT,
  medical_conditions TEXT[],
  previous_treatments TEXT,
  current_weight DECIMAL,
  target_weight DECIMAL,
  height_inches INTEGER,
  exercise_frequency TEXT,
  diet_description TEXT,
  sleep_hours INTEGER,
  stress_level TEXT,
  preferred_treatment TEXT,
  status TEXT DEFAULT 'submitted',
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- TREATMENTS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS treatments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  treatment_type TEXT NOT NULL,
  medication TEXT,
  dosage TEXT,
  status treatment_status DEFAULT 'pending',
  start_date DATE,
  next_refill_date DATE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- SYMPTOM CHECKER RESULTS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS symptom_checker_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  session_id TEXT,
  answers JSONB NOT NULL,
  total_score INTEGER NOT NULL DEFAULT 0,
  max_score INTEGER NOT NULL DEFAULT 0,
  result_level TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- CHAT LEADS TABLE (AI chat widget captures)
-- =============================================
CREATE TABLE IF NOT EXISTS chat_leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  session_id TEXT,
  email TEXT,
  phone TEXT,
  primary_concern TEXT,
  symptoms TEXT[],
  age_range TEXT,
  recommended_treatment TEXT,
  recommended_price TEXT,
  conversation_summary TEXT,
  duration TEXT,
  source TEXT,
  converted BOOLEAN DEFAULT FALSE,
  converted_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- PATIENTS TABLE (Healthie EMR sync)
-- =============================================
CREATE TABLE IF NOT EXISTS patients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  first_name TEXT,
  last_name TEXT,
  phone TEXT,
  dob DATE,
  gender TEXT,
  healthie_patient_id TEXT UNIQUE,
  source TEXT,
  lead_score INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_patients_email ON patients(email);
CREATE INDEX IF NOT EXISTS idx_patients_healthie_id ON patients(healthie_patient_id);

-- =============================================
-- TOOL RESULTS TABLE (AI tool submissions)
-- =============================================
CREATE TABLE IF NOT EXISTS tool_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
  tool_type TEXT NOT NULL,
  results JSONB NOT NULL,
  synced_to_healthie BOOLEAN DEFAULT FALSE,
  healthie_note_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_tool_results_patient ON tool_results(patient_id);
CREATE INDEX IF NOT EXISTS idx_tool_results_type ON tool_results(tool_type);

-- =============================================
-- LAB ORDERS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS lab_orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
  healthie_order_id TEXT,
  labcorp_order_id TEXT UNIQUE,
  labcorp_appointment_id TEXT,
  test_panel TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  scheduled_date TIMESTAMP WITH TIME ZONE,
  address_line1 TEXT,
  address_line2 TEXT,
  city TEXT,
  state TEXT,
  zip TEXT,
  special_instructions TEXT,
  results JSONB,
  results_received_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_lab_orders_patient ON lab_orders(patient_id);
CREATE INDEX IF NOT EXISTS idx_lab_orders_status ON lab_orders(status);

-- =============================================
-- SUBSCRIPTIONS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT UNIQUE,
  treatment_type TEXT NOT NULL,
  plan_duration TEXT NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  status TEXT DEFAULT 'active',
  current_period_start TIMESTAMP WITH TIME ZONE,
  current_period_end TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_subscriptions_patient ON subscriptions(patient_id);

-- =============================================
-- DOCUMENTS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
  document_type TEXT NOT NULL,
  document_url TEXT NOT NULL,
  docusign_envelope_id TEXT,
  status TEXT DEFAULT 'pending',
  signed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- EMAIL LOGS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS email_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
  email_type TEXT NOT NULL,
  subject TEXT NOT NULL,
  template_id TEXT,
  sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  opened_at TIMESTAMP WITH TIME ZONE,
  clicked_at TIMESTAMP WITH TIME ZONE,
  status TEXT DEFAULT 'sent'
);

CREATE INDEX IF NOT EXISTS idx_email_logs_patient ON email_logs(patient_id);

-- =============================================
-- ROW LEVEL SECURITY
-- =============================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE intake_forms ENABLE ROW LEVEL SECURITY;
ALTER TABLE treatments ENABLE ROW LEVEL SECURITY;
ALTER TABLE symptom_checker_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE tool_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE lab_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_logs ENABLE ROW LEVEL SECURITY;

-- Profiles: users can read/update own
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = user_id);

-- User roles: users can read own
CREATE POLICY "Users can view own roles" ON user_roles FOR SELECT USING (auth.uid() = user_id);

-- Messages: users can read/write own
CREATE POLICY "Users can view own messages" ON messages FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can send messages" ON messages FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Intake forms: users can read/write own
CREATE POLICY "Users can view own intake" ON intake_forms FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create intake" ON intake_forms FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own intake" ON intake_forms FOR UPDATE USING (auth.uid() = user_id);

-- Treatments: users can read own
CREATE POLICY "Users can view own treatments" ON treatments FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create treatments" ON treatments FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Symptom checker: anyone can insert (anonymous), users can view own
CREATE POLICY "Anyone can create symptom results" ON symptom_checker_results FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can view own symptom results" ON symptom_checker_results FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own symptom results" ON symptom_checker_results FOR UPDATE USING (auth.uid() = user_id OR user_id IS NULL);

-- Chat leads: service role only (edge functions)
CREATE POLICY "Service role manages chat_leads" ON chat_leads FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

-- Healthie tables: service role only (edge functions handle these)
CREATE POLICY "Service role manages patients" ON patients FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');
CREATE POLICY "Service role manages tool_results" ON tool_results FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');
CREATE POLICY "Service role manages lab_orders" ON lab_orders FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');
CREATE POLICY "Service role manages subscriptions" ON subscriptions FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');
CREATE POLICY "Service role manages documents" ON documents FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');
CREATE POLICY "Service role manages email_logs" ON email_logs FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

-- Admin/provider policies
CREATE POLICY "Admins can view all profiles" ON profiles FOR SELECT USING (has_role('admin', auth.uid()) OR has_role('provider', auth.uid()));
CREATE POLICY "Providers can view all intake forms" ON intake_forms FOR SELECT USING (has_role('provider', auth.uid()) OR has_role('admin', auth.uid()));
CREATE POLICY "Providers can manage treatments" ON treatments FOR ALL USING (has_role('provider', auth.uid()) OR has_role('admin', auth.uid()));
CREATE POLICY "Providers can view messages" ON messages FOR SELECT USING (has_role('provider', auth.uid()) OR has_role('admin', auth.uid()));
CREATE POLICY "Providers can send messages" ON messages FOR INSERT WITH CHECK (has_role('provider', auth.uid()) OR has_role('admin', auth.uid()));

-- =============================================
-- FUNCTIONS & TRIGGERS
-- =============================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_intake_forms_updated_at BEFORE UPDATE ON intake_forms FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_treatments_updated_at BEFORE UPDATE ON treatments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_patients_updated_at BEFORE UPDATE ON patients FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_lab_orders_updated_at BEFORE UPDATE ON lab_orders FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_subscriptions_updated_at BEFORE UPDATE ON subscriptions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Lead scoring function
CREATE OR REPLACE FUNCTION calculate_lead_score(patient_uuid UUID)
RETURNS INTEGER AS $$
DECLARE
  score INTEGER := 0;
  tool_count INTEGER;
  has_hormone_assessment BOOLEAN;
  has_treatment_match BOOLEAN;
BEGIN
  SELECT COUNT(*) INTO tool_count FROM tool_results WHERE patient_id = patient_uuid;
  score := score + (tool_count * 10);
  
  SELECT EXISTS(SELECT 1 FROM tool_results WHERE patient_id = patient_uuid AND tool_type = 'hormone_assessment') INTO has_hormone_assessment;
  IF has_hormone_assessment THEN score := score + 25; END IF;
  
  SELECT EXISTS(SELECT 1 FROM tool_results WHERE patient_id = patient_uuid AND tool_type = 'treatment_match') INTO has_treatment_match;
  IF has_treatment_match THEN score := score + 30; END IF;
  
  UPDATE patients SET lead_score = score WHERE id = patient_uuid;
  RETURN score;
END;
$$ LANGUAGE plpgsql;

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

-- =============================================
-- REALTIME
-- =============================================
ALTER PUBLICATION supabase_realtime ADD TABLE messages;

-- =============================================
-- STORAGE BUCKET (media library)
-- =============================================
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'media-library',
  'media-library',
  true,
  52428800,
  ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml', 'video/mp4', 'video/webm', 'application/pdf']
)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Authenticated users can upload media" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'media-library' AND auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can update media" ON storage.objects
  FOR UPDATE USING (bucket_id = 'media-library' AND auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can delete media" ON storage.objects
  FOR DELETE USING (bucket_id = 'media-library' AND auth.role() = 'authenticated');
CREATE POLICY "Public can view media" ON storage.objects
  FOR SELECT USING (bucket_id = 'media-library');

-- =============================================
-- INDEXES for chat_leads
-- =============================================
CREATE INDEX IF NOT EXISTS idx_chat_leads_email ON chat_leads(email);
CREATE INDEX IF NOT EXISTS idx_chat_leads_created ON chat_leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_chat_leads_converted ON chat_leads(converted);
CREATE INDEX IF NOT EXISTS idx_chat_leads_session ON chat_leads(session_id);

-- Indexes for symptom_checker_results
CREATE INDEX IF NOT EXISTS idx_symptom_results_user ON symptom_checker_results(user_id);
CREATE INDEX IF NOT EXISTS idx_symptom_results_session ON symptom_checker_results(session_id);
