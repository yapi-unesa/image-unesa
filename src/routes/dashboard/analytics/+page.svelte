<script lang="ts">
  import {
    BarChart3,
    Users,
    DollarSign,
    Newspaper,
    ShoppingBag,
    Heart,
    Clock,
    ArrowRight
  } from 'lucide-svelte';
  import { formatRupiah } from '$lib/utils/helpers';
  import { APP_META } from '$lib/config/site';

  let { data } = $props();
  const profile = $derived(data.profile);
  const stats = $derived(data.stats);
</script>

<svelte:head>
  <title>Overview | {APP_META.name} Dashboard</title>
</svelte:head>

<div class="mb-8">
  <h1 class="font-display text-2xl text-navy-900 mb-1">
    Selamat datang, {profile.full_name}! 👋
  </h1>
  <p class="text-navy-400">Ringkasan aktivitas dan metrik operasional organisasi hari ini.</p>
</div>

<!-- Stats Grid -->
<div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
  <!-- Card 1 -->
  <div class="card p-6 border-b-4 border-b-orange-500">
    <div class="flex items-center justify-between mb-4">
      <div
        class="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600"
      >
        <Users class="w-5 h-5" />
      </div>
      <span class="badge bg-slate-100 text-slate-600 text-xs">DPO</span>
    </div>
    <div class="text-3xl font-700 text-navy-900 mb-1">{stats.totalMembers}</div>
    <div class="text-sm text-navy-400">Total Pengurus Aktif</div>
  </div>

  <!-- Card 2 -->
  <div class="card p-6 border-b-4 border-b-emerald-500">
    <div class="flex items-center justify-between mb-4">
      <div
        class="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600"
      >
        <DollarSign class="w-5 h-5" />
      </div>
      <span class="badge bg-slate-100 text-slate-600 text-xs">BPH</span>
    </div>
    <div
      class="text-2xl font-700 text-navy-900 mb-1 truncate"
      title={formatRupiah(stats.cashBalance)}
    >
      {formatRupiah(stats.cashBalance)}
    </div>
    <div class="text-sm text-navy-400">Saldo Kas Organisasi</div>
  </div>

  <!-- Card 3 -->
  <div class="card p-6 border-b-4 border-b-blue-500">
    <div class="flex items-center justify-between mb-4">
      <div class="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
        <Newspaper class="w-5 h-5" />
      </div>
      <span class="badge bg-slate-100 text-slate-600 text-xs">Kominfo</span>
    </div>
    <div class="text-3xl font-700 text-navy-900 mb-1">{stats.totalArticles}</div>
    <div class="text-sm text-navy-400">Artikel Dipublikasi</div>
  </div>

  <!-- Card 4 -->
  <div class="card p-6 border-b-4 border-b-rose-500">
    <div class="flex items-center justify-between mb-4">
      <div class="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center text-rose-600">
        <Heart class="w-5 h-5" />
      </div>
      <span class="badge bg-slate-100 text-slate-600 text-xs">Sosker</span>
    </div>
    <div class="text-3xl font-700 text-navy-900 mb-1">{stats.activePrograms}</div>
    <div class="text-sm text-navy-400">Program Berjalan</div>
  </div>
</div>

<div class="grid lg:grid-cols-3 gap-8">
  <!-- Main Column -->
  <div class="lg:col-span-2 flex flex-col gap-8">
    <!-- Welcome Banner -->
    <div
      class="card p-8 bg-gradient-to-br from-navy-900 to-navy-800 text-white relative overflow-hidden"
    >
      <!-- Decorative circles -->
      <div class="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-white/5"></div>
      <div class="absolute bottom-0 right-32 -mb-20 w-40 h-40 rounded-full bg-white/5"></div>

      <div class="relative z-10 max-w-lg">
        <div
          class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-xs font-600 text-gold-300 mb-4 tracking-widest uppercase"
        >
          <BarChart3 class="w-3 h-3" />
          Dashboard Eksekutif
        </div>
        <h2 class="font-display text-3xl font-700 mb-3 leading-tight">
          Pantau seluruh pergerakan<br />organisasi dalam satu layar.
        </h2>
        <p class="text-navy-100 mb-6 text-sm leading-relaxed opacity-90">
          Gunakan menu di sidebar untuk menavigasi ke masing-masing departemen. Semua data yang
          diinputkan oleh departemen akan secara otomatis mempengaruhi statistik di halaman ini.
        </p>
      </div>
    </div>
  </div>

  <!-- Sidebar Column -->
  <div class="flex flex-col gap-6">
    <div class="card p-6">
      <div class="flex items-center justify-between mb-6">
        <h3 class="font-600 text-navy-900">Aktivitas Terkini</h3>
      </div>

      <div class="flex flex-col gap-6">
        {#each data.recentActivities as activity}
          <div class="flex gap-4 relative">
            <div
              class="absolute left-4 top-10 bottom-[-24px] w-[2px] bg-slate-100 last:hidden"
            ></div>

            <div
              class="w-8 h-8 rounded-full bg-navy-50 flex items-center justify-center flex-shrink-0 relative z-10 border-2 border-white text-navy-400"
            >
              <Clock class="w-3.5 h-3.5" />
            </div>

            <div>
              <div class="text-xs font-600 text-navy-400 mb-0.5">{activity.action}</div>
              <div class="text-sm font-600 text-navy-900 mb-1">{activity.title}</div>
              <div class="flex items-center gap-2 text-xs">
                <span class="text-navy-400">{activity.time}</span>
                <span class="w-1 h-1 rounded-full bg-slate-300"></span>
                <span class="text-indigo-600 font-500">{activity.department}</span>
              </div>
            </div>
          </div>
        {/each}
      </div>

      <button
        class="w-full mt-8 py-2.5 text-sm font-600 text-navy-600 hover:text-navy-900 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors flex items-center justify-center gap-2"
      >
        Lihat Semua
        <ArrowRight class="w-4 h-4" />
      </button>
    </div>
  </div>
</div>
