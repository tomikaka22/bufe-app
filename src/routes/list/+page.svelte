<script>
   import { fly } from 'svelte/transition';
   import { page } from '$app/stores';
   import { browser } from '$app/environment';
   import { cart, total } from '$lib/stores/Cart.js';
   import Topbar from '$lib/components/Topbar.svelte'

   export let data;
   let navigation = $page.url.searchParams.get('Category');
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


     // refakotorert konyorog innentol a kod
   if (navigation == undefined) {
      navigation = 'Étel'
   };

   function AnimationDirection(tab) {
   	if (tab == 'Étel') {
         flyIn={x: -innerWidth, duration: 500};
         flyOut={x: innerWidth, duration: 500};
         navigation = tab
      };
      if (tab == 'Nasi') {
         flyIn={x: innerWidth, duration: 500};
         flyOut={x: -innerWidth, duration: 500};
         navigation = tab
      };
      if (tab == 'Ital') {
         if (navigation == 'Étel') {
            flyIn={x: innerWidth, duration: 500};
            flyOut={x: -innerWidth, duration: 500};
            navigation = tab
         };
         if (navigation == 'Nasi') {
            flyIn={x: -innerWidth, duration: 500};
            flyOut={x: innerWidth, duration: 500};
            navigation = tab
         }
      }
   };
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
      target={'Vissza'}
      targeturl={'/'}
   ></Topbar>

   <div class='outer-div'>
      {#if navigation == 'Étel'}
         <div in:fly={flyIn} out:fly={flyOut} class='inner-div'>
            <div class='grid-container'>
               {#each Object.entries(data.termek.prices) as _}
                  <a href="Szaros Étel?Category=Étel" class='grid-cell-icon lite'><img src='favicon.png' alt=''></a>
                  <a href="Szaros Étel?Category=Étel" class='grid-cell-text lite'>Szaros Étel</a>
                  <a href="Szaros Étel?Category=Étel" class='grid-cell-price lite'>{data.termek.prices['Szaros Étel']} Ft</a>
                  <a href="Marhahúsos Étel?Category=Étel" class='grid-cell-icon'><img src='favicon.png' alt=''></a>
                  <a href="Marhahúsos Étel?Category=Étel" class='grid-cell-text'>Marhahúsos Étel</a>
                  <a href="Marhahúsos Étel?Category=Étel" class='grid-cell-price'>{data.termek.prices['Marhahúsos Étel']} Ft</a>
               {/each}
            </div>
         </div>
      {/if}
      {#if navigation == 'Ital'}
         <div in:fly={flyIn} out:fly={flyOut} class='inner-div'>
            <div class='grid-container'>
               {#each Object.entries(data.termek.prices) as _}
                  <a href="Hell?Category=Ital" class='grid-cell-icon lite'><img src='favicon.png' alt=''></a>
                  <a href="Hell?Category=Ital" class='grid-cell-text lite'>Hell</a>
                  <a href="Hell?Category=Ital" class='grid-cell-price lite'>{data.termek.prices['Hell']} Ft</a>
                  <a href="Xixo?Category=Ital" class='grid-cell-icon'><img src='favicon.png' alt=''></a>
                  <a href="Xixo?Category=Ital" class='grid-cell-text'>Xixo</a>
                  <a href="Xixo?Category=Ital" class='grid-cell-price'>{data.termek.prices['Xixo']} Ft</a>
               {/each}
            </div>
         </div>
      {/if}
      {#if navigation == 'Nasi'}
      <div in:fly={flyIn} out:fly={flyOut} class='inner-div'>
				<div class='grid-container'>
               {#each Object.entries(data.termek.prices) as _}
                  <a href="Chips?Category=Nasi" class='grid-cell-icon lite'><img src='favicon.png' alt=''></a>
                  <a href="Chips?Category=Nasi" class='grid-cell-text lite'>Chips</a>
                  <a href="Chips?Category=Nasi" class='grid-cell-price lite'>{data.termek.prices['Chips']} Ft</a>
                  <a href="Mogyi?Category=Nasi" class='grid-cell-icon'><img src='favicon.png' alt=''></a>
                  <a href="Mogyi?Category=Nasi" class='grid-cell-text'>Mogyi</a>
                  <a href="Mogyi?Category=Nasi" class='grid-cell-price'>{data.termek.prices['Mogyi']} Ft</a>
               {/each}
				</div>
			</div>
      {/if}
   </div>

{#if cartshow}
<div in:fly={{y: 100}} style='margin-bottom: 6.5vh;' class='nav'>
   <div class='Étel' on:click={() => {AnimationDirection('Étel')}}><p class:active='{navigation == 'Étel'}'>Étel</p></div>
   <div class='Ital' on:click={() => {AnimationDirection('Ital')}}><p class:active='{navigation == 'Ital'}'>Ital</p></div>
   <div class='Nasi' on:click={() => {AnimationDirection('Nasi')}}><p class:active='{navigation == 'Nasi'}'>Nasi</p></div>
</div>

<a href="kosar">
   <div in:fly={{y: 100, delay: 100}} class='cart'>
      <div class='flex-container'>
         <img id='basket' src='shopping-basket.png' alt=''>
         <p><b>{$total[0]} Ft</b>({$total[1]} db termék a kosárban.)</p>
      </div>
   </div>
</a>

{:else}
<div in:fly={{y: 200}} class='nav'>
   <div class='Étel' on:click={() => {AnimationDirection('Étel')}}><p class:active='{navigation == 'Étel'}'>Étel</p></div>
   <div class='Ital' on:click={() => {AnimationDirection('Ital')}}><p class:active='{navigation == 'Ital'}'>Ital</p></div>
   <div class='Nasi' on:click={() => {AnimationDirection('Nasi')}}><p class:active='{navigation == 'Nasi'}'>Nasi</p></div>
</div>
{/if}


</main>

<style lang='scss'>

   // ------------------------------------------

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
      width: 100%;
      height: 100%;
      overflow-x: hidden; // Swipe-talantias
      overflow-y: scroll;
      position: fixed;

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
         position: sticky;
         bottom: 0;
         background-color: var(--accent-color);
         box-shadow: 0px -3px 7px 1px rgba(0,0,0,0.74);
         padding: .5em;
         border-top-left-radius: 2.8em;
         border-top-right-radius: 2.8em;
         margin: 0 2%;

         .flex-container {
            display: flex;
            // width: 100%;
            height: 6vh;
            justify-content: center;

            #basket {
               margin-bottom: 1vh;
            }

            p {
               display: flex;
               align-items: center;
               color: black;
               margin-left: .6ch;

               b {
                  margin-right: 1ch;
                  font-size: large;
               }
            }
         }
      }

      .outer-div {
         display: grid;
         width: 100vw;
         
         .inner-div {
            // Using grid and grid-area 1/1 to force the inner divs into the same area. 
            // If you don't do this you get a bouncing effect where the incoming div is
            // pushed below the outgoing div and then 'pops up' jarringly.
            grid-area: 1/1;

            .grid-container {
               display: grid;
               grid-template-columns: 25% 25% 25% 25%;
               margin: 3%;
               margin-bottom: 30%;

               a {
                  display: flex;
                  justify-content: center;
                  align-items: center;
						background-color: #161616;
						color: white;
                  margin-bottom: .6vh;
               }

               .grid-cell-price {
                  justify-content: center;
                  font-size: 90%;
                  color: white;
                  border-top-right-radius: 12px;
                  border-bottom-right-radius: 12px;
               }

               .grid-cell-text {
                  grid-column-start: 2;
                  grid-column-end: 4;
               }

               .grid-cell-icon {
                  border-top-left-radius: 12px;
                  border-bottom-left-radius: 12px;
                  
                  img {
                     width: 100%;
                     display: block;
                     margin: auto;
                  }
               }

               .lite {
                  background-color: #252525;
               }
            }
         }
      }
   }



	// Animation -------------------------------------------------



 </style>
