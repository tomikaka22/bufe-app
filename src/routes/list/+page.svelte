<script>
   import { fly } from 'svelte/transition';
   import { browser } from '$app/environment';
   import { cart, total } from '$lib/stores/Cart.js';
   import { navigation } from '$lib/stores/Navigation.js';
   import Topbar from '$lib/components/Topbar.svelte';
   export let data;
   let innerWidth;
   let cartshow = 0;

   if (browser) {
      if (localStorage.getItem('CartContent') != null) {
         cartshow = 1;
         $cart = JSON.parse(localStorage.getItem('CartContent'));
         // Kosar szamitas -- minden latogatasnal urja szamolja. Nem tudom hogy mennyire expnesive a szamolas, lehet jobb lenne elraktarozni, lehet nem.
         $total = [0,0]
         for (let i = 0; i < Object.keys($cart).length; i++) { // atmegy minden key-en a kosar obejtben
            let cnt = $cart[Object.keys($cart)[i]]; // cnt = kosar object i-ik eleme
            $total[1] += Number(cnt[1]);  // hozzaadja a kosar object i-ik kulcsanak az 1. tagjat
            $total[0] += Number(cnt[0])   // hozzaadja a kosar object i-ik kulcsanak a 2. tagjat
         };
      };
   };

   $: flyIn={x: innerWidth, duration: 500};
   $: flyOut={x: -innerWidth, duration: 500};
     // Needed to be reactive because x is undefined on first render

   function AnimationDirection(tab) {
      switch (tab) {
         case 'Étel':
            flyIn={x: -innerWidth, duration: 500};
            flyOut={x: innerWidth, duration: 500};
            $navigation = tab
            break;
         case 'Nasi':
            flyIn={x: innerWidth, duration: 500};
            flyOut={x: -innerWidth, duration: 500};
            $navigation = tab
            break;
         case 'Ital':
            if ($navigation == 'Étel') {
               flyIn={x: innerWidth, duration: 500};
               flyOut={x: -innerWidth, duration: 500};
               $navigation = tab
            };
            if ($navigation == 'Nasi') {
               flyIn={x: -innerWidth, duration: 500};
               flyOut={x: innerWidth, duration: 500};
               $navigation = tab
            }
      }
   }

</script>

<!-- Binds the innerWidth variable to the width of the monitor to give a more fluid motion -->
<svelte:window bind:innerWidth />
<!-- Above is equivalent to below, shortcut for binding when you make them the same name -->
<!-- <svelte:window bind:innerWidth={innerWidth} /> -->


<!-- Swipe-talantias

   Az oldal huzogatassal navigalasa eleg szarul volt megoldva, amtmenetileg kiszedtem. 
   Vissza fog térni jobban megvalositva a design mobilositasakor: https://github.com/users/tomikaka22/projects/1/views/1

