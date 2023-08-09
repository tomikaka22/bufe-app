export async function load({ locals }) {
	const termekek = structuredClone(await locals.pb.collection('termekek').getFullList({
		sort: '-created'
	}));

	return {
		termekek
	};
}