// ============================================================
// Browser-side Supabase Client
// Used in Svelte components and client-side code
// ============================================================

import { createBrowserClient } from '@supabase/ssr';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';
import type { Database } from '$lib/types/index';
import { browser } from '$app/environment';

let client: ReturnType<typeof createBrowserClient<Database>> | undefined;

export function createSupabaseBrowserClient() {
  if (browser) {
    if (!client) {
      client = createBrowserClient<Database>(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY);
    }
    return client;
  } else {
    // Return a mock object during SSR to avoid the Node 20 WebSocket error
    return {
      auth: {
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
        signOut: async () => {}
      }
    } as any;
  }
}
