export async function load({ locals }) {

	const kedvencek = await locals.pb.collection('users').getOne(locals.pb.authStore.baseModel.id, { expand: 'kedvencek' });

	const elozmenyek = structuredClone(await locals.pb.collection('rendelesek').getFullList(1, {
		filter: `rendelo = "${locals.pb.authStore.baseModel.id}"`,
		sort: '-created'
	}));

	let elozmenyTermekek = [];
	for (const elozmeny of elozmenyek) {
		elozmenyTermekek = elozmenyTermekek.concat(Object.keys(elozmeny.termekek));

		if (elozmenyTermekek.length > 6) {
			elozmenyTermekek = elozmenyTermekek.slice(0,6);
			break;
		}
	}
	const elozmenyLista = elozmenyTermekek.map(async termek => structuredClone(await locals.pb.collection('termekek').getFirstListItem(`termek = "${termek}"`)));

	const total = { ar: 0, darab: 0 };
	for (const rendeles of elozmenyek) {
		if (rendeles.status === 'kesz') {
			total.darab++;
			for (const termek of Object.keys(rendeles.termekek)) {
				for (const x of rendeles.termekek[termek]) {
					total.ar += x.ar;
				}
			}
		}
	}

	return {
		total,
		elozmenyLista: await Promise.all(elozmenyLista),
		name: locals.pb.authStore.baseModel.name,
		kedvencek: structuredClone(kedvencek.expand.kedvencek).reverse()
	};
}