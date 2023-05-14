<script>
    export let data;
    export let arakModal;
</script>

<dialog class="bg-surface-variant rounded-2xl text-secondary relative w-80" bind:this={arakModal}>
    <form action="?/ar" method="POST">
       {#each data.termekekLista as termekek}
          <p>{termekek.termek} <input class="appearance-none bg-background rounded-xl py-1 px-2 my-1 mr-1 focus:mx-2" name="{termekek.id}" style="width: 6ch; -moz-appearance: textfield;" value="{termekek.ar}" type="number">Ft</p>
       {/each}
		<button class="px-2 py-1 outline outline-1 rounded-3xl">Mentés</button>
    </form>

	<button class="px-2 py-1 outline outline-1 rounded-3xl absolute right-3 top-3" on:click={arakModal.close()}><h1>Bezár</h1></button>

 </dialog>

 <style lang="postcss">

 </style>