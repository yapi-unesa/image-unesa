<script lang="ts">
  import { enhance } from '$app/forms';
  import { Users, UserCheck, UserMinus, Plus, Trash2, Edit, AlertCircle } from 'lucide-svelte';
  import StatCard from '$lib/components/dashboard/StatCard.svelte';
  import DataTable from '$lib/components/dashboard/DataTable.svelte';
  import type { ColumnDef } from '$lib/components/dashboard/DataTable.svelte';
  import PageHeader from '$lib/components/dashboard/PageHeader.svelte';
  import { APP_META } from '$lib/config/site';

  let { data, form } = $props();

  const columns: ColumnDef<any>[] = [
    { key: 'nim', label: 'NIM' },
    { key: 'name', label: 'Nama Lengkap' },
    { key: 'generation', label: 'Angkatan' },
    { key: 'division', label: 'Divisi' },
    { key: 'status', label: 'Status' },
    { key: 'actions', label: 'Aksi', sortable: false }
  ];
</script>

<svelte:head>
  <title>DPO — Database Anggota | {APP_META.name} SIAKAD</title>
</svelte:head>

<PageHeader
  title="Database Anggota (DPO)"
  description="Pusat data kepengurusan dan keanggotaan organisasi"
/>

<!-- Success / Error Alerts -->
{#if form?.success}
  <div
    class="flex items-center gap-3 p-4 mb-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-700 text-sm"
  >
    ✅ Data anggota berhasil dihapus!
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
  <StatCard title="Total Anggota Terdaftar" value={data.stats.total} icon={Users} color="blue" />
  <StatCard title="Pengurus Aktif" value={data.stats.active} icon={UserCheck} color="green" />
  <StatCard title="Alumni / Demisioner" value={data.stats.alumni} icon={UserMinus} color="blue" />
</div>

<!-- DataTable -->
<DataTable data={data.members} {columns} searchPlaceholder="Cari NIM, Nama, atau Divisi...">
  {#snippet toolbar()}
    <a href="/dashboard/dpo/anggota/new" class="btn btn-primary btn-sm">
      <Plus class="w-4 h-4" />
      Tambah Anggota
    </a>
  {/snippet}

  {#snippet customCell(row, col)}
    {#if col.key === 'name'}
      <div>
        <div class="font-600 text-navy-800">{row.name}</div>
        <div class="text-xs text-navy-400">{row.role || 'Anggota'}</div>
      </div>
    {:else if col.key === 'nim'}
      <span class="font-mono text-sm text-navy-600">{row.nim}</span>
    {:else if col.key === 'generation'}
      <span class="text-navy-700">{row.generation}</span>
    {:else if col.key === 'division'}
      <span
        class="px-2.5 py-1 rounded-full bg-navy-50 text-navy-600 text-xs font-500 border border-navy-100 uppercase"
      >
        {row.division}
      </span>
    {:else if col.key === 'status'}
      {#if row.status === 'aktif'}
        <span class="badge badge-success">Aktif</span>
      {:else}
        <span class="badge bg-slate-100 text-slate-600 border-slate-200">Alumni</span>
      {/if}
    {:else if col.key === 'actions'}
      <div class="flex items-center gap-2">
        <a
          href={`/dashboard/dpo/anggota/${row.id}`}
          class="p-2 rounded-lg text-navy-400 hover:text-gold-500 hover:bg-gold-50 transition-colors"
          title="Edit"
        >
          <Edit class="w-4 h-4" />
        </a>
        <form
          method="POST"
          action="?/deleteMember"
          use:enhance={({ cancel }) => {
            if (!confirm(`Yakin ingin menghapus data anggota ${row.name}?`)) {
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
