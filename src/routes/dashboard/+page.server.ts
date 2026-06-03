import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { ROLE_REDIRECT } from '$lib/config/site';

export const load: PageServerLoad = async ({ parent }) => {
  const { profile } = await parent();
  // Redirect to role-specific dashboard
  const destination = ROLE_REDIRECT[profile.role] ?? '/dashboard/bph';
  throw redirect(303, destination);
};
