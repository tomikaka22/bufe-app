<script>
export let data;
export let termekModal;

let tempTermekek = {};
let termekekRemove = [];

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

<dialog class="bg-surface-variant rounded-2xl text-secondary relative pt-5" bind:this={termekModal}>
    <h2 class="font-semibold text-lg text-primary">Eddigi termékek:</h2>
       {#each data.termekekLista as termekek}
          <form on:submit={termekModalRemove}>
             <p class:crossedOut="{termekekRemove.includes(termekek.id)}">{termekek.termek}: {termekek.ar} Ft, {termekek.darab} db | {termekek.leiras} | {termekek.kategoria}
                <input type="text" hidden name="{termekek.id}">
                <button class="bg-foreground p-2 py-0.5 rounded-3xl"> {#if termekekRemove.includes(termekek.id)}↻{:else}❌{/if}</button>
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

    <form on:submit={termekModalInput}>
      Termék neve: <input class="bg-background rounded-xl py-1 px-2 my-1 focus:mx-1" type="text" name="termek" style="width: 20ch;">
      Termék ára: <input class="appearance-none bg-background rounded-xl py-1 px-2 my-1 focus:mx-1" type="number" name="ar" style="width: 6ch; -moz-appearance: textfield;"> Ft
		<br>
      Termék darab: <input class="appearance-none bg-background rounded-xl py-1 px-2 my-1 focus:mx-1" type="number" name="darab" style="width: 6ch; -moz-appearance: textfield;"> db
		<br>
      Leirás: <input class="bg-background rounded-xl px-2 py-1 my-1 focus:mx-1" type="text" name="leiras" style="width: 20em;">
		<br>
      Kategória: <select class="bg-background rounded-xl px-2 py-1 my-1" name="kategoria">
						<option value="Étel">Étel</option>
						<option value="Ital">Ital</option>
						<option value="Nasi">Nasi</option>
						<option value="Egyéb">Egyéb</option>
                  </select>
       <button class="bg-background rounded-xl px-2 text-[yellowgreen] font-semibold text-lg">+</button>
    </form>

    <form action="?/termekek" method="POST">
       <input hidden type="text" name="add" value="{JSON.stringify(tempTermekek)}">
       <input hidden type="text" name="remove" value="{JSON.stringify(termekekRemove)}">
       <button class="px-2 py-1 outline outline-1 rounded-3xl">Mentés</button>
    </form>

   <div class="flex gap-3 absolute right-3 top-3">
		<button class="outline outline-1 transition-all hover:rounded-lg hover:bg-primary hover:outline-none hover:text-on-primary rounded-3xl p-1 px-2" on:click={termekModal.close()}><h1>Bezár</h1></button>
	</div>

 </dialog>

 <style lang="postcss">
 .crossedOut {
	@apply line-through;
	@apply text-outline
 }
 </style>