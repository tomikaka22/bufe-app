export const actions = {
	default: async ({ locals }) => {
		locals.pb.authStore.clear();
	}
};