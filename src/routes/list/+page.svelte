<script>
   import { fly, slide } from 'svelte/transition';
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
      hideProfile={0}
   ></Topbar>

   <div in:slide={{duration: 700}} class='list-grid'>
      {#if $navigation == 'Étel'}
         <div in:fly={flyIn} out:fly={flyOut} class='grid-container'>
            {#each Object.keys(data.termekek) as termek}
               {#if data.termekek[termek].category == $navigation}
               <div class="inner-grid">
                  <a data-sveltekit-noscroll href="{termek}?Category=étel" class='grid-cell'><img src='favicon.png' alt=''></a>
                  <a data-sveltekit-noscroll href="{termek}?Category=étel" class='grid-cell'>{termek}</a>
                  <a data-sveltekit-noscroll href="{termek}?Category=étel" class='grid-cell'>{data.termekek[termek].price} Ft</a>
               </div>
         <!-- Csak useless padding -->
               <div class="inner-grid">
                  <a data-sveltekit-noscroll href="{termek}?Category=étel" class='grid-cell'><img src='favicon.png' alt=''></a>
                  <a data-sveltekit-noscroll href="{termek}?Category=étel" class='grid-cell'>{termek}</a>
                  <a data-sveltekit-noscroll href="{termek}?Category=étel" class='grid-cell'>{data.termekek[termek].price} Ft</a>
               </div>
               <div class="inner-grid">
                  <a data-sveltekit-noscroll href="{termek}?Category=étel" class='grid-cell'><img src='favicon.png' alt=''></a>
                  <a data-sveltekit-noscroll href="{termek}?Category=étel" class='grid-cell'>{termek}</a>
                  <a data-sveltekit-noscroll href="{termek}?Category=étel" class='grid-cell'>{data.termekek[termek].price} Ft</a>
               </div>
               <div class="inner-grid">
                  <a data-sveltekit-noscroll href="{termek}?Category=étel" class='grid-cell'><img src='favicon.png' alt=''></a>
                  <a data-sveltekit-noscroll href="{termek}?Category=étel" class='grid-cell'>{termek}</a>
                  <a data-sveltekit-noscroll href="{termek}?Category=étel" class='grid-cell'>{data.termekek[termek].price} Ft</a>
               </div>
               {/if}
            {/each}
         <!-- Csak useless padding -->
         </div>
      {/if}

      {#if $navigation == 'Ital'}
         <div in:fly={flyIn} out:fly={flyOut} class='grid-container'>
            {#each Object.keys(data.termekek) as termek}
               {#if data.termekek[termek].category == $navigation}
               <div class="inner-grid">
                  <a data-sveltekit-noscroll href="{termek}?Category=ital" class='grid-cell'><img src='favicon.png' alt=''></a>
                  <a data-sveltekit-noscroll href="{termek}?Category=ital" class='grid-cell'>{termek}</a>
                  <a data-sveltekit-noscroll href="{termek}?Category=ital" class='grid-cell'>{data.termekek[termek].price} Ft</a>
               </div>
         <!-- Csak useless padding -->
               <div class="inner-grid">
                  <a data-sveltekit-noscroll href="{termek}?Category=ital" class='grid-cell'><img src='favicon.png' alt=''></a>
                  <a data-sveltekit-noscroll href="{termek}?Category=ital" class='grid-cell'>{termek}</a>
                  <a data-sveltekit-noscroll href="{termek}?Category=ital" class='grid-cell'>{data.termekek[termek].price} Ft</a>
               </div>
               <div class="inner-grid">
                  <a data-sveltekit-noscroll href="{termek}?Category=ital" class='grid-cell'><img src='favicon.png' alt=''></a>
                  <a data-sveltekit-noscroll href="{termek}?Category=ital" class='grid-cell'>{termek}</a>
                  <a data-sveltekit-noscroll href="{termek}?Category=ital" class='grid-cell'>{data.termekek[termek].price} Ft</a>
               </div>
               <div class="inner-grid">
                  <a data-sveltekit-noscroll href="{termek}?Category=ital" class='grid-cell'><img src='favicon.png' alt=''></a>
                  <a data-sveltekit-noscroll href="{termek}?Category=ital" class='grid-cell'>{termek}</a>
                  <a data-sveltekit-noscroll href="{termek}?Category=ital" class='grid-cell'>{data.termekek[termek].price} Ft</a>
               </div>
         <!-- Csak useless padding -->
               {/if}
            {/each}
         </div>
      {/if}

      {#if $navigation == 'Nasi'}
         <div in:fly={flyIn} out:fly={flyOut} class='grid-container'>
            {#each Object.keys(data.termekek) as termek}
               {#if data.termekek[termek].category == $navigation}
               <div class="inner-grid">
                  <a data-sveltekit-noscroll href="{termek}?Category=nasi" class='grid-cell'><img src='favicon.png' alt=''></a>
                  <a data-sveltekit-noscroll href="{termek}?Category=nasi" class='grid-cell'>{termek}</a>
                  <a data-sveltekit-noscroll href="{termek}?Category=nasi" class='grid-cell'>{data.termekek[termek].price} Ft</a>
               </div>
         <!-- Csak useless padding -->
               <div class="inner-grid">
                  <a data-sveltekit-noscroll href="{termek}?Category=nasi" class='grid-cell'><img src='favicon.png' alt=''></a>
                  <a data-sveltekit-noscroll href="{termek}?Category=nasi" class='grid-cell'>{termek}</a>
                  <a data-sveltekit-noscroll href="{termek}?Category=nasi" class='grid-cell'>{data.termekek[termek].price} Ft</a>
               </div>
               <div class="inner-grid">
                  <a data-sveltekit-noscroll href="{termek}?Category=nasi" class='grid-cell'><img src='favicon.png' alt=''></a>
                  <a data-sveltekit-noscroll href="{termek}?Category=nasi" class='grid-cell'>{termek}</a>
                  <a data-sveltekit-noscroll href="{termek}?Category=nasi" class='grid-cell'>{data.termekek[termek].price} Ft</a>
               </div>
               <div class="inner-grid">
                  <a data-sveltekit-noscroll href="{termek}?Category=nasi" class='grid-cell'><img src='favicon.png' alt=''></a>
                  <a data-sveltekit-noscroll href="{termek}?Category=nasi" class='grid-cell'>{termek}</a>
                  <a data-sveltekit-noscroll href="{termek}?Category=nasi" class='grid-cell'>{data.termekek[termek].price} Ft</a>
               </div>
         <!-- Csak useless padding -->
               {/if}
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

main {
      width: 100%;
      height: 100%;
      overflow-x: hidden; // Swipe-talantias
      overflow-y: scroll;
      position: fixed;

      .list-grid {
         display: grid;
         width: 100vw;

         .grid-container {
            // Using grid and grid-area 1/1 to force the inner divs into the same area. 
            // If you don't do this you get a bouncing effect where the incoming div is
            // pushed below the outgoing div and then 'pops up' jarringly.
            grid-area: 1/1;
            margin: 3%;
            margin-bottom: 100%;
            display: grid;
            row-gap: .6vh;

               .inner-grid {
                  display: grid;
                  grid-template-columns: 25% 25% 25% 25%;
                  background-color: #252525;
                  border-radius: 1em;

                  &:nth-of-type(2n) {
                     background-color: #161616;
                  }

                  .grid-cell {
                     display: flex;
                     justify-content: center;
                     align-items: center;
                     color: rgba(255, 255, 255, 0.9);
                     height: 90px;

                     &:nth-of-type(2n) {  // termek neve cell
                        grid-column-start: 2;
                        grid-column-end: 4;
                     }

                     img {
                        height: 100%;
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
