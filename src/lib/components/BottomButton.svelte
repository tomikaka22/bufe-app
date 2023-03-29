<script>
   import { fly } from 'svelte/transition';
   export let text;
   export let action;
</script>

<div in:fly={{ y: 100 }} on:click={action} class="fixed bottom-10 w-full flex justify-center items-center font-semibold">
   <div class="outline outline-1 p-2 rounded-3xl cursor-pointer hover:rounded-lg hover:bg-primary hover:text-on-primary transition-all duration-300">
      <b>{text}</b>
   </div>
</div>

<style lang="postcss">

</style>