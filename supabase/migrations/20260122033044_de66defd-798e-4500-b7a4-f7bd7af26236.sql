-- Create intake forms table to store patient intake data
CREATE TABLE public.intake_forms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  
  -- Health Goals
  primary_goal TEXT NOT NULL,
  secondary_goals TEXT[],
  target_timeline TEXT,
  
  -- Medical History
  current_medications TEXT,
  allergies TEXT,
  medical_conditions TEXT[],
  previous_treatments TEXT,
  current_weight DECIMAL,
  target_weight DECIMAL,
  height_inches INTEGER,
  
  -- Lifestyle
  exercise_frequency TEXT,
  diet_description TEXT,
  sleep_hours INTEGER,
  stress_level TEXT,
  
  -- Treatment Preferences
  preferred_treatment TEXT,
  
  -- Status
  status TEXT NOT NULL DEFAULT 'submitted',
  submitted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.intake_forms ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view own intake forms"
  ON public.intake_forms FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own intake forms"
  ON public.intake_forms FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own intake forms"
  ON public.intake_forms FOR UPDATE
  USING (auth.uid() = user_id);

-- Trigger for updated_at
CREATE TRIGGER update_intake_forms_updated_at
  BEFORE UPDATE ON public.intake_forms
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();