export const ssr = false;

export async function load({ locals, url }) {
	const record = structuredClone(await locals.pb.collection('termekek').getFirstListItem(`termek = "${decodeURI(url.pathname.substring(1))}"`));

	return {
		'termekek': record
	};
}