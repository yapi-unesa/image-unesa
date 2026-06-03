// @ts-nocheck
import { error } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load = async ({ locals }: Parameters<PageServerLoad>[0]) => {
  const { data: merchandise, error: err } = await locals.supabase
    .from('merchandise')
    .select('*')
    .order('created_at', { ascending: false });

  if (err) {
    console.error('Error fetching merchandise:', err.message);
    throw error(500, 'Gagal memuat daftar produk');
  }

  const stats = {
    total: merchandise?.length || 0,
    inStock: merchandise?.filter((m) => m.status === 'tersedia').length || 0,
    outOfStock: merchandise?.filter((m) => m.status === 'habis').length || 0
  };

  return {
    merchandise: merchandise || [],
    stats
  };
};

export const actions = {
  deleteProduct: async ({ request, locals }: import('./$types').RequestEvent) => {
    const data = await request.formData();
    const id = data.get('id') as string;

    if (!id) return { error: 'ID produk tidak valid' };

    const { error: err } = await locals.supabase.from('merchandise').delete().eq('id', id);

    if (err) {
      console.error('Error deleting product:', err.message);
      return { error: 'Gagal menghapus produk' };
    }

    return { success: true };
  }
};
;null as any as Actions;