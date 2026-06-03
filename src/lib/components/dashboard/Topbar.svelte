<script lang="ts">
  import { page } from '$app/stores';
  import { Menu, Bell, ChevronDown, LogOut, User, Settings } from 'lucide-svelte';
  import type { Profile } from '$lib/types';
  import { ROLE_LABELS, ROLE_COLORS } from '$lib/config/site';
  import { getInitials, cn } from '$lib/utils/helpers';

  let {
    profile,
    onToggleSidebar,
    onToggleMobileSidebar,
    onLogout
  }: {
    profile: Profile;
    onToggleSidebar?: () => void;
    onToggleMobileSidebar?: () => void;
    onLogout?: () => void;
  } = $props();

  let dropdownOpen = $state(false);

  // Generate breadcrumb from path
  const breadcrumb = $derived(() => {
    const path = $page.url.pathname;
    const segments = path.split('/').filter(Boolean);
    const labels: Record<string, string> = {
      dashboard: 'Dashboard',
      analytics: 'Analytics',
      superadmin: 'Superadmin',
      users: 'Pengguna',
      bph: 'BPH',
      kominfo: 'Kominfo',
      dpo: 'DPO',
      ekraf: 'Ekraf',
      dpb: 'DPB',
      dmb: 'DMB',
      sosker: 'Sosker',
      transaksi: 'Transaksi',
      laporan: 'Laporan',
      artikel: 'Artikel',
      anggota: 'Anggota',
      produk: 'Produk'
    };
    return segments.map((s) => labels[s] ?? s);
  });
</script>

<header
  class="flex-shrink-0 h-[72px] bg-white border-b border-navy-50 px-6 flex items-center gap-4 shadow-card z-20"
>
  <!-- Mobile hamburger -->
  <button
    onclick={onToggleMobileSidebar}
    class="lg:hidden p-2 rounded-xl text-navy-400 hover:text-navy-700 hover:bg-navy-50 transition-colors"
    aria-label="Toggle sidebar"
  >
    <Menu class="w-5 h-5" />
  </button>

  <!-- Desktop sidebar toggle -->
  <button
    onclick={onToggleSidebar}
    class="hidden lg:flex p-2 rounded-xl text-navy-400 hover:text-navy-700 hover:bg-navy-50 transition-colors"
    aria-label="Toggle sidebar"
  >
    <Menu class="w-5 h-5" />
  </button>

  <!-- Breadcrumb -->
  <nav
    class="flex items-center gap-2 text-sm text-navy-400 overflow-hidden"
    aria-label="Breadcrumb"
  >
    {#each breadcrumb() as crumb, i}
      {#if i > 0}
        <span class="text-navy-200">/</span>
      {/if}
      <span
        class={i === breadcrumb().length - 1
          ? 'text-navy-700 font-600 truncate'
          : 'hidden sm:inline'}
      >
        {crumb}
      </span>
    {/each}
  </nav>

  <!-- Spacer -->
  <div class="flex-1"></div>

  <!-- Right actions -->
  <div class="flex items-center gap-2">
    <!-- Notifications (placeholder) -->
    <button
      class="relative p-2.5 rounded-xl text-navy-400 hover:text-navy-700 hover:bg-navy-50 transition-colors"
      aria-label="Notifikasi"
    >
      <Bell class="w-5 h-5" />
      <!-- Badge -->
      <span class="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"
      ></span>
    </button>

    <!-- User dropdown -->
    <div class="relative">
      <button
        onclick={() => (dropdownOpen = !dropdownOpen)}
        class="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-xl hover:bg-navy-50 transition-colors"
        aria-expanded={dropdownOpen}
      >
        <!-- Avatar -->
        <div
          class="w-8 h-8 rounded-xl bg-gradient-gold flex items-center justify-center flex-shrink-0"
        >
          <span class="text-navy-900 font-700 text-xs">{getInitials(profile.full_name)}</span>
        </div>
        <!-- Name + role -->
        <div class="hidden sm:flex flex-col items-start leading-none">
          <span class="text-navy-800 font-600 text-sm">{profile.full_name.split(' ')[0]}</span>
          <span class="text-navy-400 text-[11px] mt-0.5">{ROLE_LABELS[profile.role]}</span>
        </div>
        <ChevronDown
          class={cn(
            'w-4 h-4 text-navy-400 transition-transform duration-200',
            dropdownOpen ? 'rotate-180' : ''
          )}
        />
      </button>

      <!-- Dropdown menu -->
      {#if dropdownOpen}
        <div
          class="absolute right-0 top-full mt-2 w-56 card shadow-card-hover border border-navy-50 z-50 overflow-hidden"
        >
          <!-- User info header -->
          <div class="px-4 py-3 border-b border-navy-50">
            <div class="font-600 text-navy-800 text-sm truncate">{profile.full_name}</div>
            <div class="text-navy-400 text-xs truncate">{profile.role}</div>
            <span class={cn('badge mt-1.5', ROLE_COLORS[profile.role] ?? 'badge-navy')}>
              {ROLE_LABELS[profile.role]}
            </span>
          </div>

          <!-- Menu items -->
          <div class="py-1">
            <a
              href="/dashboard/profile"
              onclick={() => (dropdownOpen = false)}
              class="flex items-center gap-3 px-4 py-2.5 text-sm text-navy-600 hover:text-navy-900 hover:bg-navy-50 transition-colors"
            >
              <User class="w-4 h-4" />
              Profil Saya
            </a>

            {#if profile.role === 'superadmin'}
              <a
                href="/dashboard/superadmin"
                onclick={() => (dropdownOpen = false)}
                class="flex items-center gap-3 px-4 py-2.5 text-sm text-navy-600 hover:text-navy-900 hover:bg-navy-50 transition-colors"
              >
                <Settings class="w-4 h-4" />
                Pengaturan Web
              </a>
            {/if}
          </div>

          <!-- Logout -->
          <div class="border-t border-navy-50 py-1">
            <button
              onclick={() => {
                dropdownOpen = false;
                onLogout?.();
              }}
              class="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-rose-600 hover:text-rose-700 hover:bg-rose-50 transition-colors"
            >
              <LogOut class="w-4 h-4" />
              Keluar
            </button>
          </div>
        </div>
      {/if}
    </div>
  </div>
</header>

<!-- Click outside to close dropdown -->
{#if dropdownOpen}
  <div
    class="fixed inset-0 z-40"
    onclick={() => (dropdownOpen = false)}
    role="button"
    tabindex="-1"
    aria-label="Tutup dropdown"
  ></div>
{/if}
