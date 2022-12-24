export async function load({ locals }) {
	const records = structuredClone(await locals.pb.collection('termekek').getFullList(1, {
		sort: '-created'
	}));

	return {
		'termekek': records
	};
}