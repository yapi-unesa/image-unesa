// @ts-nocheck
import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load = async ({ params, locals }: Parameters<PageServerLoad>[0]) => {
  const { id } = params;
  let article = null;

  if (id !== 'new') {
    const { data, error: err } = await locals.supabase
      .from('articles')
      .select('*')
      .eq('id', id)
      .single();

    if (err || !data) {
      throw error(404, 'Artikel tidak ditemukan');
    }
    article = data;
  }

  return {
    article
  };
};

export const actions = {
  saveArticle: async ({ request, params, locals }: import('./$types').RequestEvent) => {
    const data = await request.formData();
    const id = params.id;

    // Auth context (author)
    const {
      data: { user }
    } = await locals.supabase.auth.getUser();
    if (!user) return { error: 'Anda harus login' };

    // Form fields
    const title = data.get('title') as string;
    const slug = data.get('slug') as string;
    const excerpt = data.get('excerpt') as string;
    const content = data.get('content') as string;
    const category = data.get('category') as string;
    const is_published = data.get('is_published') === 'on';

    // Cover image upload
    const coverFile = data.get('cover_image') as File | null;
    let cover_url = (data.get('existing_cover_url') as string) || null;

    if (coverFile && coverFile.size > 0) {
      const ext = coverFile.name.split('.').pop();
      const filename = `${Date.now()}-${Math.random().toString(36).substring(2)}.${ext}`;

      const { data: uploadData, error: uploadError } = await locals.supabase.storage
        .from('public-assets')
        .upload(`kominfo/${filename}`, coverFile);

      if (!uploadError && uploadData) {
        const { data: publicUrlData } = locals.supabase.storage
          .from('public-assets')
          .getPublicUrl(`kominfo/${filename}`);
        cover_url = publicUrlData.publicUrl;
      } else {
        console.error('Upload Error:', uploadError);
      }
    }

    if (!title || !slug || !content) {
      return { error: 'Judul, Slug, dan Konten wajib diisi', values: Object.fromEntries(data) };
    }

    const payload = {
      title,
      slug,
      excerpt,
      content,
      category,
      cover_url,
      is_published,
      updated_at: new Date().toISOString()
    };

    if (is_published && id === 'new') {
      (payload as any).published_at = new Date().toISOString();
    } else if (is_published && id !== 'new') {
      const { data: old } = await locals.supabase
        .from('articles')
        .select('published_at')
        .eq('id', id)
        .single();
      if (!old?.published_at) {
        (payload as any).published_at = new Date().toISOString();
      }
    }

    if (id === 'new') {
      (payload as any).author_id = user.id;
      const { error: err } = await locals.supabase.from('articles').insert([payload]);

      if (err) {
        if (err.code === '23505')
          return { error: 'Slug sudah digunakan', values: Object.fromEntries(data) };
        console.error(err);
        return { error: 'Gagal membuat artikel', values: Object.fromEntries(data) };
      }
    } else {
      const { error: err } = await locals.supabase.from('articles').update(payload).eq('id', id);

      if (err) {
        if (err.code === '23505')
          return { error: 'Slug sudah digunakan', values: Object.fromEntries(data) };
        console.error(err);
        return { error: 'Gagal menyimpan artikel', values: Object.fromEntries(data) };
      }
    }

    throw redirect(303, '/dashboard/kominfo');
  }
};
;null as any as Actions;