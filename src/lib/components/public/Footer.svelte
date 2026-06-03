<script lang="ts">
  import { Instagram, Youtube, Music2, Mail, MapPin, Phone, ArrowRight } from 'lucide-svelte';
  import type { SiteConfig } from '$lib/types';
  import { getWhatsAppLink } from '$lib/utils/helpers';
  import { APP_META } from '$lib/config/site';

  let { config }: { config: SiteConfig | null } = $props();

  const socialIcons: Record<string, any> = {
    instagram: Instagram,
    youtube: Youtube,
    tiktok: Music2
  };

  const navLinks = [
    { label: 'Beranda', href: '/' },
    { label: 'Tentang Kami', href: '/tentang' },
    { label: 'Program Kerja', href: '/portofolio' },
    { label: 'Ekraf', href: '/ekraf' },
    { label: 'Sponsor', href: '/sponsor' },
    { label: 'Open Recruitment', href: '/oprec' }
  ];

  const waLink = $derived(getWhatsAppLink(config?.whatsapp_contact ?? '6281234567890'));
</script>

<footer class="bg-navy-950 text-white relative overflow-hidden">
  <!-- Top decorative wave -->
  <div class="absolute top-0 left-0 right-0">
    <svg
      viewBox="0 0 1440 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      <path d="M0 40C240 0 480 80 720 40C960 0 1200 80 1440 40V0H0V40Z" fill="#fafaf8" />
    </svg>
  </div>

  <!-- Background mesh -->
  <div
    class="absolute inset-0 opacity-30"
    style="background-image: radial-gradient(at 20% 80%, rgba(30,58,95,0.5) 0px, transparent 50%), radial-gradient(at 80% 20%, rgba(46,78,146,0.3) 0px, transparent 50%);"
  ></div>

  <div class="relative z-10">
    <!-- Main footer grid -->
    <div class="container-base pt-24 pb-12">
      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        <!-- Brand Column -->
        <div class="lg:col-span-2">
          <!-- Logo -->
          <div class="flex items-center gap-3 mb-6">
            <div
              class="w-12 h-12 rounded-2xl bg-gradient-gold flex items-center justify-center shadow-glow-gold"
            >
              <span class="text-navy-900 font-900 font-accent text-base">IM</span>
            </div>
            <div>
              <div class="font-display font-700 text-2xl text-white leading-none">IMAGE</div>
              <div
                class="font-accent font-800 text-[11px] text-gold-400 uppercase tracking-[0.2em]"
              >
                UNESA
              </div>
            </div>
          </div>

          <p class="text-navy-300 text-sm leading-relaxed max-w-sm mb-8">
            Ikatan Mahasiswa Gresik Universitas Negeri Surabaya. Membangun karakter, mengabdi untuk
            negeri, mewujudkan kolaborasi progresif bagi mahasiswa Gresik.
          </p>

          <!-- Social Links -->
          <div class="flex items-center gap-3">
            {#each Object.entries(config?.social_links ?? {}) as [platform, url]}
              {#if url && socialIcons[platform]}
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="w-10 h-10 rounded-xl glass flex items-center justify-center
                         text-navy-300 hover:text-gold-400 hover:border-gold-400/30
                         transition-all duration-200 border border-white/10"
                  aria-label={platform}
                >
                  <svelte:component this={socialIcons[platform]} class="w-4 h-4" />
                </a>
              {/if}
            {/each}

            <!-- Default social if no config -->
            {#if !config?.social_links?.instagram}
              <a
                href="#"
                class="w-10 h-10 rounded-xl glass flex items-center justify-center text-navy-300 hover:text-gold-400 transition-colors border border-white/10"
              >
                <Instagram class="w-4 h-4" />
              </a>
              <a
                href="#"
                class="w-10 h-10 rounded-xl glass flex items-center justify-center text-navy-300 hover:text-gold-400 transition-colors border border-white/10"
              >
                <Youtube class="w-4 h-4" />
              </a>
            {/if}
          </div>
        </div>

        <!-- Navigation Links -->
        <div>
          <h4 class="font-accent font-700 text-sm uppercase tracking-[0.15em] text-white mb-6">
            Navigasi
          </h4>
          <ul class="flex flex-col gap-3">
            {#each navLinks as link}
              <li>
                <a
                  href={link.href}
                  class="text-navy-300 text-sm hover:text-gold-400 transition-colors flex items-center gap-2 group"
                >
                  <ArrowRight
                    class="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all"
                  />
                  {link.label}
                </a>
              </li>
            {/each}
          </ul>
        </div>

        <!-- Contact Info -->
        <div>
          <h4 class="font-accent font-700 text-sm uppercase tracking-[0.15em] text-white mb-6">
            Kontak
          </h4>
          <ul class="flex flex-col gap-4">
            <li class="flex items-start gap-3">
              <MapPin class="w-4 h-4 text-gold-400 flex-shrink-0 mt-0.5" />
              <span class="text-navy-300 text-sm leading-relaxed">
                Sekretariat IMAGE UNESA<br />
                Kampus Ketintang, Surabaya<br />
                Jawa Timur 60231
              </span>
            </li>
            <li class="flex items-center gap-3">
              <Mail class="w-4 h-4 text-gold-400 flex-shrink-0" />
              <a
                href="mailto:{config?.email_contact ?? 'halo@imageunesa.org'}"
                class="text-navy-300 text-sm hover:text-gold-400 transition-colors"
              >
                {config?.email_contact ?? 'halo@imageunesa.org'}
              </a>
            </li>
            <li class="flex items-center gap-3">
              <Phone class="w-4 h-4 text-gold-400 flex-shrink-0" />
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                class="text-navy-300 text-sm hover:text-gold-400 transition-colors"
              >
                WhatsApp Kami
              </a>
            </li>
          </ul>

          <!-- Login link for admins -->
          <div class="mt-8 pt-6 border-t border-white/10">
            <a
              href="/login"
              class="text-navy-400 text-xs hover:text-navy-300 transition-colors flex items-center gap-1.5"
            >
              🔐 Portal Pengurus
            </a>
          </div>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div
        class="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
      >
        <p class="text-navy-400 text-sm">
          &copy; {APP_META.year}
          {APP_META.name}. All rights reserved.
          <span class="text-navy-500">· {APP_META.cabinet}</span>
        </p>
        <div class="flex items-center gap-6">
          <a href="/oprec" class="text-navy-400 text-xs hover:text-navy-300 transition-colors">
            Open Recruitment
          </a>
          <a href="/sponsor" class="text-navy-400 text-xs hover:text-navy-300 transition-colors">
            Kerjasama Sponsor
          </a>
        </div>
      </div>
    </div>
  </div>
</footer>
