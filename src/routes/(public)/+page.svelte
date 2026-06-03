<script lang="ts">
  import { APP_META } from '$lib/config/site';
  import HeroSection from '$lib/components/public/HeroSection.svelte';
  import AboutSection from '$lib/components/public/AboutSection.svelte';
  import ProgramSection from '$lib/components/public/ProgramSection.svelte';
  import EkrafSection from '$lib/components/public/EkrafSection.svelte';

  let { data } = $props();
</script>

<svelte:head>
  <title>{APP_META.name} — {APP_META.tagline}</title>
  <meta name="description" content={APP_META.description} />
  <meta
    property="og:title"
    content="{APP_META.name} — {data.siteConfig?.hero_title ?? APP_META.cabinet}"
  />
  <meta
    property="og:description"
    content={data.siteConfig?.hero_subtitle ?? APP_META.description}
  />
  <meta property="og:image" content="/hero_campus.webp" />
  <meta property="og:url" content={APP_META.url} />
  <link rel="canonical" href={APP_META.url} />

  <!-- Structured Data: Organization -->
  {@html `<script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "IMAGE UNESA",
    "description": "${APP_META.description}",
    "url": "${APP_META.url}",
    "logo": "${APP_META.url}/favicon.svg",
    "sameAs": [
      "${data.siteConfig?.social_links?.instagram ?? ''}",
      "${data.siteConfig?.social_links?.youtube ?? ''}"
    ]
  }
  </script>`}
</svelte:head>

<!-- ── Oprec Banner (Conditional) ──────────────────────────────── -->
{#if data.siteConfig?.is_oprec_open}
  <div class="fixed top-0 left-0 right-0 z-[110] bg-gradient-gold py-2.5 px-4">
    <div class="container-base flex items-center justify-center gap-3 text-navy-900">
      <span class="animate-pulse">🎯</span>
      <span class="font-accent font-700 text-sm">
        Open Recruitment IMAGE UNESA sedang DIBUKA!
        {#if data.siteConfig.oprec_deadline}
          <span class="opacity-70">
            · Tutup: {new Date(data.siteConfig.oprec_deadline).toLocaleDateString('id-ID', {
              day: 'numeric',
              month: 'long'
            })}
          </span>
        {/if}
      </span>
      <a href="/oprec" class="underline font-700 hover:opacity-80 transition-opacity"> Daftar → </a>
    </div>
  </div>
{/if}

<!-- ── Page Sections ─────────────────────────────────────────── -->
<HeroSection config={data.siteConfig} />
<AboutSection />
<ProgramSection articles={data.articles} />
<EkrafSection merchandise={data.merchandise} waContact={data.siteConfig?.whatsapp_contact} />

<!-- ── Sponsor/Partner Section ──────────────────────────────── -->
<section class="section-sm bg-surface-secondary">
  <div class="container-base">
    <div class="text-center mb-12">
      <span class="section-kicker">Mitra & Sponsor</span>
      <h2 class="text-display-md font-display text-navy-900">
        Mereka yang <span class="text-gradient-gold">Mendukung Kami</span>
      </h2>
    </div>

    {#if data.siteConfig?.sponsor_logos && data.siteConfig.sponsor_logos.length > 0}
      <div class="flex flex-wrap items-center justify-center gap-8">
        {#each data.siteConfig.sponsor_logos as sponsor}
          <a
            href={sponsor.website_url ?? '#'}
            target="_blank"
            rel="noopener noreferrer"
            class="grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300"
          >
            <img src={sponsor.logo_url} alt={sponsor.name} class="h-12 w-auto object-contain" />
          </a>
        {/each}
      </div>
    {:else}
      <!-- Empty state for sponsors -->
      <div class="text-center py-12">
        <div class="text-4xl mb-4">🤝</div>
        <p class="text-navy-400 text-sm max-w-md mx-auto">
          Ingin menjadi mitra atau sponsor IMAGE UNESA? Kami terbuka untuk kolaborasi yang saling
          menguntungkan.
        </p>
        <a href="/sponsor" class="btn btn-outline mt-6"> Pelajari Kerjasama Sponsor </a>
      </div>
    {/if}
  </div>
</section>

<!-- ── CTA Section ───────────────────────────────────────────── -->
<section class="relative overflow-hidden py-28">
  <!-- Dark background -->
  <div class="absolute inset-0 bg-mesh-navy"></div>
  <div
    class="absolute inset-0 opacity-20"
    style="background-image: url('/hero_campus.webp'); background-size: cover; background-position: center;"
  ></div>
  <div class="absolute inset-0 bg-navy-950/80"></div>

  <div class="relative z-10 container-base text-center">
    <h2 class="font-display text-4xl lg:text-5xl text-white mb-6 leading-tight">
      Siap Bergabung dengan<br />
      <span class="text-gradient-gold">Keluarga IMAGE UNESA?</span>
    </h2>
    <p class="text-navy-200 text-lg max-w-xl mx-auto mb-10">
      {#if data.siteConfig?.is_oprec_open}
        Open Recruitment sedang dibuka! Jangan lewatkan kesempatan untuk menjadi bagian dari
        keluarga besar kami.
      {:else}
        Pantau terus media sosial kami untuk informasi Open Recruitment periode berikutnya.
      {/if}
    </p>
    <div class="flex flex-col sm:flex-row gap-4 justify-center">
      {#if data.siteConfig?.is_oprec_open}
        <a href="/oprec" class="btn btn-primary btn-lg"> 🎯 Daftar Open Recruitment </a>
      {/if}
      <a
        href="https://instagram.com/{data.siteConfig?.social_links?.instagram?.replace(
          'https://instagram.com/',
          ''
        ) ?? 'imageunesa'}"
        target="_blank"
        rel="noopener noreferrer"
        class="btn btn-outline border-white/30 text-white hover:bg-white hover:text-navy-900 btn-lg"
      >
        📸 Ikuti @ImageUNESA
      </a>
    </div>
  </div>
</section>
