<script>
    export let data;
    export let darabModal;
</script>

<dialog class="darab-modal" bind:this={darabModal}>
    <form action="?/darab" method="POST">
       {#each data.termekekLista as termekek, i (i)}
          <p>{termekek.termek} <input name="{termekek.id}" style="width: 6ch;" value="{termekek.darab}" type="number">db</p>
       {/each}
       <button>Mentés</button>
    </form>
    <button on:click={darabModal.close()}><h1>Bezár</h1></button>
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