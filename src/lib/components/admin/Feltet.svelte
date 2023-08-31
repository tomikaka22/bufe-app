<script>
	import AdminTopbar from '$lib/components/AdminTopbar.svelte';

	export let data;
	export let feltetModal;

	let tempFeltetek = {};
	const feltetekRemove = {};

	let input;

	function feltetModalInput(event) { // Hozzáadja (Zölddel) a beirt termékeket.
		event.preventDefault();
		const data = Object.fromEntries(new FormData(event.target).entries());

		if (data.feltet && data.darab && data.ar)
			tempFeltetek[data.recordID] = {
				...tempFeltetek[data.recordID],
				[data.feltet]: {
					'darab': data.darab,
					'ar': data.ar
				} };
	}

	function feltetModalInputRemove(event) { // Kitörli a (Zöld) frissen hozzáadott (Még nem véglegesitett) felteteket.
		event.preventDefault();
		const data = Object.fromEntries(new FormData(event.target).entries());

		delete tempFeltetek[data.recordID][data.feltet];
		tempFeltetek = tempFeltetek; // Kell reaktivitas miatt
	}

	function feltetekModalRemove(event) { // Kitörli a már (régen) véglegesen hozzáadott felteteket.
		event.preventDefault();
		const data = Object.fromEntries(new FormData(event.target).entries());
		if (!feltetekRemove[data.recordID]) feltetekRemove[data.recordID] = [];

		if (feltetekRemove[data.recordID].includes(data.feltet)) {
			feltetekRemove[data.recordID] = feltetekRemove[data.recordID].filter(feltet => feltet !== data.feltet);
		} else {
			feltetekRemove[data.recordID] = [ ...feltetekRemove[data.recordID], data.feltet ];
		}
	}
</script>

<dialog class="bg-surface-variant rounded-2xl text-secondary relative w-fit" bind:this={feltetModal}>
	<AdminTopbar midText={'Feltét'} input={input} modal={feltetModal}></AdminTopbar>

	<div class="m-4 mt-2">
		{#each data.termekekLista as termekek}
			<form on:submit={feltetModalInput}>
				<h2 class="font-semibold text-lg px-2 mt-2 w-fit bg-primary-container rounded-lg text-on-primary-container">{termekek.termek}:</h2>
				{#if termekek.feltetek}
					{#each Object.keys(termekek.feltetek) as feltet}
						<form on:submit={feltetekModalRemove}>
							<input name="recordID" hidden type="text" value="{termekek.id}">
							<input name="feltet" hidden type="text" value="{feltet}">
							<p class:crossedOut="{feltetekRemove[termekek.id]?.includes(feltet)}"><span class="bg-primary text-[black] rounded-md px-2">{feltet}</span> <span class="bg-tertiary text-[black] rounded-md px-2">{termekek.feltetek[feltet].darab} db | {termekek.feltetek[feltet].ar} Ft</span> <button class="bg-foreground p-2 py-0.5 rounded-3xl"><span>{#if feltetekRemove[termekek.id]?.includes(feltet)}↻{:else}❌{/if}</span></button></p>
						</form>
					{/each}
				{/if}
				{#if tempFeltetek[termekek.id]}
					{#each Object.keys(tempFeltetek[termekek.id]) as feltet}
						<form on:submit={feltetModalInputRemove}>
							<input name="recordID" hidden type="text" value="{termekek.id}">
							<input name="feltet" hidden type="text" value="{feltet}">
							<p class="text-tertiary"> + {feltet}: {tempFeltetek[termekek.id][feltet].darab} db, {tempFeltetek[termekek.id][feltet].ar} Ft <button class="bg-foreground p-2 py-0.5 rounded-3xl"><span>❌</span></button></p>
						</form>
					{/each}
				{/if}
				<input class="bg-background outline-none rounded-xl py-1 px-2 my-1 mx-1 font-normal" name="recordID" hidden type="text" value="{termekek.id}">
				<input class="bg-background outline-none rounded-xl py-1 px-2 my-1 mx-1 font-normal" name="feltet" placeholder="Feltét neve" type="text" style="width: 10rem;">
				<input class="bg-background outline-none rounded-xl py-1 px-2 my-1 mx-1 font-normal" name="darab" type="number" value="1" style="width: 6ch; -moz-appearance: textfield"> db
				<input class="bg-background outline-none rounded-xl py-1 px-2 my-1 mx-1 font-normal" name="ar" type="number" value="100" style="width: 6ch; -moz-appearance: textfield"> Ft
				<button class="bg-background rounded-xl px-2 text-[yellowgreen] font-semibold text-lg">+</button>
			</form>
		{/each}
	</div>

	<form bind:this={input} action="?/feltet" method="POST">
		<input name="add" hidden type="text" value="{JSON.stringify(tempFeltetek)}">
		<input name="remove" hidden type="text" value="{JSON.stringify(feltetekRemove)}">
	</form>
</dialog>

<style lang="postcss">
 .crossedOut {
	@apply line-through;
	@apply text-outline
 }
</style>