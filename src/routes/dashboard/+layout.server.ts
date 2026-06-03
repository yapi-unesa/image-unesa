import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { ROLE_REDIRECT } from '$lib/config/site';

export const load: LayoutServerLoad = async ({ locals, url }) => {
  const { session, user } = await locals.safeGetSession();

  // Double-check auth (belt + suspenders after hooks.server.ts)
  if (!session || !user) {
    throw redirect(303, `/login?redirectTo=${encodeURIComponent(url.pathname)}`);
  }

  // Fetch user profile with role
  const { data: profile, error } = await locals.supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (error || !profile) {
    // Profile not found — likely new user without profile or DB wiped
    // We must sign out to clear the session so they don't infinite redirect
    await locals.supabase.auth.signOut();
    throw redirect(303, '/login?error=profile_not_found');
  }

  if (!profile.is_active) {
    throw redirect(303, '/login?error=inactive');
  }

  return {
    session,
    user,
    profile
  };
};
