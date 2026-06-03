-- ============================================================
-- Sync auth.users to public.profiles
-- Run this to generate profiles for users who were already registered
-- before the public schema was wiped.
-- ============================================================

INSERT INTO public.profiles (id, full_name, role)
SELECT 
  id, 
  COALESCE(raw_user_meta_data->>'full_name', email, 'Pengguna Lama'), 
  COALESCE(raw_user_meta_data->>'role', 'superadmin') -- Defaulting existing users to superadmin
FROM auth.users
WHERE id NOT IN (SELECT id FROM public.profiles);
