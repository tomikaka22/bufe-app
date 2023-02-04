<script>
export let data;
export let termekModal;

let tempTermekek = {};
let termekekRemove = [];

function termekModalInputRemove(event) { // Kitörli a (Zöld) frissen hozzáadott (Még nem véglegesitett) termékeket.
   event.preventDefault()
   const data = Object.fromEntries(new FormData(event.target).entries())

   delete tempTermekek[Object.keys(data)[0]]
   tempTermekek = tempTermekek // Kell reaktivitas miatt
}

function termekModalRemove(event) { // Kitörli a már (régen) véglegesen hozzáadott termekeket.
   event.preventDefault()
   const data = Object.fromEntries(new FormData(event.target).entries())

   if (!termekekRemove.includes(Object.keys(data)[0])) {
      termekekRemove.push(Object.keys(data)[0])
      termekekRemove = termekekRemove // Kell reaktivitas miatt
   } else {
      termekekRemove = termekekRemove.filter(id => id != Object.keys(data)[0])
   }
}

function termekModalInput(event) { // Hozzáadja (Zölddel) a beirt termékeket.
   event.preventDefault()
   const data = Object.fromEntries(new FormData(event.target).entries())

   tempTermekek[data.termek] = {
      'ar': data.ar,
      'darab': data.darab,
      'leiras': data.leiras,
      'kategoria': data.kategoria
   }
}
</script>

<dialog class="termekek-modal" bind:this={termekModal}>
    <h2>Eddigi termékek:</h2>
       {#each data.termekekLista as termekek}
          <form on:submit={termekModalRemove}>
             <p class:crossed-out="{termekekRemove.includes(termekek.id)}">{termekek.termek}: {termekek.ar} Ft, {termekek.darab} db | {termekek.leiras} | {termekek.kategoria}
                <input type="text" hidden name="{termekek.id}">
                <button class="formRemoveButton"> {#if termekekRemove.includes(termekek.id)}↻{:else}❌{/if}</button>
             </p>
          </form>
       {/each}
 
    <h2 style="color: greenyellow;">Hozzáadandó termékek:</h2>
    {#each Object.keys(tempTermekek) as tempTermek, i (i)}
       <form on:submit={termekModalInputRemove}>
          <p style="color: green;">+ {tempTermek}: {tempTermekek[tempTermek].ar} Ft, {tempTermekek[tempTermek].darab} db, {tempTermekek[tempTermek].leiras} {tempTermekek[tempTermek].kategoria} 
             <input type="text" hidden name="{tempTermek}">
             <button class="formRemoveButton">❌</button>
          </p>
       </form>
    {/each}
 
    <form on:submit={termekModalInput}>
       Termék neve: <input type="text" name="termek" style="width: 20ch;"> 
       Termék ára: <input type="number" name="ar" style="width: 6ch;"> Ft, 
       Termék darab: <input type="number" name="darab" style="width: 6ch;"> db |
       Leirás: <input type="text" name="leiras" style="width: 20em;">
       Kategória: <select name="kategoria">
                   <option value="Étel">Étel</option>
                   <option value="Ital">Ital</option>
                   <option value="Nasi">Nasi</option>
                  </select>
       <button style="color: greenyellow;">+</button>
    </form>
 
    <form action="?/termekek" method="POST">
       <input hidden type="text" name="add" value="{JSON.stringify(tempTermekek)}">
       <input hidden type="text" name="remove" value="{JSON.stringify(termekekRemove)}">
       <button>Mentés</button>
    </form>
 
    <button on:click={termekModal.close()}><h1>Bezár</h1></button>
 </dialog>

 <style lang="postcss">

 </style>