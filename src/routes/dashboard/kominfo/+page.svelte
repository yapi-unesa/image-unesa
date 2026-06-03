<script lang="ts">
  import { enhance } from '$app/forms';
  import { FileText, Send, Clock, Plus, Trash2, Edit } from 'lucide-svelte';
  import StatCard from '$lib/components/dashboard/StatCard.svelte';
  import DataTable from '$lib/components/dashboard/DataTable.svelte';
  import type { ColumnDef } from '$lib/components/dashboard/DataTable.svelte';
  import PageHeader from '$lib/components/dashboard/PageHeader.svelte';
  import { formatDate } from '$lib/utils/helpers';
  import { APP_META } from '$lib/config/site';

  let { data, form } = $props();

  // Konfigurasi kolom tabel
  const columns: ColumnDef<any>[] = [
    { key: 'title', label: 'Judul Artikel' },
    { key: 'category', label: 'Kategori' },
    { key: 'author_name', label: 'Penulis' },
    { key: 'status', label: 'Status' },
    { key: 'created_at', label: 'Dibuat Pada' },
    { key: 'actions', label: 'Aksi', sortable: false }
  ];

  // Pemrosesan data sebelum masuk tabel agar pencarian / sorting lebih optimal
  const processedData = $derived(
    data.articles.map((a) => ({
      ...a,
      author_name: a.author?.full_name || 'Unknown',
      status: a.is_published ? 'Published' : 'Draft'
    }))
  );
</script>

<svelte:head>
  <title>Kominfo — Artikel & Berita | {APP_META.name} SIAKAD</title>
</svelte:head>

<!-- Page Header -->
<PageHeader title="Manajemen Artikel" description="Kelola berita, jurnal, dan program kerja" />

<!-- Success / Error Alerts -->
{#if form?.success}
  <div
    class="flex items-center gap-3 p-4 mb-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-700 text-sm"
  >
    ✅ Artikel berhasil dihapus!
  </div>
{/if}
{#if form?.error}
  <div
    class="flex items-center gap-3 p-4 mb-6 bg-rose-50 border border-rose-200 rounded-2xl text-rose-700 text-sm"
  >
    ❌ {form.error}
  </div>
{/if}

<!-- Stat Cards -->
<div class="grid sm:grid-cols-3 gap-6 mb-8">
  <StatCard title="Total Artikel" value={data.stats.total} icon={FileText} color="blue" />
  <StatCard title="Dipublikasi" value={data.stats.published} icon={Send} color="green" />
  <StatCard title="Draft" value={data.stats.drafts} icon={Clock} color="gold" />
</div>

<!-- DataTable -->
<DataTable data={processedData} {columns} searchPlaceholder="Cari judul, penulis, atau kategori...">
  <!-- Toolbar: Add Article Button -->
  {#snippet toolbar()}
    <a href="/dashboard/kominfo/artikel/new" class="btn btn-primary btn-sm">
      <Plus class="w-4 h-4" />
      Tulis Artikel Baru
    </a>
  {/snippet}

  <!-- Custom cell rendering -->
  {#snippet customCell(row, col)}
    {#if col.key === 'title'}
      <div class="font-600 text-navy-800 max-w-sm truncate">{row.title}</div>
      <div class="text-xs text-navy-400 truncate mt-0.5">{row.slug}</div>
    {:else if col.key === 'category'}
      <span class="badge badge-navy text-xs uppercase">{row.category || '-'}</span>
    {:else if col.key === 'status'}
      {#if row.is_published}
        <span class="badge badge-success">Published</span>
      {:else}
        <span class="badge bg-yellow-100 text-yellow-800">Draft</span>
      {/if}
    {:else if col.key === 'created_at'}
      <span class="text-navy-500 whitespace-nowrap">
        {formatDate(row.created_at, { day: 'numeric', month: 'short', year: 'numeric' })}
      </span>
    {:else if col.key === 'actions'}
      <div class="flex items-center gap-2">
        <a
          href={`/dashboard/kominfo/artikel/${row.id}`}
          class="p-2 rounded-lg text-navy-400 hover:text-gold-500 hover:bg-gold-50 transition-colors"
          title="Edit"
        >
          <Edit class="w-4 h-4" />
        </a>
        <form
          method="POST"
          action="?/deleteArticle"
          use:enhance={({ cancel }) => {
            if (!confirm('Yakin ingin menghapus artikel ini?')) {
              cancel();
              return;
            }
            return async ({ update }) => update();
          }}
        >
          <input type="hidden" name="id" value={row.id} />
          <button
            type="submit"
            class="p-2 rounded-lg text-navy-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
            title="Hapus"
          >
            <Trash2 class="w-4 h-4" />
          </button>
        </form>
      </div>
    {:else}
      {row[col.key] || '-'}
    {/if}
  {/snippet}
</DataTable>

<!-- Override DataTable to inject actions column -->
<!-- Note: We defined only 5 columns, we need an actions column. 
     Wait, Svelte Snippets don't let us easily inject columns dynamically if the header isn't defined. 
     Let's define the Actions column in the columns array. -->
