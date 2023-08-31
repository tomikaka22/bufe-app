export const ssr = false;

export async function load({ locals, url }) {
	return {
		termekek: structuredClone(await locals.pb.collection('termekek').getFirstListItem(`termek = "${decodeURI(url.pathname.substring(1))}"`)),
		kedvencek: locals.pb.authStore.baseModel.kedvencek
	};
}


export const actions = {
	default: async ({ request, locals }) => {
		const data = Object.fromEntries(await request.formData());

		if (!locals.pb.authStore.baseModel.kedvencek.includes(data.id)) {
			await locals.pb.collection('users').update(locals.pb.authStore.baseModel.id, {
				kedvencek: [ data.id, ...locals.pb.authStore.baseModel.kedvencek ]
			});

		} else {
			await locals.pb.collection('users').update(locals.pb.authStore.baseModel.id, {
				kedvencek: locals.pb.authStore.baseModel.kedvencek.filter((id) => id !== data.id)
			});
		}
	}
};