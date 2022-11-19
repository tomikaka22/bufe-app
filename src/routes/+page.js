export async function load( { fetch } ) {
   const splash = await fetch('/api/splash');

   return {
      splash : await splash.json()
   }
};