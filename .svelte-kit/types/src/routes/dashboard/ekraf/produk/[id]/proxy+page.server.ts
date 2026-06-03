// @ts-nocheck
import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load = async ({ params, locals }: Parameters<PageServerLoad>[0]) => {
  const { id } = params;
  let product = null;

  if (id !== 'new') {
    const { data, error: err } = await locals.supabase
      .from('merchandise')
      .select('*')
      .eq('id', id)
      .single();

    if (err || !data) {
      throw error(404, 'Produk tidak ditemukan');
    }
    product = data;
  }

  return {
    product
  };
};

export const actions = {
  saveProduct: async ({ request, params, locals }: import('./$types').RequestEvent) => {
    const data = await request.formData();
    const id = params.id;

    const name = data.get('name') as string;
    const description = data.get('description') as string;
    const priceStr = data.get('price') as string;
    const stockStr = data.get('stock') as string;
    const status = data.get('status') as string;
    const imageFile = data.get('image') as File | null;
    let image_url = (data.get('existing_image_url') as string) || null;
    const whatsapp_link = (data.get('whatsapp_link') as string) || null;

    if (!name || !priceStr) {
      return { error: 'Nama dan harga wajib diisi', values: Object.fromEntries(data) };
    }

    const price = parseInt(priceStr, 10);
    const stock = parseInt(stockStr, 10) || 0;

    // Handle Image Upload
    if (imageFile && imageFile.size > 0) {
      const ext = imageFile.name.split('.').pop();
      const filename = `${Date.now()}-${Math.random().toString(36).substring(2)}.${ext}`;

      const { data: uploadData, error: uploadError } = await locals.supabase.storage
        .from('public-assets')
        .upload(`ekraf/${filename}`, imageFile);

      if (!uploadError && uploadData) {
        const { data: publicUrlData } = locals.supabase.storage
          .from('public-assets')
          .getPublicUrl(`ekraf/${filename}`);
        image_url = publicUrlData.publicUrl;
      } else {
        console.error('Upload Error:', uploadError);
      }
    }

    const payload = {
      name,
      description,
      price,
      stock,
      status,
      image_url,
      whatsapp_link
    };

    if (id === 'new') {
      const { error: err } = await locals.supabase.from('merchandise').insert([payload]);

      if (err) {
        console.error(err);
        return { error: 'Gagal menambah produk', values: Object.fromEntries(data) };
      }
    } else {
      const { error: err } = await locals.supabase.from('merchandise').update(payload).eq('id', id);

      if (err) {
        console.error(err);
        return { error: 'Gagal menyimpan produk', values: Object.fromEntries(data) };
      }
    }

    throw redirect(303, '/dashboard/ekraf');
  }
};
;null as any as Actions;