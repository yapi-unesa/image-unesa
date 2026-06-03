export { matchers } from './matchers.js';

export const nodes = [
	() => import('./nodes/0'),
	() => import('./nodes/1'),
	() => import('./nodes/2'),
	() => import('./nodes/3'),
	() => import('./nodes/4'),
	() => import('./nodes/5'),
	() => import('./nodes/6'),
	() => import('./nodes/7'),
	() => import('./nodes/8'),
	() => import('./nodes/9'),
	() => import('./nodes/10'),
	() => import('./nodes/11'),
	() => import('./nodes/12'),
	() => import('./nodes/13'),
	() => import('./nodes/14'),
	() => import('./nodes/15'),
	() => import('./nodes/16'),
	() => import('./nodes/17'),
	() => import('./nodes/18'),
	() => import('./nodes/19'),
	() => import('./nodes/20'),
	() => import('./nodes/21'),
	() => import('./nodes/22'),
	() => import('./nodes/23'),
	() => import('./nodes/24'),
	() => import('./nodes/25'),
	() => import('./nodes/26'),
	() => import('./nodes/27'),
	() => import('./nodes/28'),
	() => import('./nodes/29'),
	() => import('./nodes/30'),
	() => import('./nodes/31')
];

export const server_loads = [0,3,4];

export const dictionary = {
		"/(public)": [~6,[3]],
		"/dashboard": [~13,[4]],
		"/dashboard/analytics": [~14,[4]],
		"/dashboard/bph": [~15,[4]],
		"/dashboard/bph/transaksi/[id]": [~16,[4]],
		"/dashboard/dmb": [~17,[4]],
		"/dashboard/dmb/rapat/[id]": [~18,[4]],
		"/dashboard/dpb": [~19,[4]],
		"/dashboard/dpb/aspirasi/[id]": [~20,[4]],
		"/dashboard/dpo": [~21,[4]],
		"/dashboard/dpo/anggota/[id]": [~22,[4]],
		"/dashboard/ekraf": [~23,[4]],
		"/dashboard/ekraf/produk/[id]": [~24,[4]],
		"/dashboard/kominfo": [~25,[4]],
		"/dashboard/kominfo/artikel/[id]": [~26,[4]],
		"/dashboard/sosker": [~27,[4]],
		"/dashboard/sosker/program/[id]": [~28,[4]],
		"/dashboard/superadmin": [~29,[4]],
		"/dashboard/superadmin/users": [~30,[4]],
		"/(public)/ekraf": [~7,[3]],
		"/(auth)/login": [~5,[2]],
		"/(public)/oprec": [~8,[3]],
		"/(public)/portofolio": [~9,[3]],
		"/(public)/portofolio/[slug]": [~10,[3]],
		"/(public)/sponsor": [11,[3]],
		"/(public)/tentang": [12,[3]],
		"/unauthorized": [31]
	};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),
	
	reroute: (() => {}),
	transport: {}
};

export const decoders = Object.fromEntries(Object.entries(hooks.transport).map(([k, v]) => [k, v.decode]));
export const encoders = Object.fromEntries(Object.entries(hooks.transport).map(([k, v]) => [k, v.encode]));

export const hash = false;

export const decode = (type, value) => decoders[type](value);

export { default as root } from '../root.js';