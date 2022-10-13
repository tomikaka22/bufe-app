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
   }

   @font-face {
      font-family:  Noto Serif Telugu;
      src: url(/NotoSerifTelugu-VariableFont_wght.ttf);
   }
</style>