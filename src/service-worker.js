import { build, files, version } from '$service-worker';

// Create a unique cache name for this deployment
const CACHE = `cache-${version}`;

const ASSETS = [
	...build, // the app itself
	...files  // everything in `static`
];

const pushSubscribeBroadcast = new BroadcastChannel('pushSubscribe');

pushSubscribeBroadcast.onmessage = async (event) => {
	if (event.data === 'subscribe') {
		try {
			const applicationServerKey = urlB64ToUint8Array('BN5M32D0WPnvIRlNo8YoJ4Obrb4ok0ULSSbyDqCvhoq0KdTMJ2xKm3YytmPPk2Ve32OyipWUpjt_4r0H_pyifbI');
			const subscription = JSON.stringify(await self.registration.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey }));
			const pushLinkBroadcast = new BroadcastChannel('pushLink');

			const response = await fetch('/api/push', {
				method: 'post',
				headers: {
					'Content-Type': 'application/json'
				},
				body: subscription
			});
			console.log('subscribed!');
			pushLinkBroadcast.postMessage({ subscription });

		} catch (error) {
			console.log(error);
		}
	}

};

function urlB64ToUint8Array(base64String) {
	const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
	// eslint-disable-next-line no-useless-escape
	const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');
	const rawData = atob(base64);
	const outputArray = new Uint8Array(rawData.length);
	for (let i = 0; i < rawData.length; ++i) {
		outputArray[i] = rawData.charCodeAt(i);
	}
	return outputArray;
}

self.addEventListener('install', (event) => {
	// Create a new cache and add all files to it
	async function addFilesToCache() {
		const cache = await caches.open(CACHE);
		await cache.addAll(ASSETS);
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

		// `build`/`files` can always be served from the cache
		if (ASSETS.includes(url.pathname)) {
			return cache.match(url.pathname);
		}

		// for everything else, try the network first, but
		// fall back to the cache if we're offline
		try {
			const response = await fetch(event.request);

			if (response.status === 200) {
				cache.put(event.request, response.clone());
			}

			return response;
		} catch {
			return cache.match(event.request);
		}
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