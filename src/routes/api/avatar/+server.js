export async function GET({ locals, fetch }) {
	const record = await locals.pb.collection('users').getOne(locals.pb.authStore.baseModel.id);
	let avatar = await fetch(`http://127.0.0.1:8090/api/files/users/${locals.pb.authStore.baseModel.id}/${record.avatar}?thumb=256x256`);

	if (avatar.status === 404)
		avatar = await fetch(`https://ui-avatars.com/api/?size=256&name=${record.name}&color=ebebec&background=252525`);

	return new Response(await avatar.blob(), {
		headers: {
			'Content-Type': 'image/*'
		}
	});
}