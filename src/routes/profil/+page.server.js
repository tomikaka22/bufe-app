import { redirect } from '@sveltejs/kit';

export const actions = {
	logout: async ({ locals }) => {
		locals.pb.authStore.clear();
		throw redirect(303, '/login');
	},
	changeAvatar: async ({ request, locals }) => {
		const data = await request.formData();
		locals.pb.collection('users').update(locals.pb.authStore.baseModel.id, data);
	},
	changePassword: async ({ request, locals }) => {

	}
};