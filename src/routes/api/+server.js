import { json } from "@sveltejs/kit";

const prices = {
   // Étel
   'Szaros Étel': 1000,
   'Marhahúsos Étel': 1200,
   // Ital
   'hell': 250,
   'szikszo': 350,
   // Nasi
   'csipsz': 240,
   'mogyi': 230
};

let maxamount = {
   // Étel
   'Szaros Étel': 0,
   'Marhahúsos Étel': 5,
   // Ital
   'hell': 10,
   'szikszo': 7,
   // Nasi
   'csipsz': 4,
   'mogyi': 6
};

const description = {
   // Étel
   'Szaros Étel': 'Szendvics, amit teleszart egy nagyon büdöset szaró ember.',
   'Marhahúsos Étel': 'Szendvics, majdnem nyers marhahússal.',
   // Ital
   'hell': 'Mindenki kedvenc olcsó energiaitala.',
   'szikszo': 'Mindenki kedvenc teának csúfolt üditőitala.',
   // Nasi
   'csipsz': 'Nyomokban krumplit is tartalmazó ropogós burgonyaszirom.',
   'mogyi': 'Bundás mogyoró amiből csak a wasabi izű ehető.'

};

export function GET() {
   return json({
      prices : prices,
      description : description,
      maxamount : maxamount
   });
};