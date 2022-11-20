<script>
   import PageTransition from '$lib/components/PageTransition.svelte';
   import { page } from '$app/stores'

</script>

<PageTransition url={$page.url}>
   <slot />
</PageTransition>

<style lang="scss">
   :global(*) {
      font-family:  Noto Serif Telugu;
      font-size: 1.78ch;
      --main-color: #252525;
      --accent-color: #cf6100;
   }

   @font-face {
      font-family:  Noto Serif Telugu;
      src: url(/NotoSerifTelugu-VariableFont_wght.ttf);
   }
</style>