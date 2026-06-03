// ============================================================
// IMAGE UNESA — Shared TypeScript Interfaces
// ============================================================

// ── ROLES & ACCESS ────────────────────────────────────────────
export type Role =
  | 'superadmin'
  | 'ketum'
  | 'bph'
  | 'kominfo'
  | 'dpo'
  | 'ekraf'
  | 'dpb'
  | 'dmb'
  | 'sosker';

export type Hierarchy = 'pimpinan' | 'kadep' | 'wakadep' | 'staf';

// ── PROFILES ──────────────────────────────────────────────────
export interface Profile {
  id: string;
  role: Role;
  hierarchy: Hierarchy | null;
  full_name: string;
  avatar_url: string | null;
  phone: string | null;
  angkatan: number | null;
  prodi: string | null;
  is_active: boolean;
  created_at: string;
}

// ── SITE CONFIG (Singleton) ───────────────────────────────────
export interface SiteConfig {
  id: number;
  hero_title: string;
  hero_subtitle: string;
  hero_badge: string;
  whatsapp_contact: string;
  email_contact: string;
  is_oprec_open: boolean;
  oprec_deadline: string | null;
  social_links: SocialLinks;
  sponsor_logos: SponsorLogo[];
  stats: SiteStats;
  updated_at: string;
  updated_by: string | null;
}

export interface SocialLinks {
  instagram?: string;
  tiktok?: string;
  youtube?: string;
  twitter?: string;
  linkedin?: string;
}

export interface SponsorLogo {
  name: string;
  logo_url: string;
  website_url?: string;
  tier?: 'platinum' | 'gold' | 'silver' | 'bronze';
}

export interface SiteStats {
  members?: number;
  programs?: number;
  years?: number;
  events?: number;
}

// ── ARTICLES (Kominfo) ────────────────────────────────────────
export interface Article {
  id: string;
  slug: string;
  title: string;
  content: string | null;
  excerpt: string | null;
  cover_url: string | null;
  category: ArticleCategory;
  is_published: boolean;
  published_at: string | null;
  author_id: string | null;
  author?: Pick<Profile, 'full_name' | 'avatar_url'>;
  created_at: string;
}

export type ArticleCategory = 'berita' | 'program' | 'pengumuman' | 'artikel';

// ── TRANSACTIONS (BPH) ───────────────────────────────────────
export interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  description: string;
  category: string | null;
  proof_url: string | null;
  approved_by: string | null;
  approver?: Pick<Profile, 'full_name'>;
  created_by: string | null;
  creator?: Pick<Profile, 'full_name'>;
  created_at: string;
}

export interface CashSummary {
  total_income: number;
  total_expense: number;
  balance: number;
  transaction_count: number;
}

// ── MERCHANDISE (Ekraf) ───────────────────────────────────────
export interface Merchandise {
  id: string;
  name: string;
  description: string | null;
  price: number;
  stock: number;
  image_url: string | null;
  wa_link: string | null;
  is_active: boolean;
  created_by: string | null;
  created_at: string;
}

// ── MEMBERS (DPO) ─────────────────────────────────────────────
export interface Member {
  id: string;
  full_name: string;
  nim: string | null;
  prodi: string | null;
  angkatan: number | null;
  phone: string | null;
  email: string | null;
  status: MemberStatus;
  photo_url: string | null;
  profile_id: string | null;
  created_at: string;
}

export type MemberStatus = 'aktif' | 'alumni' | 'nonaktif';

// ── NAVIGATION ────────────────────────────────────────────────
export interface NavItem {
  label: string;
  href: string;
  icon?: string;
  roles?: Role[];
  children?: NavItem[];
}

// ── DASHBOARD SIDEBAR ─────────────────────────────────────────
export interface SidebarSection {
  title: string;
  items: SidebarItem[];
}

export interface SidebarItem {
  label: string;
  href: string;
  icon: string;
  roles: Role[];
  badge?: string | number;
}

// ── API RESPONSES ─────────────────────────────────────────────
export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  count?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  count: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// ── FORM STATES ───────────────────────────────────────────────
export interface FormState {
  loading: boolean;
  error: string | null;
  success: string | null;
}

// ── SUPABASE DATABASE TYPES ───────────────────────────────────
// This will be auto-generated via supabase gen types
// For now, we define a minimal type
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: Partial<Profile>;
        Update: Partial<Profile>;
      };
      site_config: {
        Row: SiteConfig;
        Insert: Partial<SiteConfig>;
        Update: Partial<SiteConfig>;
      };
      transactions: {
        Row: Transaction;
        Insert: Omit<Transaction, 'id' | 'created_at'>;
        Update: Partial<Transaction>;
      };
      merchandise: {
        Row: Merchandise;
        Insert: Omit<Merchandise, 'id' | 'created_at'>;
        Update: Partial<Merchandise>;
      };
      articles: {
        Row: Article;
        Insert: Omit<Article, 'id' | 'created_at'>;
        Update: Partial<Article>;
      };
      members: {
        Row: Member;
        Insert: Omit<Member, 'id' | 'created_at'>;
        Update: Partial<Member>;
      };
    };
  };
}
