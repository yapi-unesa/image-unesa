<script lang="ts">
  import { enhance } from '$app/forms';
  import { ArrowLeft, Save, ShoppingBag, Image as ImageIcon, Link2 } from 'lucide-svelte';
  import { page } from '$app/stores';

  let { data, form } = $props();

  const isEdit = $page.params.id !== 'new';
  let product = data.product || {};
  let values = form?.values || {};

  let submitting = $state(false);

  // Form State
  let name = $state(values.name || product.name || '');
  let description = $state(values.description || product.description || '');
  let price = $state(values.price || product.price || '');
  let stock = $state(values.stock || product.stock || 0);
  let status = $state(values.status || product.status || 'tersedia');
  let imageUrl = $state(values.image_url || product.image_url || '');
  let whatsappLink = $state(values.whatsapp_link || product.whatsapp_link || '');
</script>

<svelte:head>
  <title>{isEdit ? 'Edit Produk' : 'Tambah Produk Baru'} | Ekraf Dashboard</title>
</svelte:head>

<!-- Header -->
<div class="flex items-center justify-between gap-4 mb-8">
  <div class="flex items-center gap-4">
    <a
      href="/dashboard/ekraf"
      class="p-2 rounded-xl text-navy-400 hover:text-navy-900 hover:bg-white transition-colors"
    >
      <ArrowLeft class="w-5 h-5" />
    </a>
    <div>
      <h1 class="font-display text-2xl text-navy-900 mb-1">
        {isEdit ? 'Edit Produk' : 'Tambah Produk Baru'}
      </h1>
      <p class="text-navy-400 text-sm">Kelola informasi katalog merchandise</p>
    </div>
  </div>
</div>

{#if form?.error}
  <div
    class="flex items-center gap-3 p-4 mb-6 bg-rose-50 border border-rose-200 rounded-2xl text-rose-700 text-sm"
  >
    ❌ {form.error}
  </div>
{/if}

<form
  method="POST"
  action="?/saveProduct"
  enctype="multipart/form-data"
  class="grid lg:grid-cols-[1fr_350px] gap-8"
  use:enhance={() => {
    submitting = true;
    return async ({ update }) => {
      submitting = false;
      await update();
    };
  }}
>
  <!-- Main Editor Column -->
  <div class="flex flex-col gap-6">
    <div class="card p-6">
      <div class="flex flex-col gap-5">
        <!-- Name -->
        <div>
          <label for="name" class="label">Nama Produk *</label>
          <input
            type="text"
            id="name"
            name="name"
            bind:value={name}
            placeholder="Contoh: PDH IMAGE UNESA 2026"
            class="input text-lg font-500"
            required
          />
        </div>

        <!-- Description -->
        <div>
          <label for="description" class="label">Deskripsi Produk</label>
          <textarea
            id="description"
            name="description"
            bind:value={description}
            rows="6"
            placeholder="Jelaskan detail bahan, ukuran yang tersedia, dll..."
            class="input resize-y"
          ></textarea>
        </div>

        <div class="grid sm:grid-cols-2 gap-5">
          <!-- Price -->
          <div>
            <label for="price" class="label">Harga (Rp) *</label>
            <div class="relative">
              <span class="absolute left-4 top-1/2 -translate-y-1/2 text-navy-400 font-600">Rp</span
              >
              <input
                type="number"
                id="price"
                name="price"
                bind:value={price}
                min="0"
                placeholder="150000"
                class="input pl-12"
                required
              />
            </div>
          </div>

          <!-- Stock -->
          <div>
            <label for="stock" class="label">Stok Tersedia *</label>
            <input
              type="number"
              id="stock"
              name="stock"
              bind:value={stock}
              min="0"
              class="input"
              required
            />
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Sidebar Column -->
  <div class="flex flex-col gap-6">
    <div class="card p-6">
      <h3 class="font-600 text-navy-900 mb-4 flex items-center gap-2">
        <ShoppingBag class="w-4 h-4 text-navy-400" />
        Meta & Visual
      </h3>

      <div class="flex flex-col gap-5">
        <!-- Status -->
        <div>
          <label for="status" class="label">Status Ketersediaan</label>
          <select id="status" name="status" bind:value={status} class="input">
            <option value="tersedia">Tersedia (Ready Stock)</option>
            <option value="pre_order">Pre-Order (PO)</option>
            <option value="habis">Habis (Out of Stock)</option>
          </select>
        </div>

        <!-- Image Upload -->
        <div>
          <label for="image" class="label flex items-center gap-1.5">
            <ImageIcon class="w-4 h-4" /> Cover Gambar Produk
          </label>
          {#if imageUrl}
            <div class="mb-3 relative group rounded-xl overflow-hidden border border-navy-100">
              <img src={imageUrl} alt="Cover Preview" class="w-full h-32 object-cover" />
            </div>
          {/if}
          <input type="hidden" name="existing_image_url" value={imageUrl} />
          <input type="file" id="image" name="image" accept="image/*" class="input text-sm p-2" />
          <p class="text-xs text-navy-400 mt-1">
            Upload gambar (max 2MB). Biarkan kosong jika tidak ingin mengubah gambar.
          </p>
        </div>

        <!-- Custom WA Link -->
        <div>
          <label for="whatsapp_link" class="label flex items-center gap-1.5">
            <Link2 class="w-4 h-4" /> Link WhatsApp Khusus
          </label>
          <input
            type="text"
            id="whatsapp_link"
            name="whatsapp_link"
            bind:value={whatsappLink}
            placeholder="https://wa.me/..."
            class="input text-sm"
          />
          <p class="text-xs text-navy-400 mt-1">Bila kosong, akan diarahkan ke nomor WA default.</p>
        </div>

        <hr class="border-navy-100" />

        <!-- Submit -->
        <button type="submit" disabled={submitting} class="btn btn-primary w-full">
          <Save class="w-4 h-4" />
          {submitting ? 'Menyimpan...' : 'Simpan Produk'}
        </button>
      </div>
    </div>
  </div>
</form>
