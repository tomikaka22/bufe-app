export const ssr = false;

export async function load({ locals }) {
	const termekek = structuredClone(await locals.pb.collection('termekek').getFullList(1, {}));
	
	return {
		'termekek': termekek
	};
}

export const actions = {
	default: async ({ request, locals }) => {
		const data = Object.fromEntries(await request.formData());
		let rendeles = JSON.parse(data.rendeles);
		let total = 0;

		for (let i = 0; i < Object.keys(rendeles).length; i++) { // atmegy minden key-en az obejtben
			const record = await locals.pb.collection('termekek').getFirstListItem(`termek = "${Object.keys(rendeles)[i]}"`); // visszater a termek recordjaval
			const darab = rendeles[Object.keys(rendeles)[i]][1]; // TODO: Atalakitani a kosar osszesitest hogy ne array-t hasznaljon.
			const subTotal = darab * record.ar;
			
			rendeles[Object.keys(rendeles)[i]] = {'ar': subTotal, 'darab': darab}; // ar validálás
			total += subTotal; // total szamolas
			try {
				locals.pb.collection('termekek').update(record.id, { 'darab': record.darab - darab} ); // darabszam kivonasa
			} catch (error) {
				console.log(error);
			}
		}

		// adatbazis
		await locals.pb.collection('rendelesek').create({ 'rendelo': locals.pb.authStore.baseModel.id, 'termekek': rendeles, 'total': total, 'status': 'fuggoben', 'name': locals.pb.authStore.baseModel.name });
		return {
			'orderID': 'asd'
		};
	}
};