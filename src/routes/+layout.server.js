import { redirect } from '@sveltejs/kit';

export async function load({ locals, url }) {
	// Ha nincs account, redirect
	const anonRoutes = [ '/register','/login','/verify','/change' ];

	if (!anonRoutes.find(route => { return url.pathname.startsWith(route); })) {
		if (!locals.pb.authStore.baseModel )  // Ha nincs bejelentkezve, redirect to login
			throw redirect(303, '/login');

		if (!locals.pb.authStore.baseModel.verified) // Ha nincs megerősítve, redirect to verify
			throw redirect(303, '/verify');
	}
}