import type * as Kit from '@sveltejs/kit';

type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never;
type MatcherParam<M> = M extends (param : string) => param is (infer U extends string) ? U : string;
type RouteParams = {  };
type RouteId = '/';
type MaybeWithVoid<T> = {} extends T ? T | void : T;
export type RequiredKeys<T> = { [K in keyof T]-?: {} extends { [P in K]: T[K] } ? never : K; }[keyof T];
type OutputDataShape<T> = MaybeWithVoid<Omit<App.PageData, RequiredKeys<T>> & Partial<Pick<App.PageData, keyof T & keyof App.PageData>> & Record<string, any>>
type EnsureDefined<T> = T extends null | undefined ? {} : T;
type OptionalUnion<U extends Record<string, any>, A extends keyof U = U extends U ? keyof U : never> = U extends unknown ? { [P in Exclude<A, keyof U>]?: never } & U : never;
export type Snapshot<T = any> = Kit.Snapshot<T>;
type LayoutRouteId = RouteId | "/(auth)/login" | "/(public)" | "/(public)/ekraf" | "/(public)/oprec" | "/(public)/portofolio" | "/(public)/portofolio/[slug]" | "/(public)/sponsor" | "/(public)/tentang" | "/dashboard" | "/dashboard/analytics" | "/dashboard/bph" | "/dashboard/bph/transaksi/[id]" | "/dashboard/dmb" | "/dashboard/dmb/rapat/[id]" | "/dashboard/dpb" | "/dashboard/dpb/aspirasi/[id]" | "/dashboard/dpo" | "/dashboard/dpo/anggota/[id]" | "/dashboard/ekraf" | "/dashboard/ekraf/produk/[id]" | "/dashboard/kominfo" | "/dashboard/kominfo/artikel/[id]" | "/dashboard/sosker" | "/dashboard/sosker/program/[id]" | "/dashboard/superadmin" | "/dashboard/superadmin/users" | "/unauthorized" | null
type LayoutParams = RouteParams & { slug?: string | undefined; id?: string | undefined }
type LayoutServerParentData = EnsureDefined<{}>;
type LayoutParentData = EnsureDefined<{}>;

export type LayoutServerLoad<OutputData extends OutputDataShape<LayoutServerParentData> = OutputDataShape<LayoutServerParentData>> = Kit.ServerLoad<LayoutParams, LayoutServerParentData, OutputData, LayoutRouteId>;
export type LayoutServerLoadEvent = Parameters<LayoutServerLoad>[0];
export type LayoutServerData = Expand<OptionalUnion<EnsureDefined<Kit.LoadProperties<Awaited<ReturnType<typeof import('./proxy+layout.server.js').load>>>>>>;
export type LayoutData = Expand<Omit<LayoutParentData, keyof LayoutServerData> & EnsureDefined<LayoutServerData>>;
export type LayoutProps = { params: LayoutParams; data: LayoutData; children: import("svelte").Snippet }
export type RequestEvent = Kit.RequestEvent<RouteParams, RouteId>;