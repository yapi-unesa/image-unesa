<script lang="ts">
  import { ShoppingBag, MessageCircle, ExternalLink, Image as ImageIcon } from 'lucide-svelte';
  import { formatRupiah } from '$lib/utils/helpers';

  let { data } = $props();
  let merchandise = data.merchandise || [];
</script>

<svelte:head>
  <title>Katalog Merchandise | IMAGE UNESA</title>
  <meta
    name="description"
    content="Katalog merchandise resmi IMAGE UNESA yang dikelola oleh Departemen Ekonomi Kreatif."
  />
</svelte:head>

<div class="pt-32 pb-24 bg-surface min-h-screen">
  <div class="container-base">
    <!-- Header -->
    <div class="max-w-3xl mx-auto text-center mb-16">
      <div
        class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-400/10 text-gold-500 font-accent font-700 text-sm uppercase tracking-wider mb-6"
      >
        <ShoppingBag class="w-4 h-4" />
        <span>Ekonomi Kreatif</span>
      </div>
      <h1 class="font-display font-800 text-4xl md:text-5xl text-navy-950 mb-6 leading-tight">
        Katalog <span class="text-gold-500">Merchandise</span> Resmi
      </h1>
      <p class="text-navy-600/80 text-lg leading-relaxed">
        Dukung kegiatan IMAGE UNESA dengan membeli merchandise resmi. Setiap pembelian akan
        berkontribusi langsung pada kas organisasi.
      </p>
    </div>

    <!-- Product Grid -->
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {#each merchandise as item}
        {@const isOutOfStock = item.stock <= 0}

        <div
          class="group rounded-3xl bg-white shadow-card border border-navy-50 overflow-hidden hover:shadow-card-hover transition-all duration-300 flex flex-col h-full"
        >
          <!-- Image -->
          <div
            class="aspect-square bg-navy-50 relative overflow-hidden flex items-center justify-center"
          >
            {#if item.image_url}
              <img
                src={item.image_url}
                alt={item.name}
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            {:else}
              <ImageIcon class="w-16 h-16 text-navy-200" />
            {/if}

            <!-- Badges -->
            <div class="absolute top-4 right-4 flex flex-col gap-2">
              {#if isOutOfStock}
                <div
                  class="px-3 py-1 rounded-full bg-red-500 text-white text-xs font-700 tracking-wider"
                >
                  HABIS
                </div>
              {:else}
                <div
                  class="px-3 py-1 rounded-full bg-green-500 text-white text-xs font-700 tracking-wider"
                >
                  STOK: {item.stock}
                </div>
              {/if}
            </div>
          </div>

          <!-- Content -->
          <div class="p-8 flex flex-col flex-1">
            <h3 class="font-display font-700 text-xl text-navy-900 mb-2 line-clamp-2">
              {item.name}
            </h3>

            <p class="text-navy-500 text-sm leading-relaxed mb-6 flex-1 line-clamp-3">
              {item.description || 'Tidak ada deskripsi'}
            </p>

            <div class="flex items-end justify-between mt-auto">
              <div>
                <div class="text-navy-400 text-xs font-600 tracking-wider uppercase mb-1">
                  Harga
                </div>
                <div class="font-display font-800 text-2xl text-gold-500">
                  {formatRupiah(item.price)}
                </div>
              </div>

              {#if isOutOfStock}
                <button
                  disabled
                  class="w-12 h-12 rounded-xl bg-navy-50 text-navy-300 flex items-center justify-center cursor-not-allowed"
                  aria-label="Stok habis"
                >
                  <ShoppingBag class="w-5 h-5" />
                </button>
              {:else}
                <a
                  href={item.wa_link || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="w-12 h-12 rounded-xl bg-navy-900 text-white flex items-center justify-center hover:bg-gold-500 hover:text-navy-950 transition-colors shadow-glow-navy group-hover:shadow-glow-gold"
                  aria-label="Pesan via WhatsApp"
                >
                  <MessageCircle class="w-5 h-5" />
                </a>
              {/if}
            </div>
          </div>
        </div>
      {/each}
    </div>

    <!-- Empty State -->
    {#if merchandise.length === 0}
      <div
        class="text-center py-24 px-6 rounded-3xl border-2 border-dashed border-navy-100 bg-white/50"
      >
        <div
          class="w-20 h-20 mx-auto rounded-full bg-navy-50 flex items-center justify-center mb-6"
        >
          <ShoppingBag class="w-10 h-10 text-navy-200" />
        </div>
        <h3 class="font-display font-700 text-2xl text-navy-900 mb-2">Belum ada Merchandise</h3>
        <p class="text-navy-500 max-w-md mx-auto">
          Saat ini belum ada produk merchandise yang tersedia. Silakan cek kembali nanti.
        </p>
      </div>
    {/if}
  </div>
</div>
