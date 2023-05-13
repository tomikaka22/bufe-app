let currentUser

export async function load({ locals }) {
	currentUser = structuredClone(await locals.pb.collection('users').getOne(locals.pb.authStore.baseModel.id));

	return {
		currentUser,
	};
}

export const actions = {
	logout: async ({ locals }) => {
		locals.pb.authStore.clear();
	},
	changeAvatar: async ({ request, locals }) => {
		const data = await request.formData();
		locals.pb.collection('users').update(locals.pb.authStore.baseModel.id, data);
	},
	changePassword: async ({ request, locals }) => {

	},
	addFav: async ({ request, locals }) => {
		const data = await request.formData();
		const newFavObj = JSON.parse(data.get('newFav'));
		const keyToAdd = Object.keys(newFavObj)[0];

		if (!keyToAdd) throw new Error("Invalid favorite data.");

		const dbfavs = currentUser.favs || {};
		if (dbfavs.hasOwnProperty(keyToAdd)) return; // mar van ilyen kedvenc

		dbfavs[keyToAdd] = newFavObj[keyToAdd];
		await locals.pb.collection('users').update(locals.pb.authStore.baseModel.id, { "favs": dbfavs });

	},
	removeFav: async ({ request, locals }) => {
		const data = await request.formData();
		const favToRemove = data.get('removedFav');

		if (!favToRemove) throw new Error("Invalid favorite data.");

		const dbfavs = currentUser.favs || {};
		if (!dbfavs.hasOwnProperty(favToRemove)) return; // nem torolheto mivel nincs ilyen kedvenc 

		delete dbfavs[favToRemove];
		await locals.pb.collection('users').update(locals.pb.authStore.baseModel.id, { "favs": dbfavs });

	}
};