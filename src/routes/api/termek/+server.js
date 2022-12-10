import { json } from '@sveltejs/kit';

const termekek = {
	// Etel
	'Szaros Étel': {
		'category': 'Étel',
		'price': 1000,
		'maxamount': 0,
		'description': 'Szendvics, amit teleszart egy nagyon büdöset szaró ember.'
	},
	'Marhahúsos Étel': {
		'category': 'Étel',
		'price': 1200,
		'maxamount': 5,
		'description': 'Szendvics, majdnem nyers marhahússal.'
	},
	// Ital
	'Hell': {
		'category': 'Ital',
		'price': 250,
		'maxamount': 10,
		'description': 'Mindenki kedvenc olcsó energiaitala.'
	},
	'Xixo': {
		'category': 'Ital',
		'price': 350,
		'maxamount': 7,
		'description': 'Mindenki kedvenc teának csúfolt üditőitala.'
	},
	// Nasi
	'Chips': {
		'category': 'Nasi',
		'price': 240,
		'maxamount': 4,
		'description': 'Nyomokban krumplit is tartalmazó ropogós burgonyaszirom.'
	},
	'Mogyi': {
		'category': 'Nasi',
		'price': 230,
		'maxamount': 6,
		'description': 'Bundás mogyoró amiből csak a wasabi izű ehető.'
	}
};

export function GET() {
	return json({
		'termekek': termekek
	});
}