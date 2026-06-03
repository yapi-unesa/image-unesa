-- ============================================================
-- IMAGE UNESA — Database Migrations
-- Run these in Supabase SQL Editor in order
-- ============================================================

-- ── Enable UUID extension ───────────────────────────────────
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- TABLE: profiles
-- Extends Supabase auth.users with organizational data
-- ============================================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'staf' CHECK (role IN (
    'superadmin', 'ketum', 'bph', 'kominfo', 'dpo', 'ekraf', 'dpb', 'dmb', 'sosker'
  )),
  hierarchy TEXT CHECK (hierarchy IN ('pimpinan', 'kadep', 'wakadep', 'staf')),
  full_name TEXT NOT NULL,
  avatar_url TEXT,
  phone TEXT,
  angkatan INTEGER,
  prodi TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Auto-create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    COALESCE(NEW.raw_user_meta_data->>'role', 'staf')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ── RLS: profiles ───────────────────────────────────────────
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Users can read all profiles (for team page display)
CREATE POLICY "profiles_public_read" ON public.profiles
  FOR SELECT USING (true);

-- Users can only update their own profile
CREATE POLICY "profiles_self_update" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Only superadmin can insert/manage all profiles
CREATE POLICY "profiles_superadmin_all" ON public.profiles
  FOR ALL USING (
    auth.uid() IN (SELECT id FROM public.profiles WHERE role = 'superadmin')
  );

-- ============================================================
-- TABLE: site_config
-- Singleton row for Superadmin CMS
-- ============================================================
CREATE TABLE IF NOT EXISTS public.site_config (
  id INTEGER PRIMARY KEY DEFAULT 1,
  hero_title TEXT NOT NULL DEFAULT 'Kabinet Sinergi Asa',
  hero_subtitle TEXT DEFAULT 'Mari wujudkan kolaborasi progresif untuk pengembangan mahasiswa Gresik yang adaptif, inovatif, dan berdampak.',
  hero_badge TEXT DEFAULT 'Ikatan Mahasiswa Gresik · UNESA',
  whatsapp_contact TEXT DEFAULT '6281234567890',
  email_contact TEXT DEFAULT 'halo@imageunesa.org',
  is_oprec_open BOOLEAN NOT NULL DEFAULT false,
  oprec_deadline TIMESTAMPTZ,
  social_links JSONB NOT NULL DEFAULT '{"instagram": "", "tiktok": "", "youtube": ""}',
  sponsor_logos JSONB NOT NULL DEFAULT '[]',
  stats JSONB NOT NULL DEFAULT '{"members": 500, "programs": 15, "years": 20, "events": 50}',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_by UUID REFERENCES public.profiles(id),
  CONSTRAINT site_config_singleton CHECK (id = 1)
);

-- Insert default row
INSERT INTO public.site_config (id) VALUES (1) ON CONFLICT (id) DO NOTHING;

-- ── RLS: site_config ────────────────────────────────────────
ALTER TABLE public.site_config ENABLE ROW LEVEL SECURITY;

CREATE POLICY "site_config_public_read" ON public.site_config
  FOR SELECT USING (true);

CREATE POLICY "site_config_admin_update" ON public.site_config
  FOR UPDATE USING (
    auth.uid() IN (
      SELECT id FROM public.profiles WHERE role IN ('superadmin', 'kominfo')
    )
  );

-- ============================================================
-- TABLE: articles
-- Kominfo — Berita, Jurnal, Pengumuman
-- ============================================================
CREATE TABLE IF NOT EXISTS public.articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  content TEXT,
  excerpt TEXT,
  cover_url TEXT,
  category TEXT NOT NULL DEFAULT 'berita' CHECK (category IN ('berita', 'program', 'pengumuman', 'artikel')),
  is_published BOOLEAN NOT NULL DEFAULT false,
  published_at TIMESTAMPTZ,
  author_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS articles_slug_idx ON public.articles(slug);
CREATE INDEX IF NOT EXISTS articles_published_idx ON public.articles(is_published, published_at DESC);
CREATE INDEX IF NOT EXISTS articles_category_idx ON public.articles(category);

-- ── RLS: articles ────────────────────────────────────────────
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "articles_public_read" ON public.articles
  FOR SELECT USING (is_published = true);

CREATE POLICY "articles_kominfo_manage" ON public.articles
  FOR ALL USING (
    auth.uid() IN (
      SELECT id FROM public.profiles WHERE role IN ('kominfo', 'superadmin')
    )
  );

-- ============================================================
-- TABLE: transactions
-- BPH — Cash Flow Management
-- ============================================================
CREATE TABLE IF NOT EXISTS public.transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL CHECK (type IN ('income', 'expense')),
  amount NUMERIC(15, 2) NOT NULL CHECK (amount > 0),
  description TEXT NOT NULL,
  category TEXT,
  proof_url TEXT,
  approved_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS transactions_type_idx ON public.transactions(type);
