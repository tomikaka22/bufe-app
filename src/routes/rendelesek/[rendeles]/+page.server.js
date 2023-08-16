export async function load({ locals, url }) {
	const recordID = url.pathname.replace('/rendelesek/', '');
	const record = structuredClone(await locals.pb.collection('rendelesek').getOne(recordID));

	return {
		record,
		pathname: url.pathname,
		href: url.href
	};
}