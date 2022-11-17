import { redirect } from '@sveltejs/kit';

export function load({ locals }) {
	if (locals.pb.authStore.isValid) {
		throw redirect(303, '/')
	}
};

export const actions = {
	default: async ({ locals, request }) => {
		let body = Object.fromEntries(await request.formData());
		body.email = body.email.concat('@kkszki.hu')

		try {
			await locals.pb.collection('users').create({...body});
		} catch (err) {
			console.log('Errorrrrrrrrrrrrrrrrrrrr: ', err.data); // TODO: Error handling
		}

		throw redirect(303, '/login');
	}
};
