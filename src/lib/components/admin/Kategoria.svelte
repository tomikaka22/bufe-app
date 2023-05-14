<script>
    export let data;
    export let kategoriaModal;
</script>

<dialog class="bg-surface-variant rounded-2xl text-secondary relative pt-14 w-80" bind:this={kategoriaModal}>
    <form action="?/kategoria" method="POST">
       {#each data.termekekLista as termekek}
          <p><span class="font-semibold text-lg">{termekek.termek}</span> | Kategória:
             <select class="bg-background rounded-xl py-1 px-2 my-1 mr-1 focus:mx-2" name="{termekek.id}">
                <option value="Étel">Étel</option>
                <option value="Ital">Ital</option>
                <option value="Nasi">Nasi</option>
             </select>
          </p>
       {/each}
		<button class="px-2 py-1 outline outline-1 rounded-3xl">Mentés</button>
    </form>
	<button class="px-2 py-1 outline outline-1 rounded-3xl absolute right-3 top-3" on:click={kategoriaModal.close()}><h1>Bezár</h1></button>
 </dialog>

 <style lang="postcss">

 </style>