import { fail } from '@sveltejs/kit';
import { szunet } from '$lib/backendUtils/szunetSzamolo';

export const ssr = false;

export async function load({ locals }) {

	return {
		'termekek': structuredClone(await locals.pb.collection('termekek').getFullList(1, {})),
		'szunetArray': szunet()
	};
}

// TODO: Sürgős error handling szükséges
export const actions = {
	default: async ({ request, locals }) => {
		const data = Object.fromEntries(await request.formData());
		const rendeles = JSON.parse(data.rendeles);
		let total = 0;

		for (const termek in rendeles) {
			const record = await locals.pb.collection('termekek').getFirstListItem(`termek = "${termek}"`);
			// ar validalas
			const darab = rendeles[termek].darab;
			let subTotal = darab * record.ar;
			const feltet = rendeles[termek].feltet.map((feltet => { subTotal += Number(record.feltetek[feltet].ar); return feltet; }));

			rendeles[termek] = { 'ar': subTotal, darab, feltet };
			total += subTotal;

			if (!szunet().includes(data.idopont)) {
				return fail(409, { 'error': `Hibás időpont: ${data.idopont}` });	// Hibás időpont
			}

			if (![ 'Készpénz','Bankkártya' ].includes(data.fizetes)) {
				return fail(409, { 'error': `Hibás fizetési mód: ${data.fizetes}` });	// Hibás fizetési mód
			}

			if (record.darab - darab >= 0) {
				await locals.pb.collection('termekek').update(record.id, { 'darab': record.darab - darab } );	// darabszam kivonasa
				await locals.pb.collection('termekek').update(record.id, { 'vasarlasok': record.vasarlasok + darab });	// termék vásárlás számláló + darab
			} else
				return fail(409, { 'error': `Túl sok ${record.termek} a kosárban!`, 'sok': record.termek });	// A kosárban lévő termék elfogyott
		}

		await locals.pb.collection('rendelesek').create({
			'rendelo': locals.pb.authStore.baseModel.id,
			'termekek': rendeles,
			total,
			'status': 'fuggoben',
			'name': locals.pb.authStore.baseModel.name,
			'fizetes': data.fizetes,
			'idopont': data.idopont
		});
	}
};