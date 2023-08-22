import { redirect } from '@sveltejs/kit';
import sharp from 'sharp';

export const actions = {
	logout: async ({ locals }) => {
		locals.pb.authStore.clear();
		throw redirect(303, '/login');
	},
	changeAvatar: async ({ request, locals }) => {
		const image = (await request.formData()).get('avatar');

		if (image.size) {
			const optimizedImage = await sharp(await image.arrayBuffer()).resize(512, 512).avif({ effort: 1, chromaSubsampling: '4:2:0' }).toBuffer();

			const formData = new FormData();
			formData.append('avatar', new Blob([ optimizedImage ]));

			await locals.pb.collection('users').update(locals.pb.authStore.baseModel.id, formData);
		}

	}
};

export async function load({ locals }) {
	try {
		const linkedSubscription = await locals.pb.collection('push').getFirstListItem(`name = '${locals.pb.authStore.baseModel.id}'`);
		return {
			linkedSubscription: linkedSubscription.subscription,
			name: locals.pb.authStore?.baseModel?.name
		};

	} catch (error) {
		if (error.status === 404)
			return {
				linkedSubscription: undefined,
				name: locals.pb.authStore?.baseModel?.name
			};
	}
}