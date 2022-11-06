export const ssr = false;

export async function load( { fetch } ) {
   const response = await fetch("/api/termek");
   const result = await response.json();
   return result
};