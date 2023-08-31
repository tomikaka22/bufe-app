export const actions = {
	default: async ({ locals, request }) => {
		const body = Object.fromEntries(await request.formData());
		const email = body.email + '@kkszki.hu';
		let status;

		try {
			await locals.pb.collection('users').requestPasswordReset(email);
			status = 200;
		} catch (error) {
			console.log(error);
			status = error.status;
		}

		return {
			status
		};
	}
};