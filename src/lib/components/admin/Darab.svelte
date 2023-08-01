<script>
	import AdminTopbar from '$lib/components/AdminTopbar.svelte';

	export let data;
	export let darabModal;

	let input;

</script>

<dialog class="bg-surface-variant w-fit rounded-2xl text-secondary" bind:this={darabModal}>
	<AdminTopbar midText={'Darab'} input={input} modal={darabModal}></AdminTopbar>
		<div class="m-4 mt-2">

			<form bind:this={input} action="?/darab" method="POST">
				{#each data.termekekLista as termek, i (i)}
					<p class="px-2 my-2 w-fit bg-primary-container rounded-lg text-on-primary-container"><span class="font-semibold">{termek.termek}</span> <input class="appearance-none bg-background text-on-background rounded-xl py-1 px-2 my-1 mx-2 focus:mx-2" name="{termek.id}" style="width: 6ch; -moz-appearance: textfield;" value="{termek.darab}" type="number">db</p>
				{/each}
			</form>
		</div>
 </dialog>

 <style lang="postcss">

 </style>