-- Drop the view approach and use a simpler, more reliable policy
DROP VIEW IF EXISTS public.property_owner_contacts;

-- Remove the problematic policy from migration 0003
DROP POLICY IF EXISTS "Anyone can view property owner profiles" ON public.profiles;

-- Create a simple policy that allows viewing basic contact info for property owners
CREATE POLICY "View property owner contact info" ON public.profiles
  FOR SELECT 
  USING (
    -- Allow if this profile belongs to a property owner
    id IN (
      SELECT DISTINCT user_id 
      FROM public.properties
    )
  );