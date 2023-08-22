import { build, files, version } from '$service-worker';

// Create a unique cache name for this deployment
const CACHE = `cache-${version}`;

async function termekFotoURLs() {
	const response = await fetch('/api/termekList');
	const termekek = await response.json();

	return termekek.termekFotoURLs;
}

const ASSETS = [
	...build,	// the app itself
	...files,	// everything in `static`
	'/offline'	// Offline error oldal
];

const cachedURLs = [
	'/api/files',
	'/list/__data.json', // Be cacheli a /list load functionjét hogy ne kelljen várni amíg oda navigálunk.
	'/api/avatar',
	'/termek-drop.jpg'
];

self.addEventListener('install', (event) => {
	// Create a new cache and add all files to it
	async function addFilesToCache() {
		const cache = await caches.open(CACHE);
		await cache.addAll(ASSETS);
		await cache.addAll(await termekFotoURLs());
		console.log('Precached Files!');
	}

	event.waitUntil(addFilesToCache());
});

self.addEventListener('activate', (event) => {
	// Remove previous cached data from disk
	async function deleteOldCaches() {
		for (const key of await caches.keys()) {
			if (key !== CACHE) await caches.delete(key);
		}
	}

	event.waitUntil(deleteOldCaches());
});

self.addEventListener('fetch', (event) => {
	// ignore POST requests etc
	if (event.request.method !== 'GET') return;

	async function respond() {
		const url = new URL(event.request.url);
		const cache = await caches.open(CACHE);

		// Contents of 'ASSETS' can always be served from the cache
		if (ASSETS.includes(url.pathname)) {
			return cache.match(url.pathname);
		}

		if (!navigator.onLine)
			return Response.redirect('/offline', 303);

		// cache first with cache refresh - https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Caching#cache_first_with_cache_refresh
		if (cachedURLs.some(route => { return url.pathname.startsWith(route); })) {
			console.log('cache first with cache refresh', url.pathname);
			const networkResponse = fetch(event.request).then(async (response) => {
				if (response.ok) {
					cache.put(event.request, response.clone());
					console.log('Cached', url.pathname + '!');
				}

				return response;
			});

			return (await cache.match(event.request)) || (await networkResponse);
		}

		return fetch(event.request);
	}

	event.respondWith(respond());
});

self.addEventListener('push', async event => {
	if (event.data) {
		const data = await JSON.parse(event.data.text());
		console.log(data);
		// console.log('Push event!! ', event.data.text());
		self.registration.showNotification(data.title, data.options);
	}
	else
		console.log('Push event but no data');
});