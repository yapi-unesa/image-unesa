import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ params, locals }) => {
  const { id } = params;
  let transaction = null;

  if (id !== 'new') {
    const { data, error: err } = await locals.supabase
      .from('transactions')
      .select('*')
      .eq('id', id)
      .single();

    if (err || !data) {
      throw error(404, 'Transaksi tidak ditemukan');
    }
    transaction = data;
  }

  return {
    transaction
  };
};

export const actions: Actions = {
  saveTransaction: async ({ request, params, locals }) => {
    const data = await request.formData();
    const id = params.id;

    const date = data.get('date') as string;
    const description = data.get('description') as string;
    const type = data.get('type') as string;
    const amountStr = data.get('amount') as string;

    if (!date || !description || !type || !amountStr) {
      return { error: 'Semua kolom wajib diisi', values: Object.fromEntries(data) };
    }

    const amount = parseInt(amountStr, 10);

    const payload = {
      created_at: new Date(date).toISOString(),
      description,
      type,
      amount
    };

    if (id === 'new') {
      const { error: err } = await locals.supabase.from('transactions').insert([payload]);

      if (err) {
        console.error(err);
        return { error: 'Gagal mencatat transaksi', values: Object.fromEntries(data) };
      }
    } else {
      const { error: err } = await locals.supabase
        .from('transactions')
        .update(payload)
        .eq('id', id);

      if (err) {
        console.error(err);
        return { error: 'Gagal memperbarui transaksi', values: Object.fromEntries(data) };
      }
    }

    throw redirect(303, '/dashboard/bph');
  }
};
