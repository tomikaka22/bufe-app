<script>
   import { fly } from 'svelte/transition';
   import Topbar from '$lib/components/Topbar.svelte';

   export let data;
   let navigation = 'Folyamatban';
   console.log(data)
</script>

<main>

   <Topbar
      target={'Menü'}
      targeturl={'/'}
      text={'Rendelések'}
      background={'none'}
      flyin={{y: -200}}
   ></Topbar>

   {#if navigation == 'Folyamatban'}
   <div class="Folyamatban">

   </div>
   {:else}
   <div class="Elozmenyek">

   </div>
   {/if}

   {#each Object.keys(data) as item (Object.keys(data))}
      {#if item != 'name'}
         <div class="rendeles-card">
            <div class="rendeles-cell">
               {#each Object.keys(data[item].rendeles) as a}
                  {#if a != 'name'}
                     <p>{a}</p>
                  {/if}
               {/each}
            </div>

            <div class="rendeles-cell">
               {#each Object.keys(data[item].rendeles) as a}
                  {#if a != 'name'}
                     <p>{data[item].rendeles[a][0]} db</p>
                  {/if}
               {/each}
            </div>

            <div class="rendeles-cell">
               {#each Object.keys(data[item].rendeles) as a}
                  {#if a != 'name'}
                     <p>{data[item].rendeles[a][1]} Ft</p>
                  {/if}
               {/each}
            </div>
         </div>
      {/if}
   {/each}

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
      -webkit-tap-highlight-color: transparent;
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

   .rendeles-card {
      width: 90vw;
      margin: 3% auto;
      padding: 2%;
      outline: 2px solid rgb(51, 51, 51);
      background-color: #252525;
      display: grid;
      grid-template-columns: 50% 25% 25%;
      border-radius: 1em;

      .rendeles-cell {
         display: flex;
         flex-direction: column;
         justify-content: center;

         p {
            color: rgba(255, 255, 255, 0.932);
            border-bottom: 1px solid #cf610088;
         }
      }

      &:nth-child(2n) {
            background-color: #161616;
         }
   }

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
         background-color: var(--accent-color);
         border-radius: 20px;
         color: black;
         transition: all .25s ease-in-out;
      }
   }


}

</style>