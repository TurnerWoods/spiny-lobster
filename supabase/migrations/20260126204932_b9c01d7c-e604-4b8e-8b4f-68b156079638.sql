-- Drop the overly permissive insert policy
DROP POLICY "Anyone can insert results" ON public.symptom_checker_results;

-- Create a more secure insert policy - allow authenticated users or anonymous with session_id
CREATE POLICY "Users can insert own results"
ON public.symptom_checker_results
FOR INSERT
WITH CHECK (
  (auth.uid() IS NOT NULL AND auth.uid() = user_id) OR 
  (auth.uid() IS NULL AND session_id IS NOT NULL AND user_id IS NULL)
);