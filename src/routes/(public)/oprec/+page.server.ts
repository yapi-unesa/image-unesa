import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent }) => {
  const { siteConfig } = await parent();

  return {
    siteConfig
  };
};
