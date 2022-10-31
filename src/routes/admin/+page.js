export const ssr = false;

export async function load( { fetch } ) {
   const response = await fetch('/vasarlas_api');
   const result = await response.json();
   return result
};