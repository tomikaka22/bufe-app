<script>
	import AdminTopbar from '$lib/components/AdminTopbar.svelte';

	export let data;
	export let termekModal;

	let tempTermekek = {};
	let termekekRemove = [];

	let input;

	function termekModalInputRemove(event) { // Kitörli a (Zöld) frissen hozzáadott (Még nem véglegesitett) termékeket.
		event.preventDefault();
		const data = Object.fromEntries(new FormData(event.target).entries());

		delete tempTermekek[Object.keys(data)[0]];
		tempTermekek = tempTermekek; // Kell reaktivitas miatt
	}

	function termekModalRemove(event) { // Kitörli a már (régen) véglegesen hozzáadott termekeket.
		event.preventDefault();
		const data = Object.fromEntries(new FormData(event.target).entries());

		if (!termekekRemove.includes(Object.keys(data)[0])) {
			termekekRemove.push(Object.keys(data)[0]);
			termekekRemove = termekekRemove; // Kell reaktivitas miatt
		} else {
			termekekRemove = termekekRemove.filter(id => id !== Object.keys(data)[0]);
		}
	}

	function termekModalInput(event) { // Hozzáadja (Zölddel) a beirt termékeket.
		event.preventDefault();
		const data = Object.fromEntries(new FormData(event.target).entries());

		tempTermekek[data.termek] = {
			'ar': data.ar,
			'darab': data.darab,
			'leiras': data.leiras,
			'kategoria': data.kategoria
		};
	}
</script>

<dialog class="bg-surface-variant w-full rounded-2xl text-secondary relative" bind:this={termekModal}>
	<AdminTopbar midText={'Termékek'} input={input} modal={termekModal}></AdminTopbar>

		<div class="m-4 mt-2">
			<h2 class="font-semibold text-lg text-primary">Eddigi termékek:</h2>
				{#each data.termekekLista as termekek}
					<form class="my-1" on:submit={termekModalRemove}>
						<p class:crossedOut="{termekekRemove.includes(termekek.id)}"><span class="bg-primary text-[black] rounded-md px-2">{termekek.termek}</span> <span class="bg-tertiary text-[black] rounded-md px-2">{termekek.darab} db | {termekek.ar} Ft</span> <span class="bg-secondary text-[black] rounded-md px-2">{termekek.kategoria}</span> <span class="bg-outline text-[black] rounded-md px-2">{termekek.leiras}</span>
							<input type="text" hidden name="{termekek.id}">
							<button class="bg-foreground px-2 rounded-3xl"> {#if termekekRemove.includes(termekek.id)}<span class="brightness-150 w-full h-full bg-foreground">↻</span>{:else}❌{/if}</button>
						</p>
					</form>
				{/each}
			<h2 class="font-semibold text-primary">Hozzáadandó termékek:</h2>
			{#each Object.keys(tempTermekek) as tempTermek, i (i)}
				<form on:submit={termekModalInputRemove}>
					<p class="text-tertiary">+ {tempTermek}: {tempTermekek[tempTermek].ar} Ft, {tempTermekek[tempTermek].darab} db, {tempTermekek[tempTermek].leiras} {tempTermekek[tempTermek].kategoria}
						<input type="text" hidden name="{tempTermek}">
						<button class="bg-foreground p-2 py-0.5 rounded-3xl">❌</button>
					</p>
				</form>
			{/each}
			<form class="font-semibold" on:submit={termekModalInput}>
			Termék neve: <input class="bg-background outline-none rounded-xl py-1 px-2 my-1 mx-1 font-normal" type="text" name="termek" style="width: 20ch;">
				<br>
			Termék ára: <input class="appearance-none outline-none bg-background rounded-xl py-1 px-2 my-1 mx-1 font-normal" type="number" name="ar" style="width: 6ch; -moz-appearance: textfield;"> Ft
				<br>
			Termék darab: <input class="appearance-none outline-none bg-background rounded-xl py-1 px-2 my-1 mx-1 font-normal" type="number" name="darab" style="width: 6ch; -moz-appearance: textfield;"> db
				<br>
			Leirás: <input class="bg-background outline-none rounded-xl px-2 py-1 my-1 mx-1 font-normal" type="text" name="leiras" style="width: 20em;">
				<br>
			Kategória: <select class="bg-background rounded-xl px-2 py-1 my-1 font-normal" name="kategoria">
								<option value="Étel">Étel</option>
								<option value="Ital">Ital</option>
								<option value="Nasi">Nasi</option>
								<option value="Egyéb">Egyéb</option>
							</select>
				<button class="bg-background rounded-xl px-2 text-[yellowgreen] font-semibold text-lg">+</button>
			</form>
			<form bind:this={input} action="?/termekek" method="POST">
				<input hidden type="text" name="add" value="{JSON.stringify(tempTermekek)}">
				<input hidden type="text" name="remove" value="{JSON.stringify(termekekRemove)}">
			</form>
		</div>

 </dialog>

 <style lang="postcss">
 .crossedOut {
	@apply brightness-50
 }
 </style>