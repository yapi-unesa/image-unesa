<script lang="ts">
  import { enhance } from '$app/forms';
  import { ArrowLeft, Save, FileText } from 'lucide-svelte';
  import { page } from '$app/stores';

  let { data, form } = $props();

  const isEdit = $page.params.id !== 'new';
  let transaction = data.transaction || {};
  let values = form?.values || {};

  let submitting = $state(false);

  // Form State
  let date = $state(values.date || (transaction.created_at ? new Date(transaction.created_at).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]));
  let description = $state(values.description || transaction.description || '');
  let type = $state(values.type || transaction.type || 'income');
  let amount = $state(values.amount || transaction.amount || '');
</script>

<svelte:head>
  <title>{isEdit ? 'Edit Transaksi' : 'Catat Transaksi Baru'} | BPH Dashboard</title>
</svelte:head>

<!-- Header -->
<div class="flex items-center justify-between gap-4 mb-8">
  <div class="flex items-center gap-4">
    <a
      href="/dashboard/bph"
      class="p-2 rounded-xl text-navy-400 hover:text-navy-900 hover:bg-white transition-colors"
    >
      <ArrowLeft class="w-5 h-5" />
    </a>
    <div>
      <h1 class="font-display text-2xl text-navy-900 mb-1">
        {isEdit ? 'Edit Catatan Transaksi' : 'Catat Transaksi Baru'}
      </h1>
      <p class="text-navy-400 text-sm">Pembukuan arus kas masuk dan keluar</p>
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
  action="?/saveTransaction"
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
        <!-- Date -->
        <div>
          <label for="date" class="label">Tanggal Transaksi *</label>
          <input type="date" id="date" name="date" bind:value={date} class="input" required />
        </div>

        <!-- Description -->
        <div>
          <label for="description" class="label">Deskripsi / Keterangan *</label>
          <input
            type="text"
            id="description"
            name="description"
            bind:value={description}
            placeholder="Contoh: Iuran Kas Anggota Bulan Mei"
            class="input font-500"
            required
          />
        </div>

        <!-- Amount -->
        <div>
          <label for="amount" class="label">Nominal Uang (Rp) *</label>
          <div class="relative">
            <span class="absolute left-4 top-1/2 -translate-y-1/2 text-navy-400 font-600">Rp</span>
            <input
              type="number"
              id="amount"
              name="amount"
              bind:value={amount}
              min="0"
              placeholder="50000"
              class="input pl-12 text-lg font-mono font-600 {type === 'income'
                ? 'text-emerald-700'
                : 'text-rose-700'}"
              required
            />
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Sidebar Column -->
  <div class="flex flex-col gap-6">
    <div class="card p-6">
      <h3 class="font-600 text-navy-900 mb-4 flex items-center gap-2">
        <FileText class="w-4 h-4 text-navy-400" />
        Jenis Transaksi
      </h3>

      <div class="flex flex-col gap-5">
        <!-- Type Selection using radio cards for better UI -->
        <div class="grid grid-cols-2 gap-3">
          <label class="relative cursor-pointer">
            <input type="radio" name="type" value="income" bind:group={type} class="peer sr-only" />
            <div
              class="p-3 border-2 rounded-xl text-center transition-all {type === 'income'
                ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                : 'border-slate-200 text-slate-500 hover:border-slate-300'}"
            >
              <div class="font-600 text-sm">Pemasukan</div>
            </div>
          </label>

          <label class="relative cursor-pointer">
            <input
              type="radio"
              name="type"
              value="expense"
              bind:group={type}
              class="peer sr-only"
            />
            <div
              class="p-3 border-2 rounded-xl text-center transition-all {type === 'expense'
                ? 'border-rose-500 bg-rose-50 text-rose-700'
                : 'border-slate-200 text-slate-500 hover:border-slate-300'}"
            >
              <div class="font-600 text-sm">Pengeluaran</div>
            </div>
          </label>
        </div>

        <hr class="border-navy-100" />

        <!-- Submit -->
        <button type="submit" disabled={submitting} class="btn btn-primary w-full">
          <Save class="w-4 h-4" />
          {submitting ? 'Menyimpan...' : 'Simpan Transaksi'}
        </button>
      </div>
    </div>
  </div>
</form>
