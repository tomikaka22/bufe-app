import { json } from '@sveltejs/kit';

const étel = {
	'Szaros Étel': {
		'price': 1000,
		'maxamount': 0,
		'description': 'Szendvics, amit teleszart egy nagyon büdöset szaró ember.'
	},
	'Marhahúsos Étel': {
		'price': 1200,
		'maxamount': 5,
		'description': 'Szendvics, majdnem nyers marhahússal.'
	}
};

const ital = {
	'Hell': {
		'price': 250,
		'maxamount': 10,
		'description': 'Mindenki kedvenc olcsó energiaitala.'
	},
	'Xixo': {
		'price': 350,
		'maxamount': 7,
		'description': 'Mindenki kedvenc teának csúfolt üditőitala.'
	}
};

const nasi = {
	'Chips': {
		'price': 240,
		'maxamount': 4,
		'description': 'Nyomokban krumplit is tartalmazó ropogós burgonyaszirom.'
	},
	'Mogyi': {
		'price': 230,
		'maxamount': 6,
		'description': 'Bundás mogyoró amiből csak a wasabi izű ehető.'
	}
};

export function GET() {
	return json({
		étel: étel,
		ital: ital,
		nasi: nasi
	});
}