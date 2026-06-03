import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
  // 1. Fetch exact counts and stats
  const [
    { count: totalMembers },
    { count: totalArticles },
    { count: totalProducts },
    { count: activePrograms },
    { data: transactions }
  ] = await Promise.all([
    locals.supabase
      .from('members')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'aktif'),
    locals.supabase
      .from('articles')
      .select('*', { count: 'exact', head: true })
      .eq('is_published', true),
    locals.supabase
      .from('merchandise')
      .select('*', { count: 'exact', head: true })
      .eq('is_active', true),
    locals.supabase
      .from('sosker_programs')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'Berjalan'),
    locals.supabase.from('transactions').select('type, amount')
  ]);

  let cashBalance = 0;
  if (transactions) {
    cashBalance = transactions.reduce((acc, t) => {
      return t.type === 'income' ? acc + Number(t.amount) : acc - Number(t.amount);
    }, 0);
  }

  // 2. Fetch Recent Activities (1 from each table for demo purposes)
  const [{ data: latestArticle }, { data: latestMember }, { data: latestProduct }] =
    await Promise.all([
      locals.supabase
        .from('articles')
        .select('id, title, created_at')
        .order('created_at', { ascending: false })
        .limit(1)
        .single(),
      locals.supabase
        .from('members')
        .select('id, full_name, created_at')
        .order('created_at', { ascending: false })
        .limit(1)
        .single(),
      locals.supabase
        .from('merchandise')
        .select('id, name, created_at')
        .order('created_at', { ascending: false })
        .limit(1)
        .single()
    ]);

  const rawActivities = [];
  if (latestArticle)
    rawActivities.push({
      id: `art-${latestArticle.id}`,
      action: 'Artikel Baru',
      title: latestArticle.title,
      time: latestArticle.created_at,
      department: 'Kominfo'
    });
  if (latestMember)
    rawActivities.push({
      id: `mem-${latestMember.id}`,
      action: 'Anggota Baru',
      title: latestMember.full_name,
      time: latestMember.created_at,
      department: 'DPO'
    });
  if (latestProduct)
    rawActivities.push({
      id: `prd-${latestProduct.id}`,
      action: 'Produk Baru',
      title: latestProduct.name,
      time: latestProduct.created_at,
      department: 'Ekraf'
    });

  // Sort by created_at desc
  rawActivities.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());

  // Format time (simplistic approach for MVP, normally use date-fns)
  const recentActivities = rawActivities.map((a) => {
    return {
      ...a,
      time: new Date(a.time).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      })
    };
  });

  return {
    stats: {
      totalMembers: totalMembers || 0,
      totalArticles: totalArticles || 0,
      totalProducts: totalProducts || 0,
      cashBalance,
      activePrograms: activePrograms || 0
    },
    recentActivities
  };
};
