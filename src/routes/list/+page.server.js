export async function load({ locals }) {
	const records = structuredClone(await locals.pb.collection('termekek').getFullList(1, {
		sort: '-created'
	}));

	const sortedArray = records.map((termek) => {
		return termek.vasarlasok;
	}).sort().filter(x => { return x > 10; }).reverse();

	const popularRecords = sortedArray.map((_termek,i) => {
		return records.find(x => {
			return x.vasarlasok === sortedArray[i];
		});
	});

	return {
		'termekek': records,
		'nepszeruTermekek': popularRecords
	};
}