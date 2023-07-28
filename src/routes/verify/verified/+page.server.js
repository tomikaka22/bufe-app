export async function load({ locals, url }) {
	const token = url.searchParams.get('token'); // Ha verify e-mailből jön ide az url tartalmazza a tokent
	let status;

	if (token)
		try {
			await locals.pb.collection('users').confirmVerification(token);
			status = 200;
		} catch (error) {
			console.log('Email verify hiba:\n',error);
			status = error.status;
		}

	return {
		status
	};
}