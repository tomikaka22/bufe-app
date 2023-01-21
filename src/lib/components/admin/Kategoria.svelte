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

<style lang="scss">
   dialog {
        margin: auto;
        background-color: rgb(31, 31, 31);
        color: white;
        border-radius: 1em;
        padding: 1em;
        border: 1px solid white;

        &::backdrop {
            background: rgba(0, 0, 0, 0.800);
        }
        

        button {
            background-color: rgb(50, 50, 50);
            color: white;
            font-size: larger;
            border-radius: 1em;
            padding: .5em;
        }
    }
</style>