<script lang="ts">
  import { enhance } from '$app/forms';
  import { ShoppingBag, Package, XCircle, Plus, Trash2, Edit } from 'lucide-svelte';
  import StatCard from '$lib/components/dashboard/StatCard.svelte';
  import DataTable from '$lib/components/dashboard/DataTable.svelte';
  import type { ColumnDef } from '$lib/components/dashboard/DataTable.svelte';
  import PageHeader from '$lib/components/dashboard/PageHeader.svelte';
  import { formatRupiah } from '$lib/utils/helpers';
  import { APP_META } from '$lib/config/site';

  let { data, form } = $props();

  const columns: ColumnDef<any>[] = [
    { key: 'name', label: 'Nama Produk' },
    { key: 'price', label: 'Harga' },
    { key: 'stock', label: 'Stok' },
    { key: 'status', label: 'Status' },
    { key: 'actions', label: 'Aksi', sortable: false }
  ];
</script>

<svelte:head>
  <title>Ekraf — Manajemen Produk | {APP_META.name} SIAKAD</title>
</svelte:head>

<!-- Page Header -->
<PageHeader
  title="Katalog Produk Ekraf"
  description="Kelola merchandise dan produk kreatif organisasi"
/>

<!-- Success / Error Alerts -->
{#if form?.success}
  <div
    class="flex items-center gap-3 p-4 mb-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-700 text-sm"
  >
    ✅ Produk berhasil dihapus!
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
  <StatCard title="Total Produk" value={data.stats.total} icon={ShoppingBag} color="blue" />
  <StatCard title="Stok Tersedia" value={data.stats.inStock} icon={Package} color="green" />
  <StatCard title="Habis / Out of Stock" value={data.stats.outOfStock} icon={XCircle} color="red" />
</div>

<!-- DataTable -->
<DataTable data={data.merchandise} {columns} searchPlaceholder="Cari nama produk...">
  {#snippet toolbar()}
    <a href="/dashboard/ekraf/produk/new" class="btn btn-primary btn-sm">
      <Plus class="w-4 h-4" />
      Tambah Produk
    </a>
  {/snippet}

  {#snippet customCell(row, col)}
    {#if col.key === 'name'}
      <div class="flex items-center gap-3">
        {#if row.image_url}
          <div class="w-10 h-10 rounded-lg bg-navy-50 overflow-hidden flex-shrink-0">
            <img src={row.image_url} alt={row.name} class="w-full h-full object-cover" />
          </div>
        {:else}
          <div
            class="w-10 h-10 rounded-lg bg-navy-50 flex items-center justify-center flex-shrink-0"
          >
            <ShoppingBag class="w-4 h-4 text-navy-300" />
          </div>
        {/if}
        <div class="font-600 text-navy-800">{row.name}</div>
      </div>
    {:else if col.key === 'price'}
      <span class="font-500 text-navy-700">{formatRupiah(row.price)}</span>
    {:else if col.key === 'stock'}
      <span class="font-500 {row.stock < 5 ? 'text-rose-600' : 'text-navy-700'}">
        {row.stock} unit
      </span>
    {:else if col.key === 'status'}
      {#if row.status === 'tersedia'}
        <span class="badge badge-success">Tersedia</span>
      {:else if row.status === 'pre_order'}
        <span class="badge bg-blue-100 text-blue-800 border-blue-200">Pre-Order</span>
      {:else}
        <span class="badge badge-danger">Habis</span>
      {/if}
    {:else if col.key === 'actions'}
      <div class="flex items-center gap-2">
        <a
          href={`/dashboard/ekraf/produk/${row.id}`}
          class="p-2 rounded-lg text-navy-400 hover:text-gold-500 hover:bg-gold-50 transition-colors"
          title="Edit"
        >
          <Edit class="w-4 h-4" />
        </a>
        <form
          method="POST"
          action="?/deleteProduct"
          use:enhance={({ cancel }) => {
            if (!confirm('Yakin ingin menghapus produk ini?')) {
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
