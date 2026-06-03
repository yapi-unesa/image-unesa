// @ts-nocheck
import type { PageServerLoad, Actions } from './$types';

export const load = async ({ locals }: Parameters<PageServerLoad>[0]) => {
  // Attempt to fetch from real database if it exists
  const { data: realData, error: err } = await locals.supabase
    .from('sosker_programs')
    .select('*')
    .order('created_at', { ascending: false });

  if (err) {
    console.error('Error fetching sosker programs:', err);
  }

  return {
    programs: realData || [],
    isMock: false
  };
};

export const actions = {
  deleteProgram: async ({ request, locals }: import('./$types').RequestEvent) => {
    const data = await request.formData();
    const id = data.get('id') as string;

    if (!id) return { error: 'ID program tidak valid' };

    const { error: err } = await locals.supabase.from('sosker_programs').delete().eq('id', id);

    if (err) {
      console.error('Error deleting program:', err.message);
      return { error: 'Gagal menghapus program' };
    }

    return { success: true };
  }
};
;null as any as Actions;