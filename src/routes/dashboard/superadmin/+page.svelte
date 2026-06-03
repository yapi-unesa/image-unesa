<script lang="ts">
  import { enhance } from '$app/forms';
  import {
    Save,
    Globe,
    MessageCircle,
    Mail,
    Users,
    Trophy,
    Calendar,
    Star,
    ToggleLeft,
    ToggleRight,
    ExternalLink
  } from 'lucide-svelte';
  import { APP_META } from '$lib/config/site';

  let { data, form } = $props();
  let config = $derived(data.config);
  let submitting = $state(false);
  let isOprecOpen = $state(data.config?.is_oprec_open ?? false);
</script>

<svelte:head>
  <title>Pengaturan Website | {APP_META.name} SIAKAD</title>
</svelte:head>

<!-- Page Header -->
<div class="flex items-center justify-between gap-4 mb-8">
  <div>
    <h1 class="font-display text-2xl text-navy-900 mb-1">⚙️ Pengaturan Website</h1>
    <p class="text-navy-400 text-sm">
      Ubah konten halaman publik tanpa menyentuh kode. Perubahan langsung terlihat di website.
    </p>
  </div>
  <a href="/" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm gap-2">
    <ExternalLink class="w-4 h-4" />
    Lihat Situs
  </a>
</div>

