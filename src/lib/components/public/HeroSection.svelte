<script lang="ts">
  import { onMount } from 'svelte';
  import { ArrowRight, Users, Trophy, Calendar, Star } from 'lucide-svelte';
  import type { SiteConfig } from '$lib/types';
  import { getWhatsAppLink, animateCounter } from '$lib/utils/helpers';

  let { config }: { config: SiteConfig | null } = $props();

  let heroEl: HTMLElement;
  let countersVisible = $state(false);

  // Animated counter values
  let countMembers = $state(0);
  let countPrograms = $state(0);
  let countYears = $state(0);
  let countEvents = $state(0);

  const stats = $derived([
    {
      icon: Users,
      value: config?.stats?.members ?? 500,
      suffix: '+',
      label: 'Keluarga Mahasiswa',
      color: 'text-gold-400',
      current: countMembers
    },
    {
      icon: Trophy,
      value: config?.stats?.programs ?? 15,
      suffix: '+',
      label: 'Program Unggulan',
      color: 'text-emerald-400',
      current: countPrograms
    },
    {
      icon: Calendar,
      value: config?.stats?.years ?? 20,
      suffix: '+',
      label: 'Tahun Berdiri',
      color: 'text-blue-400',
      current: countYears
    },
    {
      icon: Star,
      value: config?.stats?.events ?? 50,
      suffix: '+',
      label: 'Kegiatan Tahunan',
      color: 'text-purple-400',
      current: countEvents
    }
  ]);

  const waLink = $derived(
    getWhatsAppLink(
      config?.whatsapp_contact ?? '6281234567890',
      'Halo IMAGE UNESA! Saya tertarik untuk bergabung / berkolaborasi.'
    )
  );

  function startCounters() {
    if (countersVisible) return;
    countersVisible = true;
    const targets = [
      config?.stats?.members ?? 500,
      config?.stats?.programs ?? 15,
      config?.stats?.years ?? 20,
      config?.stats?.events ?? 50
    ];
    const setters = [
      (v: number) => (countMembers = v),
      (v: number) => (countPrograms = v),
      (v: number) => (countYears = v),
      (v: number) => (countEvents = v)
    ];
    targets.forEach((target, i) => {
      setTimeout(() => animateCounter(target, 2200, setters[i]), i * 150);
    });
  }

  onMount(() => {
    // Intersection Observer for counter animation
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          startCounters();
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    const statsEl = document.getElementById('hero-stats');
    if (statsEl) observer.observe(statsEl);

    // Parallax effect for hero image
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroEl) return;
      const rect = heroEl.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 10;
      const img = heroEl.querySelector<HTMLElement>('.hero-mascot');
      if (img) {
        img.style.transform = `translate(${x * 0.4}px, ${y * 0.4}px)`;
      }
    };

    heroEl?.addEventListener('mousemove', handleMouseMove);

    return () => {
      observer.disconnect();
      heroEl?.removeEventListener('mousemove', handleMouseMove);
    };
  });
</script>

<section
  id="home"
  class="hero-section relative overflow-hidden min-h-screen flex items-center"
  bind:this={heroEl}
