export async function GET({ url, request, fetch }) {
	request.headers.delete('connection');

	let response = await fetch(`http://127.0.0.1:8090${url.pathname}`, {
		body: request.body,
		method: request.method,
		headers: request.headers
	});

	if (response.status === 404)
		response = fetch('/termek-drop.jpg');

	return response;
}