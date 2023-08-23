export async function load({ locals }) {

	const kedvencek = await locals.pb.collection('users').getOne(locals.pb.authStore.baseModel.id, { expand: 'kedvencek' });

	const elozmenyLista = await locals.pb.collection('rendelesek').getList(1, 3, {
		filter: `rendelo = "${locals.pb.authStore.baseModel.id}"`,
		sort: '-created'
	});

	const legutobbi6Termek = [];
	for (let i = 0; i < elozmenyLista.items.length; i++) {
		const length = legutobbi6Termek.push(...Object.keys(elozmenyLista.items[i].termekek));
		if (length > 2) {
			legutobbi6Termek.slice(0, -length + 1);
			break;
		}
	}

	return {
		legutobbi6Termek : [ ...new Set(legutobbi6Termek) ],	// Set --> kiszűri az ismétlődőket
		name: locals.pb.authStore.baseModel.name,
		kedvencek: structuredClone(kedvencek.expand.kedvencek)
	};
}