<!-- Success / Error Alerts -->
{#if form?.success}
  <div
    class="flex items-center gap-3 p-4 mb-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-700"
  >
    ✅ {form.message}
  </div>
{/if}
{#if form?.error}
  <div
    class="flex items-center gap-3 p-4 mb-6 bg-rose-50 border border-rose-200 rounded-2xl text-rose-700"
  >
    ❌ {form.error}
  </div>
{/if}

<!-- Config Form -->
<form
  method="POST"
  action="?/updateConfig"
  use:enhance={() => {
    submitting = true;
    return async ({ update }) => {
      submitting = false;
      await update();
    };
  }}
  class="flex flex-col gap-8"
>
  <!-- Section: Hero -->
  <div class="card p-8">
    <div class="flex items-center gap-3 mb-6 pb-6 border-b border-navy-50">
      <div class="w-10 h-10 rounded-xl bg-navy-100 flex items-center justify-center">
        <Globe class="w-5 h-5 text-navy-600" />
      </div>
      <div>
        <h2 class="font-display text-lg text-navy-900">Konten Hero / Beranda</h2>
        <p class="text-navy-400 text-xs">Teks utama yang tampil di bagian atas halaman publik</p>
      </div>
    </div>

    <div class="grid gap-5">
      <div>
        <label class="label" for="hero_badge">Badge / Label Kecil</label>
        <input
          id="hero_badge"
          name="hero_badge"
          type="text"
          value={config?.hero_badge ?? ''}
          placeholder="Ikatan Mahasiswa Gresik · UNESA"
          class="input"
        />
        <p class="text-navy-400 text-xs mt-1">Teks kecil di atas judul utama</p>
      </div>

      <div>
        <label class="label" for="hero_title">Judul Utama (Hero Title)</label>
        <input
          id="hero_title"
          name="hero_title"
          type="text"
          value={config?.hero_title ?? ''}
          required
          placeholder="Kabinet Sinergi Asa"
          class="input"
        />
        <p class="text-navy-400 text-xs mt-1">Nama kabinet atau tagline utama. 2-4 kata ideal.</p>
      </div>

      <div>
        <label class="label" for="hero_subtitle">Deskripsi / Subtitle</label>
        <textarea
          id="hero_subtitle"
          name="hero_subtitle"
          rows="3"
          placeholder="Mari wujudkan kolaborasi progresif..."
          class="input resize-none">{config?.hero_subtitle ?? ''}</textarea
        >
      </div>
    </div>
  </div>

  <!-- Section: Kontak -->
  <div class="card p-8">
    <div class="flex items-center gap-3 mb-6 pb-6 border-b border-navy-50">
      <div class="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
        <MessageCircle class="w-5 h-5 text-emerald-600" />
      </div>
      <div>
        <h2 class="font-display text-lg text-navy-900">Informasi Kontak</h2>
        <p class="text-navy-400 text-xs">Nomor WA dan email yang ditampilkan di situs</p>
      </div>
    </div>

    <div class="grid sm:grid-cols-2 gap-5">
      <div>
        <label class="label" for="whatsapp_contact">Nomor WhatsApp</label>
        <div class="relative">
          <span class="absolute left-4 top-1/2 -translate-y-1/2 text-navy-400 text-sm font-600"
            >+</span
          >
          <input
            id="whatsapp_contact"
            name="whatsapp_contact"
            type="tel"
            value={config?.whatsapp_contact ?? ''}
            placeholder="6281234567890"
            class="input pl-8"
          />
        </div>
        <p class="text-navy-400 text-xs mt-1">
          Format: kode negara + nomor (tanpa + atau 0 di awal)
        </p>
      </div>

      <div>
        <label class="label" for="email_contact">Email Resmi</label>
        <div class="relative">
          <Mail class="absolute left-4 top-1/2 -translate-y-1/2 text-navy-400 w-4 h-4" />
          <input
            id="email_contact"
            name="email_contact"
            type="email"
            value={config?.email_contact ?? ''}
            placeholder="halo@imageunesa.org"
            class="input pl-11"
          />
        </div>
      </div>
    </div>
  </div>

  <!-- Section: Social Media -->
  <div class="card p-8">
    <div class="flex items-center gap-3 mb-6 pb-6 border-b border-navy-50">
      <div class="w-10 h-10 rounded-xl bg-pink-100 flex items-center justify-center">
        <span class="text-pink-600">📸</span>
      </div>
      <div>
        <h2 class="font-display text-lg text-navy-900">Tautan Media Sosial</h2>
        <p class="text-navy-400 text-xs">URL lengkap akun media sosial IMAGE UNESA</p>
      </div>
    </div>

    <div class="grid gap-5">
      <div>
        <label class="label" for="ig">Instagram</label>
        <div class="relative">
          <span class="absolute left-4 top-1/2 -translate-y-1/2 text-navy-400 text-sm">📸</span>
          <input
            id="ig"
            name="ig"
            type="url"
            value={config?.social_links?.instagram ?? ''}
            placeholder="https://instagram.com/imageunesa"
            class="input pl-11"
          />
        </div>
      </div>
      <div>
        <label class="label" for="tiktok">TikTok</label>
        <div class="relative">
          <span class="absolute left-4 top-1/2 -translate-y-1/2 text-navy-400 text-sm">🎵</span>
          <input
            id="tiktok"
            name="tiktok"
            type="url"
            value={config?.social_links?.tiktok ?? ''}
            placeholder="https://tiktok.com/@imageunesa"
            class="input pl-11"
          />
        </div>
      </div>
      <div>
        <label class="label" for="youtube">YouTube</label>
        <div class="relative">
          <span class="absolute left-4 top-1/2 -translate-y-1/2 text-navy-400 text-sm">▶️</span>
          <input
            id="youtube"
            name="youtube"
            type="url"
            value={config?.social_links?.youtube ?? ''}
            placeholder="https://youtube.com/@imageunesa"
            class="input pl-11"
          />
        </div>
      </div>
    </div>
  </div>

  <!-- Section: Stats -->
  <div class="card p-8">
    <div class="flex items-center gap-3 mb-6 pb-6 border-b border-navy-50">
      <div class="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
        <Trophy class="w-5 h-5 text-blue-600" />
      </div>
      <div>
        <h2 class="font-display text-lg text-navy-900">Statistik Pencapaian</h2>
        <p class="text-navy-400 text-xs">
          Angka yang tampil di bagian hero/beranda sebagai social proof
        </p>
      </div>
    </div>

    <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
      <div>
        <label class="label" for="stat_members">
          <Users class="w-3.5 h-3.5 inline mr-1" />Jumlah Anggota
        </label>
        <input
          id="stat_members"
          name="stat_members"
          type="number"
          min="0"
          value={config?.stats?.members ?? 500}
          class="input"
        />
      </div>
      <div>
        <label class="label" for="stat_programs">
          <Trophy class="w-3.5 h-3.5 inline mr-1" />Program Unggulan
        </label>
        <input
          id="stat_programs"
          name="stat_programs"
          type="number"
          min="0"
          value={config?.stats?.programs ?? 15}
          class="input"
        />
      </div>
      <div>
        <label class="label" for="stat_years">
          <Calendar class="w-3.5 h-3.5 inline mr-1" />Tahun Berdiri
        </label>
        <input
          id="stat_years"
          name="stat_years"
          type="number"
          min="0"
          value={config?.stats?.years ?? 20}
          class="input"
        />
      </div>
      <div>
        <label class="label" for="stat_events">
          <Star class="w-3.5 h-3.5 inline mr-1" />Kegiatan/Tahun
        </label>
        <input
          id="stat_events"
          name="stat_events"
          type="number"
          min="0"
          value={config?.stats?.events ?? 50}
          class="input"
        />
      </div>
    </div>
  </div>

  <!-- Section: Oprec Toggle -->
  <div class="card p-8">
    <div class="flex items-center gap-3 mb-6 pb-6 border-b border-navy-50">
      <div class="w-10 h-10 rounded-xl bg-gold-100 flex items-center justify-center">
        <span class="text-gold-600">🎯</span>
      </div>
      <div>
        <h2 class="font-display text-lg text-navy-900">Status Open Recruitment</h2>
        <p class="text-navy-400 text-xs">
          Toggle ini menampilkan/menyembunyikan banner oprec di seluruh situs
        </p>
      </div>
    </div>

    <div
      class="flex items-center justify-between p-5 rounded-2xl border-2 transition-colors
                {isOprecOpen
        ? 'border-emerald-300 bg-emerald-50'
        : 'border-navy-100 bg-surface-secondary'}"
    >
      <div>
        <div class="font-600 text-navy-800 mb-1">
          {isOprecOpen ? '🟢 Oprec SEDANG DIBUKA' : '⚫ Oprec Belum/Sudah Tutup'}
        </div>
        <div class="text-navy-400 text-sm">
          {isOprecOpen
            ? 'Banner "Daftar Sekarang!" tampil di seluruh halaman publik.'
            : 'Banner oprec disembunyikan dari pengunjung situs.'}
        </div>
      </div>
      <button
        type="button"
        onclick={() => (isOprecOpen = !isOprecOpen)}
        class="text-3xl flex-shrink-0 transition-transform hover:scale-110"
        aria-label="Toggle oprec"
      >
        {#if isOprecOpen}
          <ToggleRight class="w-12 h-12 text-emerald-500" />
        {:else}
          <ToggleLeft class="w-12 h-12 text-navy-300" />
        {/if}
      </button>
    </div>

    <!-- Hidden input untuk nilai toggle -->
    <input type="hidden" name="is_oprec_open" value={isOprecOpen ? 'true' : 'false'} />

    {#if isOprecOpen}
      <div class="mt-4">
        <label class="label" for="oprec_deadline">Batas Waktu Pendaftaran (opsional)</label>
        <input
          id="oprec_deadline"
          name="oprec_deadline"
          type="datetime-local"
          value={config?.oprec_deadline
            ? new Date(config.oprec_deadline).toISOString().slice(0, 16)
            : ''}
          class="input"
        />
      </div>
    {/if}
  </div>

  <!-- Submit -->
  <div class="flex justify-end gap-4">
    <div class="flex items-center gap-2 text-navy-400 text-sm">
      <span>Terakhir diperbarui:</span>
      <span class="font-500 text-navy-600">
        {config?.updated_at ? new Date(config.updated_at).toLocaleString('id-ID') : 'Belum pernah'}
      </span>
    </div>
    <button type="submit" disabled={submitting} class="btn btn-primary btn-lg">
      <Save class="w-5 h-5" />
      {submitting ? 'Menyimpan...' : 'Simpan Perubahan'}
    </button>
  </div>
</form>
