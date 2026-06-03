// @ts-nocheck
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { ROLE_REDIRECT } from '$lib/config/site';

export const load = async ({ parent }: Parameters<PageServerLoad>[0]) => {
  const { profile } = await parent();
  // Redirect to role-specific dashboard
  const destination = ROLE_REDIRECT[profile.role] ?? '/dashboard/bph';
  throw redirect(303, destination);
};
