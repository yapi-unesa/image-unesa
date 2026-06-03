<script lang="ts">
  import { enhance } from '$app/forms';
  import { Users, Plus, Edit, Trash2, AlertCircle } from 'lucide-svelte';
  import DataTable from '$lib/components/dashboard/DataTable.svelte';
  import type { ColumnDef } from '$lib/components/dashboard/DataTable.svelte';
  import PageHeader from '$lib/components/dashboard/PageHeader.svelte';
  import { APP_META } from '$lib/config/site';

  let { data, form } = $props();

  const columns: ColumnDef<any>[] = [
    { key: 'agenda', label: 'Agenda Rapat / Sidang' },
    { key: 'date', label: 'Tanggal' },
    { key: 'attendance', label: 'Kehadiran' },
    { key: 'decision', label: 'Keputusan' },
    { key: 'notes', label: 'Catatan Singkat' },
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
  <title>DMB — Musyawarah | {APP_META.name} SIAKAD</title>
</svelte:head>

<PageHeader
  title="Dewan Musyawarah Bidang (DMB)"
  description="Arsip notulensi sidang dan keputusan strategis"
/>

{#if form?.success}
  <div
    class="flex items-center gap-3 p-4 mb-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-700 text-sm"
  >
    ✅ Arsip rapat berhasil dihapus!
  </div>
{/if}
{#if form?.error}
  <div
    class="flex items-center gap-3 p-4 mb-6 bg-rose-50 border border-rose-200 rounded-2xl text-rose-700 text-sm"
  >
    ❌ {form.error}
  </div>
{/if}

<DataTable data={data.meetings} {columns} searchPlaceholder="Cari agenda rapat...">
  {#snippet toolbar()}
    <a href="/dashboard/dmb/rapat/new" class="btn btn-primary btn-sm">
      <Plus class="w-4 h-4" />
      Catat Notulensi
    </a>
  {/snippet}

  {#snippet customCell(row, col)}
    {#if col.key === 'agenda'}
      <span class="font-600 text-navy-900">{row.agenda}</span>
    {:else if col.key === 'date'}
      <span class="text-navy-600">{formatDate(row.date)}</span>
    {:else if col.key === 'attendance'}
      <span class="font-mono text-sm">{row.attendance} Orang</span>
    {:else if col.key === 'notes'}
      <span class="text-navy-500 text-sm">{row.notes}</span>
    {:else if col.key === 'decision'}
      {#if row.decision === 'Disetujui'}
        <span class="badge badge-success">Disetujui</span>
      {:else if row.decision === 'Ditolak'}
        <span class="badge badge-danger">Ditolak</span>
      {:else}
        <span class="badge badge-warning">Ditunda</span>
      {/if}
    {:else if col.key === 'actions'}
      <div class="flex items-center gap-2">
        <a
          href={`/dashboard/dmb/rapat/${row.id}`}
          class="p-2 rounded-lg text-navy-400 hover:text-gold-500 hover:bg-gold-50 transition-colors"
          title="Edit"
        >
          <Edit class="w-4 h-4" />
        </a>
        <form
          method="POST"
          action="?/deleteMeeting"
          use:enhance={({ cancel }) => {
            if (!confirm(`Yakin ingin menghapus arsip rapat "${row.agenda}"?`)) {
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
