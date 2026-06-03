// @ts-nocheck
import type { PageServerLoad, Actions } from './$types';

export const load = async ({ locals }: Parameters<PageServerLoad>[0]) => {
  const { data: realData, error: err } = await locals.supabase
    .from('dmb_meetings')
    .select('*')
    .order('created_at', { ascending: false });

  if (err) {
    console.error('Error fetching dmb meetings:', err);
  }

  return {
    meetings: realData || [],
    isMock: false
  };
};

export const actions = {
  deleteMeeting: async ({ request, locals }: import('./$types').RequestEvent) => {
    const data = await request.formData();
    const id = data.get('id') as string;

    if (!id) return { error: 'ID rapat tidak valid' };

    const { error: err } = await locals.supabase.from('dmb_meetings').delete().eq('id', id);

    if (err) {
      console.error('Error deleting meeting:', err.message);
      return { error: 'Gagal menghapus arsip rapat' };
    }

    return { success: true };
  }
};
;null as any as Actions;