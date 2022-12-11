export async function load({ locals }) {
	const elozmenyLista = await locals.pb.collection('rendeles_elozmeny').getFullList(1, {
		filter: `rendelo = "${locals.pb.authStore.baseModel.id}"`
	});

	let total = 0;

	for (let i = 0; i < Object.keys(elozmenyLista).length; i++) {
		for (let x in elozmenyLista[i].rendeles) {
			if (elozmenyLista[i].status == 'kesz') {
				if (elozmenyLista[i].rendeles[x] != elozmenyLista[i].rendeles.name) {
					total += elozmenyLista[i].rendeles[x][1];
				}
			}
		}
	}

	return {
		'elozmenyLista': structuredClone(elozmenyLista),
		'total': total
	};
}