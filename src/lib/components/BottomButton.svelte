<script>
   import { fly } from 'svelte/transition';
   export let text;
   export let action;

   function actionFunction() {action}

</script>

<div in:fly={{y: 100}} on:click={actionFunction} class="bottom-button">
   <div class="content">
      <p>{text}</p>
   </div>
</div>

<style lang="scss">
   .bottom-button {
      position: fixed;
      bottom: 0;
      left: 0;
      height: 3.5em;
      background-color: var(--accent-color);
      border-top-left-radius: 2.8em;
      border-top-right-radius: 2.8em;
      width: calc(98% - 2%); // * NAAAAGYON HACKY, de nem megy mashogy. Utálom a css-t
      margin-left: 2%;
      padding: .5ch 0;


      .content {
         width: 100%;
         height: 100%;
         display: flex;
         justify-content: center;
         align-items: center;
      }

   }
</style>