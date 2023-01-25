export async function load({ locals }) {
	const elozmenyLista = structuredClone(await locals.pb.collection('rendelesek').getFullList(1, {
		filter: `rendelo = "${locals.pb.authStore.baseModel.id}"`,
		sort: '-created'
	}));

	let total = 0;

	Object.keys(elozmenyLista).forEach(rendeles => {
		if (elozmenyLista[rendeles].status === 'kesz')
			Object.keys(elozmenyLista[rendeles].termekek).forEach(termek => {
				total += elozmenyLista[rendeles].termekek[termek].ar;
			});
	});

	return {
		elozmenyLista,
		total
	};
}

export const actions = {
	default: async ({ request, locals }) => {
		const data = Object.fromEntries(await request.formData());
		const id = JSON.parse(data.recordID);
		const rendeles = await locals.pb.collection('rendelesek').getOne(id);

		if (rendeles.status === 'fuggoben' )
			Object.keys(rendeles.termekek).forEach(async termek => {
				const record = await locals.pb.collection('termekek').getFullList(1, { filter: `termek = '${termek}'` });
				const darab = record[0].darab + rendeles.termekek[termek].darab;

				await locals.pb.collection('termekek').update(record[0].id, { darab });
			});


		await locals.pb.collection('rendelesek').delete(id);
	}
};