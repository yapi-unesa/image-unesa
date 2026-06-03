// @ts-nocheck
import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load = async ({ params, locals }: Parameters<PageServerLoad>[0]) => {
  const { id } = params;
  let aspiration = null;

  if (id !== 'new') {
    const { data, error: err } = await locals.supabase
      .from('dpb_aspirations')
      .select('*')
      .eq('id', id)
      .single();

    if (err || !data) {
      throw error(404, 'Tiket aspirasi tidak ditemukan');
    }
    aspiration = data;
  }

  return {
    aspiration
  };
};

export const actions = {
  saveAspiration: async ({ request, params, locals }: import('./$types').RequestEvent) => {
    const data = await request.formData();
    const id = params.id;

    const topic = data.get('topic') as string;
    const submitter = (data.get('submitter') as string) || 'Anonim';
    const date = data.get('date') as string;
    const priority = data.get('priority') as string;
    const status = data.get('status') as string;

    if (!topic || !date || !priority || !status) {
      return {
        error: 'Topik, tanggal, prioritas, dan status wajib diisi',
        values: Object.fromEntries(data)
      };
    }

    const payload = {
      topic,
      submitter,
      date,
      priority,
      status,
      updated_at: new Date().toISOString()
    };

    if (id === 'new') {
      const { error: err } = await locals.supabase.from('dpb_aspirations').insert([payload]);

      if (err) {
        console.error(err);
        return { error: 'Gagal membuat tiket aspirasi', values: Object.fromEntries(data) };
      }
    } else {
      const { error: err } = await locals.supabase
        .from('dpb_aspirations')
        .update(payload)
        .eq('id', id);

      if (err) {
        console.error(err);
        return { error: 'Gagal memperbarui tiket', values: Object.fromEntries(data) };
      }
    }

    throw redirect(303, '/dashboard/dpb');
  }
};
;null as any as Actions;