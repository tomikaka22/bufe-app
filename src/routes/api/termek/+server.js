import { json } from '@sveltejs/kit';

const prices = {
	// Étel
	'Szaros Étel': 1000,
	'Marhahúsos Étel': 1200,
	// Ital
	'Hell': 250,
	'Xixo': 350,
	// Nasi
	'Chips': 240,
	'Mogyi': 230
};

let maxamount = {
	// Étel
	'Szaros Étel': 0,
	'Marhahúsos Étel': 5,
	// Ital
	'Hell': 10,
	'Xixo': 7,
	// Nasi
	'Chips': 4,
	'Mogyi': 6
};

const description = {
	// Étel
	'Szaros Étel': 'Szendvics, amit teleszart egy nagyon büdöset szaró ember.',
	'Marhahúsos Étel': 'Szendvics, majdnem nyers marhahússal.',
	// Ital
	'Hell': 'Mindenki kedvenc olcsó energiaitala.',
	'Xixo': 'Mindenki kedvenc teának csúfolt üditőitala.',
	// Nasi
	'Chips': 'Nyomokban krumplit is tartalmazó ropogós burgonyaszirom.',
	'Mogyi': 'Bundás mogyoró amiből csak a wasabi izű ehető.'

};

export function GET() {
	return json({
		prices : prices,
		description : description,
		maxamount : maxamount
	});
}