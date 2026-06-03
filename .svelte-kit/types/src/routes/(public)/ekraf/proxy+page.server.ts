// @ts-nocheck
import type { PageServerLoad } from './$types';

export const load = async ({ locals }: Parameters<PageServerLoad>[0]) => {
  let merchandise: any[] = [];
  let errorMsg = null;

  try {
    const { data, error } = await locals.supabase
      .from('merchandise')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('[Ekraf] Fetch error:', error.message);
      errorMsg = error.message;
    } else if (data) {
      merchandise = data;
    }
  } catch (err) {
    console.warn('[Ekraf] Unexpected error fetching merchandise');
  }

  // Fallback dummy data if DB is empty or uninitialized
  if (merchandise.length === 0) {
    merchandise = [
      {
        id: '1',
        name: 'Kaos IMAGE UNESA 2026',
        description:
          'Kaos eksklusif bahan cotton combed 30s dengan desain modern yang mencerminkan semangat progresif.',
        price: 85000,
        stock: 50,
        image_url: '/merch_kaos.webp',
        wa_link: 'https://wa.me/6281234567890?text=Halo%20saya%20ingin%20memesan%20Kaos%20IMAGE'
      },
      {
        id: '2',
        name: 'Lanyard Premium',
        description: 'Lanyard tebal dengan pengait besi kuat dan desain dua sisi.',
        price: 25000,
        stock: 120,
        image_url: null,
        wa_link: 'https://wa.me/6281234567890?text=Halo%20saya%20ingin%20memesan%20Lanyard'
      },
      {
        id: '3',
        name: 'Totebag Kanvas',
        description: 'Totebag ramah lingkungan berbahan kanvas tebal yang cocok untuk ke kampus.',
        price: 45000,
        stock: 0,
        image_url: null,
        wa_link: 'https://wa.me/6281234567890?text=Halo%20saya%20ingin%20memesan%20Totebag'
      }
    ];
  }

  return {
    merchandise
  };
};
