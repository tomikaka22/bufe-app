<script>
   import { fly } from "svelte/transition";

   export let targeturl;
   export let target;
   export let text;
   export let background;
   export let flyin;
   export let hideProfile;
</script>

<div in:fly={flyin} class="header" style="background-color: {background};">
   <div class="header-content">
      <div class="header-cell">
         <a data-sveltekit-noscroll id="header-left" href="{targeturl}"><span>&lt;</span>{target}</a>
      </div>
      <div class="header-cell">
         <h1>{text}</h1>
      </div>
      <div class="header-cell">
         <a data-sveltekit-noscroll class:hideProfile id="header-right" href='/profil'><img src="/api/avatar" alt=""></a>
      </div>
   </div>
</div>

<style lang="postcss">

</style>