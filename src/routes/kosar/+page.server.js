import { fail } from '@sveltejs/kit';

export const ssr = false;

let szunetArray = [];

function timeToMs(time) {
	// return Date.parse(new Date(new Date().setHours(...time.split(':'))).toLocaleString('hu-HU', { timeZone: 'Europe/Budapest' }));	// Unix time
	const splitTime = time.split(':');
	return splitTime[0] * 3600000 + splitTime[1] * 60000 + splitTime[2] * 1000;
}

export async function load({ locals }) {
	const most = timeToMs(new Date().toLocaleTimeString('hu-HU', { timeZone: 'Europe/Budapest' }));

	if (most < timeToMs('28:00:00'))
		szunetArray = [ '1. Óra előtt','2. Óra előtti szünet','3. Óra előtti szünet','4. Óra előtti szünet','5. Óra előtti szünet','6. Óra előtti szünet' ];
	else if (most < timeToMs('08:55:00'))
		szunetArray = [ '2. Óra előtti szünet','3. Óra előtti szünet','4. Óra előtti szünet','5. Óra előtti szünet','6. Óra előtti szünet' ];
	else if (most < timeToMs('09:50:00'))
		szunetArray = [ '3. Óra előtti szünet','4. Óra előtti szünet','5. Óra előtti szünet','6. Óra előtti szünet' ];
	else if (most < timeToMs('10:45:00'))
		szunetArray = [ '4. Óra előtti szünet','5. Óra előtti szünet','6. Óra előtti szünet' ];
	else if (most < timeToMs('11:40:00'))
		szunetArray = [ '5. Óra előtti szünet','6. Óra előtti szünet' ];
	else if (most < timeToMs('12:45:00'))
		szunetArray = [ '6. Óra előtti szünet' ];
	else
		szunetArray = [];

	return {
		'termekek': structuredClone(await locals.pb.collection('termekek').getFullList(1, {})),
		szunetArray
	};
}

// TODO: Sürgős error handling szükséges
export const actions = {
	default: async ({ request, locals }) => {
		const data = Object.fromEntries(await request.formData());
		const rendeles = JSON.parse(data.rendeles);
		const idopont = data.idopont;
		const fizetes = data.fizetes;
		let total = 0;

		for (const termek in rendeles) {
			const record = await locals.pb.collection('termekek').getFirstListItem(`termek = "${termek}"`);
			// ar validalas
			const darab = rendeles[termek].darab;
			let subTotal = darab * record.ar;
			const feltet = rendeles[termek].feltet.map((feltet => { subTotal += Number(record.feltetek[feltet].ar); return feltet; }));

			rendeles[termek] = { 'ar': subTotal, darab, feltet };
			total += subTotal;

			if (record.darab - darab >= 0) {
				await locals.pb.collection('termekek').update(record.id, { 'darab': record.darab - darab } );	// darabszam kivonasa
				await locals.pb.collection('termekek').update(record.id, { 'vasarlasok': record.vasarlasok + darab });	// termék vásárlás számláló + darab
			}
			else
				return fail(409, { 'error': `Túl sok ${record.termek} a kosárban!`, 'sok': record.termek });
		}

		await locals.pb.collection('rendelesek').create({ 'rendelo': locals.pb.authStore.baseModel.id, 'termekek': rendeles, total, 'status': 'fuggoben', 'name': locals.pb.authStore.baseModel.name, fizetes, idopont });
	}
};