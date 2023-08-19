export async function GET({ locals, fetch, url }) {
	const id = url.pathname.replace('/api/kepek/', '');
	const record = await locals.pb.collection('termekek').getOne(id);

	let foto = await fetch(`http://127.0.0.1:8090/api/files/termekek/${id}/${record.foto}`);
	console.log('foto requested', id)

	if (foto.status === 404)
		foto = await fetch(`https://ui-avatars.com/api/?size=256&name=${locals.pb.authStore.baseModel.name}&color=ebebec&background=252525`);

	return new Response(await foto.blob(), {
		headers: {
			'Content-Type': 'image/*'
		}
	});
}