export async function GET({ url, request, fetch }) {
	request.headers.delete('connection');

	const response = fetch(`http://127.0.0.1:8090${url.pathname}`, {
		body: request.body,
		method: request.method,
		headers: request.headers
	});

	return response;
}