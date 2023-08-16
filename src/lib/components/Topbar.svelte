<script>
   import { fly } from 'svelte/transition';

   export let targeturl;
   export let target;
   export let text;
   let flyin = { x: -100 };
   export let hideProfile;

</script>

<div in:fly={flyin} class="w-full flex items-center text-primary p-2 pl-1 mt-1 mb-2">
	<a class="pr-1.5" href="{targeturl}">
		<svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" height="23" viewBox="0 -960 960 960" width="48"><path d="m283.805-445.935 244.173 244.174L480-154.022 154.022-480 480-806.218l47.978 47.979-244.173 244.174h522.413v68.13H283.805Z"/></svg>
	</a>
	<p class="text-lg">{text}</p>
</div>