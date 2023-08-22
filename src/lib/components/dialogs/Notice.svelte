<script>
   import { fade } from 'svelte/transition';

	export let title;
	export let text = '';

	export let showModal = false;

</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
{#if showModal}
	<div transition:fade={{ duration: 100 }} on:click={(e) => { if (e.target.id === 'backdrop') showModal = false; }} id="backdrop" class="absolute bottom-0 top-0 right-0 left-0 backdrop-brightness-50 z-20 flex justify-center items-center">
		<div class="w-9/12 p-6 rounded-[2rem] relative bg-foreground">
			<h1 class="font-semibold text-xl mb-3 text-primary">{title || 'Title'}</h1>

			<p class="text-sm pb-16">{text}</p>

			<button on:click={() => { showModal = false; }} class="absolute bottom-6 right-7 p-3 font-semibold text-xs text-primary">OK</button>
		</div>
	</div>
{/if}

<style>
</style>