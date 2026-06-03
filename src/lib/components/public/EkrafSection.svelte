<script lang="ts">
  import { onMount } from 'svelte';
  import { ShoppingBag, ArrowRight } from 'lucide-svelte';
  import type { Merchandise } from '$lib/types';
  import { formatRupiah, getWhatsAppLink } from '$lib/utils/helpers';

  let {
    merchandise = [],
    waContact = '6281234567890'
  }: {
    merchandise: Merchandise[];
    waContact?: string;
  } = $props();

  let visible = $state(false);
  let sectionEl: HTMLElement;

  const fallbackItems: Merchandise[] = [
    {
      id: '1',
      name: 'Kaos IMAGE UNESA',
      description:
        'Kaos premium cotton combed 30s dengan sablon gold IMAGE UNESA. Limited edition!',
      price: 85000,
      stock: 50,
      image_url: '/merch_kaos.webp',
      wa_link: null,
      is_active: true,
      created_by: null,
      created_at: new Date().toISOString()
    },
    {
      id: '2',
      name: 'Totebag Ekraf UNESA',
      description:
        'Tote bag kanvas tebal dengan bordir eksklusif logo IMAGE UNESA. Stylish dan ramah lingkungan.',
      price: 65000,
      stock: 30,
      image_url: '/event_hackathon.webp',
      wa_link: null,
      is_active: true,
      created_by: null,
      created_at: new Date().toISOString()
    },
    {
      id: '3',
      name: 'Mug Sinergi Asa',
      description: 'Mug keramik premium 350ml dengan desain eksklusif Kabinet Sinergi Asa 2026.',
      price: 55000,
      stock: 20,
      image_url: '/event_seminar.webp',
      wa_link: null,
      is_active: true,
      created_by: null,
      created_at: new Date().toISOString()
    }
  ];

  const displayItems = $derived(merchandise.length > 0 ? merchandise : fallbackItems);

  function buildWaLink(item: Merchandise) {
    if (item.wa_link) return item.wa_link;
    const msg = `Halo IMAGE UNESA! Saya ingin memesan *${item.name}* (Rp ${formatRupiah(item.price).replace('Rp\u00a0', '')}). Apakah masih tersedia?`;
    return getWhatsAppLink(waContact, msg);
  }

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          visible = true;
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (sectionEl) observer.observe(sectionEl);
    return () => observer.disconnect();
  });
</script>

<section id="ekraf" class="section bg-surface" bind:this={sectionEl}>
  <div class="container-base">
    <!-- Header -->
    <div class="text-center mb-16" class:animate-fade-up={visible} class:opacity-0={!visible}>
      <span class="section-kicker">Ekraf IMAGE</span>
      <h2 class="section-title">
        Produk <span class="text-gradient-gold">Eksklusif</span> Kami
      </h2>
      <p class="section-subtitle mx-auto text-center">
        Dukung IMAGE UNESA dengan memiliki merchandise eksklusif kami. Setiap pembelian mendukung
        program kegiatan organisasi.
      </p>
    </div>

    <!-- Merch Grid -->
    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {#each displayItems.slice(0, 6) as item, i}
        <div
          class="card-hover overflow-hidden group"
          class:opacity-0={!visible}
          style="animation: fadeUp 0.6s ease-out {0.1 + i * 0.1}s forwards;"
        >
          <!-- Product Image -->
          <div class="relative overflow-hidden h-64 bg-surface-secondary">
            <img
              src={item.image_url ?? '/merch_kaos.webp'}
              alt={item.name}
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <!-- Stock badge -->
            {#if item.stock <= 5 && item.stock > 0}
              <div
                class="absolute top-3 right-3 bg-rose-500 text-white text-xs font-600
                          px-3 py-1 rounded-full"
              >
                Sisa {item.stock}!
              </div>
            {:else if item.stock === 0}
              <div class="absolute inset-0 bg-navy-900/70 flex items-center justify-center">
                <span class="text-white font-600 tracking-widest uppercase text-sm">Habis</span>
              </div>
            {/if}
            <!-- Quick WA icon on hover -->
            <div
              class="absolute inset-0 bg-navy-900/0 group-hover:bg-navy-900/40
                        flex items-center justify-center transition-all duration-300"
            >
              <div
                class="opacity-0 group-hover:opacity-100 transition-opacity duration-300
                          glass rounded-full p-3"
              >
                <ShoppingBag class="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <!-- Product Info -->
          <div class="p-6">
            <h3
              class="font-display text-lg text-navy-900 mb-2 group-hover:text-navy-600 transition-colors"
            >
              {item.name}
            </h3>
            {#if item.description}
              <p class="text-navy-400 text-sm leading-relaxed mb-4 line-clamp-2">
                {item.description}
              </p>
            {/if}

            <div class="flex items-center justify-between mt-auto">
              <div>
                <div class="text-xs text-navy-400 font-accent uppercase tracking-wider mb-1">
                  Harga
                </div>
                <div class="font-display text-xl font-700 text-navy-900">
                  {formatRupiah(item.price)}
                </div>
              </div>

              {#if item.stock > 0}
                <a
                  href={buildWaLink(item)}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="btn btn-primary btn-sm gap-2"
                >
                  <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path
                      d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
                    />
                  </svg>
                  Beli via WA
                </a>
              {:else}
                <button class="btn btn-ghost btn-sm opacity-50 cursor-not-allowed" disabled>
                  Habis Terjual
                </button>
              {/if}
            </div>
          </div>
        </div>
      {/each}
    </div>

    <!-- CTA -->
    <div class="text-center mt-12" class:animate-fade-up={visible}>
      <a href="/ekraf" class="btn btn-outline group">
        Lihat Semua Produk
        <ArrowRight class="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </a>
    </div>
  </div>
</section>
