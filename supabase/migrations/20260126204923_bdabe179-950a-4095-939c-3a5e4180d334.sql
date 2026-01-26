-- Create symptom checker results table
CREATE TABLE public.symptom_checker_results (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  session_id TEXT,
  total_score INTEGER NOT NULL,
  max_score INTEGER NOT NULL DEFAULT 27,
  result_level TEXT NOT NULL,
  answers JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.symptom_checker_results ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view own results"
ON public.symptom_checker_results
FOR SELECT
USING (auth.uid() = user_id OR session_id IS NOT NULL);

CREATE POLICY "Anyone can insert results"
ON public.symptom_checker_results
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Users can update own results"
ON public.symptom_checker_results
FOR UPDATE
USING (auth.uid() = user_id);

-- Index for faster lookups
CREATE INDEX idx_symptom_checker_user_id ON public.symptom_checker_results(user_id);
CREATE INDEX idx_symptom_checker_session_id ON public.symptom_checker_results(session_id);