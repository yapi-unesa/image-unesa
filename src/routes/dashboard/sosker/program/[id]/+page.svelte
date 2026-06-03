<script lang="ts">
  import { enhance } from '$app/forms';
  import { ArrowLeft, Save, Heart } from 'lucide-svelte';
  import { page } from '$app/stores';

  let { data, form } = $props();

  const isEdit = $page.params.id !== 'new';
  let program = data.program || {};
  let values = form?.values || {};

  let submitting = $state(false);

  // Form State
  let title = $state(values.title || program.title || '');
  let date = $state(values.date || program.date || new Date().toISOString().split('T')[0]);
  let status = $state(values.status || program.status || 'Berjalan');
  let target_amount = $state(values.target_amount || program.target_amount || '');
  let collected_amount = $state(values.collected_amount || program.collected_amount || '');
</script>

<svelte:head>
  <title>{isEdit ? 'Edit Program Sosker' : 'Tambah Program Sosker'} | Dashboard</title>
</svelte:head>

<div class="flex items-center justify-between gap-4 mb-8">
  <div class="flex items-center gap-4">
    <a
      href="/dashboard/sosker"
      class="p-2 rounded-xl text-navy-400 hover:text-navy-900 hover:bg-white transition-colors"
    >
      <ArrowLeft class="w-5 h-5" />
    </a>
    <div>
      <h1 class="font-display text-2xl text-navy-900 mb-1">
        {isEdit ? 'Edit Program Sosial' : 'Buat Program Baru'}
      </h1>
      <p class="text-navy-400 text-sm">Departemen Sosial & Kerohanian</p>
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
  action="?/saveProgram"
  class="grid lg:grid-cols-[1fr_350px] gap-8"
  use:enhance={() => {
    submitting = true;
    return async ({ update }) => {
      submitting = false;
      await update();
    };
  }}
>
  <div class="flex flex-col gap-6">
    <div class="card p-6">
      <div class="flex flex-col gap-5">
        <div>
          <label for="title" class="label">Judul Program / Kegiatan *</label>
          <input
            type="text"
            id="title"
            name="title"
            bind:value={title}
            placeholder="Contoh: Donor Darah Bersama"
            class="input text-lg font-500"
            required
          />
        </div>

        <div class="grid sm:grid-cols-2 gap-5">
          <div>
            <label for="date" class="label">Tanggal Pelaksanaan *</label>
            <input type="date" id="date" name="date" bind:value={date} class="input" required />
          </div>
          <div>
            <label for="status" class="label">Status Program</label>
            <select id="status" name="status" bind:value={status} class="input">
              <option value="Akan Datang">Akan Datang</option>
              <option value="Berjalan">Sedang Berjalan</option>
              <option value="Selesai">Selesai</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="flex flex-col gap-6">
    <div class="card p-6">
      <h3 class="font-600 text-navy-900 mb-4 flex items-center gap-2">
        <Heart class="w-4 h-4 text-rose-500" />
        Penggalangan Dana
      </h3>

      <div class="flex flex-col gap-5">
        <p class="text-xs text-navy-400 leading-relaxed mb-1">
          Kosongkan atau isi 0 jika program ini tidak melibatkan pengumpulan dana/donasi.
        </p>

        <div>
          <label for="target_amount" class="label">Target Dana (Rp)</label>
          <input
            type="number"
            id="target_amount"
            name="target_amount"
            bind:value={target_amount}
            min="0"
            placeholder="0"
            class="input text-sm"
          />
        </div>

        <div>
          <label for="collected_amount" class="label">Dana Terkumpul Saat Ini (Rp)</label>
          <input
            type="number"
            id="collected_amount"
            name="collected_amount"
            bind:value={collected_amount}
            min="0"
            placeholder="0"
            class="input text-sm text-emerald-700 font-600 bg-emerald-50"
          />
        </div>

        <hr class="border-navy-100" />

        <button type="submit" disabled={submitting} class="btn btn-primary w-full">
          <Save class="w-4 h-4" />
          {submitting ? 'Menyimpan...' : 'Simpan Program'}
        </button>
      </div>
    </div>
  </div>
</form>
