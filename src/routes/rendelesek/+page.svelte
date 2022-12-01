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

   {#each [...Object.keys(data)].reverse() as item (Object.keys(data))}
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

            &:last-of-type {
               border-bottom: 0;
            }
         }
      }

      &:nth-child(2n) {
            background-color: #161616;
         }
   }

}

</style>