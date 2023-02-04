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

 <style lang="postcss">

 </style>