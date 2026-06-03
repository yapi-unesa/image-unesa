// @ts-nocheck
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { ROLE_REDIRECT } from '$lib/config/site';

export const load = async ({ locals }: Parameters<PageServerLoad>[0]) => {
  const { session } = await locals.safeGetSession();
  if (session) {
    throw redirect(303, '/dashboard');
  }
  return {};
};

export const actions = {
  login: async ({ request, locals, url }: import('./$types').RequestEvent) => {
    const formData = await request.formData();
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const redirectTo = url.searchParams.get('redirectTo') ?? '/dashboard';

    if (!email || !password) {
      return fail(400, { error: 'Email dan password wajib diisi.' });
    }

    const { data, error } = await locals.supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      console.error('[Login] Error:', error.message);
      if (error.message.includes('Invalid login credentials')) {
        return fail(401, { error: 'Email atau password salah. Silakan coba lagi.' });
      }
      return fail(500, { error: 'Terjadi kesalahan sistem. Hubungi admin.' });
    }

    if (!data.user) {
      return fail(401, { error: 'Login gagal. Silakan coba lagi.' });
    }

    // Get user role for smart redirect
    const { data: profile } = await locals.supabase
      .from('profiles')
      .select('role')
      .eq('id', data.user.id)
      .single();

    const role = profile?.role ?? 'bph';
    const destination = ROLE_REDIRECT[role] ?? redirectTo;

    throw redirect(303, destination);
  }
};
;null as any as Actions;