export async function load({ locals }) {
	const elozmenyLista = structuredClone(await locals.pb.collection('rendelesek').getFullList(1, {
		filter: `rendelo = "${locals.pb.authStore.baseModel.id}"`,
		sort: '-created'
	}));

	let total = 0;

	Object.keys(elozmenyLista).forEach(rendeles => {
		if (elozmenyLista[rendeles].status == 'kesz')
			Object.keys(elozmenyLista[rendeles].termekek).forEach(termek => {
				total += elozmenyLista[rendeles].termekek[termek].ar;
			});
	});

	return {
		'elozmenyLista': elozmenyLista,
		'total': total
	};
}