export async function load( { fetch } ) {
   const response = await fetch("/api/history");
   const result = await response.json();
   return result
};