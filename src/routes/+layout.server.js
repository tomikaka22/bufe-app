// Ha nincs bejelentkezve, redirect to login
import { redirect } from '@sveltejs/kit';

export function load({ locals, url }) {
	if (![ '/register','/login','/verify','/verified' ].includes(url.pathname)) { // kell, hogy elkerüljünk egy infinite loopot
		if (!locals.pb.authStore.baseModel)  // Ha nincs bejelentkezve, redirect to login
			throw redirect(303, '/login');
		if (!locals.pb.authStore.baseModel.verified) // Ha nincs megerősítve, redirect to verify
			throw redirect(303, '/verify');
		else {
			return {
				name: locals.pb.authStore.baseModel.name
			};
		}
	}
}