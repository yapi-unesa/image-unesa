<script lang="ts">
  import { enhance } from '$app/forms';
  import { ArrowLeft, Save, FileText, Image as ImageIcon } from 'lucide-svelte';
  import { page } from '$app/stores';

  let { data, form } = $props();

  const isEdit = $page.params.id !== 'new';
  let article = data.article || {};
  let values = form?.values || {};

  let submitting = $state(false);

  // Fallbacks
  let title = $state(values.title || article.title || '');
  let slug = $state(values.slug || article.slug || '');
  let excerpt = $state(values.excerpt || article.excerpt || '');
  let content = $state(values.content || article.content || '');
  let category = $state(values.category || article.category || 'berita');
  let coverUrl = $state(values.cover_url || article.cover_url || '');
  let isPublished = $state(
    values.is_published !== undefined ? values.is_published : article.is_published || false
  );

  function generateSlug() {
    if (!title) return;
    slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  }
</script>

<svelte:head>
  <title>{isEdit ? 'Edit Artikel' : 'Tulis Artikel Baru'} | Kominfo Dashboard</title>
</svelte:head>

<!-- Header -->
<div class="flex items-center justify-between gap-4 mb-8">
  <div class="flex items-center gap-4">
    <a
      href="/dashboard/kominfo"
      class="p-2 rounded-xl text-navy-400 hover:text-navy-900 hover:bg-white transition-colors"
    >
      <ArrowLeft class="w-5 h-5" />
    </a>
    <div>
      <h1 class="font-display text-2xl text-navy-900 mb-1">
        {isEdit ? 'Edit Artikel' : 'Tulis Artikel Baru'}
      </h1>
      <p class="text-navy-400 text-sm">Gunakan format Markdown untuk mengatur gaya teks</p>
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
  action="?/saveArticle"
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
        <!-- Title -->
        <div>
          <label for="title" class="label">Judul Artikel *</label>
          <input
            type="text"
            id="title"
            name="title"
            bind:value={title}
            onblur={!slug && !isEdit ? generateSlug : null}
            placeholder="Masukkan judul artikel..."
            class="input text-lg font-500"
            required
          />
        </div>

        <!-- Content -->
        <div>
          <div class="flex items-center justify-between mb-2">
            <label for="content" class="label mb-0">Isi Konten (Markdown) *</label>
            <span class="text-xs text-navy-400">Gunakan #, **, * untuk format teks</span>
          </div>
          <textarea
            id="content"
            name="content"
            bind:value={content}
            rows="15"
            placeholder="Mulai menulis artikel di sini..."
            class="input font-mono text-sm leading-relaxed"
            required
          ></textarea>
        </div>

        <!-- Excerpt -->
        <div>
          <label for="excerpt" class="label">Ringkasan Singkat</label>
          <textarea
            id="excerpt"
            name="excerpt"
            bind:value={excerpt}
            rows="3"
            placeholder="Ringkasan atau paragraf pembuka..."
            class="input"
          ></textarea>
          <p class="text-xs text-navy-400 mt-1">
            Ditampilkan di kartu artikel pada halaman portofolio.
          </p>
        </div>
      </div>
    </div>
  </div>

  <!-- Sidebar Column -->
  <div class="flex flex-col gap-6">
    <div class="card p-6">
      <h3 class="font-600 text-navy-900 mb-4 flex items-center gap-2">
        <FileText class="w-4 h-4 text-navy-400" />
        Meta & Status
      </h3>

      <div class="flex flex-col gap-5">
        <!-- Slug -->
        <div>
          <label for="slug" class="label">URL Slug *</label>
          <input
            type="text"
            id="slug"
            name="slug"
            bind:value={slug}
            class="input font-mono text-sm"
            required
          />
        </div>

        <!-- Category -->
        <div>
          <label for="category" class="label">Kategori</label>
          <select id="category" name="category" bind:value={category} class="input">
            <option value="berita">Berita</option>
            <option value="kegiatan">Jurnal Kegiatan</option>
            <option value="sosial">Sosial & Masyarakat</option>
            <option value="opini">Opini</option>
          </select>
        </div>

        <!-- Image Upload -->
        <div>
          <label for="cover_image" class="label flex items-center gap-1.5">
            <ImageIcon class="w-4 h-4" /> Cover Gambar Artikel
          </label>
          {#if coverUrl}
            <div class="mb-3 relative group rounded-xl overflow-hidden border border-navy-100">
              <img src={coverUrl} alt="Cover Preview" class="w-full h-32 object-cover" />
            </div>
          {/if}
          <input type="hidden" name="existing_cover_url" value={coverUrl} />
          <input
            type="file"
            id="cover_image"
            name="cover_image"
            accept="image/*"
            class="input text-sm p-2"
          />
          <p class="text-xs text-navy-400 mt-1">
            Upload gambar (max 2MB). Biarkan kosong jika tidak ingin mengubah gambar.
          </p>
        </div>

        <hr class="border-navy-100" />

        <!-- Status / Publish toggle -->
        <label class="flex items-center justify-between cursor-pointer">
          <span class="font-600 text-navy-800 text-sm">Publikasikan Langsung</span>
          <div class="relative">
            <input
              type="checkbox"
              name="is_published"
              bind:checked={isPublished}
              class="sr-only peer"
            />
            <div
              class="w-11 h-6 bg-navy-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-navy-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"
            ></div>
          </div>
        </label>

        <!-- Submit -->
        <button type="submit" disabled={submitting} class="btn btn-primary w-full mt-2">
          <Save class="w-4 h-4" />
          {submitting ? 'Menyimpan...' : 'Simpan Artikel'}
        </button>
      </div>
    </div>
  </div>
</form>
