// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

import type { SupabaseClient, Session } from '@supabase/supabase-js';
import type { Database } from '$lib/types/database';

declare global {
  namespace App {
    interface Locals {
      supabase: SupabaseClient<Database>;
      safeGetSession: () => Promise<{
        session: Session | null;
        user: import('@supabase/supabase-js').User | null;
      }>;
    }
    interface PageData {
      session: Session | null;
    }
    interface Error {
      message: string;
      code?: string;
    }
    // interface Platform {}
  }
}

export {};
