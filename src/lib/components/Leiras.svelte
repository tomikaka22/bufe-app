<script>
   import { fade } from 'svelte/transition';

	export let leiras;
	let open = false;
</script>

{#if open}
	<button in:fade={{ duration: 150 }} on:click={() => { open = false; }} class="text-sm max-w-[65%] font-semibold p-1 px-2 rounded-lg bg-foreground break-words">
		{leiras}
	</button>
{:else}
	<button in:fade={{ duration: 150 }} on:click={() => { open = true; }} class="text-sm max-w-[65%] p-1 px-2.5 rounded-lg bg-foreground outline outline-1 outline-outline flex justify-between items-center">
		<p class="truncate w-full">{leiras}</p>
		<svg class="w-3 ml-1.5" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="253.82 -626.78 452.37 268.35"><path d="M480-358.463 253.847-584.615 296-626.768l184 184 184-184 42.153 42.153L480-358.463Z"/></svg>
	</button>
{/if}