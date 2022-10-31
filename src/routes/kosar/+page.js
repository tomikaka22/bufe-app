export const ssr = false;

export async function load( { fetch } ) {
   const response = await fetch("/termek_api");
   const result = await response.json();
   return result
};