import { json } from '@sveltejs/kit';

export async function POST({ request, locals }) {
	const subscription = await request.json();

	await locals.pb.collection('push').create({ subscription });

	return json({
		'status': 200
	});
}

export async function PATCH({ request, locals }) {
	const subscription = await request.json();
	const matchingSubscription = structuredClone(await locals.pb.collection('push').getFirstListItem(`subscription.keys.auth = '${subscription.keys.auth}'`));

	try {
		await locals.pb.collection('push').update(matchingSubscription.id, { name: locals.pb.authStore.baseModel.id });

		return json({
			'status': 200
		});
	} catch (error) {
		console.log(error);
	}
}