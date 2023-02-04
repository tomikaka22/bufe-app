<script>
export let data;
export let feltetModal;

let tempFeltetek = {};
let feltetekRemove = {};

function feltetModalInput(event) { // Hozzáadja (Zölddel) a beirt termékeket.
	event.preventDefault()
   const data = Object.fromEntries(new FormData(event.target).entries())

	tempFeltetek[data.recordID] = {
		...tempFeltetek[data.recordID],
		[data.feltet]: {
			'darab': data.darab,
			'ar': data.ar
		}}
}

function feltetModalInputRemove(event) { // Kitörli a (Zöld) frissen hozzáadott (Még nem véglegesitett) felteteket.
	event.preventDefault()
   const data = Object.fromEntries(new FormData(event.target).entries())

	delete tempFeltetek[data.recordID][data.feltet]
	tempFeltetek = tempFeltetek // Kell reaktivitas miatt
}

function feltetekModalRemove(event) { // Kitörli a már (régen) véglegesen hozzáadott felteteket.
	event.preventDefault()
   const data = Object.fromEntries(new FormData(event.target).entries())
	if (!feltetekRemove[data.recordID]) feltetekRemove[data.recordID] = [];

	if (feltetekRemove[data.recordID].includes(data.feltet)) {
		feltetekRemove[data.recordID] = feltetekRemove[data.recordID].filter(feltet => feltet != data.feltet)
	} else {
		feltetekRemove[data.recordID] = [...feltetekRemove[data.recordID], data.feltet]
	}
}
</script>

<dialog class="feltet-modal" bind:this={feltetModal}>
	{#each data.termekekLista as termekek}
		<form on:submit={feltetModalInput}>
			<h2>{termekek.termek}:</h2>
			{#if termekek.feltetek}
				{#each Object.keys(termekek.feltetek) as feltet}
					<form on:submit={feltetekModalRemove}>
						<input name="recordID" hidden type="text" value="{termekek.id}">
						<input name="feltet" hidden type="text" value="{feltet}">
						<p class:crossed-out="{feltetekRemove[termekek.id]?.includes(feltet)}" style="color: white;">{feltet}: {termekek.feltetek[feltet].darab} db, {termekek.feltetek[feltet].ar} Ft <button class="formRemoveButton"><span>{#if feltetekRemove[termekek.id]?.includes(feltet)}↻{:else}❌{/if}</span></button></p>
					</form>
				{/each}
			{/if}

			{#if tempFeltetek[termekek.id]}
				{#each Object.keys(tempFeltetek[termekek.id]) as feltet}
					<form on:submit={feltetModalInputRemove}>
						<input name="recordID" hidden type="text" value="{termekek.id}">
						<input name="feltet" hidden type="text" value="{feltet}">
						<p> + {[feltet]}: {tempFeltetek[termekek.id][feltet].darab} db, {tempFeltetek[termekek.id][feltet].ar} Ft <button class="formRemoveButton"><span>❌</span></button></p>
					</form>
				{/each}
			{/if}
			<input name="recordID" hidden type="text" value="{termekek.id}">
			<input name="feltet" placeholder="Feltét neve" type="text" style="width: 10rem;">
			<input name="darab" type="number" value="1" style="width: 6ch;"> db
			<input name="ar" type="number" value="100" style="width: 6ch;"> Ft
			<button><span>+</span></button>
		</form>
	{/each}
	<form action="?/feltet" method="POST">
		<input name="add" hidden type="text" value="{JSON.stringify(tempFeltetek)}">
		<input name="remove" hidden type="text" value="{JSON.stringify(feltetekRemove)}">
		<button>Mentés</button>
	</form>
	<button on:click={feltetModal.close()}><h1>Bezár</h1></button>
</dialog>

<style lang="postcss">

</style>