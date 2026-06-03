import { error } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
  // Check auth and role handled by layout, but we fetch data here
  const { data: articles, error: err } = await locals.supabase
    .from('articles')
    .select(
      'id, slug, title, category, is_published, published_at, created_at, author:author_id(full_name)'
    )
    .order('created_at', { ascending: false });

  if (err) {
    console.error('Error fetching articles:', err.message);
    throw error(500, 'Gagal memuat daftar artikel');
  }

  const stats = {
    total: articles?.length || 0,
    published: articles?.filter((a) => a.is_published).length || 0,
    drafts: articles?.filter((a) => !a.is_published).length || 0
  };

  return {
    articles: articles || [],
    stats
  };
};

export const actions: Actions = {
  deleteArticle: async ({ request, locals }) => {
    const data = await request.formData();
    const id = data.get('id') as string;

    if (!id) return { error: 'ID artikel tidak valid' };

    const { error: err } = await locals.supabase.from('articles').delete().eq('id', id);

    if (err) {
      console.error('Error deleting article:', err.message);
      return { error: 'Gagal menghapus artikel' };
    }

    return { success: true };
  }
};
