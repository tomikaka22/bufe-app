export async function load({ locals, url }) {
	const token = decodeURI(url.searchParams.get('token'));
	await locals.pb.collection('users').confirmVerification(token);
}