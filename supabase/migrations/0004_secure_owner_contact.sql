-- First, remove the overly permissive policy
DROP POLICY IF EXISTS "Anyone can view property owner profiles" ON public.profiles;

-- Create a secure view that only exposes necessary contact information for property owners
CREATE VIEW public.property_owner_contacts AS
SELECT DISTINCT
  p.id,
  p.full_name,
  p.phone,
  p.email,
  p.avatar_url
FROM public.profiles p
INNER JOIN public.properties pr ON pr.user_id = p.id;

-- Grant access to the view
GRANT SELECT ON public.property_owner_contacts TO anon, authenticated;

-- Create RLS policy for the view (though views don't inherit RLS, this is for clarity)
ALTER VIEW public.property_owner_contacts SET (security_invoker = true);