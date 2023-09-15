export async function load({ locals }) {
	try {
		const linkedSubscription = await locals.pb.collection('push').getFirstListItem(`name = '${locals.pb.authStore.baseModel.id}'`);
		return {
			linkedSubscription: linkedSubscription.subscription
		};

	} catch (error) {
		if (error.status === 404)
			return {
				linkedSubscription: undefined
			};
	}
}

export const actions = {
	subscribe: async ({ request, locals }) => {
		const data = Object.fromEntries(await request.formData());
		const pushSubscriptionData = await JSON.parse(data.pushSubscriptionData);
		const matchingSubscriptions = await locals.pb.collection('push').getFullList(1, { filter: `name = "${locals.pb.authStore.baseModel.id}"` });

		for (const subscription of matchingSubscriptions) {
			await locals.pb.collection('push').delete(subscription.id);
		}

		await locals.pb.collection('push').create({ subscription: pushSubscriptionData, name: locals.pb.authStore.baseModel.id });
	},
	delete: async ({ locals }) => {
		const linkedSubscription = await locals.pb.collection('push').getFirstListItem(`name = '${locals.pb.authStore.baseModel.id}'`);

		await locals.pb.collection('push').delete(linkedSubscription.id);
	}
};