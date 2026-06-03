<script lang="ts">
  import { ArrowLeft, ShieldX } from 'lucide-svelte';
  import { APP_META } from '$lib/config/site';
</script>

<svelte:head>
  <title>Akses Ditolak | {APP_META.name}</title>
</svelte:head>

<div class="min-h-screen bg-surface flex items-center justify-center p-6">
  <div class="text-center max-w-md">
    <div class="w-24 h-24 rounded-3xl bg-rose-100 flex items-center justify-center mx-auto mb-8">
      <ShieldX class="w-12 h-12 text-rose-500" />
    </div>
    <h1 class="font-display text-4xl text-navy-900 mb-4">Akses Ditolak</h1>
    <p class="text-navy-400 text-lg mb-8 leading-relaxed">
      Kamu tidak memiliki izin untuk mengakses halaman ini. Pastikan kamu login dengan akun yang
      sesuai.
    </p>
    <div class="flex flex-col sm:flex-row gap-4 justify-center">
      <a href="/dashboard" class="btn btn-secondary">
        <ArrowLeft class="w-4 h-4" />
        Kembali ke Dashboard
      </a>
      <a href="/login" class="btn btn-outline"> Login Akun Lain </a>
    </div>
  </div>
</div>
