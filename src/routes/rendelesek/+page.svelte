<script>
   import { fly } from 'svelte/transition';
   let navigation = 'Folyamatban';
</script>

<main>

{#if navigation == 'Folyamatban'}
<div class="Folyamatban">
   <p style="color: white;">Folyamatban</p>
</div>
{:else}
<div class="Elozmenyek">
   <p style="color: white;">Elozmenyek</p>
</div>
{/if}

   <div in:fly={{y: 200}} class='nav'>
      <div class='Folyamatban' on:click={() => {navigation = 'Folyamatban'}}><p class:active='{navigation == 'Folyamatban'}'>Folyamatban</p></div>
      <div class='Előzmények' on:click={() => {navigation = 'Előzmények'}}><p class:active='{navigation == 'Előzmények'}'>Előzmények</p></div>
   </div>

</main>

<style lang="scss">

:global(*) {
      margin: 0;
      padding: 0;
      list-style: none;
      text-decoration: none;
   }

	:global(body) {
		background-color: black;
      scrollbar-width: none;

      ::-webkit-scrollbar {
         width: 0;
      }
	}

   /* ----------------------------------------- */

main {
   .nav {
      display: flex;
      background-color: #252525ea;
      color: rgba(255, 255, 255, 0.877);
      height: 12vh;
      width: 100vw;
      position: fixed;
      bottom: 0;
      left: 0;
      z-index: 20;
      margin-bottom: 3vh;
      border-radius: 3em;
      transform: scale(60%);
      font-weight: bold;

      div {
         display: flex;
         flex: 33.3%;
         justify-content: center;
         align-items: center;
      }

      .active {
         padding: 2vh;
         background-color: white;
         border-radius: 20px;
         color: black;
         transition: all .25s ease-in-out;
      }
   }


}

</style>