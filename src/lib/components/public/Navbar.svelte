<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { Menu, X, ChevronDown } from 'lucide-svelte';
  import type { SiteConfig } from '$lib/types';
  import { getWhatsAppLink } from '$lib/utils/helpers';

  let { config, session }: { config: SiteConfig | null; session: unknown } = $props();

  let scrolled = $state(false);
  let mobileOpen = $state(false);
  let activeSection = $state('home');

  const navLinks = [
    { label: 'Beranda', href: '/#home' },
    { label: 'Tentang', href: '/tentang' },
    {
      label: 'Program',
      href: '/#program',
      children: [
        { label: 'Jurnal & Berita', href: '/portofolio' },
        { label: 'Galeri Kegiatan', href: '/portofolio#galeri' }
      ]
    },
    { label: 'Ekraf', href: '/ekraf' },
    { label: 'Sponsor', href: '/sponsor' }
  ];

  const waLink = $derived(
    getWhatsAppLink(
      config?.whatsapp_contact ?? '6281234567890',
      'Halo IMAGE UNESA! Saya ingin bertanya tentang...'
    )
  );

  onMount(() => {
    const handleScroll = () => {
      scrolled = window.scrollY > 60;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  });

  function closeMobile() {
    mobileOpen = false;
  }
</script>

<!-- Nav backdrop blur overlay for mobile -->
{#if mobileOpen}
  <div
    class="fixed inset-0 bg-navy-950/60 backdrop-blur-sm z-[90] lg:hidden"
    onclick={closeMobile}
    role="button"
    tabindex="-1"
    aria-label="Tutup menu"
  ></div>
{/if}

<header
  class="fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ease-smooth"
  class:scrolled
>
  <nav
    class="container-base"
    class:py-5={!scrolled}
    class:py-3={scrolled}
    style="transition: padding 0.4s ease;"
  >
    <div class="flex items-center justify-between gap-4">
      <!-- Logo -->
      <a href="/" class="logo-mark group flex items-center gap-2.5">
        <div
          class="logo-icon w-9 h-9 rounded-xl bg-gradient-gold flex items-center justify-center
                    shadow-glow-gold group-hover:scale-110 transition-transform duration-300"
        >
          <span class="text-navy-900 font-900 text-sm font-accent tracking-tight">IM</span>
        </div>
        <div class="flex flex-col leading-none">
          <span class="text-white font-display font-700 text-lg leading-none tracking-tight">
            IMAGE
          </span>
          <span
            class="text-gold-400 font-accent font-800 text-[10px] uppercase tracking-[0.2em] leading-none"
          >
            UNESA
          </span>
        </div>
      </a>

      <!-- Desktop Nav Links -->
      <div class="hidden lg:flex items-center gap-1">
        {#each navLinks as link}
          {#if link.children}
            <div class="relative group">
              <button
                class="nav-link flex items-center gap-1.5 px-4 py-2.5 rounded-xl
                       text-sm font-600 text-white/80 hover:text-white
                       hover:bg-white/10 transition-all duration-200"
              >
                {link.label}
                <ChevronDown class="w-3.5 h-3.5 transition-transform group-hover:rotate-180" />
              </button>

              <!-- Dropdown -->
              <div
                class="absolute top-full left-0 mt-2 w-52 opacity-0 invisible
                          group-hover:opacity-100 group-hover:visible
                          translate-y-2 group-hover:translate-y-0
                          transition-all duration-200 z-50"
              >
                <div class="glass rounded-2xl p-2 shadow-dashboard border border-white/10">
                  {#each link.children as child}
                    <a
                      href={child.href}
                      class="block px-4 py-2.5 rounded-xl text-sm text-white/80 hover:text-white
                             hover:bg-white/10 transition-colors font-500"
                    >
                      {child.label}
                    </a>
                  {/each}
                </div>
              </div>
            </div>
          {:else}
            <a
              href={link.href}
              class="nav-link px-4 py-2.5 rounded-xl text-sm font-600 text-white/80
                     hover:text-white hover:bg-white/10 transition-all duration-200"
              class:active={$page.url.pathname === link.href}
            >
              {link.label}
            </a>
          {/if}
        {/each}
      </div>

      <!-- CTA Buttons -->
      <div class="hidden lg:flex items-center gap-3">
        {#if config?.is_oprec_open}
          <a href="/oprec" class="badge-gold animate-pulse-slow"> 🎯 Oprec Buka! </a>
        {/if}

        {#if session}
          <a
            href="/dashboard"
            class="btn btn-ghost text-white/80 hover:text-white hover:bg-white/10 text-sm py-2"
          >
            Dashboard
          </a>
        {/if}

        <a href={waLink} target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
          Hubungi Kami
        </a>
      </div>

      <!-- Mobile Hamburger -->
      <button
        class="lg:hidden p-2 rounded-xl text-white/80 hover:text-white hover:bg-white/10
               transition-colors"
        onclick={() => (mobileOpen = !mobileOpen)}
        aria-label="Toggle menu"
        aria-expanded={mobileOpen}
      >
        {#if mobileOpen}
          <X class="w-6 h-6" />
        {:else}
          <Menu class="w-6 h-6" />
        {/if}
      </button>
    </div>

    <!-- Mobile Menu -->
    {#if mobileOpen}
      <div class="lg:hidden mt-2 pb-4 border-t border-white/10">
        <div class="flex flex-col gap-1 pt-4">
          {#each navLinks as link}
            <a
              href={link.href}
              onclick={closeMobile}
              class="px-4 py-3 rounded-xl text-white/80 hover:text-white hover:bg-white/10
                     transition-colors text-sm font-600"
            >
              {link.label}
            </a>
            {#if link.children}
              {#each link.children as child}
                <a
                  href={child.href}
                  onclick={closeMobile}
                  class="px-8 py-2.5 rounded-xl text-white/60 hover:text-white hover:bg-white/10
                         transition-colors text-sm"
                >
                  {child.label}
                </a>
              {/each}
            {/if}
          {/each}

          <div class="pt-4 flex flex-col gap-3 border-t border-white/10 mt-2">
            {#if config?.is_oprec_open}
              <a href="/oprec" onclick={closeMobile} class="btn btn-primary text-center">
                🎯 Daftar Oprec Sekarang
              </a>
            {/if}
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              onclick={closeMobile}
              class="btn btn-outline border-white/30 text-white hover:bg-white hover:text-navy-900 text-center"
            >
              Hubungi via WhatsApp
            </a>
            {#if session}
              <a
                href="/dashboard"
                onclick={closeMobile}
                class="btn btn-ghost text-white/80 text-center"
              >
                Masuk Dashboard
              </a>
            {:else}
              <a
                href="/login"
                onclick={closeMobile}
                class="btn btn-ghost text-white/80 text-center"
              >
                Login Pengurus
              </a>
            {/if}
          </div>
        </div>
      </div>
    {/if}
  </nav>
</header>

<style>
  header {
    background: transparent;
  }

  header.scrolled {
    background: rgba(10, 22, 40, 0.92);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.3);
  }

  .nav-link.active {
    color: rgba(245, 200, 66, 0.9);
    background: rgba(245, 200, 66, 0.08);
  }
</style>