CREATE INDEX IF NOT EXISTS transactions_created_at_idx ON public.transactions(created_at DESC);

-- ── RLS: transactions ────────────────────────────────────────
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "transactions_bph_full" ON public.transactions
  FOR ALL USING (
    auth.uid() IN (
      SELECT id FROM public.profiles WHERE role IN ('bph', 'superadmin')
    )
  );

CREATE POLICY "transactions_ketum_read" ON public.transactions
  FOR SELECT USING (
    auth.uid() IN (
      SELECT id FROM public.profiles WHERE role = 'ketum'
    )
  );

-- ============================================================
-- TABLE: merchandise
-- Ekraf — Product Catalog
-- ============================================================
CREATE TABLE IF NOT EXISTS public.merchandise (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC(12, 2) NOT NULL CHECK (price >= 0),
  stock INTEGER NOT NULL DEFAULT 0 CHECK (stock >= 0),
  image_url TEXT,
  wa_link TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS merchandise_active_idx ON public.merchandise(is_active);

-- ── RLS: merchandise ─────────────────────────────────────────
ALTER TABLE public.merchandise ENABLE ROW LEVEL SECURITY;

CREATE POLICY "merchandise_public_read" ON public.merchandise
  FOR SELECT USING (is_active = true);

CREATE POLICY "merchandise_ekraf_manage" ON public.merchandise
  FOR ALL USING (
    auth.uid() IN (
      SELECT id FROM public.profiles WHERE role IN ('ekraf', 'superadmin')
    )
  );

-- ============================================================
-- TABLE: members
-- DPO — Member Database
-- ============================================================
CREATE TABLE IF NOT EXISTS public.members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  nim TEXT UNIQUE,
  prodi TEXT,
  angkatan INTEGER,
  phone TEXT,
  email TEXT,
  status TEXT NOT NULL DEFAULT 'aktif' CHECK (status IN ('aktif', 'alumni', 'nonaktif')),
  photo_url TEXT,
  profile_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS members_status_idx ON public.members(status);
CREATE INDEX IF NOT EXISTS members_angkatan_idx ON public.members(angkatan);

-- ── RLS: members ─────────────────────────────────────────────
ALTER TABLE public.members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "members_dpo_manage" ON public.members
  FOR ALL USING (
    auth.uid() IN (
      SELECT id FROM public.profiles WHERE role IN ('dpo', 'superadmin')
    )
  );

CREATE POLICY "members_ketum_read" ON public.members
  FOR SELECT USING (
    auth.uid() IN (
      SELECT id FROM public.profiles WHERE role = 'ketum'
    )
  );

-- ============================================================
-- Helpful Views
-- ============================================================

-- Cash summary view for BPH dashboard
CREATE OR REPLACE VIEW public.cash_summary AS
SELECT
  COALESCE(SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END), 0) AS total_income,
  COALESCE(SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END), 0) AS total_expense,
  COALESCE(SUM(CASE WHEN type = 'income' THEN amount ELSE -amount END), 0) AS balance,
  COUNT(*) AS transaction_count
FROM public.transactions;

-- Member count by status view for DPO
CREATE OR REPLACE VIEW public.member_stats AS
SELECT
  COUNT(*) FILTER (WHERE status = 'aktif') AS aktif,
  COUNT(*) FILTER (WHERE status = 'alumni') AS alumni,
  COUNT(*) FILTER (WHERE status = 'nonaktif') AS nonaktif,
  COUNT(*) AS total
FROM public.members;
-- ============================================================
-- IMAGE UNESA — Database Migrations (Phase 2)
-- Run these in Supabase SQL Editor
-- ============================================================

-- ── 1. Fix Auth Trigger ─────────────────────────────────────
-- Ensure the profile creation doesn't fail if full_name is missing.
-- We use a fallback logic: raw_user_meta_data->>'full_name' OR email OR 'Pengguna Baru'
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, role)
  VALUES (
    NEW.id,
    COALESCE(
      NEW.raw_user_meta_data->>'full_name', 
      NEW.email, 
      'Pengguna Baru'
    ),
    COALESCE(NEW.raw_user_meta_data->>'role', 'staf')
  );
  RETURN NEW;
EXCEPTION WHEN OTHERS THEN
  -- If profile creation fails (e.g. constraints), fail gracefully
  -- so the user is still created in auth.users
  RAISE WARNING 'Failed to create profile for user %: %', NEW.id, SQLERRM;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Make sure the trigger is applied correctly
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();


