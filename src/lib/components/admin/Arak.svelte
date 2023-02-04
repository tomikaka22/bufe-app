<script>
    export let data;
    export let arakModal;
</script>

<dialog class="arak-modal" bind:this={arakModal}>
    <form action="?/ar" method="POST">
       {#each data.termekekLista as termekek}
          <p>{termekek.termek} <input name="{termekek.id}" style="width: 8ch;" value="{termekek.ar}" type="number">Ft</p>
       {/each}
       <button>Mentés</button>
    </form>
    <button on:click={arakModal.close()}><h1>Bezár</h1></button>
 </dialog>

 <style lang="postcss">

 </style>