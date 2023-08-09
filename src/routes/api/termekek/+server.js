import { json } from '@sveltejs/kit';

export async function GET({ locals }) {
	const termekek = structuredClone(await locals.pb.collection('termekek').getFullList({
		sort: '-created'
	}));

	return json(termekek);
}