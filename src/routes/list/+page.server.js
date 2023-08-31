export async function load({ locals }) {
	const records = structuredClone(await locals.pb.collection('termekek').getFullList(1, {
		sort: '-created'
	}));
	const popularRecords = structuredClone(await locals.pb.collection('termekek').getFullList(1, {
		sort: '-vasarlasok',
		filter: 'vasarlasok != 0'
	}));

	const nepszeruTermekek = popularRecords.slice(0, 6);

	return {
		'termekek': records,
		nepszeruTermekek
	};
}