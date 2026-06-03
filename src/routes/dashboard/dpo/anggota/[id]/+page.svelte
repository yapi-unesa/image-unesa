<script lang="ts">
  import { enhance } from '$app/forms';
  import { ArrowLeft, Save, IdCard } from 'lucide-svelte';
  import { page } from '$app/stores';

  let { data, form } = $props();

  const isEdit = $page.params.id !== 'new';
  let member = data.member || {};
  let values = form?.values || {};

  let submitting = $state(false);

  // Form State
  let nim = $state(values.nim || member.nim || '');
  let name = $state(values.name || member.name || '');
  let generation = $state(
    values.generation || member.generation || new Date().getFullYear().toString()
  );
  let division = $state(values.division || member.division || 'bph');
  let role = $state(values.role || member.role || 'Anggota');
  let phone = $state(values.phone || member.phone || '');
  let status = $state(values.status || member.status || 'aktif');
</script>

<svelte:head>
  <title>{isEdit ? 'Edit Anggota' : 'Tambah Anggota Baru'} | DPO Dashboard</title>
</svelte:head>

<!-- Header -->
<div class="flex items-center justify-between gap-4 mb-8">
  <div class="flex items-center gap-4">
    <a
      href="/dashboard/dpo"
      class="p-2 rounded-xl text-navy-400 hover:text-navy-900 hover:bg-white transition-colors"
    >
      <ArrowLeft class="w-5 h-5" />
    </a>
    <div>
      <h1 class="font-display text-2xl text-navy-900 mb-1">
        {isEdit ? 'Edit Data Anggota' : 'Tambah Anggota Baru'}
      </h1>
      <p class="text-navy-400 text-sm">Pusat data kepengurusan organisasi</p>
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
  action="?/saveMember"
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
        <!-- Name -->
        <div>
          <label for="name" class="label">Nama Lengkap *</label>
          <input
            type="text"
            id="name"
            name="name"
            bind:value={name}
            placeholder="Contoh: Muhammad Ali"
            class="input text-lg font-500"
            required
          />
        </div>

        <div class="grid sm:grid-cols-2 gap-5">
          <!-- NIM -->
          <div>
            <label for="nim" class="label">NIM *</label>
            <input
              type="text"
              id="nim"
              name="nim"
              bind:value={nim}
              placeholder="Contoh: 23050974011"
              class="input font-mono"
              required
            />
          </div>

          <!-- Generation -->
          <div>
            <label for="generation" class="label">Angkatan (Tahun) *</label>
            <input
              type="number"
              id="generation"
              name="generation"
              bind:value={generation}
              min="2010"
              max="2040"
              class="input"
              required
            />
          </div>
        </div>

        <div class="grid sm:grid-cols-2 gap-5">
          <!-- Phone -->
          <div>
            <label for="phone" class="label">Nomor WhatsApp</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              bind:value={phone}
              placeholder="Contoh: 08123456789"
              class="input"
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
        <IdCard class="w-4 h-4 text-navy-400" />
        Jabatan & Status
      </h3>

      <div class="flex flex-col gap-5">
        <!-- Division -->
        <div>
          <label for="division" class="label">Divisi *</label>
          <select id="division" name="division" bind:value={division} class="input uppercase">
            <option value="bph">BPH</option>
            <option value="dpo">DPO</option>
            <option value="dmb">DMB</option>
            <option value="dpb">DPB</option>
            <option value="kominfo">Kominfo</option>
            <option value="ekraf">Ekraf</option>
            <option value="sosker">Sosker</option>
          </select>
        </div>

        <!-- Role -->
        <div>
          <label for="role" class="label">Peran / Jabatan *</label>
          <input
            type="text"
            id="role"
            name="role"
            bind:value={role}
            placeholder="Contoh: Ketua Departemen"
            class="input text-sm"
          />
        </div>

        <!-- Status -->
        <div>
          <label for="status" class="label">Status Anggota</label>
          <select id="status" name="status" bind:value={status} class="input">
            <option value="aktif">Aktif (Pengurus)</option>
            <option value="demisioner">Demisioner</option>
            <option value="alumni">Alumni</option>
          </select>
        </div>

        <hr class="border-navy-100" />

        <!-- Submit -->
        <button type="submit" disabled={submitting} class="btn btn-primary w-full">
          <Save class="w-4 h-4" />
          {submitting ? 'Menyimpan...' : 'Simpan Data'}
        </button>
      </div>
    </div>
  </div>
</form>
