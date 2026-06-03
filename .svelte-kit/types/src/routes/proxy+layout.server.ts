// @ts-nocheck
import type { LayoutServerLoad } from './$types';

// Root layout server load — hydrates session for all pages
export const load = async ({ locals: { safeGetSession } }: Parameters<LayoutServerLoad>[0]) => {
  const { session } = await safeGetSession();
  return { session };
};
