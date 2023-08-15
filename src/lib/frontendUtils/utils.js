export function urlB64ToUint8Array(base64String) {
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

// Megformázza az árakat.
export function forint(x) {
	return x.toLocaleString({ style:'currency', currency:'HUF' }).replace(',',' ') + ' Ft';
}