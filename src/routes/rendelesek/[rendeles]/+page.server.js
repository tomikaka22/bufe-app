export async function load({ locals, url }) {
	const termekek = structuredClone(await locals.pb.collection('termekek').getFullList());
	const recordID = url.pathname.replace('/rendelesek/', '');
	const record = structuredClone(await locals.pb.collection('rendelesek').getOne(recordID));

	return {
		termekek,
		record,
		pathname: url.pathname,
		href: url.href
	};
}