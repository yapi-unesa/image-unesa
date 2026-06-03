// ============================================================
// SvelteKit Server Hooks — Auth Middleware
// Runs on every server request to hydrate Supabase session
// ============================================================

import { createServerClient } from '@supabase/ssr';
import { type Handle, redirect } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';
import type { Database } from '$lib/types';
import ws from 'ws';

// Hook 1: Attach Supabase client to locals
const supabaseHook: Handle = async ({ event, resolve }) => {
  event.locals.supabase = createServerClient<Database>(
    PUBLIC_SUPABASE_URL,
    PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return event.cookies.getAll();
        },
        setAll(cookiesToSet: any[]) {
          cookiesToSet.forEach(({ name, value, options }) => {
            event.cookies.set(name, value, { ...options, path: '/' });
          });
        }
      },
      realtime: {
        transport: ws
      }
    }
  );

  // Helper: get session safely (avoids code-sharing auth bypass)
  event.locals.safeGetSession = async () => {
    const {
      data: { session }
    } = await event.locals.supabase.auth.getSession();

    if (!session) return { session: null, user: null };

    // Validate session with server - prevents spoofed JWTs
    const {
      data: { user },
      error
    } = await event.locals.supabase.auth.getUser();

    if (error) return { session: null, user: null };

    return { session, user };
  };

  return resolve(event, {
    filterSerializedResponseHeaders(name) {
      return name === 'content-range' || name === 'x-supabase-api-version';
    }
  });
};

// Hook 2: Auth guard for dashboard routes
const authGuardHook: Handle = async ({ event, resolve }) => {
  const path = event.url.pathname;

  // Protect all /dashboard routes
  if (path.startsWith('/dashboard')) {
    const { session } = await event.locals.safeGetSession();
    if (!session) {
      throw redirect(303, `/login?redirectTo=${encodeURIComponent(path)}`);
    }
  }

  // Redirect logged-in users away from login page
  if (path === '/login') {
    const { session } = await event.locals.safeGetSession();
    if (session) {
      throw redirect(303, '/dashboard');
    }
  }

  return resolve(event);
};

// Hook 3: Security Headers
const securityHeadersHook: Handle = async ({ event, resolve }) => {
  const response = await resolve(event);

  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');

  // Basic CSP
  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; connect-src 'self' https://*.supabase.co; img-src 'self' data: https:; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';"
  );

  return response;
};

export const handle = sequence(supabaseHook, authGuardHook, securityHeadersHook);
