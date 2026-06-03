<script lang="ts">
  import { enhance } from '$app/forms';
  import { Heart, Plus, Edit, Trash2, AlertCircle } from 'lucide-svelte';
  import DataTable from '$lib/components/dashboard/DataTable.svelte';
  import type { ColumnDef } from '$lib/components/dashboard/DataTable.svelte';
  import PageHeader from '$lib/components/dashboard/PageHeader.svelte';
  import { formatRupiah } from '$lib/utils/helpers';
  import { APP_META } from '$lib/config/site';

  let { data, form } = $props();

  const columns: ColumnDef<any>[] = [
    { key: 'title', label: 'Nama Program / Kegiatan' },
    { key: 'date', label: 'Tanggal' },
    { key: 'status', label: 'Status' },
    { key: 'donation', label: 'Donasi / Dana', sortable: false },
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
  <title>Sosker — Sosial Kerohanian | {APP_META.name} SIAKAD</title>
</svelte:head>

<PageHeader title="Sosial Kerohanian" description="Manajemen program amal, keagamaan, dan sosial" />

{#if form?.success}
  <div
    class="flex items-center gap-3 p-4 mb-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-700 text-sm"
  >
    ✅ Program berhasil dihapus!
  </div>
{/if}
{#if form?.error}
  <div
    class="flex items-center gap-3 p-4 mb-6 bg-rose-50 border border-rose-200 rounded-2xl text-rose-700 text-sm"
  >
    ❌ {form.error}
  </div>
{/if}

<DataTable data={data.programs} {columns} searchPlaceholder="Cari nama kegiatan...">
  {#snippet toolbar()}
    <a href="/dashboard/sosker/program/new" class="btn btn-primary btn-sm">
      <Plus class="w-4 h-4" />
      Tambah Program
    </a>
  {/snippet}

  {#snippet customCell(row, col)}
    {#if col.key === 'title'}
      <span class="font-600 text-navy-900">{row.title}</span>
    {:else if col.key === 'date'}
      <span class="text-navy-600">{formatDate(row.date)}</span>
    {:else if col.key === 'status'}
      {#if row.status === 'Selesai'}
        <span class="badge badge-success">Selesai</span>
      {:else if row.status === 'Berjalan'}
        <span class="badge bg-indigo-100 text-indigo-700">Berjalan</span>
      {:else}
        <span class="badge badge-warning">Akan Datang</span>
      {/if}
    {:else if col.key === 'donation'}
      {#if row.target_amount > 0}
        <div class="flex flex-col gap-1 w-full max-w-[150px]">
          <div class="flex justify-between text-xs">
            <span class="font-500 text-emerald-600">{formatRupiah(row.collected_amount)}</span>
            <span class="text-navy-400">/ {formatRupiah(row.target_amount)}</span>
          </div>
          <div class="w-full bg-slate-100 rounded-full h-1.5">
            <div
              class="bg-emerald-500 h-1.5 rounded-full"
              style="width: {Math.min(100, (row.collected_amount / row.target_amount) * 100)}%"
            ></div>
          </div>
        </div>
      {:else}
        <span class="text-navy-300 text-sm italic">Non-dana</span>
      {/if}
    {:else if col.key === 'actions'}
      <div class="flex items-center gap-2">
        <a
          href={`/dashboard/sosker/program/${row.id}`}
          class="p-2 rounded-lg text-navy-400 hover:text-gold-500 hover:bg-gold-50 transition-colors"
          title="Edit"
        >
          <Edit class="w-4 h-4" />
        </a>
        <form
          method="POST"
          action="?/deleteProgram"
          use:enhance={({ cancel }) => {
            if (!confirm(`Yakin ingin menghapus program "${row.title}"?`)) {
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
