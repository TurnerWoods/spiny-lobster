-- Create chat_leads table to capture leads from treatment quiz
CREATE TABLE public.chat_leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT,
  phone TEXT,
  primary_concern TEXT,
  symptoms TEXT[],
  age_range TEXT,
  duration TEXT,
  recommended_treatment TEXT,
  recommended_price TEXT,
  conversation_summary TEXT,
  source TEXT DEFAULT 'chat_widget',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  converted BOOLEAN DEFAULT false,
  converted_at TIMESTAMP WITH TIME ZONE,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL
);

-- Enable RLS
ALTER TABLE public.chat_leads ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (leads from non-logged-in users)
CREATE POLICY "Allow anonymous lead creation"
ON public.chat_leads
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Allow authenticated users to view their own leads
CREATE POLICY "Users can view own leads"
ON public.chat_leads
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Allow service role full access (for edge functions)
CREATE POLICY "Service role full access"
ON public.chat_leads
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- Create index for faster queries
CREATE INDEX idx_chat_leads_email ON public.chat_leads(email);
CREATE INDEX idx_chat_leads_created_at ON public.chat_leads(created_at DESC);
CREATE INDEX idx_chat_leads_converted ON public.chat_leads(converted);