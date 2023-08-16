<script>
	import AdminTopbar from '$lib/components/AdminTopbar.svelte';

	export let data;
	export let kategoriaModal;

	let input;

</script>

<dialog class="bg-surface-variant rounded-2xl text-secondary w-fit" bind:this={kategoriaModal}>
	<AdminTopbar midText={'Kategória'} input={input} modal={kategoriaModal}></AdminTopbar>
		<div class="m-4 mt-2">
			<form bind:this={input} action="?/kategoria" method="POST">
				{#each data.termekekLista as termekek}
					<p class="px-2 my-2 w-fit bg-primary-container rounded-lg text-on-primary-container"><span class="font-semibold text-lg">{termekek.termek}</span> | Kategória:
						<select class="bg-background outline-none rounded-xl py-1 px-2 my-1 mx-1 font-normal" name="{termekek.id}" value="{termekek.kategoria}">
								<option value="Étel">Étel</option>
								<option value="Ital">Ital</option>
								<option value="Nasi">Nasi</option>
								<option value="Egyéb">Egyéb</option>
						</select>
					</p>
				{/each}
			</form>
		</div>
 </dialog>