export const ssr = false;

export async function load( { fetch } ) {
	const termek = await fetch('/api/termek');

	return await termek.json();
}