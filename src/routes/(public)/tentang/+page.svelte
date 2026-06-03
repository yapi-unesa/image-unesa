<script lang="ts">
  import { Users, Target, Lightbulb, Heart, ArrowRight } from 'lucide-svelte';

  // Dummy data for structure
  const pimpinan = [
    { role: 'Ketua Umum', name: 'M. Syafiq', prodi: 'S1 Teknik Informatika' },
    { role: 'Wakil Ketua', name: 'Nabila Putri', prodi: 'S1 Pendidikan Sejarah' },
    { role: 'Sekretaris Umum', name: 'Ahmad Faisal', prodi: 'S1 Ilmu Komunikasi' },
    { role: 'Bendahara Umum', name: 'Dina Lestari', prodi: 'S1 Akuntansi' }
  ];

  const departemen = [
    {
      name: 'Badan Pengurus Harian (BPH)',
      desc: 'Mengatur administrasi dan keuangan organisasi.',
      icon: Users
    },
    {
      name: 'Kominfo',
      desc: 'Mengelola media sosial, publikasi, dan sistem informasi.',
      icon: Lightbulb
    },
    {
      name: 'Departemen Pengembangan Organisasi (DPO)',
      desc: 'Mengawasi kinerja pengurus dan regenerasi anggota.',
      icon: Target
    },
    {
      name: 'Ekonomi Kreatif (Ekraf)',
      desc: 'Mengelola pendanaan mandiri melalui merchandise.',
      icon: Heart
    }
  ];
</script>

<svelte:head>
  <title>Tentang Kami | IMAGE UNESA</title>
  <meta name="description" content="Profil, Visi, Misi, dan Struktur Kabinet IMAGE UNESA" />
</svelte:head>

<div class="pt-32 pb-24 bg-surface min-h-screen">
  <!-- Hero Section -->
  <div class="container-base mb-24">
    <div class="max-w-3xl mx-auto text-center">
      <div
        class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-400/10 text-gold-500 font-accent font-700 text-sm uppercase tracking-wider mb-6"
      >
        <Users class="w-4 h-4" />
        <span>Profil Organisasi</span>
      </div>
      <h1 class="font-display font-800 text-4xl md:text-5xl text-navy-950 mb-6 leading-tight">
        Membangun Mahasiswa Gresik yang <span class="text-gold-500">Progresif & Sinergis</span>
      </h1>
      <p class="text-navy-600/80 text-lg leading-relaxed">
        Ikatan Mahasiswa Gresik Universitas Negeri Surabaya (IMAGE UNESA) adalah wadah kekeluargaan
        dan pengembangan diri bagi seluruh mahasiswa asal Gresik yang menempuh pendidikan di UNESA.
      </p>
    </div>
  </div>

  <!-- Visi Misi -->
  <div class="container-base mb-24">
    <div class="grid md:grid-cols-2 gap-12 items-start">
      <!-- Visi -->
      <div class="p-10 rounded-3xl bg-white shadow-card border border-navy-100/50">
        <div class="w-14 h-14 rounded-2xl bg-gold-400/10 flex items-center justify-center mb-6">
          <Lightbulb class="w-7 h-7 text-gold-500" />
        </div>
        <h2 class="font-display font-700 text-3xl text-navy-900 mb-4">Visi</h2>
        <p class="text-navy-600 leading-relaxed text-lg">
          Mewujudkan IMAGE UNESA sebagai organisasi kedaerahan yang solid, inovatif, dan berdaya
          guna bagi mahasiswa Gresik, almamater UNESA, serta masyarakat luas dengan menjunjung
          tinggi nilai kekeluargaan dan profesionalisme.
        </p>
      </div>

      <!-- Misi -->
      <div class="p-10 rounded-3xl bg-navy-950 text-white shadow-card relative overflow-hidden">
        <div
          class="absolute top-0 right-0 w-64 h-64 bg-gold-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"
        ></div>
        <div
          class="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-6 relative z-10"
        >
          <Target class="w-7 h-7 text-gold-400" />
        </div>
        <h2 class="font-display font-700 text-3xl text-white mb-6 relative z-10">Misi</h2>
        <ul class="space-y-4 relative z-10">
          {#each ['Mempererat tali silaturahmi antar mahasiswa Gresik di UNESA.', 'Menyelenggarakan kegiatan yang mendukung pengembangan akademik dan non-akademik.', 'Membangun sinergi dengan berbagai pihak untuk kemajuan organisasi.', 'Menanamkan rasa cinta dan kepedulian terhadap daerah asal, Kabupaten Gresik.'] as misi, i}
            <li class="flex items-start gap-4">
              <span
                class="flex-shrink-0 w-6 h-6 rounded-full bg-gold-500/20 text-gold-400 flex items-center justify-center text-sm font-700 mt-1"
              >
                {i + 1}
              </span>
              <span class="text-navy-100 leading-relaxed">{misi}</span>
            </li>
          {/each}
        </ul>
      </div>
    </div>
  </div>

  <!-- Struktur Kabinet -->
  <div class="container-base">
    <div class="text-center mb-16">
      <h2 class="font-display font-800 text-3xl text-navy-950 mb-4">Struktur Kabinet</h2>
      <p class="text-navy-600">Mengenal lebih dekat para penggerak IMAGE UNESA</p>
    </div>

    <!-- Pimpinan -->
    <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
      {#each pimpinan as p}
        <div
          class="p-6 rounded-2xl bg-white shadow-card-sm border border-navy-50 text-center hover:shadow-card-hover transition-all duration-300"
        >
          <div
            class="w-20 h-20 mx-auto rounded-full bg-navy-50 mb-4 flex items-center justify-center"
          >
            <Users class="w-8 h-8 text-navy-300" />
          </div>
          <div class="font-accent font-700 text-xs text-gold-500 uppercase tracking-widest mb-2">
            {p.role}
          </div>
          <h3 class="font-display font-700 text-lg text-navy-900 mb-1">{p.name}</h3>
          <p class="text-navy-400 text-sm">{p.prodi}</p>
        </div>
      {/each}
    </div>

    <!-- Departemen -->
    <h3 class="font-display font-700 text-2xl text-navy-900 mb-8 text-center">Departemen</h3>
    <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {#each departemen as dep}
        <div
          class="p-6 rounded-2xl bg-white shadow-card-sm border border-navy-50 group hover:border-gold-200 transition-colors"
        >
          <div
            class="w-12 h-12 rounded-xl bg-navy-50 flex items-center justify-center mb-5 group-hover:bg-gold-50 transition-colors"
          >
            {#if typeof dep.icon !== 'string'}
              {@const Icon = dep.icon}
              <Icon class="w-6 h-6 text-navy-500 group-hover:text-gold-500 transition-colors" />
            {/if}
          </div>
          <h4 class="font-display font-700 text-navy-900 mb-2">{dep.name}</h4>
          <p class="text-navy-500 text-sm leading-relaxed">{dep.desc}</p>
        </div>
      {/each}
    </div>
  </div>
</div>
