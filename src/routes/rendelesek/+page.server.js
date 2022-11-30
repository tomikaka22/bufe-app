export async function load({ locals }) {
	const elozmenyLista = await locals.pb.collection('rendeles_elozmeny').getList(1,10, {
		filter: `rendelo = "${locals.pb.authStore.baseModel.id}"`
	});

	return structuredClone(elozmenyLista.items);
}