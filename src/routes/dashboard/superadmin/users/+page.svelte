<script lang="ts">
  import { Users, Shield, Key, ExternalLink, ShieldAlert, ArrowRight } from 'lucide-svelte';
  import { ROLE_LABELS, ROLE_COLORS, APP_META } from '$lib/config/site';

  const rolesList = Object.keys(ROLE_LABELS);
</script>

<svelte:head>
  <title>Kelola Pengguna & Akses | {APP_META.name} Dashboard</title>
</svelte:head>

<div class="mb-8">
  <h1 class="font-display text-2xl text-navy-900 mb-1 flex items-center gap-2">
    <Users class="w-6 h-6 text-purple-600" />
    Kelola Pengguna (RBAC)
  </h1>
  <p class="text-navy-400">
    Pusat kendali autentikasi dan batasan hak akses (Role-Based Access Control).
  </p>
</div>

<div class="grid lg:grid-cols-2 gap-8">
  <!-- Left Column -->
  <div class="flex flex-col gap-6">
    <div
      class="card p-8 bg-gradient-to-br from-purple-900 to-indigo-900 text-white relative overflow-hidden"
    >
      <!-- Decorative -->
      <div
        class="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-white/10 blur-3xl"
      ></div>

      <div class="relative z-10">
        <div
          class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm border border-white/20 text-xs font-600 mb-6"
        >
          <Key class="w-3.5 h-3.5" />
          Otentikasi Terpusat
        </div>

        <h2 class="font-display text-2xl font-700 mb-3">Portal Manajemen Akun</h2>
        <p class="text-purple-100 mb-8 text-sm leading-relaxed opacity-90">
          Untuk menjaga standar keamanan tinggi tingkat-produksi (Production-grade), penambahan
          Email, Password, maupun Reset Sandi dilakukan langsung melalui portal resmi <strong
            >Supabase Auth Studio</strong
          >.
        </p>

        <a
          href="https://supabase.com/dashboard/project/_/auth/users"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 bg-white text-purple-900 font-600 rounded-xl hover:bg-purple-50 hover:-translate-y-1 transition-all duration-300 shadow-lg shadow-purple-900/50"
        >
          Buka Supabase Auth
          <ExternalLink class="w-4 h-4" />
        </a>
      </div>
    </div>

    <div class="card p-6 border-l-4 border-l-amber-500">
      <h3 class="font-600 text-navy-900 flex items-center gap-2 mb-3">
        <ShieldAlert class="w-5 h-5 text-amber-500" />
        Pemisahan Wewenang (Separation of Concerns)
      </h3>
      <p class="text-sm text-navy-600 leading-relaxed">
        <strong>Akun Login (Auth)</strong> dan <strong>Data Diri Anggota</strong> adalah dua entitas
        yang berbeda. Penambahan akun *Login* (Email & Sandi) dilakukan di portal otentikasi di
        atas. Sedangkan untuk pendataan nomor identitas, nama lengkap, dan divisi anggota dilakukan
        melalui menu
        <a href="/dashboard/dpo" class="text-indigo-600 font-600 hover:underline">Dashboard DPO</a>.
      </p>
    </div>
  </div>

  <!-- Right Column -->
  <div class="card p-6">
    <div class="flex items-center gap-2 mb-6">
      <Shield class="w-5 h-5 text-indigo-500" />
      <h3 class="font-600 text-navy-900">Daftar Hak Akses Sistem</h3>
    </div>

    <p class="text-sm text-navy-500 mb-6">
      Saat membuat *User* di Supabase Auth, pastikan Anda menambahkan *Role* di *User Metadata*
      (JSON) dengan format: <code
        class="bg-slate-100 text-pink-600 px-1.5 py-0.5 rounded text-xs font-mono"
        >{'{'}"role": "nama_role"{'}'}</code
      >. Berikut adalah daftar *role* yang didukung sistem ini:
    </p>

    <div class="flex flex-col gap-3">
      {#each rolesList as role}
        <div
          class="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 hover:border-slate-200 transition-colors"
        >
          <div class="flex items-center gap-3">
            <div
              class="w-2 h-2 rounded-full {ROLE_COLORS[role]
                ?.split(' ')[0]
                ?.replace('bg-', 'bg-') || 'bg-slate-400'}"
            ></div>
            <code class="font-mono text-sm font-600 text-navy-900">{role}</code>
          </div>
          <span class="badge {ROLE_COLORS[role] ?? 'bg-slate-100 text-slate-700'}">
            {ROLE_LABELS[role]}
          </span>
        </div>
      {/each}
    </div>
  </div>
</div>
