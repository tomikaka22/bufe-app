<script>
	import AdminTopbar from '$lib/components/AdminTopbar.svelte';

	export let data;
	export let arakModal;

	let input;

</script>

<dialog class="bg-surface-variant rounded-2xl text-secondary relative w-80" bind:this={arakModal}>
	<AdminTopbar midText={'Árak'} input={input} modal={arakModal}></AdminTopbar>
	<div class="m-4 mt-2">
		<form bind:this={input} action="?/ar" method="POST">
			{#each data.termekekLista as termekek}
				<p class="px-2 my-2 w-fit bg-primary-container rounded-lg text-on-primary-container"><span class="font-semibold">{termekek.termek}</span> <input class="appearance-none bg-background rounded-xl py-1 px-2 my-1 mr-1 focus:mx-2" name="{termekek.id}" style="width: 6ch; -moz-appearance: textfield;" value="{termekek.ar}" type="number">Ft</p>
			{/each}
		</form>
	</div>
 </dialog>

 <style lang="postcss">

 </style>