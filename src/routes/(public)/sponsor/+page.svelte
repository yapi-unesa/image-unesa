<script lang="ts">
  import { Handshake, Mail, MessageSquare, ArrowRight, CheckCircle2 } from 'lucide-svelte';

  const benefits = [
    'Exposure ke lebih dari 500+ mahasiswa asal Gresik di UNESA',
    'Pencantuman logo di seluruh media publikasi cetak maupun digital',
    'Adlibs oleh MC pada acara-acara besar IMAGE UNESA',
    'Pemasangan banner/stand promosi saat kegiatan offline',
    'Membangun citra positif perusahaan di kalangan akademisi dan pemuda'
  ];

  const packages = [
    {
      name: 'Platinum',
      price: '> Rp 5.000.000',
      color: 'bg-slate-800 text-white',
      badge: 'bg-gold-500 text-navy-950',
      features: [
        'Logo Terbesar di semua media',
        'Stand Eksklusif',
        'Adlibs 5x/acara',
        'Sertifikat Penghargaan'
      ]
    },
    {
      name: 'Gold',
      price: 'Rp 2.500.000 - Rp 4.999.000',
      color: 'bg-gold-50 text-gold-900 border border-gold-200',
      badge: 'bg-gold-500 text-white',
      features: [
        'Logo Besar di semua media',
        'Stand Promosi',
        'Adlibs 3x/acara',
        'Sertifikat Penghargaan'
      ]
    },
    {
      name: 'Silver',
      price: '< Rp 2.500.000',
      color: 'bg-white text-navy-900 border border-navy-100 shadow-sm',
      badge: 'bg-navy-200 text-navy-800',
      features: ['Logo Sedang', 'Adlibs 1x/acara', 'Sertifikat Penghargaan']
    }
  ];
</script>

<svelte:head>
  <title>Sponsorship | IMAGE UNESA</title>
  <meta name="description" content="Peluang kerja sama dan sponsorship dengan IMAGE UNESA." />
</svelte:head>

<div class="pt-32 pb-24 bg-surface min-h-screen">
  <div class="container-base">
    <!-- Header -->
    <div class="max-w-3xl mx-auto text-center mb-20">
      <div
        class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-400/10 text-gold-500 font-accent font-700 text-sm uppercase tracking-wider mb-6"
      >
        <Handshake class="w-4 h-4" />
        <span>Kerja Sama</span>
      </div>
      <h1 class="font-display font-800 text-4xl md:text-5xl text-navy-950 mb-6 leading-tight">
        Mari Tumbuh <span class="text-gold-500">Bersama Kami</span>
      </h1>
      <p class="text-navy-600/80 text-lg leading-relaxed">
        IMAGE UNESA membuka peluang kerja sama seluas-luasnya bagi instansi, perusahaan, maupun
        perorangan untuk mendukung kegiatan dan pengembangan pemuda daerah.
      </p>
    </div>

    <div class="grid lg:grid-cols-2 gap-16 items-center mb-24">
      <!-- Why Sponsor Us -->
      <div>
        <h2 class="font-display font-700 text-3xl text-navy-900 mb-6">
          Mengapa Menjadi Sponsor Kami?
        </h2>
        <p class="text-navy-600 leading-relaxed mb-8">
          Sebagai organisasi kedaerahan dengan ratusan anggota aktif, kami memiliki audiens yang
          spesifik dan solid. Bekerja sama dengan kami berarti investasi langsung pada pengembangan
          SDM unggul di masa depan.
        </p>

        <ul class="space-y-4">
          {#each benefits as benefit}
            <li class="flex items-start gap-3">
              <CheckCircle2 class="w-5 h-5 text-gold-500 flex-shrink-0 mt-0.5" />
              <span class="text-navy-700">{benefit}</span>
            </li>
          {/each}
        </ul>
      </div>

      <!-- Contact Card -->
      <div
        class="p-8 md:p-10 rounded-3xl bg-navy-950 text-white shadow-card-hover relative overflow-hidden"
      >
        <div
          class="absolute top-0 right-0 w-64 h-64 bg-gold-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"
        ></div>

        <h3 class="font-display font-700 text-2xl mb-2 relative z-10">Tertarik Bekerja Sama?</h3>
        <p class="text-navy-200 mb-8 relative z-10">
          Hubungi Departemen BPH/Humas kami untuk mendapatkan proposal sponsorship lengkap.
        </p>

        <div class="space-y-4 relative z-10">
          <a
            href="https://wa.me/6281234567890"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-4 p-4 rounded-2xl bg-white/10 hover:bg-white/20 transition-colors"
          >
            <div
              class="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white"
            >
              <MessageSquare class="w-5 h-5" />
            </div>
            <div>
              <div class="text-sm text-navy-200">WhatsApp (Humas)</div>
              <div class="font-600">+62 812-3456-7890</div>
            </div>
            <ArrowRight class="w-5 h-5 ml-auto text-navy-300" />
          </a>

          <a
            href="mailto:partnership@imageunesa.org"
            class="flex items-center gap-4 p-4 rounded-2xl bg-white/10 hover:bg-white/20 transition-colors"
          >
            <div
              class="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white"
            >
              <Mail class="w-5 h-5" />
            </div>
            <div>
              <div class="text-sm text-navy-200">Email Resmi</div>
              <div class="font-600">partnership@imageunesa.org</div>
            </div>
            <ArrowRight class="w-5 h-5 ml-auto text-navy-300" />
          </a>
        </div>
      </div>
    </div>

    <!-- Packages (Optional/Visual) -->
    <h2 class="font-display font-700 text-3xl text-navy-900 mb-10 text-center">
      Pilihan Paket Sponsorship
    </h2>
    <div class="grid md:grid-cols-3 gap-8">
      {#each packages as pkg}
        <div class="rounded-3xl p-8 {pkg.color} flex flex-col">
          <div
            class="inline-block px-3 py-1 rounded-full text-xs font-700 uppercase tracking-wider {pkg.badge} mb-6 w-max"
          >
            {pkg.name}
          </div>
          <div class="font-display font-800 text-2xl mb-6 pb-6 border-b border-current/10">
            {pkg.price}
          </div>
          <ul class="space-y-3 flex-1 mb-8">
            {#each pkg.features as feature}
              <li class="flex items-center gap-2 text-sm">
                <CheckCircle2 class="w-4 h-4 opacity-80" />
                <span>{feature}</span>
              </li>
            {/each}
          </ul>
          <button
            class="w-full py-3 rounded-xl border border-current/20 hover:bg-current hover:text-white transition-colors font-600 opacity-80 hover:opacity-100 text-sm mix-blend-luminosity"
          >
            Lihat Proposal
          </button>
        </div>
      {/each}
    </div>
  </div>
</div>
