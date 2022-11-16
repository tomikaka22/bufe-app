import { redirect } from "@sveltejs/kit";

const admins = ['rdzc6b3jes1k8am','u1fy74rt1m48tx1'];

export function load({ locals }) {

   if (!locals.pb.authStore.baseModel) { // Ha nincs bejelentkezve, redirect to login
      throw redirect(303, '/login')

   } else {

      if (!admins.includes(locals.pb.authStore.baseModel.id)) { // Ha nem admin id-vel van bejelentkezve redirect to login
         throw redirect(303, '/')
      }
   }
};