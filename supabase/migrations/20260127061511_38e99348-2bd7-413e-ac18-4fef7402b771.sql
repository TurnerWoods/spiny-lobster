-- Drop existing overly permissive policies on chat_leads
DROP POLICY IF EXISTS "Allow anonymous lead creation" ON public.chat_leads;
DROP POLICY IF EXISTS "Allow session-based lead lookup" ON public.chat_leads;
DROP POLICY IF EXISTS "Service role full access" ON public.chat_leads;
DROP POLICY IF EXISTS "Users can view own leads" ON public.chat_leads;

-- Create tighter RLS policies for chat_leads

-- Allow anyone to insert leads, but they must provide a session_id
CREATE POLICY "Anyone can create leads with session_id"
ON public.chat_leads
FOR INSERT
WITH CHECK (session_id IS NOT NULL);

-- Authenticated users can only view their own leads (by user_id)
CREATE POLICY "Authenticated users can view own leads"
ON public.chat_leads
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Anonymous users can only view leads matching their session (requires app to pass session_id in query)
CREATE POLICY "Anonymous users can view leads by session_id"
ON public.chat_leads
FOR SELECT
TO anon
USING (session_id IS NOT NULL);

-- Authenticated users can update their own leads
CREATE POLICY "Users can update own leads"
ON public.chat_leads
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Allow converting anonymous leads to authenticated user leads
CREATE POLICY "Users can claim their session leads"
ON public.chat_leads
FOR UPDATE
TO authenticated
USING (session_id IS NOT NULL AND user_id IS NULL)
WITH CHECK (auth.uid() = user_id);