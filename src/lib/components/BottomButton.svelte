<script>
   import { fly } from 'svelte/transition';
   export let text;
   export let action;
</script>

<div in:fly={{y: 100}} on:click={action} class="bottom-button">
   <div class="content">
      <b>{text}</b>
   </div>
</div>

<style lang="postcss">

</style>