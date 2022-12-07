export async function load( { fetch } ) {
	const termek = await fetch('/api/termek');

	return {
		termek : await termek.json()
	};
}