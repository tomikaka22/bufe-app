import { redirect } from '@sveltejs/kit';

export function load({ locals }) { // ha bevagyunk jelentkezve dobjon át a főoldalra
	if (locals.pb.authStore.isValid) {
		console.log(locals.pb.authStore)
		throw redirect(303, '/')
	}
};

export const actions = { // Bejelentkezés, megkapja az oldal FORM data-ját és az alapján beléptet
	default: async ({ locals, request }) => {
		const body = Object.fromEntries(await request.formData());

		try {
			const authData = await locals.pb.collection('users').authWithPassword(body.email,body.password);
		} catch (err) {
			console.log('Errorrrrrrrrrrrrrrrrrrrr: ', err.data); // TODO: Error handling
		};

		throw redirect(303, '/');
	}
};
