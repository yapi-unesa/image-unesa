
// this file is generated — do not edit it


declare module "svelte/elements" {
	export interface HTMLAttributes<T> {
		'data-sveltekit-keepfocus'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-noscroll'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-preload-code'?:
			| true
			| ''
			| 'eager'
			| 'viewport'
			| 'hover'
			| 'tap'
			| 'off'
			| undefined
			| null;
		'data-sveltekit-preload-data'?: true | '' | 'hover' | 'tap' | 'off' | undefined | null;
		'data-sveltekit-reload'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-replacestate'?: true | '' | 'off' | undefined | null;
	}
}

export {};


declare module "$app/types" {
	type MatcherParam<M> = M extends (param : string) => param is (infer U extends string) ? U : string;

	export interface AppTypes {
		RouteId(): "/(public)" | "/(auth)" | "/" | "/dashboard" | "/dashboard/analytics" | "/dashboard/bph" | "/dashboard/bph/transaksi" | "/dashboard/bph/transaksi/[id]" | "/dashboard/dmb" | "/dashboard/dmb/rapat" | "/dashboard/dmb/rapat/[id]" | "/dashboard/dpb" | "/dashboard/dpb/aspirasi" | "/dashboard/dpb/aspirasi/[id]" | "/dashboard/dpo" | "/dashboard/dpo/anggota" | "/dashboard/dpo/anggota/[id]" | "/dashboard/ekraf" | "/dashboard/ekraf/produk" | "/dashboard/ekraf/produk/[id]" | "/dashboard/kominfo" | "/dashboard/kominfo/artikel" | "/dashboard/kominfo/artikel/[id]" | "/dashboard/sosker" | "/dashboard/sosker/program" | "/dashboard/sosker/program/[id]" | "/dashboard/superadmin" | "/dashboard/superadmin/users" | "/(public)/ekraf" | "/(auth)/login" | "/logout" | "/(public)/oprec" | "/(public)/portofolio" | "/(public)/portofolio/[slug]" | "/(public)/sponsor" | "/(public)/tentang" | "/unauthorized";
		RouteParams(): {
			"/dashboard/bph/transaksi/[id]": { id: string };
			"/dashboard/dmb/rapat/[id]": { id: string };
			"/dashboard/dpb/aspirasi/[id]": { id: string };
			"/dashboard/dpo/anggota/[id]": { id: string };
			"/dashboard/ekraf/produk/[id]": { id: string };
			"/dashboard/kominfo/artikel/[id]": { id: string };
			"/dashboard/sosker/program/[id]": { id: string };
			"/(public)/portofolio/[slug]": { slug: string }
		};
		LayoutParams(): {
			"/(public)": { slug?: string | undefined };
			"/(auth)": Record<string, never>;
			"/": { id?: string | undefined; slug?: string | undefined };
			"/dashboard": { id?: string | undefined };
			"/dashboard/analytics": Record<string, never>;
			"/dashboard/bph": { id?: string | undefined };
			"/dashboard/bph/transaksi": { id?: string | undefined };
			"/dashboard/bph/transaksi/[id]": { id: string };
			"/dashboard/dmb": { id?: string | undefined };
			"/dashboard/dmb/rapat": { id?: string | undefined };
			"/dashboard/dmb/rapat/[id]": { id: string };
			"/dashboard/dpb": { id?: string | undefined };
			"/dashboard/dpb/aspirasi": { id?: string | undefined };
			"/dashboard/dpb/aspirasi/[id]": { id: string };
			"/dashboard/dpo": { id?: string | undefined };
			"/dashboard/dpo/anggota": { id?: string | undefined };
			"/dashboard/dpo/anggota/[id]": { id: string };
			"/dashboard/ekraf": { id?: string | undefined };
			"/dashboard/ekraf/produk": { id?: string | undefined };
			"/dashboard/ekraf/produk/[id]": { id: string };
			"/dashboard/kominfo": { id?: string | undefined };
			"/dashboard/kominfo/artikel": { id?: string | undefined };
			"/dashboard/kominfo/artikel/[id]": { id: string };
			"/dashboard/sosker": { id?: string | undefined };
			"/dashboard/sosker/program": { id?: string | undefined };
			"/dashboard/sosker/program/[id]": { id: string };
			"/dashboard/superadmin": Record<string, never>;
			"/dashboard/superadmin/users": Record<string, never>;
			"/(public)/ekraf": Record<string, never>;
			"/(auth)/login": Record<string, never>;
			"/logout": Record<string, never>;
			"/(public)/oprec": Record<string, never>;
			"/(public)/portofolio": { slug?: string | undefined };
			"/(public)/portofolio/[slug]": { slug: string };
			"/(public)/sponsor": Record<string, never>;
			"/(public)/tentang": Record<string, never>;
			"/unauthorized": Record<string, never>
		};
		Pathname(): "/" | "/dashboard" | "/dashboard/analytics" | "/dashboard/bph" | `/dashboard/bph/transaksi/${string}` & {} | "/dashboard/dmb" | `/dashboard/dmb/rapat/${string}` & {} | "/dashboard/dpb" | `/dashboard/dpb/aspirasi/${string}` & {} | "/dashboard/dpo" | `/dashboard/dpo/anggota/${string}` & {} | "/dashboard/ekraf" | `/dashboard/ekraf/produk/${string}` & {} | "/dashboard/kominfo" | `/dashboard/kominfo/artikel/${string}` & {} | "/dashboard/sosker" | `/dashboard/sosker/program/${string}` & {} | "/dashboard/superadmin" | "/dashboard/superadmin/users" | "/ekraf" | "/login" | "/logout" | "/oprec" | "/portofolio" | `/portofolio/${string}` & {} | "/sponsor" | "/tentang" | "/unauthorized";
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): "/event_1_bem.webp" | "/event_2_bem.webp" | "/event_hackathon.webp" | "/event_leadership.webp" | "/event_seminar.webp" | "/event_seminar_nasional.webp" | "/favicon.svg" | "/hero_bg.webp" | "/hero_campus.webp" | "/hero_cutout.webp" | "/hero_mascot.webp" | "/merch_kaos.webp" | string & {};
	}
}