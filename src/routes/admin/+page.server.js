import { redirect } from '@sveltejs/kit';

export const ssr = false;
const admins = ['rdzc6b3jes1k8am','u1fy74rt1m48tx1'];

export async function load({ locals }) {
	if (!admins.includes(locals.pb.authStore.baseModel.id)) throw redirect(303, '/'); // Ha nem admin id-vel van bejelentkezve redirect to login
	else {
		return {
			'termekekLista': structuredClone(await locals.pb.collection('termekek').getFullList(1, { sort: '-created' })),
			'rendelesek': {
				'fuggoben': structuredClone(await locals.pb.collection('rendelesek').getFullList(1, { filter: 'status = "fuggoben"' })),
				'kesz': structuredClone(await locals.pb.collection('rendelesek').getFullList(1, { filter: 'status = "folyamatban"' }))
			}
		};
	}
}

export const actions = {
	darab: async ({ request, locals }) => {
		const data = Object.fromEntries(await request.formData());

		Object.keys(data).forEach(id => {
			locals.pb.collection('termekek').update(id, { 'darab': data[id] });
		});


	},
	ar: async ({ request, locals }) => {
		const data = Object.fromEntries(await request.formData());
		
		Object.keys(data).forEach(id => {
			locals.pb.collection('termekek').update(id, { 'ar': data[id] });
		});
	},
	termekek: async ({ request, locals}) => {
		let data = Object.fromEntries(await request.formData());
		data.add = JSON.parse(data.add);
		data.remove = JSON.parse(data.remove);

		Object.keys(data.add).forEach(termek => {
			locals.pb.collection('termekek').create({ 'termek': termek, 'ar': data.add[termek].ar, 'darab': data.add[termek].darab, 'leiras': data.add[termek].leiras, 'kategoria': data.add[termek].kategoria });
		});

		data.remove.forEach(id => {
			locals.pb.collection('termekek').delete(id);
		});
	},
	leiras: async ({ request, locals }) => {
		const data = Object.fromEntries(await request.formData());

		Object.keys(data).forEach(id => {
			locals.pb.collection('termekek').update(id, { 'leiras': data[id] });
		});
	},
	feltet: async ({ request, locals }) => {
		let data = Object.fromEntries(await request.formData());
		data.add = JSON.parse(data.add);
		data.remove = JSON.parse(data.remove);
		// console.log(data)

		for (const id in data.add) {
			for (const feltet in data.add[id]) {
				const record = await locals.pb.collection('termekek').getOne(id);
				// await locals.pb.collection('termekek').update(id, record.feltetek, { 'feltetek': { [feltet]: { 'ar': data.add[id][feltet].ar, 'darab': data.add[id][feltet].darab }}});
			}
		}
	},
	kategoria: async ({ request, locals }) => {
		const data = Object.fromEntries(await request.formData());

		Object.keys(data).forEach(id => {
			locals.pb.collection('termekek').update(id, { 'kategoria': data[id] });
		});
	},
	// -----------------------------------------------------------------------------------------------------
	kesz: async ({ request, locals }) => {
		const data = Object.fromEntries(await request.formData());
		const id = JSON.parse(data.recordID);

		await locals.pb.collection('rendelesek').update(id, { 'status': 'folyamatban' });
	},

	atadva: async ({ request, locals }) => {
		const data = Object.fromEntries(await request.formData());
		const id = JSON.parse(data.recordID);

		await locals.pb.collection('rendelesek').update(id, { 'status': 'kesz' });
	},
	torles: async ({ request, locals }) => {
		const data = Object.fromEntries(await request.formData());
		const id = JSON.parse(data.recordID);
		const rendeles = await locals.pb.collection('rendelesek').getOne(id);

		Object.keys(rendeles.termekek).forEach(async termek => {
			const record = await locals.pb.collection('termekek').getFullList(1, { filter: `termek = '${termek}'` });
			const darab = record[0].darab + rendeles.termekek[termek].darab;

			await locals.pb.collection('termekek').update(record[0].id, { 'darab': darab });
		});

		await locals.pb.collection('rendelesek').update(id, { 'status': 'torolve' });
	}
};