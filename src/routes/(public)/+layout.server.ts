import type { LayoutServerLoad } from './$types';
import { FALLBACK_CONFIG } from '$lib/config/site';

export const load: LayoutServerLoad = async ({ locals, depends }) => {
  depends('supabase:auth');

  const { session } = await locals.safeGetSession();

  let siteConfig = FALLBACK_CONFIG;

  try {
    // Fetch site config for all public pages
    const { data, error } = await locals.supabase
      .from('site_config')
      .select('*')
      .eq('id', 1)
      .single();

    if (error) {
      console.warn(
        '[Public Layout] Warning: site_config fetch error. Using fallback. Details:',
        error.message
      );
    } else if (data) {
      siteConfig = data;
    }
  } catch (err) {
    console.warn('[Public Layout] Unexpected error fetching site_config. Using fallback.');
  }

  return {
    session,
    siteConfig
  };
};
