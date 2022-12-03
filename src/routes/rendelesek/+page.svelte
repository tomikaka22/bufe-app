<script>
   import { slide } from 'svelte/transition';
   import Topbar from '$lib/components/Topbar.svelte';

   export let data;
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

   {#each [...Object.keys(data)].reverse() as item ([...Object.keys(data)].reverse())}
      {#if item != 'name'}
         <div in:slide class="rendeles-card">
            <div class="rendeles-cell">
               {#each [...Object.keys(data[item].rendeles)].reverse() as a}
                  {#if a != 'name'}
                     <p>{a}</p>
                  {/if}
               {/each}
            </div>

            <div class="rendeles-cell">
               {#each [...Object.keys(data[item].rendeles)].reverse() as a}
                  {#if a != 'name'}
                     <p>{data[item].rendeles[a][0]} db</p>
                  {/if}
               {/each}
            </div>

            <div class="rendeles-cell">
               {#each [...Object.keys(data[item].rendeles)].reverse() as a}
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
      width: 85vw;
      margin: 3% auto;
      padding: 5% 3%;
      outline: 2px solid rgb(51, 51, 51);
      background-color: #252525;
      display: grid;
      grid-template-columns: 50% 25% 25%;
      border-radius: 1em;

      .rendeles-cell {
         display: flex;
         flex-direction: column;
         justify-content: center;
         gap: 5%;

         p {
            color: rgba(255, 255, 255, 0.932);
            border-bottom: 1px solid #cf610088;
            font-size: medium;

            &:last-of-type {
               border-bottom: 0;
            }
         }
      }

      &:nth-child(2n) {
            background-color: #161616;
         }
   }

	.active-card {
		background-color: #ff770060 !important;
	}
}

</style>