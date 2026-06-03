<script lang="ts">
  import { page } from '$app/stores';
  import {
    LayoutDashboard,
    Settings,
    BarChart3,
    DollarSign,
    Newspaper,
    Users,
    ShoppingBag,
    BookOpen,
    Heart,
    Handshake,
    ChevronLeft,
    ChevronRight,
    X,
    LogOut,
    ExternalLink
  } from 'lucide-svelte';
  import type { Profile } from '$lib/types';
  import { ROLE_LABELS, ROLE_COLORS } from '$lib/config/site';
  import { cn, getInitials } from '$lib/utils/helpers';

  let {
    profile,
    currentPath,
    collapsed = false,
    mobileOpen = false,
    onCloseMobile
  }: {
    profile: Profile;
    currentPath: string;
    collapsed?: boolean;
    mobileOpen?: boolean;
    onCloseMobile?: () => void;
  } = $props();

  interface NavSection {
    title: string;
    items: {
      label: string;
      href: string;
      icon: any;
      roles: string[];
      badge?: string;
    }[];
  }

  const navSections: NavSection[] = [
    {
      title: 'Umum',
      items: [
        {
          label: 'Overview',
          href: '/dashboard/analytics',
          icon: BarChart3,
          roles: ['superadmin', 'ketum']
        }
      ]
    },
    {
      title: 'Administrasi',
      items: [
        {
          label: 'Pengaturan Web',
          href: '/dashboard/superadmin',
          icon: Settings,
          roles: ['superadmin']
        },
        {
          label: 'Kelola Pengguna',
          href: '/dashboard/superadmin/users',
          icon: Users,
          roles: ['superadmin']
        }
      ]
    },
    {
      title: 'Departemen',
      items: [
        {
          label: 'BPH — Keuangan',
          href: '/dashboard/bph',
          icon: DollarSign,
          roles: ['superadmin', 'ketum', 'bph']
        },
        {
          label: 'Kominfo — Konten',
          href: '/dashboard/kominfo',
          icon: Newspaper,
          roles: ['superadmin', 'ketum', 'kominfo']
        },
        {
          label: 'DPO — Anggota',
          href: '/dashboard/dpo',
          icon: Users,
          roles: ['superadmin', 'ketum', 'dpo']
        },
        {
          label: 'Ekraf — Inventaris',
          href: '/dashboard/ekraf',
          icon: ShoppingBag,
          roles: ['superadmin', 'ketum', 'ekraf']
        },
        {
          label: 'DPB',
          href: '/dashboard/dpb',
          icon: BookOpen,
          roles: ['superadmin', 'ketum', 'dpb']
        },
        {
          label: 'DMB',
          href: '/dashboard/dmb',
          icon: Heart,
          roles: ['superadmin', 'ketum', 'dmb']
        },
        {
          label: 'Sosker',
          href: '/dashboard/sosker',
          icon: Handshake,
          roles: ['superadmin', 'ketum', 'sosker']
        }
      ]
    }
  ];

  const filteredSections = $derived(
    navSections
      .map((section) => ({
        ...section,
        items: section.items.filter((item) => item.roles.includes(profile.role))
      }))
      .filter((section) => section.items.length > 0)
  );

  function isActive(href: string) {
    return currentPath === href || (href !== '/dashboard' && currentPath.startsWith(href));
  }
</script>

<!-- Desktop Sidebar -->
<aside
  class={cn(
    'hidden lg:flex flex-col bg-navy-950 border-r border-white/5 transition-all duration-300 h-screen flex-shrink-0',
    collapsed ? 'w-20' : 'w-64'
  )}
