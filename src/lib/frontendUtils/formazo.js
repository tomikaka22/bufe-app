// Megformázza az árakat.
export function forint(x) {
	return x.toLocaleString({ style:'currency', currency:'HUF' }).replace(',',' ') + ' Ft';
}