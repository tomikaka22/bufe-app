export async function GET({ locals, fetch }) {
	const record = await locals.pb.collection('users').getOne(locals.pb.authStore.baseModel.id);
	const avatar = await fetch(`http://127.0.0.1:8090/api/files/users/${locals.pb.authStore.baseModel.id}/${record.avatar}?thumb=100x100`);

	return new Response(await avatar.blob(), {
		headers: {
			'Content-Type': 'image/*'
		}
	});
}