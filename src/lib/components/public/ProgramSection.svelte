<script lang="ts">
  import { onMount } from 'svelte';
  import { ArrowRight, Tag } from 'lucide-svelte';
  import type { Article } from '$lib/types';
  import { formatDate, truncate } from '$lib/utils/helpers';

  let { articles = [] }: { articles: Article[] } = $props();

  let visible = $state(false);
  let sectionEl: HTMLElement;

  const categoryColors: Record<string, string> = {
    berita: 'badge-navy',
    program: 'badge-gold',
    pengumuman: 'bg-rose-50 text-rose-700 border border-rose-200',
    artikel: 'bg-purple-50 text-purple-700 border border-purple-200'
  };

  const fallbackPrograms = [
    {
      id: '1',
      title: 'IMAGE Leadership Camp 2026',
      excerpt:
        'Pelatihan kepemimpinan dan manajemen organisasi untuk mencetak kader pemimpin masa depan daerah Gresik.',
      cover_url: '/event_leadership.webp',
      category: 'program' as const,
      published_at: new Date().toISOString(),
      slug: 'image-leadership-camp-2026',
      is_published: true,
      content: null,
      author_id: null,
      created_at: new Date().toISOString()
    },
    {
      id: '2',
      title: 'Seminar Nasional Pendidikan 2026',
      excerpt:
        'Diskusi panel mengupas isu pendidikan terkini, mengundang pakar dan praktisi nasional untuk berbagi insight.',
      cover_url: '/event_seminar_nasional.webp',
      category: 'berita' as const,
      published_at: new Date().toISOString(),
      slug: 'seminar-nasional-pendidikan-2026',
      is_published: true,
      content: null,
      author_id: null,
      created_at: new Date().toISOString()
    },
    {
      id: '3',
      title: 'Bakti Sosial & Pengabdian Masyarakat',
      excerpt:
        'Kegiatan pengabdian kepada masyarakat Gresik: pemberian beasiswa, sembako, dan penyuluhan pendidikan.',
      cover_url: '/event_2_bem.webp',
      category: 'program' as const,
      published_at: new Date().toISOString(),
      slug: 'bakti-sosial-2026',
      is_published: true,
      content: null,
      author_id: null,
      created_at: new Date().toISOString()
    }
  ];

  const displayArticles = $derived(articles.length > 0 ? articles : fallbackPrograms);

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

<section id="program" class="section bg-surface-secondary" bind:this={sectionEl}>
  <div class="container-base">
    <!-- Header -->
    <div
      class="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-16"
      class:animate-fade-up={visible}
      class:opacity-0={!visible}
    >
      <div>
        <span class="section-kicker">Program Kerja</span>
        <h2 class="section-title mb-0">
          Inisiatif &amp; <span class="text-gradient-gold">Kolaborasi</span>
        </h2>
      </div>
      <a href="/portofolio" class="btn btn-outline group flex-shrink-0">
        Lihat Semua
        <ArrowRight class="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </a>
    </div>

    <!-- Featured (first card large) + rest -->
    <div class="grid lg:grid-cols-2 gap-8">
      <!-- Featured card -->
      {#if displayArticles[0]}
        {@const featured = displayArticles[0]}
        <div
          class="card-hover overflow-hidden lg:row-span-2 group"
          class:opacity-0={!visible}
          style="animation: fadeUp 0.6s ease-out 0.1s forwards;"
        >
          <div class="relative h-64 lg:h-80 overflow-hidden">
            <img
              src={featured.cover_url ?? '/event_leadership.webp'}
              alt={featured.title}
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div
              class="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-transparent to-transparent"
            ></div>
            <div class="absolute top-4 left-4">
              <span class="badge {categoryColors[featured.category] ?? 'badge-navy'} capitalize">
                <Tag class="w-3 h-3" />
                {featured.category}
              </span>
            </div>
          </div>
          <div class="p-8">
            {#if featured.published_at}
              <div class="text-navy-400 text-xs font-accent uppercase tracking-wider mb-3">
                {formatDate(featured.published_at)}
              </div>
            {/if}
            <h3
              class="font-display text-2xl text-navy-900 mb-4 leading-tight group-hover:text-navy-600 transition-colors"
            >
              {featured.title}
            </h3>
            <p class="text-navy-500 leading-relaxed mb-6 line-clamp-3">
              {featured.excerpt ?? ''}
            </p>
            <a
              href="/portofolio/{featured.slug}"
              class="inline-flex items-center gap-2 text-navy-900 font-600 text-sm hover:text-gold-600 transition-colors group/link"
            >
              Baca Selengkapnya
              <ArrowRight class="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      {/if}

      <!-- Smaller cards -->
      {#each displayArticles.slice(1, 3) as article, i}
        <div
          class="card-hover overflow-hidden group flex flex-col sm:flex-row"
          class:opacity-0={!visible}
          style="animation: fadeUp 0.6s ease-out {0.2 + i * 0.1}s forwards;"
        >
          <div class="sm:w-48 lg:w-40 xl:w-48 flex-shrink-0 overflow-hidden">
            <img
              src={article.cover_url ?? '/event_1_bem.webp'}
              alt={article.title}
              class="w-full h-48 sm:h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div class="p-6 flex flex-col justify-between">
            <div>
              <span
                class="badge {categoryColors[article.category] ?? 'badge-navy'} capitalize mb-3"
              >
                {article.category}
              </span>
              <h3
                class="font-display text-lg text-navy-900 mb-3 leading-tight group-hover:text-navy-600 transition-colors"
              >
                {article.title}
              </h3>
              <p class="text-navy-400 text-sm leading-relaxed line-clamp-2">
                {truncate(article.excerpt ?? '', 120)}
              </p>
            </div>
            <a
              href="/portofolio/{article.slug}"
              class="inline-flex items-center gap-1.5 text-navy-600 font-600 text-sm mt-4
                     hover:text-gold-600 transition-colors group/link"
            >
              Selengkapnya
              <ArrowRight class="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>
