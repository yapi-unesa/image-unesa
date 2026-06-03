<script lang="ts">
  import { onMount } from 'svelte';
  import { ArrowRight, Target, Lightbulb, Heart, Globe } from 'lucide-svelte';

  let sectionEl: HTMLElement;
  let visible = $state(false);

  const pillars = [
    {
      icon: Target,
      title: 'Visi Kami',
      desc: 'Menjadi inkubator kepemimpinan progresif yang adaptif bagi mahasiswa Gresik di UNESA.',
      color: 'from-gold-400/20 to-gold-600/5',
      iconColor: 'text-gold-500',
      border: 'border-gold-200'
    },
    {
      icon: Lightbulb,
      title: 'Inovatif',
      desc: 'Menghadirkan program-program kreatif yang relevan dengan dinamika zaman dan kebutuhan mahasiswa.',
      color: 'from-blue-400/20 to-blue-600/5',
      iconColor: 'text-blue-500',
      border: 'border-blue-200'
    },
    {
      icon: Heart,
      title: 'Kekeluargaan',
      desc: 'Membangun rumah kedua bagi setiap perantau Gresik, tempat untuk bertumbuh dan berkarya bersama.',
      color: 'from-rose-400/20 to-rose-600/5',
      iconColor: 'text-rose-500',
      border: 'border-rose-200'
    },
    {
      icon: Globe,
      title: 'Berdampak',
      desc: 'Kontribusi nyata bagi almamater dan daerah melalui program pengabdian dan kolaborasi lintas komunitas.',
      color: 'from-emerald-400/20 to-emerald-600/5',
      iconColor: 'text-emerald-500',
      border: 'border-emerald-200'
    }
  ];

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          visible = true;
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (sectionEl) observer.observe(sectionEl);
    return () => observer.disconnect();
  });
</script>

<section id="tentang" class="section bg-surface" bind:this={sectionEl}>
  <div class="container-base">
    <!-- Header -->
    <div
      class="text-center max-w-3xl mx-auto mb-20"
      class:animate-fade-up={visible}
      class:opacity-0={!visible}
    >
      <span class="section-kicker">Tentang Kami</span>
      <h2 class="section-title">
        Membangun Karakter,<br />
        <span class="text-gradient-gold">Mengabdi untuk Negeri</span>
      </h2>
      <p class="section-subtitle mx-auto text-center">
        IMAGE UNESA adalah wadah kekeluargaan bagi mahasiswa perantauan dari Gresik di Universitas
        Negeri Surabaya. Kami berkomitmen menjadi rumah kedua yang hangat sekaligus inkubator
        kepemimpinan yang progresif.
      </p>
    </div>

    <!-- Main Grid -->
    <div class="grid lg:grid-cols-2 gap-16 items-center mb-20">
      <!-- Left: Image collage -->
      <div
        class="image-collage relative"
        class:animate-slide-in-left={visible}
        class:opacity-0={!visible}
      >
        <div class="relative">
          <!-- Main image -->
          <div class="relative rounded-3xl overflow-hidden shadow-card-hover">
            <img
              src="/event_1_bem.webp"
              alt="Kegiatan IMAGE UNESA"
              class="w-full h-80 object-cover"
            />
            <!-- Overlay gradient -->
            <div class="absolute inset-0 bg-gradient-to-t from-navy-900/60 to-transparent"></div>
            <!-- Badge on image -->
            <div class="absolute bottom-6 left-6 glass rounded-2xl px-5 py-3">
              <div class="text-white font-600 text-sm">Kabinet Sinergi Asa</div>
              <div class="text-navy-200 text-xs">Periode 2025 / 2026</div>
            </div>
          </div>

          <!-- Floating small image -->
          <div
            class="absolute -bottom-8 -right-6 w-48 h-48 rounded-2xl overflow-hidden
                      shadow-card-hover border-4 border-white"
          >
            <img src="/hero_campus.webp" alt="Kampus UNESA" class="w-full h-full object-cover" />
          </div>

          <!-- Gold accent dot -->
          <div
            class="absolute -top-4 -left-4 w-20 h-20 rounded-full bg-gradient-gold opacity-80
                      blur-xl"
          ></div>
        </div>
      </div>

      <!-- Right: Text -->
      <div class="about-text" class:animate-slide-in-right={visible} class:opacity-0={!visible}>
        <span class="section-kicker">Siapa Kami</span>
        <h3 class="font-display text-3xl lg:text-4xl text-navy-900 mb-6 leading-tight">
          Lebih dari Sekedar<br />
          <span class="text-navy-600">Organisasi Mahasiswa</span>
        </h3>
        <p class="text-navy-500 text-base leading-relaxed mb-6">
          Berdiri sejak lebih dari dua dekade lalu, IMAGE UNESA telah menjadi jembatan bagi ratusan
          mahasiswa Gresik untuk menemukan komunitas, mengembangkan potensi, dan meninggalkan jejak
          bermakna di almamater.
        </p>
        <p class="text-navy-500 text-base leading-relaxed mb-8">
          Melalui 8 departemen yang terstruktur, setiap anggota memiliki ruang untuk berkontribusi
          sesuai minat dan keahliannya — mulai dari kreasi konten, keuangan, hingga pengembangan
          bisnis kreatif.
        </p>
        <a href="/tentang" class="btn btn-secondary group">
          Lihat Profil Lengkap
          <ArrowRight class="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </a>
      </div>
    </div>

    <!-- Pillars Grid -->
    <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {#each pillars as pillar, i}
        <div
          class="card p-6 border {pillar.border} bg-gradient-to-br {pillar.color}
                 hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300"
          class:opacity-0={!visible}
          style="animation: fadeUp 0.6s ease-out {0.1 + i * 0.1}s forwards;"
        >
          <div
            class="w-12 h-12 rounded-2xl bg-white shadow-card flex items-center justify-center mb-5"
          >
            <svelte:component this={pillar.icon} class="w-6 h-6 {pillar.iconColor}" />
          </div>
          <h4 class="font-display text-lg text-navy-900 mb-3">{pillar.title}</h4>
          <p class="text-navy-500 text-sm leading-relaxed">{pillar.desc}</p>
        </div>
      {/each}
    </div>
  </div>
</section>
