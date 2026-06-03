<script lang="ts">
  import { Users, Clock, CheckCircle2, ArrowRight, XCircle } from 'lucide-svelte';

  let { data } = $props();
  let config = $derived(data.siteConfig);

  const isOpen = config.is_oprec_open;

  function formatDeadline(dateStr: string) {
    if (!dateStr) return 'Batas waktu belum ditentukan';
    return (
      new Date(dateStr).toLocaleDateString('id-ID', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }) + ' WIB'
    );
  }
</script>

<svelte:head>
  <title>Open Recruitment | IMAGE UNESA</title>
  <meta
    name="description"
    content="Pendaftaran anggota dan pengurus baru Ikatan Mahasiswa Gresik Universitas Negeri Surabaya."
  />
</svelte:head>

<div class="pt-32 pb-24 bg-surface min-h-screen">
  <div class="container-base">
    <div class="max-w-3xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-12">
        <div
          class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-400/10 text-gold-500 font-accent font-700 text-sm uppercase tracking-wider mb-6"
        >
          <Users class="w-4 h-4" />
          <span>Rekrutmen Pengurus</span>
        </div>
        <h1 class="font-display font-800 text-4xl md:text-5xl text-navy-950 mb-6 leading-tight">
          Bergabung Bersama <span class="text-gold-500">IMAGE UNESA</span>
        </h1>
        <p class="text-navy-600/80 text-lg leading-relaxed">
          Kembangkan potensi kepemimpinanmu dan berkontribusi langsung untuk kemajuan mahasiswa
          daerah.
        </p>
      </div>

      <!-- Status Card -->
      <div class="rounded-3xl bg-white shadow-card border border-navy-50 overflow-hidden mb-12">
        {#if isOpen}
          <div
            class="bg-green-500 text-white p-6 flex flex-col sm:flex-row items-center justify-between gap-4"
          >
            <div class="flex items-center gap-4">
              <div
                class="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0"
              >
                <CheckCircle2 class="w-6 h-6" />
              </div>
              <div>
                <h3 class="font-display font-700 text-xl">Pendaftaran Dibuka!</h3>
                <p class="text-green-50 text-sm opacity-90">
                  Segera daftarkan dirimu sebelum batas waktu berakhir.
                </p>
              </div>
            </div>
            {#if config.oprec_deadline}
              <div
                class="flex items-center gap-2 bg-black/20 px-4 py-2 rounded-xl text-sm font-600 whitespace-nowrap"
              >
                <Clock class="w-4 h-4" />
                <span>Batas: {formatDeadline(config.oprec_deadline)}</span>
              </div>
            {/if}
          </div>

          <div class="p-8 md:p-12">
            <h4 class="font-display font-700 text-2xl text-navy-900 mb-6">Persyaratan Umum</h4>
            <ul class="space-y-4 mb-10">
              <li class="flex items-start gap-3">
                <CheckCircle2 class="w-5 h-5 text-gold-500 flex-shrink-0 mt-0.5" />
                <span class="text-navy-700"
                  >Mahasiswa aktif Universitas Negeri Surabaya angkatan 2024 atau 2025.</span
                >
              </li>
              <li class="flex items-start gap-3">
                <CheckCircle2 class="w-5 h-5 text-gold-500 flex-shrink-0 mt-0.5" />
                <span class="text-navy-700"
                  >Berasal dari Kabupaten Gresik (dibuktikan dengan KTP/KTM/KHS).</span
                >
              </li>
              <li class="flex items-start gap-3">
                <CheckCircle2 class="w-5 h-5 text-gold-500 flex-shrink-0 mt-0.5" />
                <span class="text-navy-700"
                  >Berkomitmen aktif mengikuti seluruh kegiatan organisasi selama 1 periode
                  kepengurusan.</span
                >
              </li>
              <li class="flex items-start gap-3">
                <CheckCircle2 class="w-5 h-5 text-gold-500 flex-shrink-0 mt-0.5" />
                <span class="text-navy-700"
                  >Memiliki loyalitas, tanggung jawab, dan mampu bekerja sama dalam tim.</span
                >
              </li>
            </ul>

            <h4 class="font-display font-700 text-2xl text-navy-900 mb-6">Alur Pendaftaran</h4>
            <div class="grid sm:grid-cols-3 gap-6 mb-10">
              <div class="p-6 rounded-2xl bg-navy-50 text-center relative">
                <div
                  class="w-8 h-8 rounded-full bg-navy-900 text-white font-700 flex items-center justify-center mx-auto mb-3 absolute -top-4 left-1/2 -translate-x-1/2"
                >
                  1
                </div>
                <div class="font-700 text-navy-900 mb-1 mt-2">Isi Formulir</div>
                <div class="text-sm text-navy-500">Lengkapi data diri via Google Form</div>
              </div>
              <div class="p-6 rounded-2xl bg-navy-50 text-center relative">
                <div
                  class="w-8 h-8 rounded-full bg-navy-900 text-white font-700 flex items-center justify-center mx-auto mb-3 absolute -top-4 left-1/2 -translate-x-1/2"
                >
                  2
                </div>
                <div class="font-700 text-navy-900 mb-1 mt-2">Wawancara</div>
                <div class="text-sm text-navy-500">Sesi interview online/offline</div>
              </div>
              <div class="p-6 rounded-2xl bg-navy-50 text-center relative">
                <div
                  class="w-8 h-8 rounded-full bg-navy-900 text-white font-700 flex items-center justify-center mx-auto mb-3 absolute -top-4 left-1/2 -translate-x-1/2"
                >
                  3
                </div>
                <div class="font-700 text-navy-900 mb-1 mt-2">Pengumuman</div>
                <div class="text-sm text-navy-500">Hasil seleksi akan dihubungi panitia</div>
              </div>
            </div>

            <!-- CTA -->
            <a
              href="https://forms.gle/dummyoprecimageunesa"
              target="_blank"
              rel="noopener noreferrer"
              class="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gold-500 text-navy-950 font-700 text-lg hover:bg-gold-400 transition-colors shadow-glow-gold"
            >
              <span>Isi Formulir Pendaftaran Sekarang</span>
              <ArrowRight class="w-5 h-5" />
            </a>
          </div>
        {:else}
          <!-- Closed State -->
          <div
            class="bg-navy-50 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-navy-100"
          >
            <div class="flex items-center gap-4">
              <div
                class="w-12 h-12 rounded-full bg-navy-100 flex items-center justify-center flex-shrink-0"
              >
                <XCircle class="w-6 h-6 text-navy-400" />
              </div>
              <div>
                <h3 class="font-display font-700 text-xl text-navy-900">Pendaftaran Ditutup</h3>
                <p class="text-navy-500 text-sm">
                  Saat ini kami belum menerima pendaftaran pengurus baru.
                </p>
              </div>
            </div>
          </div>

          <div class="p-8 md:p-12 text-center">
            <div
              class="w-24 h-24 mx-auto rounded-full bg-navy-50 flex items-center justify-center mb-6"
            >
              <Users class="w-12 h-12 text-navy-200" />
            </div>
            <h4 class="font-display font-700 text-2xl text-navy-900 mb-4">
              Terima Kasih Atas Antusiasmenya
            </h4>
            <p class="text-navy-600 max-w-lg mx-auto leading-relaxed mb-8">
              Mohon maaf, Open Recruitment Pengurus IMAGE UNESA untuk periode ini telah ditutup.
              Pantau terus Instagram kami untuk informasi kegiatan dan rekrutmen periode
              selanjutnya!
            </p>
            <a
              href="https://instagram.com/image_unesa"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-navy-900 text-white font-600 hover:bg-navy-800 transition-colors"
            >
              <span>Follow Instagram Kami</span>
            </a>
          </div>
        {/if}
      </div>
    </div>
  </div>
</div>
