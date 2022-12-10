import { json } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';

const admins = ['rdzc6b3jes1k8am','u1fy74rt1m48tx1'];
let rendelesek = {};
let kesz = {};
let counter = 0;

// get data
export async function GET({ locals }) {
	try {
		if (admins.includes(locals.pb.authStore.baseModel.id))
			return json({
				'rendelesek': rendelesek,
				'kesz': kesz
			});
	} catch {
		throw error(401, { 'error': 'Nincs hozzáférésed!' });
	}

}
// rendeles logic
export async function POST({ request, locals }) {
	counter++;
	const data = await request.json();
	rendelesek[counter] = {name: locals.pb.authStore.baseModel.name};

	for (let i = 0; i < Object.keys(data).length; i++) { // atmegy minden key-en az obejtben
		const record = await locals.pb.collection('termekek').getList(1,1,{ filter: `termekek = "${Object.keys(data)[i]}"` }); // visszater a termek recordjaval
		const darab = data[Object.keys(data)[i]][1];
		const osszeg = record.items[0].ar * darab; // ár validálás

		rendelesek[counter][Object.keys(data)[i]] = [ darab, osszeg ]; // rendelesekhez hozzaad
	}

	// elraktaroz adatbazisban
	let elozmenyRecord = await locals.pb.collection('rendeles_elozmeny').create({ 'rendeles': rendelesek[counter], 'rendelo': locals.pb.authStore.baseModel.id });
	rendelesek[counter].id = elozmenyRecord.id;

	return json({
		orderID: counter
	});
}

// rendeles folyamatban
export async function PUT({ request, locals }) {
	try {
		if (admins.includes(locals.pb.authStore.baseModel.id)) {
			let adat = await request.json();
			kesz[adat] = rendelesek[adat];
			delete rendelesek[adat];
		
			locals.pb.collection('rendeles_elozmeny').update(kesz[adat].id, { 'status': 'folyamatban' }); // update rendeles status
		
			return json({
				ok : 'ok'
			});
		}
	} catch {
		throw error(401, { 'error': 'Nincs hozzáférésed!' });
	}

}

// rendeles kesz
export async function PATCH({ request, locals }) {
	try {
		if (admins.includes(locals.pb.authStore.baseModel.id)) {
			let adat = await request.json();

			locals.pb.collection('rendeles_elozmeny').update(kesz[adat].id, { 'status': 'kesz' }); // update rendeles status
		
			delete kesz[adat];
		
			return json({
				ok : 'ok'
			});
		}
	} catch {
		throw error(401, { 'error': 'Nincs hozzáférésed!' });
	}

}

// torles
export async function DELETE({ request, locals }) {

	try {
		if (admins.includes(locals.pb.authStore.baseModel.id)) {
			let adat = await request.json();

			locals.pb.collection('rendeles_elozmeny').update(kesz[adat.item].id, { 'status': 'torolve' }); // update rendeles status
		
			if (adat.type == 'kesz') {
				delete kesz[adat.item];
			} else {
				delete rendelesek[adat.item];
			}
		
			return json({
				ok : 'ok'
			});
		}
	} catch {
		throw error(401, { 'error': 'Nincs hozzáférésed!' });
	}

}