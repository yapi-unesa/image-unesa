import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
  const { data: realData, error: err } = await locals.supabase
    .from('dpb_aspirations')
    .select('*')
    .order('created_at', { ascending: false });

  if (err) {
    console.error('Error fetching dpb aspirations:', err);
  }

  return {
    aspirations: realData || [],
    isMock: false
  };
};

export const actions: Actions = {
  deleteAspiration: async ({ request, locals }) => {
    const data = await request.formData();
    const id = data.get('id') as string;

    if (!id) return { error: 'ID tiket tidak valid' };

    const { error: err } = await locals.supabase.from('dpb_aspirations').delete().eq('id', id);

    if (err) {
      console.error('Error deleting ticket:', err.message);
      return { error: 'Gagal menghapus tiket aspirasi' };
    }

    return { success: true };
  }
};
