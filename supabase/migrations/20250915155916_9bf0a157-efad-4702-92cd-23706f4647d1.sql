-- Create admin user profiles table
CREATE TABLE IF NOT EXISTS public.admin_profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'admin',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on admin_profiles
ALTER TABLE public.admin_profiles ENABLE ROW LEVEL SECURITY;

-- Admin profiles policies
CREATE POLICY "Admin can view their own profile" 
ON public.admin_profiles 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Admin can insert their own profile" 
ON public.admin_profiles 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admin can update their own profile" 
ON public.admin_profiles 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Create trigger for admin_profiles updated_at
CREATE TRIGGER update_admin_profiles_updated_at
BEFORE UPDATE ON public.admin_profiles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Function to create admin profile on user signup
CREATE OR REPLACE FUNCTION public.handle_admin_signup()
RETURNS TRIGGER 
LANGUAGE plpgsql 
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  -- Only create admin profile for the specific email
  IF NEW.email = 'yahyahoussini366@gmail.com' THEN
    INSERT INTO public.admin_profiles (user_id, email, role)
    VALUES (NEW.id, NEW.email, 'admin');
  END IF;
  RETURN NEW;
END;
$$;

-- Trigger to create admin profile on auth user creation
CREATE TRIGGER on_admin_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_admin_signup();