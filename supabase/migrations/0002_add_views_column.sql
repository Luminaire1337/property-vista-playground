-- Add views column to properties table
ALTER TABLE public.properties 
ADD COLUMN views INTEGER NOT NULL DEFAULT 0 CHECK (views >= 0);

-- Create index for views column for potential sorting by popularity
CREATE INDEX IF NOT EXISTS idx_properties_views ON public.properties(views);

-- Create function to increment property views
CREATE OR REPLACE FUNCTION public.increment_property_views(property_id UUID)
RETURNS INTEGER AS $$
DECLARE
  new_views INTEGER;
BEGIN
  UPDATE public.properties 
  SET views = views + 1 
  WHERE id = property_id;
  
  SELECT views INTO new_views 
  FROM public.properties 
  WHERE id = property_id;
  
  RETURN COALESCE(new_views, 0);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = '';

-- Grant execute permission on the function
GRANT EXECUTE ON FUNCTION public.increment_property_views(UUID) TO authenticated, anon;