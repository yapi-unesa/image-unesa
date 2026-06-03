<script lang="ts">
  import { enhance } from '$app/forms';
  import { Shield, Plus, Edit, Trash2, AlertCircle } from 'lucide-svelte';
  import DataTable from '$lib/components/dashboard/DataTable.svelte';
  import type { ColumnDef } from '$lib/components/dashboard/DataTable.svelte';
  import PageHeader from '$lib/components/dashboard/PageHeader.svelte';
  import { APP_META } from '$lib/config/site';

  let { data, form } = $props();

  const columns: ColumnDef<any>[] = [
    { key: 'topic', label: 'Topik Aspirasi' },
    { key: 'submitter', label: 'Pengirim' },
    { key: 'date', label: 'Tanggal' },
    { key: 'priority', label: 'Prioritas' },
    { key: 'status', label: 'Status' },
    { key: 'actions', label: 'Aksi', sortable: false }
  ];

  function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }
</script>

<svelte:head>
  <title>DPB — Aspirasi | {APP_META.name} SIAKAD</title>
</svelte:head>

<PageHeader
  title="Dewan Perwakilan Bidang (DPB)"
  description="Manajemen pengawasan dan aspirasi mahasiswa"
/>

{#if form?.success}
  <div
    class="flex items-center gap-3 p-4 mb-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-700 text-sm"
  >
    ✅ Tiket aspirasi berhasil dihapus!
  </div>
{/if}
{#if form?.error}
  <div
    class="flex items-center gap-3 p-4 mb-6 bg-rose-50 border border-rose-200 rounded-2xl text-rose-700 text-sm"
  >
    ❌ {form.error}
  </div>
{/if}

<DataTable data={data.aspirations} {columns} searchPlaceholder="Cari topik aspirasi...">
  {#snippet toolbar()}
    <a href="/dashboard/dpb/aspirasi/new" class="btn btn-primary btn-sm">
      <Plus class="w-4 h-4" />
      Buat Tiket
    </a>
  {/snippet}

  {#snippet customCell(row, col)}
    {#if col.key === 'topic'}
      <span class="font-600 text-navy-900">{row.topic}</span>
    {:else if col.key === 'date'}
      <span class="text-navy-600">{formatDate(row.date)}</span>
    {:else if col.key === 'submitter'}
      <span class="text-navy-500">{row.submitter}</span>
    {:else if col.key === 'priority'}
      {#if row.priority === 'Tinggi'}
        <span class="badge badge-danger">Tinggi</span>
      {:else if row.priority === 'Sedang'}
        <span class="badge badge-warning">Sedang</span>
      {:else}
        <span class="badge bg-slate-100 text-slate-600">Rendah</span>
      {/if}
    {:else if col.key === 'status'}
      {#if row.status === 'Selesai'}
        <span class="badge badge-success">Selesai</span>
      {:else if row.status === 'Diproses'}
        <span class="badge bg-indigo-100 text-indigo-700">Diproses</span>
      {:else}
        <span class="badge bg-amber-100 text-amber-700">Ditinjau</span>
      {/if}
    {:else if col.key === 'actions'}
      <div class="flex items-center gap-2">
        <a
          href={`/dashboard/dpb/aspirasi/${row.id}`}
          class="p-2 rounded-lg text-navy-400 hover:text-gold-500 hover:bg-gold-50 transition-colors"
          title="Edit"
        >
          <Edit class="w-4 h-4" />
        </a>
        <form
          method="POST"
          action="?/deleteAspiration"
          use:enhance={({ cancel }) => {
            if (!confirm(`Yakin ingin menghapus tiket "${row.topic}"?`)) {
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
      {row[col.key]}
    {/if}
  {/snippet}
</DataTable>
