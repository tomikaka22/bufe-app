import BrowserDetector from 'browser-dtector';

export const prerender = true;

export async function load({ request }) {
	const browser = new BrowserDetector(request.headers.get('user-agent')).parseUserAgent();
	let browserNumber;

	switch (browser.name) {
		default:
			browserNumber = 0;
			break;
		case 'Mozilla Firefox':
			browserNumber = 1;
			break;
		case 'Safari':
			browserNumber = 2;
			break;
	}

	return {
		browserNumber,
		browser: browser.name,
		isMobile: browser.isMobile
	};
}