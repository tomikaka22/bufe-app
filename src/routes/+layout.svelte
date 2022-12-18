<script>
   import PageTransition from '$lib/components/PageTransition.svelte';
   import { page } from '$app/stores'

</script>

<PageTransition url={$page.url}>
   <slot />
</PageTransition>

<style lang="scss">
   :global(*) {
      margin: 0;
      padding: 0;
      list-style: none;
      text-decoration: none;
      -webkit-tap-highlight-color: transparent;
      font-family:  Noto Serif Telugu;
      font-size: 1.78ch;
      --main-color: #252525;
      --accent-color: #cf6100;
   }

	:global(body) {
		background-color: black;
      scrollbar-width: none;

      &::-webkit-scrollbar {
         width: 0;
         display: none;
      }
	}

   @font-face {
      font-family: Noto Serif Telugu;
      src: url(/NotoSerifTelugu-VariableFont_wght.ttf);
   }
</style>