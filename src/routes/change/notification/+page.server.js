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
		const subscription = await JSON.parse(data.pushSubscriptionData);

		await locals.pb.collection('push').create({ subscription, name: locals.pb.authStore.baseModel.id });

		console.log(subscription);
	},
	delete: async ({ locals }) => {
		const matchingSubscriptions = await locals.pb.collection('push').getFullList(1, { filter: `name = "${locals.pb.authStore.baseModel.id}"` });

		for (const subscription of matchingSubscriptions) {
			await locals.pb.collection('push').delete(subscription.id);
		}

	}
};