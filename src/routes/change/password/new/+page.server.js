export const actions = {
	default: async ({ locals, request, url }) => {
		const body = Object.fromEntries(await request.formData());
		const token = url.searchParams.get('token'); // Ha e-mailből jön ide az url tartalmazza a tokent

		let status;

		if (token)
			try {
				await locals.pb.collection('users').confirmPasswordReset(
					token,
					body.password,
					body.password2
				);
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