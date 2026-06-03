import type { LayoutServerLoad } from './$types';

// Root layout server load — hydrates session for all pages
export const load: LayoutServerLoad = async ({ locals: { safeGetSession } }) => {
  const { session } = await safeGetSession();
  return { session };
};
