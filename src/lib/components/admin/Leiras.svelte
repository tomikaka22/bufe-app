<script>
	import AdminTopbar from '$lib/components/AdminTopbar.svelte';

	export let data;
	export let leirasModal;

	let input;

</script>

<dialog class="bg-surface-variant rounded-2xl text-secondary" bind:this={leirasModal}>
	<AdminTopbar midText={'Leírás'} input={input} modal={leirasModal}></AdminTopbar>
		<div class="m-4 mt-2">
			<form bind:this={input} action="?/leiras" method="POST">
				{#each data.termekekLista as termekek}
					<p class="px-2 my-2 w-fit bg-primary-container rounded-lg text-on-primary-container">
						<strong>{termekek.termek}:</strong>
						<input class="bg-background outline-none rounded-xl py-1 px-2 my-1 mx-1 font-normal" name="{termekek.id}" type="text" value="{termekek.leiras}">
					</p>
				{/each}
			</form>
		</div>
 </dialog>