import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ params, locals }) => {
  const { id } = params;
  let meeting = null;

  if (id !== 'new') {
    const { data, error: err } = await locals.supabase
      .from('dmb_meetings')
      .select('*')
      .eq('id', id)
      .single();

    if (err || !data) {
      throw error(404, 'Arsip rapat tidak ditemukan');
    }
    meeting = data;
  }

  return {
    meeting
  };
};

export const actions: Actions = {
  saveMeeting: async ({ request, params, locals }) => {
    const data = await request.formData();
    const id = params.id;

    const agenda = data.get('agenda') as string;
    const date = data.get('date') as string;
    const attendanceStr = (data.get('attendance') as string) || '0';
    const decision = data.get('decision') as string;
    const notes = (data.get('notes') as string) || '';

    if (!agenda || !date || !decision) {
      return {
        error: 'Agenda, tanggal, dan keputusan wajib diisi',
        values: Object.fromEntries(data)
      };
    }

    const attendance = parseInt(attendanceStr, 10);

    const payload = {
      agenda,
      date,
      attendance,
      decision,
      notes,
      updated_at: new Date().toISOString()
    };

    if (id === 'new') {
      const { error: err } = await locals.supabase.from('dmb_meetings').insert([payload]);

      if (err) {
        console.error(err);
        return { error: 'Gagal merekam arsip rapat', values: Object.fromEntries(data) };
      }
    } else {
      const { error: err } = await locals.supabase
        .from('dmb_meetings')
        .update(payload)
        .eq('id', id);

      if (err) {
        console.error(err);
        return { error: 'Gagal memperbarui arsip', values: Object.fromEntries(data) };
      }
    }

    throw redirect(303, '/dashboard/dmb');
  }
};
