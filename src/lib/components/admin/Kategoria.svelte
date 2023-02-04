<script>
    export let data;
    export let kategoriaModal;
</script>

<dialog class="kategoria-modal" bind:this={kategoriaModal}>
    <form action="?/kategoria" method="POST">
       {#each data.termekekLista as termekek}
          <p>{termekek.termek} | Kategória:
             <select name="{termekek.id}">
                <option value="Étel">Étel</option>
                <option value="Ital">Ital</option>
                <option value="Nasi">Nasi</option>
             </select>
          </p>
       {/each}
       <button>Mentés</button>
    </form>
    <button on:click={kategoriaModal.close()}><h1>Bezár</h1></button>
 </dialog>

 <style lang="postcss">

 </style>