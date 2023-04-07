export async function load({ locals }) {
	const elozmenyLista = structuredClone(await locals.pb.collection('rendelesek').getFullList(1, 6, {
		filter: `rendelo = "${locals.pb.authStore.baseModel.id}"`,
		sort: '-created'
	}));

	const legutobbi6Termek = [ ...new Set(elozmenyLista.map(rendeles => { // Set --> kiszűri az ismétlődőket
		return Object.keys(rendeles.termekek);
	}).flat().splice(-7, 7).reverse()) ];

	return {
		legutobbi6Termek
	};
}