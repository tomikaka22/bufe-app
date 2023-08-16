<script>
   import { fly } from 'svelte/transition';

   export let targeturl;
   export let target;
   export let text;
   let flyin = { x: -100 };
   export let hideProfile;

</script>

<div in:fly={flyin} class="w-full flex items-center text-primary p-2 pl-0 mb-2">
	<a href="{targeturl}">
		<svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" height="22" viewBox="0 -960 960 960" width="48"><path d="m274-450 248 248-42 42-320-320 320-320 42 42-248 248h526v60H274Z"/></svg>
	</a>
	<p class="text-lg">{text}</p>
</div>