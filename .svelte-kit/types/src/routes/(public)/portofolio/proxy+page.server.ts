// @ts-nocheck
import type { PageServerLoad } from './$types';

export const load = async ({ locals }: Parameters<PageServerLoad>[0]) => {
  let articles: any[] = [];
  let errorMsg = null;

  try {
    const { data, error } = await locals.supabase
      .from('articles')
      .select('*, author:author_id(full_name, avatar_url)')
      .eq('is_published', true)
      .order('published_at', { ascending: false });

    if (error) {
      console.warn('[Portofolio] Fetch error:', error.message);
      errorMsg = error.message;
    } else if (data) {
      articles = data;
    }
  } catch (err) {
    console.warn('[Portofolio] Unexpected error fetching articles');
  }

  // Fallback dummy data
  if (articles.length === 0) {
    articles = [
      {
        id: '1',
        slug: 'seminar-nasional-pendidikan-2026',
        title: 'Seminar Nasional Pendidikan 2026: Sinergi Mahasiswa Gresik',
        excerpt:
          'Lebih dari 500 mahasiswa dari berbagai daerah di Jawa Timur berkumpul di Gedung Serba Guna UNESA untuk menghadiri Seminar Nasional yang diselenggarakan oleh IMAGE UNESA.',
        cover_url: '/event_seminar_nasional.webp',
        category: 'berita',
        published_at: new Date().toISOString(),
        author: { full_name: 'Kominfo IMAGE' }
      },
      {
        id: '2',
        slug: 'latihan-dasar-kepemimpinan-2026',
        title: 'LDK & Makrab Angkatan 2026: Membangun Karakter Pemimpin',
        excerpt:
          'Kegiatan Latihan Dasar Kepemimpinan (LDK) dan Malam Keakraban berjalan lancar di kawasan Pacet, Mojokerto. Kegiatan ini bertujuan membentuk jiwa kepemimpinan.',
        cover_url: '/event_leadership.webp',
        category: 'kegiatan',
        published_at: new Date(Date.now() - 86400000 * 5).toISOString(),
        author: { full_name: 'Humas IMAGE' }
      },
      {
        id: '3',
        slug: 'open-donasi-bencana-banjir-gresik',
        title: 'Penyaluran Bantuan Sosial Banjir Bandang Gresik Selatan',
        excerpt:
          'IMAGE UNESA berkolaborasi dengan BEM UNESA untuk menyalurkan lebih dari 100 paket sembako kepada korban banjir bandang di wilayah Gresik Selatan.',
        cover_url: '/hero_campus.webp',
        category: 'sosial',
        published_at: new Date(Date.now() - 86400000 * 12).toISOString(),
        author: { full_name: 'Sosker IMAGE' }
      }
    ];
  }

  return {
    articles
  };
};
