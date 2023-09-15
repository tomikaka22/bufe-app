<script>
   import { fly } from 'svelte/transition';

   export let targeturl;
   export let text;
   const flyin = { x: -100 };

</script>

<div in:fly={flyin} class="w-full flex items-center text-primary p-2 pl-0 mt-2 mb-2 z-20">
	<a class="pl-1 pr-1.5" href="{targeturl}">
		<svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" height="23" viewBox="0 -960 960 960" width="48"><path d="m297.175-440.391 238.956 238.956L480-145.869 145.869-480 480-814.696l56.131 56.131-238.956 238.956h517.521v79.218H297.175Z"/></svg>
	</a>
	<p class="text-xl">{text}</p>
</div>