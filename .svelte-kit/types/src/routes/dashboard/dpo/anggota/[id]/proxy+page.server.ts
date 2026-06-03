// @ts-nocheck
import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load = async ({ params, locals }: Parameters<PageServerLoad>[0]) => {
  const { id } = params;
  let member = null;

  if (id !== 'new') {
    const { data, error: err } = await locals.supabase
      .from('members')
      .select('*')
      .eq('id', id)
      .single();

    if (err || !data) {
      throw error(404, 'Anggota tidak ditemukan');
    }
    member = data;
  }

  return {
    member
  };
};

export const actions = {
  saveMember: async ({ request, params, locals }: import('./$types').RequestEvent) => {
    const data = await request.formData();
    const id = params.id;

    const nim = data.get('nim') as string;
    const name = data.get('name') as string;
    const generation = data.get('generation') as string;
    const division = data.get('division') as string;
    const role = (data.get('role') as string) || 'Anggota';
    const phone = (data.get('phone') as string) || null;
    const status = data.get('status') as string;

    if (!nim || !name || !generation || !division) {
      return {
        error: 'NIM, Nama, Angkatan, dan Divisi wajib diisi',
        values: Object.fromEntries(data)
      };
    }

    const payload = {
      nim,
      name,
      generation,
      division,
      role,
      phone,
      status,
      updated_at: new Date().toISOString()
    };

    if (id === 'new') {
      const { error: err } = await locals.supabase.from('members').insert([payload]);

      if (err) {
        if (err.code === '23505')
          return { error: 'NIM tersebut sudah terdaftar', values: Object.fromEntries(data) };
        console.error(err);
        return { error: 'Gagal menambah anggota', values: Object.fromEntries(data) };
      }
    } else {
      const { error: err } = await locals.supabase.from('members').update(payload).eq('id', id);

      if (err) {
        if (err.code === '23505')
          return {
            error: 'NIM tersebut sudah terdaftar oleh anggota lain',
            values: Object.fromEntries(data)
          };
        console.error(err);
        return { error: 'Gagal menyimpan data anggota', values: Object.fromEntries(data) };
      }
    }

    throw redirect(303, '/dashboard/dpo');
  }
};
;null as any as Actions;