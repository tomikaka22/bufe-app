<script>
    export let data;
    export let leirasModal;
</script>

<dialog class="bg-surface-variant rounded-2xl text-secondary relative pt-14" bind:this={leirasModal}>
    <form action="?/leiras" method="POST">
       {#each data.termekekLista as termekek}
          <p>{termekek.termek}: <input class="appearance-none bg-background rounded-xl py-1 px-2 my-1 mr-1 focus:mx-2" name="{termekek.id}" type="text" value="{termekek.leiras}" style="width: 20em;"></p>
       {/each}
		<button class="px-2 py-1 outline outline-1 rounded-3xl">Mentés</button>

    </form>
	<button class="px-2 py-1 outline outline-1 rounded-3xl absolute right-3 top-3" on:click={leirasModal.close()}><h1>Bezár</h1></button>

 </dialog>

 <style lang="postcss">

 </style>