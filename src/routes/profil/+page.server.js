import { redirect } from '@sveltejs/kit';
import sharp from 'sharp';

export async function load({ locals }) {
	return {
		name: locals.pb.authStore?.baseModel?.name
	};
}

export const actions = {
	logout: async ({ locals }) => {
		locals.pb.authStore.clear();
		throw redirect(303, '/login');
	},
	changeAvatar: async ({ request, locals }) => {
		const image = (await request.formData()).get('avatar');

		if (image.size) {
			const optimizedImage = await sharp(await image.arrayBuffer()).resize(600, 600).avif({ effort: 2, chromaSubsampling: '4:2:0' }).toBuffer();

			const formData = new FormData();
			formData.append('avatar', new Blob([ optimizedImage ]));

			await locals.pb.collection('users').update(locals.pb.authStore.baseModel.id, formData);
		}

	}
};