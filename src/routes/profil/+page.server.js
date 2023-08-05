import { redirect } from '@sveltejs/kit';

export const actions = {
	logout: async ({ locals }) => {
		locals.pb.authStore.clear();
		throw redirect(303, '/login');
	},
	changeAvatar: async ({ request, locals }) => {
		const data = await request.formData();
		locals.pb.collection('users').update(locals.pb.authStore.baseModel.id, data);
	}
};

export async function load({ locals }) {
	try {
		const linkedSubscription = await locals.pb.collection('push').getFirstListItem(`name = '${locals.pb.authStore.baseModel.id}'`);
		return {
			linkedSubscription: linkedSubscription.subscription
		};

	} catch (error) {
		if (error.status === 404)
			return {
				linkedSubscription: undefined
			};
	}
}