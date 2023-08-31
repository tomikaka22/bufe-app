export async function GET({ locals, fetch }) {
	let avatar = await fetch(`http://127.0.0.1:8090/api/files/users/${locals.pb.authStore.baseModel.id}/${locals.pb.authStore.baseModel.avatar}`);

	if (avatar.status === 404)
		avatar = await fetch(`https://ui-avatars.com/api/?size=256&name=${locals.pb.authStore.baseModel.name}&color=ebebec&background=252525`);

	const newHeaders = new Headers(avatar.headers);
	newHeaders.set('cache-control', 'no-cache');

	return new Response(avatar.body, {
		headers: newHeaders
	});
}