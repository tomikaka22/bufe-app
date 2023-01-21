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