>
  <!-- Logo area -->
  <div class="flex items-center gap-3 px-6 py-5 border-b border-white/5 min-h-[72px]">
    <div
      class="w-9 h-9 rounded-xl bg-gradient-gold flex-shrink-0 flex items-center justify-center shadow-glow-gold"
    >
      <span class="text-navy-900 font-900 font-accent text-sm">IM</span>
    </div>
    {#if !collapsed}
      <div class="overflow-hidden">
        <div class="text-white font-display font-700 text-lg leading-none">IMAGE</div>
        <div class="text-gold-400 font-accent font-800 text-[9px] uppercase tracking-[0.2em]">
          UNESA
        </div>
      </div>
    {/if}
  </div>

  <!-- Navigation -->
  <nav class="flex-1 overflow-y-auto py-4 px-3 flex flex-col gap-1">
    <!-- Home link -->
    <a
      href="/dashboard"
      class={cn('sidebar-link', isActive('/dashboard') && !isActive('/dashboard/') ? 'active' : '')}
      title={collapsed ? 'Dashboard' : ''}
    >
      <LayoutDashboard class="w-5 h-5 flex-shrink-0" />
      {#if !collapsed}
        <span>Dashboard</span>
      {/if}
    </a>

    {#each filteredSections as section}
      {#if !collapsed}
        <div class="px-3 pt-5 pb-1">
          <span class="text-navy-600 text-[10px] font-accent font-700 uppercase tracking-[0.15em]">
            {section.title}
          </span>
        </div>
      {:else}
        <div class="border-t border-white/5 my-2"></div>
      {/if}

      {#each section.items as item}
        <a
          href={item.href}
          class={cn('sidebar-link', isActive(item.href) ? 'active' : '')}
          title={collapsed ? item.label : ''}
        >
          <svelte:component this={item.icon as any} class="w-5 h-5 flex-shrink-0" />
          {#if !collapsed}
            <span class="truncate">{item.label}</span>
            {#if item.badge}
              <span class="ml-auto badge-gold text-[10px] py-0.5 px-1.5">{item.badge}</span>
            {/if}
          {/if}
        </a>
      {/each}
    {/each}
  </nav>

  <!-- Profile + public link -->
  <div class="border-t border-white/5 p-3 flex flex-col gap-2">
    <!-- View public site -->
    {#if !collapsed}
      <a href="/" target="_blank" rel="noopener noreferrer" class="sidebar-link text-xs">
        <ExternalLink class="w-4 h-4" />
        <span>Lihat Situs Publik</span>
      </a>
    {/if}

    <!-- User profile chip -->
    <div
      class={cn(
        'flex items-center gap-3 px-3 py-2.5 rounded-xl',
        collapsed ? 'justify-center' : ''
      )}
    >
      <div
        class="w-8 h-8 rounded-lg bg-gradient-gold flex-shrink-0 flex items-center justify-center"
      >
        <span class="text-navy-900 font-700 text-xs">{getInitials(profile.full_name)}</span>
      </div>
      {#if !collapsed}
        <div class="overflow-hidden flex-1 min-w-0">
          <div class="text-white text-sm font-600 truncate leading-none mb-1">
            {profile.full_name}
          </div>
          <span
            class={cn('badge text-[10px] py-0 px-1.5', ROLE_COLORS[profile.role] ?? 'badge-navy')}
          >
            {ROLE_LABELS[profile.role] ?? profile.role}
          </span>
        </div>
      {/if}
    </div>
  </div>
</aside>

<!-- Mobile Sidebar (slide-in) -->
<aside
  class={cn(
    'fixed inset-y-0 left-0 z-40 w-72 bg-navy-950 border-r border-white/5',
    'flex flex-col lg:hidden transition-transform duration-300',
    mobileOpen ? 'translate-x-0' : '-translate-x-full'
  )}
>
  <!-- Mobile header -->
  <div class="flex items-center justify-between px-6 py-5 border-b border-white/5">
    <div class="flex items-center gap-3">
      <div class="w-9 h-9 rounded-xl bg-gradient-gold flex items-center justify-center">
        <span class="text-navy-900 font-900 font-accent text-sm">IM</span>
      </div>
      <div>
        <div class="text-white font-display font-700 text-lg leading-none">IMAGE</div>
        <div class="text-gold-400 font-accent font-800 text-[9px] uppercase tracking-[0.2em]">
          UNESA
        </div>
      </div>
    </div>
    <button
      onclick={onCloseMobile}
      class="p-2 rounded-xl text-navy-400 hover:text-white hover:bg-white/10 transition-colors"
      aria-label="Tutup sidebar"
    >
      <X class="w-5 h-5" />
    </button>
  </div>

  <!-- Mobile nav (same as desktop but always expanded) -->
  <nav class="flex-1 overflow-y-auto py-4 px-3 flex flex-col gap-1">
    <a
      href="/dashboard"
      onclick={onCloseMobile}
      class={cn('sidebar-link', isActive('/dashboard') && !isActive('/dashboard/') ? 'active' : '')}
    >
      <LayoutDashboard class="w-5 h-5" />
      <span>Dashboard</span>
    </a>

    {#each filteredSections as section}
      <div class="px-3 pt-5 pb-1">
        <span class="text-navy-600 text-[10px] font-accent font-700 uppercase tracking-[0.15em]">
          {section.title}
        </span>
      </div>
      {#each section.items as item}
        <a
          href={item.href}
          onclick={onCloseMobile}
          class={cn('sidebar-link', isActive(item.href) ? 'active' : '')}
        >
          <svelte:component this={item.icon as any} class="w-5 h-5" />
          <span>{item.label}</span>
        </a>
      {/each}
    {/each}
  </nav>

  <div class="border-t border-white/5 p-3">
    <div class="flex items-center gap-3 px-3 py-2.5">
      <div class="w-8 h-8 rounded-lg bg-gradient-gold flex items-center justify-center">
        <span class="text-navy-900 font-700 text-xs">{getInitials(profile.full_name)}</span>
      </div>
      <div class="flex-1 min-w-0">
        <div class="text-white text-sm font-600 truncate">{profile.full_name}</div>
        <span
          class={cn('badge text-[10px] py-0 px-1.5', ROLE_COLORS[profile.role] ?? 'badge-navy')}
        >
          {ROLE_LABELS[profile.role] ?? profile.role}
        </span>
      </div>
    </div>
  </div>
</aside>