>
  <!-- ── Background: Mesh Gradient + Image ─────────────────── -->
  <div class="absolute inset-0 bg-mesh-navy">
    <!-- Background photo with overlay -->
    <div
      class="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
      style="background-image: url('/hero_campus.webp');"
    ></div>
    <!-- Gradient overlay -->
    <div
      class="absolute inset-0 bg-gradient-to-br from-navy-950/95 via-navy-900/80 to-navy-800/70"
    ></div>
    <!-- Subtle grain -->
    <div class="absolute inset-0 opacity-[0.03] noise pointer-events-none"></div>
  </div>

  <!-- ── Floating particles ─────────────────────────────────── -->
  <div class="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
    {#each [{ size: 'w-72 h-72', pos: 'top-20 -right-20', delay: '0s', opacity: 'opacity-[0.04]' }, { size: 'w-96 h-96', pos: 'bottom-10 -left-32', delay: '2s', opacity: 'opacity-[0.03]' }, { size: 'w-48 h-48', pos: 'top-40 left-1/3', delay: '4s', opacity: 'opacity-[0.05]' }] as particle}
      <div
        class="absolute rounded-full bg-gold-400 blur-3xl animate-float {particle.size} {particle.pos} {particle.opacity}"
        style="animation-delay: {particle.delay};"
      ></div>
    {/each}
  </div>

  <!-- ── Main Content ───────────────────────────────────────── -->
  <div class="relative z-10 container-base w-full pt-28 pb-16 lg:pt-32 lg:pb-20">
    <div class="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
      <!-- Left: Text Content -->
      <div class="text-content order-2 lg:order-1">
        <!-- Badge -->
        <div
          class="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold-400/30
                    bg-gold-400/10 text-gold-300 text-xs font-accent font-600 uppercase tracking-[0.15em]
                    mb-8 animate-fade-in opacity-0"
          style="animation-delay: 0.1s; animation-fill-mode: forwards;"
        >
          <span class="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse"></span>
          {config?.hero_badge ?? 'Ikatan Mahasiswa Gresik · UNESA'}
        </div>

        <!-- Headline -->
        <h1
          class="font-display text-white mb-6
                 text-4xl sm:text-5xl lg:text-6xl xl:text-[4.5rem]
                 leading-[1.05] tracking-tight
                 animate-fade-up opacity-0"
          style="animation-delay: 0.2s; animation-fill-mode: forwards;"
        >
          {config?.hero_title?.split(' ').slice(0, -2).join(' ') ?? 'Kabinet'}
          <br />
          <span class="text-gradient-gold">
            {config?.hero_title?.split(' ').slice(-2).join(' ') ?? 'Sinergi Asa'}
          </span>
        </h1>

        <!-- Subtitle -->
        <p
          class="text-navy-200 text-lg lg:text-xl leading-relaxed max-w-xl mb-10
                 animate-fade-up opacity-0"
          style="animation-delay: 0.35s; animation-fill-mode: forwards;"
        >
          {config?.hero_subtitle ??
            'Mari wujudkan kolaborasi progresif untuk pengembangan mahasiswa Gresik yang adaptif, inovatif, dan berdampak bagi almamater serta daerah.'}
        </p>

        <!-- CTA Buttons -->
        <div
          class="flex flex-col sm:flex-row gap-4 animate-fade-up opacity-0"
          style="animation-delay: 0.5s; animation-fill-mode: forwards;"
        >
          <a href="/tentang" class="btn btn-primary btn-lg group">
            Tentang Kami
            <ArrowRight class="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            class="btn btn-outline border-white/30 text-white hover:bg-white hover:text-navy-900 btn-lg"
          >
            Hubungi Kami
          </a>
          {#if config?.is_oprec_open}
            <a
              href="/oprec"
              class="btn bg-emerald-500 hover:bg-emerald-400 text-white btn-lg
                     shadow-[0_2px_20px_rgba(16,185,129,0.3)] hover:shadow-[0_4px_30px_rgba(16,185,129,0.4)]"
            >
              🎯 Daftar Sekarang!
            </a>
          {/if}
        </div>

        <!-- Stats Row -->
        <div
          id="hero-stats"
          class="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-14 pt-10 border-t border-white/10
                 animate-fade-up opacity-0"
          style="animation-delay: 0.65s; animation-fill-mode: forwards;"
        >
          {#each stats as stat, i}
            <div class="flex flex-col gap-1.5">
              <div class="flex items-center gap-2 mb-1">
                <svelte:component this={stat.icon} class="w-4 h-4 {stat.color}" />
              </div>
              <div class="font-display font-700 text-3xl text-white tracking-tight leading-none">
                {stat.current.toLocaleString('id-ID')}{stat.suffix}
              </div>
              <div class="text-navy-300 text-xs font-accent uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          {/each}
        </div>
      </div>

      <!-- Right: Hero Visual -->
      <div class="visual-container order-1 lg:order-2 relative flex justify-center lg:justify-end">
        <!-- Decorative ring -->
        <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div
            class="w-72 h-72 lg:w-96 lg:h-96 rounded-full border border-gold-400/10
                      animate-[pulse_8s_ease-in-out_infinite]"
          ></div>
          <div
            class="absolute w-56 h-56 lg:w-80 lg:h-80 rounded-full border border-gold-400/15
                      animate-[pulse_6s_ease-in-out_infinite_1s]"
          ></div>
        </div>

        <!-- Gold circle accent -->
        <div
          class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                    w-56 h-56 lg:w-80 lg:h-80 rounded-full
                    bg-gradient-to-br from-gold-400/20 to-gold-600/10
                    blur-2xl"
        ></div>

        <!-- Hero mascot/cutout image -->
        <div class="relative z-10 hero-mascot transition-transform duration-700 ease-out">
          <img
            src="/hero_mascot.webp"
            alt="Mahasiswa IMAGE UNESA"
            class="h-[380px] lg:h-[520px] w-auto object-contain drop-shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
            loading="eager"
          />
        </div>

        <!-- Floating info cards -->
        <div
          class="absolute top-8 -left-4 lg:left-4 glass rounded-2xl p-4 shadow-dashboard
                    animate-float"
          style="animation-delay: 1s;"
        >
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-gold-400/20 flex items-center justify-center">
              <span class="text-gold-400 text-lg">🏆</span>
            </div>
            <div>
              <div class="text-white font-600 text-sm leading-none mb-1">Organisasi Aktif</div>
              <div class="text-navy-300 text-xs">Kabinet 2025/2026</div>
            </div>
          </div>
        </div>

        <div
          class="absolute bottom-12 -right-2 lg:right-4 glass rounded-2xl p-4 shadow-dashboard
                    animate-float"
          style="animation-delay: 2.5s;"
        >
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-emerald-400/20 flex items-center justify-center">
              <span class="text-emerald-400 text-lg">📍</span>
            </div>
            <div>
              <div class="text-white font-600 text-sm leading-none mb-1">UNESA Ketintang</div>
              <div class="text-navy-300 text-xs">Surabaya, Jawa Timur</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- ── Bottom wave decoration ─────────────────────────────── -->
  <div class="absolute bottom-0 left-0 right-0">
    <svg
      viewBox="0 0 1440 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      <path d="M0 40C240 80 480 0 720 40C960 80 1200 0 1440 40V80H0V40Z" fill="#fafaf8" />
    </svg>
  </div>
</section>

<style>
  .hero-section {
    min-height: 100svh;
  }
</style>