-- ── 2. TABLE: dpb_aspirations ────────────────────────────────
-- DPB — Ticketing Aspirasi Mahasiswa
CREATE TABLE IF NOT EXISTS public.dpb_aspirations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  topic TEXT NOT NULL,
  submitter TEXT NOT NULL DEFAULT 'Anonim',
  date DATE NOT NULL,
  priority TEXT NOT NULL DEFAULT 'Sedang' CHECK (priority IN ('Rendah', 'Sedang', 'Tinggi')),
  status TEXT NOT NULL DEFAULT 'Ditinjau' CHECK (status IN ('Ditinjau', 'Diproses', 'Selesai')),
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- RLS: dpb_aspirations
ALTER TABLE public.dpb_aspirations ENABLE ROW LEVEL SECURITY;

-- DPB can manage all aspirations
CREATE POLICY "aspirations_dpb_manage" ON public.dpb_aspirations
  FOR ALL USING (
    auth.uid() IN (SELECT id FROM public.profiles WHERE role IN ('dpb', 'superadmin'))
  );

-- Ketum can read aspirations
CREATE POLICY "aspirations_ketum_read" ON public.dpb_aspirations
  FOR SELECT USING (
    auth.uid() IN (SELECT id FROM public.profiles WHERE role = 'ketum')
  );


-- ── 3. TABLE: sosker_programs ────────────────────────────────
-- Sosker — Program Sosial dan Amal
CREATE TABLE IF NOT EXISTS public.sosker_programs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'Direncanakan' CHECK (status IN ('Direncanakan', 'Berjalan', 'Selesai')),
  collected_funds NUMERIC(15, 2) NOT NULL DEFAULT 0,
  target_funds NUMERIC(15, 2) NOT NULL DEFAULT 0,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- RLS: sosker_programs
ALTER TABLE public.sosker_programs ENABLE ROW LEVEL SECURITY;

-- Sosker can manage programs
CREATE POLICY "programs_sosker_manage" ON public.sosker_programs
  FOR ALL USING (
    auth.uid() IN (SELECT id FROM public.profiles WHERE role IN ('sosker', 'superadmin'))
  );

-- Ketum can read programs
CREATE POLICY "programs_ketum_read" ON public.sosker_programs
  FOR SELECT USING (
    auth.uid() IN (SELECT id FROM public.profiles WHERE role = 'ketum')
  );

-- Public can read programs (e.g. for landing page showcase)
CREATE POLICY "programs_public_read" ON public.sosker_programs
  FOR SELECT USING (true);


-- ── 4. TABLE: dmb_meetings ───────────────────────────────────
-- DMB — Arsip Notulensi Rapat
CREATE TABLE IF NOT EXISTS public.dmb_meetings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agenda TEXT NOT NULL,
  date DATE NOT NULL,
  attendance INTEGER NOT NULL DEFAULT 0,
  decision TEXT NOT NULL DEFAULT 'Disetujui' CHECK (decision IN ('Disetujui', 'Ditunda', 'Ditolak')),
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- RLS: dmb_meetings
ALTER TABLE public.dmb_meetings ENABLE ROW LEVEL SECURITY;

-- DMB can manage meetings
CREATE POLICY "meetings_dmb_manage" ON public.dmb_meetings
  FOR ALL USING (
    auth.uid() IN (SELECT id FROM public.profiles WHERE role IN ('dmb', 'superadmin'))
  );

-- Ketum can read meetings
CREATE POLICY "meetings_ketum_read" ON public.dmb_meetings
  FOR SELECT USING (
    auth.uid() IN (SELECT id FROM public.profiles WHERE role = 'ketum')
  );


-- ── 5. STORAGE BUCKETS ───────────────────────────────────────
-- Run this if you have access to storage schema. Otherwise create 
-- manually in Supabase Dashboard -> Storage -> New Bucket "public-assets"
-- Make sure it is a "Public" bucket.

INSERT INTO storage.buckets (id, name, public) 
VALUES ('public-assets', 'public-assets', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public to read from the bucket
CREATE POLICY "Public Read Access" ON storage.objects
  FOR SELECT USING (bucket_id = 'public-assets');

-- Allow authenticated users to insert/update objects
CREATE POLICY "Auth Upload Access" ON storage.objects
  FOR INSERT WITH CHECK (
    auth.role() = 'authenticated' AND bucket_id = 'public-assets'
  );

CREATE POLICY "Auth Update Access" ON storage.objects
  FOR UPDATE USING (
    auth.role() = 'authenticated' AND bucket_id = 'public-assets'
  );

CREATE POLICY "Auth Delete Access" ON storage.objects
  FOR DELETE USING (
    auth.role() = 'authenticated' AND bucket_id = 'public-assets'
  );
-- Fix Security Advisor Warnings
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER 
SECURITY DEFINER 
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email, 'Superadmin'),
    'superadmin' -- Forcing it to superadmin so the user doesn't need to manually edit it first time
  );
  RETURN NEW;
