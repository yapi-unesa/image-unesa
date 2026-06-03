// @ts-nocheck
import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load = async ({ params, locals }: Parameters<PageServerLoad>[0]) => {
  const { id } = params;
  let program = null;

  if (id !== 'new') {
    const { data, error: err } = await locals.supabase
      .from('sosker_programs')
      .select('*')
      .eq('id', id)
      .single();

    if (err || !data) {
      throw error(404, 'Program tidak ditemukan');
    }
    program = data;
  }

  return {
    program
  };
};

export const actions = {
  saveProgram: async ({ request, params, locals }: import('./$types').RequestEvent) => {
    const data = await request.formData();
    const id = params.id;

    const title = data.get('title') as string;
    const date = data.get('date') as string;
    const status = data.get('status') as string;
    const targetStr = (data.get('target_amount') as string) || '0';
    const collectedStr = (data.get('collected_amount') as string) || '0';

    if (!title || !date || !status) {
      return { error: 'Judul, tanggal, dan status wajib diisi', values: Object.fromEntries(data) };
    }

    const target_amount = parseInt(targetStr, 10);
    const collected_amount = parseInt(collectedStr, 10);

    const payload = {
      title,
      date,
      status,
      target_amount,
      collected_amount,
      updated_at: new Date().toISOString()
    };

    if (id === 'new') {
      const { error: err } = await locals.supabase.from('sosker_programs').insert([payload]);

      if (err) {
        console.error(err);
        return { error: 'Gagal membuat program', values: Object.fromEntries(data) };
      }
    } else {
      const { error: err } = await locals.supabase
        .from('sosker_programs')
        .update(payload)
        .eq('id', id);

      if (err) {
        console.error(err);
        return { error: 'Gagal memperbarui program', values: Object.fromEntries(data) };
      }
    }

    throw redirect(303, '/dashboard/sosker');
  }
};
;null as any as Actions;