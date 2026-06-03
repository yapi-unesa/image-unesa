<script lang="ts">
  import { Calendar, User, ArrowLeft, Tag, Share2 } from 'lucide-svelte';

  let { data } = $props();
  let article = $derived(data.article);

  function formatDate(dateStr: string) {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
</script>

<svelte:head>
  <title>{article.title} | IMAGE UNESA</title>
  <meta name="description" content={article.excerpt} />
  <!-- Open Graph -->
  <meta property="og:title" content={article.title} />
  <meta property="og:description" content={article.excerpt} />
  {#if article.cover_url}
    <meta property="og:image" content={article.cover_url} />
  {/if}
</svelte:head>

<div class="pt-32 pb-24 bg-surface min-h-screen">
  <div class="container-base max-w-4xl mx-auto">
    <!-- Back Button -->
    <a
      href="/portofolio"
      class="inline-flex items-center gap-2 text-navy-400 hover:text-gold-500 font-600 transition-colors mb-8"
    >
      <ArrowLeft class="w-4 h-4" />
      <span>Kembali ke Jurnal</span>
    </a>

    <!-- Header -->
    <header class="mb-12">
      {#if article.category}
        <div
          class="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-gold-400/10 text-gold-600 text-xs font-700 uppercase tracking-wider mb-6"
        >
          <Tag class="w-3.5 h-3.5" />
          <span>{article.category}</span>
        </div>
      {/if}

      <h1 class="font-display font-800 text-3xl md:text-5xl text-navy-950 leading-tight mb-8">
        {article.title}
      </h1>

      <div
        class="flex flex-wrap items-center gap-6 text-sm font-500 text-navy-500 border-b border-navy-100 pb-8"
      >
        <div class="flex items-center gap-2">
          <User class="w-4 h-4 text-navy-300" />
          <span
            >Oleh <strong class="text-navy-900">{article.author?.full_name || 'Admin'}</strong
            ></span
          >
        </div>
        <div class="flex items-center gap-2">
          <Calendar class="w-4 h-4 text-navy-300" />
          <span>{formatDate(article.published_at)}</span>
        </div>
        <div class="flex-1"></div>
        <button class="flex items-center gap-2 text-navy-400 hover:text-gold-500 transition-colors">
          <Share2 class="w-4 h-4" />
          <span>Bagikan</span>
        </button>
      </div>
    </header>

    <!-- Cover Image -->
    {#if article.cover_url}
      <div
        class="w-full aspect-video md:aspect-[21/9] rounded-3xl bg-navy-50 mb-12 overflow-hidden shadow-card"
      >
        <img src={article.cover_url} alt={article.title} class="w-full h-full object-cover" />
      </div>
    {/if}

    <!-- Content -->
    <article class="prose prose-lg prose-navy max-w-none">
      {#if article.content}
        {@html article.content}
      {:else}
        <p class="text-navy-500 italic">Konten artikel belum tersedia.</p>
      {/if}
    </article>
  </div>
</div>
