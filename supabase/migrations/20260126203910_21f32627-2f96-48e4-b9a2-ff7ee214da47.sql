-- Add session_id column to chat_leads for visitor recognition
ALTER TABLE public.chat_leads 
ADD COLUMN session_id TEXT;

-- Create index for faster session lookups
CREATE INDEX idx_chat_leads_session_id ON public.chat_leads(session_id);

-- Allow anonymous users to read their own leads by session_id
CREATE POLICY "Allow session-based lead lookup"
ON public.chat_leads
FOR SELECT
TO anon, authenticated
USING (true);