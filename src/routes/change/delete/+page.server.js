import { fail, redirect } from '@sveltejs/kit';

export async function load({ locals }) {
	if (!locals.pb.authStore.baseModel )  // Ha nincs bejelentkezve, redirect to login
		throw redirect(303, '/login');
}

export const actions = {
	default: async ({ locals }) => {
		if (locals.pb.authStore.baseModel.id === 'u1fy74rt1m48tx1' )  // Az admin profil ne tudja törölni magát
			throw redirect(303, '/login');

		const elozmenyLista = structuredClone(await locals.pb.collection('rendelesek').getFullList(1, {
			filter: `rendelo = "${locals.pb.authStore.baseModel.id}"`,
			sort: '+created'
		}));

		let status;

		// delete relational records (GDPR elfogadná az anonimizációt is)
		for (const rendeles of elozmenyLista) {
			if (rendeles.status === 'folyamatban')
				return fail(409, { 'error': 'Amíg folyamatban van rendelésed, teljes profil törlés nem lehetséges.' });
			await locals.pb.collection('rendelesek').delete(rendeles.id);
		}

		try {
			await locals.pb.collection('users').delete(locals.pb.authStore.baseModel.id);
			status = 200;
		} catch (error) {
			console.log(error);
			status = error.status;
		}
		if (status === 200)
			throw redirect(303, '/login');

		return {
			status
		};
	}
};