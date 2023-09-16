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

		await locals.pb.collection('push').create({ subscription: pushSubscriptionData, name: locals.pb.authStore.baseModel.id });
		console.log('pushSubscription registered for:', locals.pb.authStore.baseModel.id);
	},
	delete: async ({ request, locals }) => {
		const data = Object.fromEntries(await request.formData());
		const pushSubscriptionData = await JSON.parse(data.pushSubscriptionData);
		const linkedSubscription = await locals.pb.collection('push').getFirstListItem(`subscription.keys.auth = '${pushSubscriptionData.keys.auth}'`);

		await locals.pb.collection('push').delete(linkedSubscription.id);
		console.log('pushSubscription deleted for:', linkedSubscription.name);
	}
};