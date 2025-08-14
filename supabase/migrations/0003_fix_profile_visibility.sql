-- Allow anyone to view basic profile information for property owners
-- This is needed so property listings can show owner contact details

CREATE POLICY "Anyone can view property owner profiles" ON public.profiles
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.properties 
      WHERE properties.user_id = profiles.id
    )
  );