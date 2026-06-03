<script lang="ts">
  import { enhance } from '$app/forms';
  import { ArrowLeft, Save, Shield } from 'lucide-svelte';
  import { page } from '$app/stores';

  let { data, form } = $props();

  const isEdit = $page.params.id !== 'new';
  let aspiration = data.aspiration || {};
  let values = form?.values || {};

  let submitting = $state(false);

  // Form State
  let topic = $state(values.topic || aspiration.topic || '');
  let submitter = $state(values.submitter || aspiration.submitter || 'Anonim');
  let date = $state(values.date || aspiration.date || new Date().toISOString().split('T')[0]);
  let priority = $state(values.priority || aspiration.priority || 'Sedang');
  let status = $state(values.status || aspiration.status || 'Ditinjau');
</script>

<svelte:head>
  <title>{isEdit ? 'Edit Tiket Aspirasi' : 'Buat Tiket Baru'} | Dashboard DPB</title>
</svelte:head>

<div class="flex items-center justify-between gap-4 mb-8">
  <div class="flex items-center gap-4">
    <a
      href="/dashboard/dpb"
      class="p-2 rounded-xl text-navy-400 hover:text-navy-900 hover:bg-white transition-colors"
    >
      <ArrowLeft class="w-5 h-5" />
    </a>
    <div>
      <h1 class="font-display text-2xl text-navy-900 mb-1">
        {isEdit ? 'Edit Tiket Aspirasi' : 'Buat Tiket Aspirasi'}
      </h1>
      <p class="text-navy-400 text-sm">Dewan Perwakilan Bidang</p>
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
  action="?/saveAspiration"
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
          <label for="topic" class="label">Topik Keluhan / Aspirasi *</label>
          <input
            type="text"
            id="topic"
            name="topic"
            bind:value={topic}
            placeholder="Contoh: Fasilitas ruang sekretariat yang kurang"
            class="input text-lg font-500"
            required
          />
        </div>

        <div class="grid sm:grid-cols-2 gap-5">
          <div>
            <label for="submitter" class="label">Nama Pengirim / Perwakilan</label>
            <input
              type="text"
              id="submitter"
              name="submitter"
              bind:value={submitter}
              class="input"
            />
          </div>
          <div>
            <label for="date" class="label">Tanggal Diterima *</label>
            <input type="date" id="date" name="date" bind:value={date} class="input" required />
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="flex flex-col gap-6">
    <div class="card p-6">
      <h3 class="font-600 text-navy-900 mb-4 flex items-center gap-2">
        <Shield class="w-4 h-4 text-indigo-500" />
        Tindak Lanjut
      </h3>

      <div class="flex flex-col gap-5">
        <div>
          <label for="priority" class="label">Tingkat Prioritas</label>
          <select id="priority" name="priority" bind:value={priority} class="input">
            <option value="Rendah">Rendah (Low)</option>
            <option value="Sedang">Sedang (Medium)</option>
            <option value="Tinggi">Tinggi (High)</option>
          </select>
        </div>

        <div>
          <label for="status" class="label">Status Penanganan</label>
          <select id="status" name="status" bind:value={status} class="input">
            <option value="Ditinjau">Ditinjau (Review)</option>
            <option value="Diproses">Sedang Diproses (In Progress)</option>
            <option value="Selesai">Selesai (Resolved)</option>
          </select>
        </div>

        <hr class="border-navy-100" />

        <button type="submit" disabled={submitting} class="btn btn-primary w-full">
          <Save class="w-4 h-4" />
          {submitting ? 'Menyimpan...' : 'Simpan Tiket'}
        </button>
      </div>
    </div>
  </div>
</form>
