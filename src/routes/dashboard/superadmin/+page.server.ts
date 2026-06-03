import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { FALLBACK_CONFIG } from '$lib/config/site';

export const load: PageServerLoad = async ({ locals, parent }) => {
  const { profile } = await parent();

  if (profile.role !== 'superadmin') {
    throw redirect(303, '/unauthorized');
  }

  const { data: config } = await locals.supabase
    .from('site_config')
    .select('*')
    .eq('id', 1)
    .single();

  return {
    config: config ?? FALLBACK_CONFIG,
    profile
  };
};

export const actions: Actions = {
  updateConfig: async ({ request, locals }) => {
    const { user } = await locals.safeGetSession();
    if (!user) return fail(401, { error: 'Unauthorized' });

    const { data: profile } = await locals.supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();
    if (profile?.role !== 'superadmin') {
      return fail(403, { error: 'Akses ditolak' });
    }

    const form = await request.formData();

    const updates = {
      hero_title: form.get('hero_title') as string,
      hero_subtitle: form.get('hero_subtitle') as string,
      hero_badge: form.get('hero_badge') as string,
      whatsapp_contact: form.get('whatsapp_contact') as string,
      email_contact: form.get('email_contact') as string,
      is_oprec_open: form.get('is_oprec_open') === 'true',
      oprec_deadline: (form.get('oprec_deadline') as string) || null,
      social_links: {
        instagram: form.get('ig') as string,
        tiktok: form.get('tiktok') as string,
        youtube: form.get('youtube') as string
      },
      stats: {
        members: Number(form.get('stat_members') ?? 500),
        programs: Number(form.get('stat_programs') ?? 15),
        years: Number(form.get('stat_years') ?? 20),
        events: Number(form.get('stat_events') ?? 50)
      },
      updated_at: new Date().toISOString(),
      updated_by: user?.id
    };

    const { error } = await locals.supabase.from('site_config').update(updates).eq('id', 1);

    if (error) {
      return fail(500, { error: 'Gagal menyimpan: ' + error.message });
    }

    return { success: true, message: 'Konfigurasi website berhasil diperbarui! ✅' };
  }
};
