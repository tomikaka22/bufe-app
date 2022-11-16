// Ha nincs bejelentkezve, redirect to login
import { redirect } from "@sveltejs/kit"

export function load({ locals, url }) {
   if (!['/register','/login'].includes(url.pathname)) { // kell, hogy elkerüljünk egy infinite loopot
      if (!locals.pb.authStore.baseModel) {
         throw redirect(303, '/login')
      }
   }
}