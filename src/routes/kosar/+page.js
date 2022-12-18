export const ssr = false;

export async function load( { fetch } ) {
	const response = await fetch('/api/termek');
	return await response.json();
}