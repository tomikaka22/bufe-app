<script>
    export let data;
    export let leirasModal;
</script>

<dialog class="leiras-modal" bind:this={leirasModal}>
    <form action="?/leiras" method="POST">
       {#each data.termekekLista as termekek}
          <p>{termekek.termek}: <input name="{termekek.id}" type="text" value="{termekek.leiras}" style="width: 20em;"></p>
       {/each}
       <button>Mentés</button>
    </form>
    <button on:click={leirasModal.close()}><h1>Bezár</h1></button>
 </dialog>

 <style lang="postcss">

 </style>