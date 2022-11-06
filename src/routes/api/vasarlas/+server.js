import { json } from "@sveltejs/kit";

let rendelesek = {};
let counter = 1000;

export async function POST({ request }) {
   let orderID = counter--;
   let response = await request.json();

   rendelesek[orderID] = response;

   return json({
      orderID: orderID,
   })
};

export async function GET() {
   return json({
      rendelesek: rendelesek
   })
};

export async function DELETE({ request }) {
   let adat = await request.json();
   delete rendelesek[adat];
   return json({
      ok : 'ok'
   })
};

