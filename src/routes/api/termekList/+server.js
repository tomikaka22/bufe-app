import { json } from '@sveltejs/kit';

export async function GET({ locals }) {
	const termekek = await locals.pb.collection('termekek').getFullList();

	const termekFotoURLs = [];

	for (const termek of termekek) {
		if (termek.foto)
			termekFotoURLs.push(`/api/files/termekek/${termek.id}/${termek.foto}`);
	}

	return json({
		termekek,
		termekFotoURLs
	});
}