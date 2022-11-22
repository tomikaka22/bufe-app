import { json } from "@sveltejs/kit";

let rendelesek = {};
let kesz = {};
let counter = 1;


// get data
export async function GET() {
   return json({
      rendelesek: rendelesek,
      kesz: kesz
   })
};

export async function POST({ request, locals }) {
   let orderID = counter++;
   const data = await request.json();

   for (let i = 0; i < Object.keys(data).length; i++) { // atmegy minden key-en az obejtben
      const record = await locals.pb.collection('termekek').getList(1,1,{ filter: `termekek = "${Object.keys(data)[i]}"` }); // visszater a termek recordjaval
      const darab = data[Object.keys(data)[i]][1]
      const osszeg = record.items[0].ar * darab; // ár validálás

      rendelesek[orderID] = {[Object.keys(data)[i]]: [ osszeg, darab]}
      // TODO: Error handling, darab validálása
   }

   return json({
      orderID: orderID
   })
};

// ready
export async function PUT({ request }) {
   let adat = await request.json();
   kesz[adat] = rendelesek[adat]
   delete rendelesek[adat];
   return json({
      ok : 'ok'
   })
};

export async function PATCH({ request }) {
   let adat = await request.json();
   delete kesz[adat];
   if (adat == "debugDelete") {
      kesz = {};
      rendelesek = {}
   };

   return json({
      ok : 'ok'
   })
}

export async function DELETE({ request }) {
   let adat = await request.json();
   if (adat.type == 'kesz') {
      delete kesz[adat.item]
   } else {
      delete rendelesek[adat.item]
   }

   return json({
      ok : 'ok'
   })
}