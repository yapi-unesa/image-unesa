-- PERINGATAN: SCRIPT INI AKAN MENGHAPUS SEMUA TABEL DAN DATA DI SCHEMA PUBLIC!
DROP SCHEMA public CASCADE;
CREATE SCHEMA public;

-- Kembalikan hak akses dasar schema public
GRANT USAGE ON SCHEMA public TO postgres, anon, authenticated, service_role;
GRANT ALL PRIVILEGES ON SCHEMA public TO postgres;
GRANT ALL PRIVILEGES ON SCHEMA public TO supabase_admin;
