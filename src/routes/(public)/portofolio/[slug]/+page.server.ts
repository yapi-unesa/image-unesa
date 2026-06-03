import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, locals }) => {
  const { slug } = params;

  let article = null;

  try {
    const { data, error: dbError } = await locals.supabase
      .from('articles')
      .select('*, author:author_id(full_name, avatar_url)')
      .eq('slug', slug)
      .eq('is_published', true)
      .single();

    if (!dbError && data) {
      article = data;
    }
  } catch (err) {
    console.warn('[Article] Unexpected error fetching article details', err);
  }

  // Fallback if DB not ready or article not found in DB but exists in our dummy list
  if (!article) {
    const dummies = [
      {
        id: '1',
        slug: 'seminar-nasional-pendidikan-2026',
        title: 'Seminar Nasional Pendidikan 2026: Sinergi Mahasiswa Gresik',
        excerpt:
          'Lebih dari 500 mahasiswa dari berbagai daerah di Jawa Timur berkumpul di Gedung Serba Guna UNESA untuk menghadiri Seminar Nasional yang diselenggarakan oleh IMAGE UNESA.',
        content: `
          <p>Surabaya – Mahasiswa asal Kabupaten Gresik yang tergabung dalam Ikatan Mahasiswa Gresik Universitas Negeri Surabaya (IMAGE UNESA) sukses menggelar Seminar Nasional Pendidikan 2026. Acara yang bertajuk "Sinergi Mahasiswa Gresik dalam Mewujudkan Generasi Emas" ini dihadiri oleh lebih dari 500 peserta dari berbagai kampus di Jawa Timur.</p>
          <br/>
          <p>Ketua Umum IMAGE UNESA dalam sambutannya menyampaikan bahwa kegiatan ini merupakan wujud nyata kontribusi mahasiswa daerah untuk pendidikan Indonesia. "Kita tidak hanya berkumpul sebagai keluarga sekampung halaman, tapi kita juga harus menjadi agen perubahan di lingkungan akademis," ujarnya.</p>
        `,
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
        content: '<p>Kegiatan LDK sukses diselenggarakan di Pacet, Jawa Timur...</p>',
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
        content:
          '<p>Banjir yang melanda beberapa desa di Gresik Selatan mendorong kami untuk bertindak...</p>',
        cover_url: '/hero_campus.webp',
        category: 'sosial',
        published_at: new Date(Date.now() - 86400000 * 12).toISOString(),
        author: { full_name: 'Sosker IMAGE' }
      }
    ];

    article = dummies.find((a) => a.slug === slug);
  }

  if (!article) {
    throw error(404, 'Artikel tidak ditemukan');
  }

  return {
    article
  };
};
