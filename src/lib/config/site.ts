// ============================================================
// Fallback Static Config
// Used when Supabase is unavailable or during SSG build
// ============================================================

import type { SiteConfig } from '$lib/types';

export const FALLBACK_CONFIG: SiteConfig = {
  id: 1,
  hero_title: 'Kabinet Sinergi Asa',
  hero_subtitle:
    'Mari wujudkan kolaborasi progresif untuk pengembangan mahasiswa Gresik yang adaptif, inovatif, dan berdampak bagi almamater serta daerah.',
  hero_badge: 'Ikatan Mahasiswa Gresik · UNESA',
  whatsapp_contact: '6281234567890',
  email_contact: 'halo@imageunesa.org',
  is_oprec_open: false,
  oprec_deadline: null,
  social_links: {
    instagram: 'https://instagram.com/imageunesa',
    tiktok: 'https://tiktok.com/@imageunesa',
    youtube: 'https://youtube.com/@imageunesa'
  },
  sponsor_logos: [],
  stats: {
    members: 500,
    programs: 15,
    years: 20,
    events: 50
  },
  updated_at: new Date().toISOString(),
  updated_by: null
};

// ── RBAC CONFIGURATION ─────────────────────────────────────────
export const ROLE_LABELS: Record<string, string> = {
  superadmin: 'Superadmin',
  ketum: 'Ketua Umum',
  bph: 'BPH',
  kominfo: 'Kominfo',
  dpo: 'DPO',
  ekraf: 'Ekraf',
  dpb: 'DPB',
  dmb: 'DMB',
  sosker: 'Sosker'
};

export const ROLE_COLORS: Record<string, string> = {
  superadmin: 'bg-purple-100 text-purple-700',
  ketum: 'bg-gold-100 text-gold-700',
  bph: 'bg-blue-100 text-blue-700',
  kominfo: 'bg-green-100 text-green-700',
  dpo: 'bg-orange-100 text-orange-700',
  ekraf: 'bg-pink-100 text-pink-700',
  dpb: 'bg-teal-100 text-teal-700',
  dmb: 'bg-indigo-100 text-indigo-700',
  sosker: 'bg-red-100 text-red-700'
};

// Default redirect per role after login
export const ROLE_REDIRECT: Record<string, string> = {
  superadmin: '/dashboard/superadmin',
  ketum: '/dashboard/analytics',
  bph: '/dashboard/bph',
  kominfo: '/dashboard/kominfo',
  dpo: '/dashboard/dpo',
  ekraf: '/dashboard/ekraf',
  dpb: '/dashboard/dpb',
  dmb: '/dashboard/dmb',
  sosker: '/dashboard/sosker'
};

// Dashboard routes per role (for sidebar)
export const ALLOWED_ROUTES: Record<string, string[]> = {
  superadmin: [
    '/dashboard/superadmin',
    '/dashboard/analytics',
    '/dashboard/bph',
    '/dashboard/kominfo',
    '/dashboard/dpo',
    '/dashboard/ekraf',
    '/dashboard/dpb',
    '/dashboard/dmb',
    '/dashboard/sosker'
  ],
  ketum: [
    '/dashboard/analytics',
    '/dashboard/bph',
    '/dashboard/kominfo',
    '/dashboard/dpo',
    '/dashboard/ekraf'
  ],
  bph: ['/dashboard/bph'],
  kominfo: ['/dashboard/kominfo'],
  dpo: ['/dashboard/dpo'],
  ekraf: ['/dashboard/ekraf'],
  dpb: ['/dashboard/dpb'],
  dmb: ['/dashboard/dmb'],
  sosker: ['/dashboard/sosker']
};

// App metadata
export const APP_META = {
  name: 'IMAGE UNESA',
  tagline: 'Ikatan Mahasiswa Gresik Universitas Negeri Surabaya',
  description:
    'Platform digital resmi IMAGE UNESA — etalase publik dan sistem administrasi internal organisasi mahasiswa daerah Gresik di UNESA.',
  url: 'https://imageunesa.vercel.app',
  cabinet: 'Kabinet Sinergi Asa',
  year: '2026'
};
