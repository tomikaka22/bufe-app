export async function load( { fetch } ) {
   const termek = await fetch("/api/termek");
   const splash = await fetch('/api/splash');

   return {
      termek : await termek.json(),
      splash : await splash.json()
   }
};