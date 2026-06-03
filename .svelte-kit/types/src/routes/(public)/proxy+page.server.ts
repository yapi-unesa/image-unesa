// @ts-nocheck
import type { PageServerLoad } from './$types';

export const load = async ({ locals, parent }: Parameters<PageServerLoad>[0]) => {
  const { siteConfig } = await parent();

  let articles: any[] = [];
  let merchandise: any[] = [];

  try {
    // Fetch latest published articles for homepage
    const { data: articlesData, error: articlesError } = await locals.supabase
      .from('articles')
      .select('id, slug, title, excerpt, cover_url, category, published_at')
      .eq('is_published', true)
      .order('published_at', { ascending: false })
      .limit(3);

    if (articlesError) {
      console.warn('[Page] Warning: articles fetch error:', articlesError.message);
    } else if (articlesData) {
      articles = articlesData;
    }
  } catch (err) {
    console.warn('[Page] Unexpected error fetching articles');
  }

  try {
    // Fetch active merchandise for homepage preview
    const { data: merchData, error: merchError } = await locals.supabase
      .from('merchandise')
      .select('id, name, description, price, stock, image_url, wa_link, is_active')
      .eq('is_active', true)
      .order('created_at', { ascending: false })
      .limit(3);

    if (merchError) {
      console.warn('[Page] Warning: merchandise fetch error:', merchError.message);
    } else if (merchData) {
      merchandise = merchData;
    }
  } catch (err) {
    console.warn('[Page] Unexpected error fetching merchandise');
  }

  return {
    siteConfig,
    articles,
    merchandise
  };
};
