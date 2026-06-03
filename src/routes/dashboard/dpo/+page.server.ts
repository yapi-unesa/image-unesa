import { error } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
  const { data: members, error: err } = await locals.supabase
    .from('members')
    .select('*')
    .order('created_at', { ascending: false });

  if (err) {
    console.error('Error fetching members:', err.message);
    throw error(500, 'Gagal memuat daftar anggota');
  }

  const validMembers = members || [];

  const stats = {
    total: validMembers.length,
    active: validMembers.filter((m) => m.status === 'aktif').length,
    alumni: validMembers.filter((m) => m.status === 'alumni' || m.status === 'demisioner').length
  };

  return {
    members: validMembers,
    stats,
    dbError: false
  };
};

export const actions: Actions = {
  deleteMember: async ({ request, locals }) => {
    const data = await request.formData();
    const id = data.get('id') as string;

    if (!id) return { error: 'ID anggota tidak valid' };

    const { error: err } = await locals.supabase.from('members').delete().eq('id', id);

    if (err) {
      console.error('Error deleting member:', err.message);
      return { error: 'Gagal menghapus data anggota' };
    }

    return { success: true };
  }
};
