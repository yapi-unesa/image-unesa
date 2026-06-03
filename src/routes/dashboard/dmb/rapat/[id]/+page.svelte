<script lang="ts">
  import { enhance } from '$app/forms';
  import { ArrowLeft, Save, Users, FileText } from 'lucide-svelte';
  import { page } from '$app/stores';

  let { data, form } = $props();

  const isEdit = $page.params.id !== 'new';
  let meeting = $derived(data.meeting || {});
  let values = $derived(form?.values || {});

  let submitting = $state(false);

  // Form State
  let agenda = $state(values.agenda || meeting.agenda || '');
  let date = $state(values.date || meeting.date || new Date().toISOString().split('T')[0]);
  let attendance = $state(values.attendance || meeting.attendance || '');
  let decision = $state(values.decision || meeting.decision || 'Disetujui');
  let notes = $state(values.notes || meeting.notes || '');
</script>

<svelte:head>
  <title>{isEdit ? 'Edit Notulensi Rapat' : 'Catat Notulensi Baru'} | Dashboard DMB</title>
</svelte:head>

<div class="flex items-center justify-between gap-4 mb-8">
  <div class="flex items-center gap-4">
    <a
      href="/dashboard/dmb"
      class="p-2 rounded-xl text-navy-400 hover:text-navy-900 hover:bg-white transition-colors"
    >
      <ArrowLeft class="w-5 h-5" />
    </a>
    <div>
      <h1 class="font-display text-2xl text-navy-900 mb-1">
        {isEdit ? 'Edit Notulensi Rapat' : 'Catat Notulensi Baru'}
      </h1>
      <p class="text-navy-400 text-sm">Dewan Musyawarah Bidang</p>
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
  action="?/saveMeeting"
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
          <label for="agenda" class="label">Agenda Rapat / Sidang *</label>
          <input
            type="text"
            id="agenda"
            name="agenda"
            bind:value={agenda}
            placeholder="Contoh: Rapat Pleno Tengah Tahun"
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
            <label for="attendance" class="label">Jumlah Kehadiran (Orang)</label>
            <input
              type="number"
              id="attendance"
              name="attendance"
              bind:value={attendance}
              min="0"
              placeholder="0"
              class="input"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="card p-6">
      <h3 class="font-600 text-navy-900 mb-4 flex items-center gap-2">
        <FileText class="w-4 h-4 text-emerald-500" />
        Catatan Singkat / Notulensi
      </h3>
      <div>
        <textarea
          id="notes"
          name="notes"
          bind:value={notes}
          rows="4"
          placeholder="Tuliskan intisari pembahasan rapat di sini..."
          class="input resize-y"
        ></textarea>
      </div>
    </div>
  </div>

  <div class="flex flex-col gap-6">
    <div class="card p-6">
      <h3 class="font-600 text-navy-900 mb-4 flex items-center gap-2">
        <Users class="w-4 h-4 text-emerald-500" />
        Hasil Keputusan
      </h3>

      <div class="flex flex-col gap-5">
        <div>
          <label for="decision" class="label">Keputusan Akhir Sidang *</label>
          <select id="decision" name="decision" bind:value={decision} class="input">
            <option value="Disetujui">Disetujui</option>
            <option value="Ditunda">Ditunda / Status Quo</option>
            <option value="Ditolak">Ditolak</option>
          </select>
        </div>

        <hr class="border-navy-100" />

        <button type="submit" disabled={submitting} class="btn btn-primary w-full">
          <Save class="w-4 h-4" />
          {submitting ? 'Menyimpan...' : 'Simpan Arsip Rapat'}
        </button>
      </div>
    </div>
  </div>
</form>