EXCEPTION WHEN OTHERS THEN
  -- We log it but do not fail
  RAISE WARNING 'Failed to create profile: %', SQLERRM;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Revoke execute from public so the function is not exposed as a REST API endpoint
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM anon;
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM authenticated;

-- ============================================================
-- Fix RLS Infinite Recursion Bug
-- ============================================================

-- 1. Create a helper function that bypasses RLS to check roles
-- This prevents the infinite loop when profiles queries profiles
CREATE OR REPLACE FUNCTION public.has_role(required_role TEXT)
RETURNS BOOLEAN
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() 
    AND (role = required_role OR role = 'superadmin')
  );
END;
$$ LANGUAGE plpgsql;

-- 2. Revoke execute from public to be safe
REVOKE EXECUTE ON FUNCTION public.has_role(TEXT) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.has_role(TEXT) TO authenticated;

-- 3. Drop ALL problematic recursive policies in public.profiles
DROP POLICY IF EXISTS "profiles_superadmin_all" ON public.profiles;

-- 4. Recreate them using the new helper function
CREATE POLICY "profiles_superadmin_manage" ON public.profiles
  FOR ALL USING ( public.has_role('superadmin') );

-- 5. Fix site_config
DROP POLICY IF EXISTS "site_config_admin_update" ON public.site_config;
CREATE POLICY "site_config_admin_update" ON public.site_config
  FOR UPDATE USING ( public.has_role('kominfo') );

-- 6. Fix articles
DROP POLICY IF EXISTS "articles_admin_all" ON public.articles;
CREATE POLICY "articles_admin_all" ON public.articles
  FOR ALL USING ( public.has_role('kominfo') );

-- 7. Fix merchandise
DROP POLICY IF EXISTS "merchandise_ekraf_all" ON public.merchandise;
CREATE POLICY "merchandise_ekraf_all" ON public.merchandise
  FOR ALL USING ( public.has_role('ekraf') );

-- 8. Fix transactions (bph)
DROP POLICY IF EXISTS "transactions_bph_all" ON public.transactions;
CREATE POLICY "transactions_bph_all" ON public.transactions
  FOR ALL USING ( public.has_role('bph') );

-- 9. Fix aspirations (dpb)
DROP POLICY IF EXISTS "aspirations_dpb_manage" ON public.dpb_aspirations;
CREATE POLICY "aspirations_dpb_manage" ON public.dpb_aspirations
  FOR ALL USING ( public.has_role('dpb') );

DROP POLICY IF EXISTS "aspirations_ketum_read" ON public.dpb_aspirations;
CREATE POLICY "aspirations_ketum_read" ON public.dpb_aspirations
  FOR SELECT USING ( public.has_role('ketum') );

-- 10. Fix programs (sosker)
DROP POLICY IF EXISTS "programs_sosker_manage" ON public.sosker_programs;
CREATE POLICY "programs_sosker_manage" ON public.sosker_programs
  FOR ALL USING ( public.has_role('sosker') );

DROP POLICY IF EXISTS "programs_ketum_read" ON public.sosker_programs;
CREATE POLICY "programs_ketum_read" ON public.sosker_programs
  FOR SELECT USING ( public.has_role('ketum') );

-- 11. Fix meetings (dmb)
DROP POLICY IF EXISTS "meetings_dmb_manage" ON public.dmb_meetings;
CREATE POLICY "meetings_dmb_manage" ON public.dmb_meetings
  FOR ALL USING ( public.has_role('dmb') );

DROP POLICY IF EXISTS "meetings_ketum_read" ON public.dmb_meetings;
CREATE POLICY "meetings_ketum_read" ON public.dmb_meetings
  FOR SELECT USING ( public.has_role('ketum') );
-- Fix permission denied error for unauthenticated (anon) users
GRANT EXECUTE ON FUNCTION public.has_role(TEXT) TO public;
-- ============================================================
-- Fix Missing Postgres Privileges (Grants)
-- Usually happens after importing a raw database dump
-- ============================================================

-- Grant usage on schema public
GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;

-- Grant select on all tables to anon and authenticated
GRANT SELECT ON ALL TABLES IN SCHEMA public TO anon, authenticated;

-- Grant insert, update, delete to authenticated
GRANT INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO authenticated;

-- Make sure future tables get these grants too
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT ON TABLES TO anon, authenticated;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT INSERT, UPDATE, DELETE ON TABLES TO authenticated;

-- Also grant usage on all sequences (needed for serial columns)
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT USAGE ON SEQUENCES TO anon, authenticated;

-- Explicitly grant execute on all functions in public schema
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO anon, authenticated;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT EXECUTE ON FUNCTIONS TO anon, authenticated;

-- Notify PostgREST to reload schema cache
NOTIFY pgrst, 'reload schema';
