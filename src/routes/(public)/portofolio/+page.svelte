<script lang="ts">
  import { BookOpen, Calendar, User, ArrowRight } from 'lucide-svelte';

  let { data } = $props();
  let articles = data.articles || [];

  function formatDate(dateStr: string) {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
</script>

<svelte:head>
  <title>Portofolio & Berita | IMAGE UNESA</title>
  <meta
    name="description"
    content="Kumpulan berita, jurnal kegiatan, dan portofolio program kerja IMAGE UNESA."
  />
</svelte:head>

<div class="pt-32 pb-24 bg-surface min-h-screen">
  <div class="container-base">
    <!-- Header -->
    <div class="max-w-3xl mx-auto text-center mb-16">
      <div
        class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-400/10 text-gold-500 font-accent font-700 text-sm uppercase tracking-wider mb-6"
      >
        <BookOpen class="w-4 h-4" />
        <span>Jurnal & Berita</span>
      </div>
      <h1 class="font-display font-800 text-4xl md:text-5xl text-navy-950 mb-6 leading-tight">
        Rekam Jejak <span class="text-gold-500">Perjalanan</span>
      </h1>
      <p class="text-navy-600/80 text-lg leading-relaxed">
        Dokumentasi kegiatan, program kerja, dan pencapaian mahasiswa Gresik di Universitas Negeri
        Surabaya.
      </p>
    </div>

    <!-- Articles Grid -->
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {#each articles as article}
        <a
          href={`/portofolio/${article.slug}`}
          class="group rounded-3xl bg-white shadow-card border border-navy-50 overflow-hidden hover:shadow-card-hover transition-all duration-300 flex flex-col h-full"
        >
          <!-- Cover Image -->
          <div class="aspect-video bg-navy-50 relative overflow-hidden">
            {#if article.cover_url}
              <img
                src={article.cover_url}
                alt={article.title}
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            {:else}
              <div class="w-full h-full flex items-center justify-center">
                <BookOpen class="w-12 h-12 text-navy-200" />
              </div>
            {/if}
            <!-- Category Badge -->
            {#if article.category}
              <div
                class="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm text-navy-900 text-xs font-700 uppercase tracking-wider rounded-full shadow-sm"
              >
                {article.category}
              </div>
            {/if}
          </div>

          <!-- Content -->
          <div class="p-8 flex flex-col flex-1">
            <div
              class="flex items-center gap-4 text-xs font-600 text-navy-400 mb-4 uppercase tracking-wider"
            >
              <div class="flex items-center gap-1.5">
                <Calendar class="w-3.5 h-3.5" />
                <span>{formatDate(article.published_at)}</span>
              </div>
              <div class="flex items-center gap-1.5">
                <User class="w-3.5 h-3.5" />
                <span>{article.author?.full_name || 'Admin'}</span>
              </div>
            </div>

            <h3
              class="font-display font-700 text-xl text-navy-900 mb-3 line-clamp-2 group-hover:text-gold-600 transition-colors"
            >
              {article.title}
            </h3>

            <p class="text-navy-500 text-sm leading-relaxed mb-6 flex-1 line-clamp-3">
              {article.excerpt || 'Tidak ada ringkasan untuk artikel ini.'}
            </p>

            <div class="flex items-center justify-between mt-auto pt-4 border-t border-navy-50">
              <span
                class="text-sm font-700 text-gold-500 group-hover:text-gold-600 transition-colors"
              >
                Baca Selengkapnya
              </span>
              <div
                class="w-8 h-8 rounded-full bg-gold-50 text-gold-500 flex items-center justify-center group-hover:bg-gold-500 group-hover:text-white transition-colors"
              >
                <ArrowRight class="w-4 h-4" />
              </div>
            </div>
          </div>
        </a>
      {/each}
    </div>

    <!-- Empty State -->
    {#if articles.length === 0}
      <div
        class="text-center py-24 px-6 rounded-3xl border-2 border-dashed border-navy-100 bg-white/50"
      >
        <div
          class="w-20 h-20 mx-auto rounded-full bg-navy-50 flex items-center justify-center mb-6"
        >
          <BookOpen class="w-10 h-10 text-navy-200" />
        </div>
        <h3 class="font-display font-700 text-2xl text-navy-900 mb-2">Belum ada Artikel</h3>
        <p class="text-navy-500 max-w-md mx-auto">
          Saat ini belum ada artikel berita atau program kerja yang dipublikasikan.
        </p>
      </div>
    {/if}
  </div>
</div>