-->
<main>

   <Topbar
      target={'Menü'}
      targeturl={'/'}
      text={'Termékek'}
      background={'#252525'}
      flyin={{y: -200}}
   ></Topbar>

   <div class='outer-grid'>
      {#if $navigation == 'Étel'}
         <div in:fly={flyIn} out:fly={flyOut} class='grid-container'>
            {#each Object.keys(data.étel) as termek}
               <div class="inner-grid">
                  <a data-sveltekit-noscroll href="{termek}?Category=étel" class='grid-cell'><img src='favicon.png' alt=''></a>
                  <a data-sveltekit-noscroll href="{termek}?Category=étel" class='grid-cell'>{termek}</a>
                  <a data-sveltekit-noscroll href="{termek}?Category=étel" class='grid-cell'>{data.étel[termek].price} Ft</a>
               </div>
            {/each}
         <!-- Csak useless padding -->
            {#each Object.keys(data.étel) as termek}
               <div class="inner-grid">
                  <a data-sveltekit-noscroll href="{termek}?Category=étel" class='grid-cell'><img src='favicon.png' alt=''></a>
                  <a data-sveltekit-noscroll href="{termek}?Category=étel" class='grid-cell'>{termek}</a>
                  <a data-sveltekit-noscroll href="{termek}?Category=étel" class='grid-cell'>{data.étel[termek].price} Ft</a>
               </div>
            {/each}
            {#each Object.keys(data.étel) as termek}
               <div class="inner-grid">
                  <a data-sveltekit-noscroll href="{termek}?Category=étel" class='grid-cell'><img src='favicon.png' alt=''></a>
                  <a data-sveltekit-noscroll href="{termek}?Category=étel" class='grid-cell'>{termek}</a>
                  <a data-sveltekit-noscroll href="{termek}?Category=étel" class='grid-cell'>{data.étel[termek].price} Ft</a>
               </div>
            {/each}
            {#each Object.keys(data.étel) as termek}
               <div class="inner-grid">
                  <a data-sveltekit-noscroll href="{termek}?Category=étel" class='grid-cell'><img src='favicon.png' alt=''></a>
                  <a data-sveltekit-noscroll href="{termek}?Category=étel" class='grid-cell'>{termek}</a>
                  <a data-sveltekit-noscroll href="{termek}?Category=étel" class='grid-cell'>{data.étel[termek].price} Ft</a>
               </div>
            {/each}
         <!-- Csak useless padding -->
         </div>
      {/if}

      {#if $navigation == 'Ital'}
         <div in:fly={flyIn} out:fly={flyOut} class='grid-container'>
            {#each Object.keys(data.ital) as termek}
               <div class="inner-grid">
                  <a data-sveltekit-noscroll href="{termek}?Category=ital" class='grid-cell'><img src='favicon.png' alt=''></a>
                  <a data-sveltekit-noscroll href="{termek}?Category=ital" class='grid-cell'>{termek}</a>
                  <a data-sveltekit-noscroll href="{termek}?Category=ital" class='grid-cell'>{data.ital[termek].price} Ft</a>
               </div>
         <!-- Csak useless padding -->
               <div class="inner-grid">
                  <a data-sveltekit-noscroll href="{termek}?Category=ital" class='grid-cell'><img src='favicon.png' alt=''></a>
                  <a data-sveltekit-noscroll href="{termek}?Category=ital" class='grid-cell'>{termek}</a>
                  <a data-sveltekit-noscroll href="{termek}?Category=ital" class='grid-cell'>{data.ital[termek].price} Ft</a>
               </div>
               <div class="inner-grid">
                  <a data-sveltekit-noscroll href="{termek}?Category=ital" class='grid-cell'><img src='favicon.png' alt=''></a>
                  <a data-sveltekit-noscroll href="{termek}?Category=ital" class='grid-cell'>{termek}</a>
                  <a data-sveltekit-noscroll href="{termek}?Category=ital" class='grid-cell'>{data.ital[termek].price} Ft</a>
               </div>
               <div class="inner-grid">
                  <a data-sveltekit-noscroll href="{termek}?Category=ital" class='grid-cell'><img src='favicon.png' alt=''></a>
                  <a data-sveltekit-noscroll href="{termek}?Category=ital" class='grid-cell'>{termek}</a>
                  <a data-sveltekit-noscroll href="{termek}?Category=ital" class='grid-cell'>{data.ital[termek].price} Ft</a>
               </div>
          <!-- Csak useless padding -->
            {/each}
         </div>
      {/if}

      {#if $navigation == 'Nasi'}
         <div in:fly={flyIn} out:fly={flyOut} class='grid-container'>
            {#each Object.keys(data.nasi) as termek}
               <div class="inner-grid">
                  <a data-sveltekit-noscroll href="{termek}?Category=nasi" class='grid-cell'><img src='favicon.png' alt=''></a>
                  <a data-sveltekit-noscroll href="{termek}?Category=nasi" class='grid-cell'>{termek}</a>
                  <a data-sveltekit-noscroll href="{termek}?Category=nasi" class='grid-cell'>{data.nasi[termek].price} Ft</a>
               </div>
         <!-- Csak useless padding -->
               <div class="inner-grid">
                  <a data-sveltekit-noscroll href="{termek}?Category=nasi" class='grid-cell'><img src='favicon.png' alt=''></a>
                  <a data-sveltekit-noscroll href="{termek}?Category=nasi" class='grid-cell'>{termek}</a>
                  <a data-sveltekit-noscroll href="{termek}?Category=nasi" class='grid-cell'>{data.nasi[termek].price} Ft</a>
               </div>
               <div class="inner-grid">
                  <a data-sveltekit-noscroll href="{termek}?Category=nasi" class='grid-cell'><img src='favicon.png' alt=''></a>
                  <a data-sveltekit-noscroll href="{termek}?Category=nasi" class='grid-cell'>{termek}</a>
                  <a data-sveltekit-noscroll href="{termek}?Category=nasi" class='grid-cell'>{data.nasi[termek].price} Ft</a>
               </div>
               <div class="inner-grid">
                  <a data-sveltekit-noscroll href="{termek}?Category=nasi" class='grid-cell'><img src='favicon.png' alt=''></a>
                  <a data-sveltekit-noscroll href="{termek}?Category=nasi" class='grid-cell'>{termek}</a>
                  <a data-sveltekit-noscroll href="{termek}?Category=nasi" class='grid-cell'>{data.nasi[termek].price} Ft</a>
               </div>
         <!-- Csak useless padding -->
            {/each}
         </div>
      {/if}
   </div>

{#if cartshow}
<div in:fly={{y: 100}} style='margin-bottom: 6.5vh;' class='nav'>
   <div class='Étel' on:click={() => {AnimationDirection('Étel')}}><p class:active='{$navigation == 'Étel'}'>Étel</p></div>
   <div class='Ital' on:click={() => {AnimationDirection('Ital')}}><p class:active='{$navigation == 'Ital'}'>Ital</p></div>
   <div class='Nasi' on:click={() => {AnimationDirection('Nasi')}}><p class:active='{$navigation == 'Nasi'}'>Nasi</p></div>
</div>

<a data-sveltekit-noscroll href="kosar">
   <div in:fly={{y: 100, delay: 100}} class='cart'>
      <div class="cart-grid">
         <div class="cart-cell">
            <img src="shopping-basket.png" alt=""> <b>{$total[0]} Ft</b><p>({$total[1]} db termék a kosárban.)</p>
         </div>
      </div>
   </div>
</a>

{:else}
<div in:fly={{y: 200}} class='nav'>
   <div class='Étel' on:click={() => {AnimationDirection('Étel')}}><p class:active='{$navigation == 'Étel'}'>Étel</p></div>
   <div class='Ital' on:click={() => {AnimationDirection('Ital')}}><p class:active='{$navigation == 'Ital'}'>Ital</p></div>
   <div class='Nasi' on:click={() => {AnimationDirection('Nasi')}}><p class:active='{$navigation == 'Nasi'}'>Nasi</p></div>
</div>
{/if}


</main>

<style lang='scss'>

   /* ----------------------------------------- */

   main {
      width: 100%;
      height: 100%;
      overflow-x: hidden; // Swipe-talantias
      overflow-y: scroll;
      position: fixed;

      .outer-grid {
         display: grid;
         width: 100vw;

         .grid-container {
            // Using grid and grid-area 1/1 to force the inner divs into the same area. 
            // If you don't do this you get a bouncing effect where the incoming div is
            // pushed below the outgoing div and then 'pops up' jarringly.
            grid-area: 1/1;
            margin: 3%;
            margin-bottom: 100%;

               .inner-grid {
                  display: grid;
                  grid-template-columns: 33.33% 33.33% 33.33%;
                  background-color: #252525;
                  border-bottom: 1px solid var(--accent-color);

                  &:nth-of-type(2n) {
                     background-color: #161616;
                  }

                  &:last-of-type {
                     border-bottom: none
                  }

                  &:first-of-type {
                     border-top-left-radius: 20px;
                     border-top-right-radius: 20px;
                  }

                  &:last-of-type {
                     border-bottom-left-radius: 20px;
                     border-bottom-right-radius: 20px;
                  }


                  .grid-cell {
                     display: flex;
                     justify-content: center;
                     align-items: center;
                     color: rgba(255, 255, 255, 0.9);

                     img {
                        width: 90px;
                        // margin-right: auto;
                     }
                  }
               }
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
         border: 1px solid rgba(255, 255, 255, 0.048);

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
      
      .cart {
         position: fixed;
         bottom: 0;
         left: 0;
         height: 3.5em;
         background-color: var(--accent-color);
         border-top-left-radius: 2.8em;
         border-top-right-radius: 2.8em;
         width: calc(98% - 2%); // * NAAAAGYON HACKY, de nem megy mashogy. Utálom a css-t
         margin-left: 2%;
         padding: .5ch 0;

         .cart-grid {
            height: 100%;
            width: 100%;
            display: grid;

            .cart-cell {
               display: flex;
               align-items: center;
               justify-content: center;
               color: black;

               img {
                  width: 12%;
               }

               b {
                  font-size: large;
                  margin-right: 3%;
                  margin-left: 1%;
                  margin-top: 1%;
               }

               p {
                  margin-top: 1%;
               }
            }
         }
      }

   }

 </style>
