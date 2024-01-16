import { redirect } from '@sveltejs/kit';

export async function load({ locals }) {
	if (!locals.pb.authStore.baseModel)  // Ha nincs bejelentkezve, redirect to login
		throw redirect(303, '/login');
	if (locals.pb.authStore.baseModel.verified)
		throw redirect(303, '/home');

	return {
		name: locals.pb.authStore.baseModel.name
	};
}

export const actions = {
	logout: async ({ locals }) => {
		locals.pb.authStore.clear();
		throw redirect(303, '/login');
	},

	resend: async ({ locals }) => {
		await locals.pb.collection('users').requestVerification(locals.pb.authStore.baseModel.email);
	}
};