import { fail } from '@sveltejs/kit';
import { szunet } from '$lib/backendUtils/szunetSzamolo';

export const ssr = false;

export async function load({ locals }) {

	return {
		'termekek': structuredClone(await locals.pb.collection('termekek').getFullList()),
		'szunetArray': szunet()
	};
}

export const actions = {
	default: async ({ request, locals }) => {
		const data = Object.fromEntries(await request.formData());
		const rendeles = JSON.parse(data.rendeles);
		let total = 0;

		if (!szunet().includes(data.idopont)) {
			return fail(409, { 'error': `Hibás időpont: ${data.idopont}` });	// Hibás időpont
		}
		if (![ 'Készpénz','Bankkártya' ].includes(data.fizetes)) {
			return fail(409, { 'error': `Hibás fizetési mód: ${data.fizetes}` });	// Hibás fizetési mód
		}

		for (const termek of Object.keys(rendeles)) {
			for (const i in rendeles[termek]) {
				let record;
				try {
					record = await locals.pb.collection('termekek').getFirstListItem(`termek = "${termek}"`);
				} catch {
					return fail(409, { 'error': `Nincs ilyen termék: ${termek}` });
				}

				// Validálás
				const darab = rendeles[termek][i].darab;
				let subTotal = darab * record.ar;
				const feltet = rendeles[termek][i].feltet.map((feltet => { subTotal += Number(record.feltetek[feltet].ar) * darab; return feltet; }));
				rendeles[termek][i] = { 'ar': subTotal, darab, feltet, id: record.id, foto: record.foto };
				total += subTotal;

				if (record.darab - darab >= 0)
					await locals.pb.collection('termekek').update(record.id, { 'darab': record.darab - darab, 'vasarlasok': record.vasarlasok + darab } );	// darabszam kivonasa, vásárlás szám növelése
				else
					return fail(409, { 'error': `Túl sok ${record.termek} a kosárban!`, 'sok': record.termek });
			}
		}

		await locals.pb.collection('rendelesek').create({
			rendelo: locals.pb.authStore.baseModel.id,
			termekek: rendeles,
			total,
			status: 'fuggoben',
			name: locals.pb.authStore.baseModel.name,
			email: locals.pb.authStore.baseModel.email,
			fizetes: data.fizetes,
			idopont: data.idopont
		});
	}
};