<script lang="ts">
  import { enhance } from '$app/forms';
  import {
    Wallet,
    TrendingUp,
    TrendingDown,
    Plus,
    Trash2,
    Edit,
    AlertCircle,
    Download
  } from 'lucide-svelte';
  import StatCard from '$lib/components/dashboard/StatCard.svelte';
  import DataTable from '$lib/components/dashboard/DataTable.svelte';
  import type { ColumnDef } from '$lib/components/dashboard/DataTable.svelte';
  import PageHeader from '$lib/components/dashboard/PageHeader.svelte';
  import { formatRupiah } from '$lib/utils/helpers';
  import { APP_META } from '$lib/config/site';

  // Import jsPDF and autoTable for PDF export
  import jsPDF from 'jspdf';
  import autoTable from 'jspdf-autotable';

  let { data, form } = $props();

  const columns: ColumnDef<any>[] = [
    { key: 'created_at', label: 'Tanggal Transaksi' },
    { key: 'description', label: 'Deskripsi / Keterangan' },
    { key: 'type', label: 'Jenis' },
    { key: 'amount', label: 'Nominal' },
    { key: 'actions', label: 'Aksi', sortable: false }
  ];

  function formatDate(dateStr: string) {
    if (!dateStr) return '-';
    return new Date(dateStr).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  function exportPDF() {
    const doc = new jsPDF();

    // Title
    doc.setFontSize(16);
    doc.text(`Laporan Buku Kas - ${APP_META.name}`, 14, 15);
    doc.setFontSize(10);
    doc.text(`Dicetak pada: ${new Date().toLocaleString('id-ID')}`, 14, 22);

    // Stats Summary
    doc.setFontSize(11);
    doc.text(`Total Pemasukan: ${formatRupiah(data.stats.income)}`, 14, 32);
    doc.text(`Total Pengeluaran: ${formatRupiah(data.stats.expense)}`, 14, 38);
    doc.text(`Saldo Akhir: ${formatRupiah(data.stats.balance)}`, 14, 44);

    // Table Data
    const tableData = data.transactions.map((t: any) => [
      formatDate(t.created_at),
      t.description,
      t.type === 'income' ? 'Pemasukan' : 'Pengeluaran',
      formatRupiah(t.amount)
    ]);

    autoTable(doc, {
      startY: 50,
      head: [['Tanggal', 'Deskripsi', 'Jenis', 'Nominal']],
      body: tableData,
      theme: 'grid',
      headStyles: { fillColor: [15, 30, 84] } // Navy color
    });

    doc.save(`Laporan_Kas_${APP_META.name}_${new Date().getTime()}.pdf`);
  }
</script>

<svelte:head>
  <title>BPH — Rekap Keuangan | {APP_META.name} SIAKAD</title>
</svelte:head>

<PageHeader title="Buku Kas Organisasi" description="Rekapitulasi pemasukan dan pengeluaran">
  {#snippet actions()}
    <button
      onclick={exportPDF}
      class="btn bg-navy-50 text-navy-700 hover:bg-navy-100 border border-navy-200 shadow-sm"
      disabled={data.transactions.length === 0}
    >
      <Download class="w-4 h-4" />
      Ekspor PDF
    </button>
  {/snippet}
</PageHeader>

<!-- Success / Error Alerts -->
{#if form?.success}
  <div
    class="flex items-center gap-3 p-4 mb-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-700 text-sm"
  >
    ✅ Transaksi berhasil dihapus!
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
  <StatCard
    title="Saldo Akhir"
    value={formatRupiah(data.stats.balance)}
    icon={Wallet}
    color="blue"
  />
  <StatCard
    title="Total Pemasukan"
    value={formatRupiah(data.stats.income)}
    icon={TrendingUp}
    color="green"
  />
  <StatCard
    title="Total Pengeluaran"
    value={formatRupiah(data.stats.expense)}
    icon={TrendingDown}
    color="red"
  />
</div>

<!-- DataTable -->
<DataTable data={data.transactions} {columns} searchPlaceholder="Cari deskripsi transaksi...">
  {#snippet toolbar()}
    <a href="/dashboard/bph/transaksi/new" class="btn btn-primary btn-sm">
      <Plus class="w-4 h-4" />
      Catat Transaksi
    </a>
  {/snippet}

  {#snippet customCell(row, col)}
    {#if col.key === 'created_at'}
      <span class="font-500 text-navy-800">{formatDate(row.created_at)}</span>
    {:else if col.key === 'description'}
      <span class="text-navy-700">{row.description}</span>
    {:else if col.key === 'type'}
      {#if row.type === 'income'}
        <span class="badge badge-success">Pemasukan</span>
      {:else}
        <span class="badge badge-danger">Pengeluaran</span>
      {/if}
    {:else if col.key === 'amount'}
      <span
        class="font-mono text-sm font-600 {row.type === 'income'
          ? 'text-emerald-600'
          : 'text-rose-600'}"
      >
        {row.type === 'income' ? '+' : '-'}{formatRupiah(row.amount)}
      </span>
    {:else if col.key === 'actions'}
      <div class="flex items-center gap-2">
        <a
          href={`/dashboard/bph/transaksi/${row.id}`}
          class="p-2 rounded-lg text-navy-400 hover:text-gold-500 hover:bg-gold-50 transition-colors"
          title="Edit"
        >
          <Edit class="w-4 h-4" />
        </a>
        <form
          method="POST"
          action="?/deleteTransaction"
          use:enhance={({ cancel }) => {
            if (!confirm(`Yakin ingin menghapus catatan "${row.description}"?`)) {
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
