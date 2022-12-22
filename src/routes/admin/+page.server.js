import { redirect } from '@sveltejs/kit';

export const ssr = false;
const admins = ['rdzc6b3jes1k8am','u1fy74rt1m48tx1'];

export async function load({ locals, fetch }) {
	if (!admins.includes(locals.pb.authStore.baseModel.id)) throw redirect(303, '/'); // Ha nem admin id-vel van bejelentkezve redirect to login
	else {
		let termekekLista = await locals.pb.collection('termekek').getFullList(1, {
			sort: '-created'
		});

		const rendelesek = await fetch('/api/vasarlas');
		
		return {
			'termekekLista': structuredClone(termekekLista),
			'rendelesek': await rendelesek.json()
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
			locals.pb.collection('termekek').create({ 'termek': termek, 'ar': data.add[termek][0], 'darab': data.add[termek][1] }, { '$autoCancel': false });
		});

		data.remove.forEach(id => {
			locals.pb.collection('termekek').delete(id), { '$autoCancel': false };
		});
	}
};