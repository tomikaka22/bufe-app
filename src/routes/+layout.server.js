export function load({ locals }) {
	return {
		name: locals.pb.authStore?.baseModel?.name
	};
}