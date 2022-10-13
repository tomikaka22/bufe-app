export async function load( { fetch } ) {
   const response = await fetch("/api");
   const result = await response.json();
   return result
};