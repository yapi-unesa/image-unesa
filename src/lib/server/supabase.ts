// ============================================================
// Server-side Supabase Client
// Used ONLY in +page.server.ts, +layout.server.ts, hooks.server.ts
// ============================================================

import { createServerClient } from '@supabase/ssr';
import { SUPABASE_SERVICE_ROLE_KEY } from '$env/static/private';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';
import type { Cookies } from '@sveltejs/kit';
import type { Database } from '$lib/types';
import ws from 'ws';

/**
 * Create a Supabase client for use in server-side load functions.
 * Uses the anon key + user cookies for RLS to work correctly.
 */
export function createSupabaseServerClient(cookies: Cookies) {
  return createServerClient<Database>(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
    cookies: {
      getAll() {
        return cookies.getAll();
      },
      setAll(cookiesToSet: any[]) {
        cookiesToSet.forEach(({ name, value, options }) => {
          cookies.set(name, value, { ...options, path: '/' });
        });
      }
    },
    realtime: {
      transport: ws
    }
  });
}

/**
 * Create a Supabase admin client with service role key.
 * Bypasses RLS — use only for trusted server operations (e.g., user creation).
 */
export function createSupabaseAdminClient() {
  return createServerClient<Database>(PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    cookies: {
      getAll() {
        return [];
      },
      setAll() {}
    },
    auth: {
      autoRefreshToken: false,
      persistSession: false
    },
    realtime: {
      transport: ws
    }
  });
}
