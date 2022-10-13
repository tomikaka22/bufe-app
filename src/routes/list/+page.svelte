<script>
   import { swipe } from "svelte-gestures";
   import { fly } from "svelte/transition";
   import { goto } from "$app/navigation"
   import { page } from "$app/stores";
   import { browser } from "$app/environment";
   import { cart, total } from "$lib/stores/Cart.js";

   export let data;
   let navigation = $page.url.searchParams.get('Category');
   let innerWidth;
   let cartshow = 0;

   if (browser) {
      if (localStorage.getItem('CartContent') != null) {
         cartshow = 1;
         $cart = JSON.parse(localStorage.getItem('CartContent'));
         // Kosar szamitas -- hacky, minden homepage latogatasnal urja szamolja. Nem tudom hogy mennyire expnesive a szamolas, lehet jobb lenne elraktarozni, lehet nem.
         $total = [0,0]
         for (let i = 0; i < Object.keys($cart).length; i++) {
            let cnt = $cart[Object.keys($cart)[i]];
            $total[1] += Number(cnt[1]); 
            $total[0] += Number(cnt[0])
         };
      };
   }

   $: flyIn={x: innerWidth, duration: 500};
   $: flyOut={x: -innerWidth, duration: 500};
     // Needed to be reactive because x is undefined on first render

   if (navigation == undefined) {
      navigation = "Étel"
   }

   function AnimationDirection(tab) {
   	if (tab == "Étel") {
         flyIn={x: -innerWidth, duration: 500};
         flyOut={x: innerWidth, duration: 500};
         navigation = tab
      };
      if (tab == "Nasi") {
         flyIn={x: innerWidth, duration: 500};
         flyOut={x: -innerWidth, duration: 500};
         navigation = tab
      };
      if (tab == "Ital") {
         if (navigation == "Étel") {
            flyIn={x: innerWidth, duration: 500};
            flyOut={x: -innerWidth, duration: 500};
            navigation = tab
         };
         if (navigation == "Nasi") {
            flyIn={x: -innerWidth, duration: 500};
            flyOut={x: innerWidth, duration: 500};
            navigation = tab
         }
      }
   };

	function AnimationDirectionSwipe(event) {
		if (navigation == "Ital") {
			if (event.detail.direction == "left") {
				flyIn={x: innerWidth, duration: 500};
         	flyOut={x: -innerWidth, duration: 500};
				navigation="Nasi"
			}
			if (event.detail.direction == "right") {
				flyIn={x: -innerWidth, duration: 500};
         	flyOut={x: innerWidth, duration: 500};
				navigation="Étel"
			}
		}
		if (navigation == "Étel") {
			if (event.detail.direction == "left") {
				flyIn={x: innerWidth, duration: 500};
         	flyOut={x: -innerWidth, duration: 500};
				navigation="Ital"
			}
		}
		if (navigation == "Nasi") {
			if (event.detail.direction == "right") {
				flyIn={x: -innerWidth, duration: 500};
         	flyOut={x: innerWidth, duration: 500};
				navigation = "Ital"
			}
		}
	}
</script>

<!-- Binds the innerWidth variable to the width of the monitor to give a more fluid motion -->
<svelte:window bind:innerWidth />
<!-- Above is equivalent to below, shortcut for binding when you make them the same name -->
<!-- <svelte:window bind:innerWidth={innerWidth} /> -->

<main use:swipe={{ timeframe: 800, minSwipeDistance: 50, touchAction: 'pan-y' }} on:swipe={AnimationDirectionSwipe}>

   <div in:fly={{y: -200}} class="header">
      <img class="favicon" src="favicon.png" alt="">
      <p>Büfé - app</p>
      <img on:click="{() => {goto('/')}}" class="account" src="account.png" alt="">
   </div>

   <div class="outer-div">
      {#if navigation == "Étel"}
         <div in:fly={flyIn} out:fly={flyOut} class="inner-div">
            <div class="grid-container">
               {#each Object.entries(data.prices) as _}
                  <div on:click="{() => {goto('Szaros Étel?Category=Étel')}}" class="grid-cell-icon lite"><img src="favicon.png" alt=""></div>
                  <div on:click="{() => {goto('Szaros Étel?Category=Étel')}}" class="grid-cell-text lite">Szaros Étel</div>
                  <div on:click="{() => {goto('Szaros Étel?Category=Étel')}}" class="grid-cell-price lite">{data.prices["Szaros Étel"]} Ft</div>
                  <div on:click="{() => {goto('Marhahúsos Étel?Category=Étel')}}" class="grid-cell-icon"><img src="favicon.png" alt=""></div>
                  <div on:click="{() => {goto('Marhahúsos Étel?Category=Étel')}}" class="grid-cell-text">Marhahúsos Étel</div>
                  <div on:click="{() => {goto('Marhahúsos Étel?Category=Étel')}}" class="grid-cell-price">{data.prices["Marhahúsos Étel"]} Ft</div>
               {/each}
            </div>
         </div>
      {/if}
      {#if navigation == "Ital"}
         <div in:fly={flyIn} out:fly={flyOut} class="inner-div">
            <div class="grid-container">
               {#each Object.entries(data.prices) as _}
                  <div on:click="{() => {goto('hell?Category=Ital')}}" class="grid-cell-icon lite"><img src="favicon.png" alt=""></div>
                  <div on:click="{() => {goto('hell?Category=Ital')}}" class="grid-cell-text lite">hell</div>
                  <div on:click="{() => {goto('hell?Category=Ital')}}" class="grid-cell-price lite">{data.prices["hell"]} Ft</div>
                  <div on:click="{() => {goto('szikszo?Category=Ital')}}" class="grid-cell-icon"><img src="favicon.png" alt=""></div>
                  <div on:click="{() => {goto('szikszo?Category=Ital')}}" class="grid-cell-text">szikszo</div>
                  <div on:click="{() => {goto('szikszo?Category=Ital')}}" class="grid-cell-price">{data.prices["szikszo"]} Ft</div>
               {/each}
            </div>
         </div>
      {/if}
      {#if navigation == "Nasi"}
      <div in:fly={flyIn} out:fly={flyOut} class="inner-div">
				<div class="grid-container">
               {#each Object.entries(data.prices) as _}
                  <div on:click="{() => {goto('csipsz?Category=Nasi')}}" class="grid-cell-icon lite"><img src="favicon.png" alt=""></div>
                  <div on:click="{() => {goto('csipsz?Category=Nasi')}}" class="grid-cell-text lite">csipsz</div>
                  <div on:click="{() => {goto('csipsz?Category=Nasi')}}" class="grid-cell-price lite">{data.prices["csipsz"]} Ft</div>
                  <div on:click="{() => {goto('mogyi?Category=Nasi')}}" class="grid-cell-icon"><img src="favicon.png" alt=""></div>
                  <div on:click="{() => {goto('mogyi?Category=Nasi')}}" class="grid-cell-text">mogyi</div>
                  <div on:click="{() => {goto('mogyi?Category=Nasi')}}" class="grid-cell-price">{data.prices["mogyi"]} Ft</div>
               {/each}
				</div>
			</div>
      {/if}
   </div>

{#if cartshow}
<div in:fly={{y: 100}} style="margin-bottom: 6.5vh;" if class="nav">
   <div class="Étel" on:click={() => {AnimationDirection("Étel")}}><p class:active="{navigation == "Étel"}">Étel</p></div>
   <div class="Ital" on:click={() => {AnimationDirection("Ital")}}><p class:active="{navigation == "Ital"}">Ital</p></div>
   <div class="Nasi" on:click={() => {AnimationDirection("Nasi")}}><p class:active="{navigation == "Nasi"}">Nasi</p></div>
</div>

<div in:fly={{y: 100, delay: 100}} on:click="{() => {goto('kosar')}}" class="cart">
   <div class="flex-container">
      <img id="basket" src="shopping-basket.png" alt="">
      <p><b>{$total[0]} Ft</b>({$total[1]} db termék a kosárban.)</p>
      <img id="open" src="external-link-icon_6.webp" alt="">
   </div>
</div>
{:else}
<div in:fly={{y: 200}} if class="nav">
   <div class="Étel" on:click={() => {AnimationDirection("Étel")}}><p class:active="{navigation == "Étel"}">Étel</p></div>
   <div class="Ital" on:click={() => {AnimationDirection("Ital")}}><p class:active="{navigation == "Ital"}">Ital</p></div>
   <div class="Nasi" on:click={() => {AnimationDirection("Nasi")}}><p class:active="{navigation == "Nasi"}">Nasi</p></div>
</div>
{/if}



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
	}

   /* ----------------------------------------- */

main {
      width: 100%;
      height: 100%;
      overflow-y: scroll;
      position: fixed;
      
      .header {
         width: 100%;
         height: auto;
         display: flex;
         background-color: #252525;
         margin-bottom: 10%;
         border-top-left-radius: 12px;
         border-bottom-left-radius: 12px;
         border: .25em solid black;


         .favicon {
            width: 15%;
            height: 100%;
            float: left;
            display: block;
         }

         p {
            text-align: left;
            align-self: center;
            color: white;
            height: 100%;
            font-weight: bolder;
         }

         .account {
            text-align: right;
            align-self: center;
            width: 10%;
            filter: invert(88%);
            margin: 0 auto;
            margin-right: 3%;
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
            background-color: white;
            border-radius: 20px;
            color: black;
            transition: all .25s ease-in-out;
         }
   }
      
      .cart {
         position: sticky;
         bottom: 0;
         background-color: #2e2e2e;
         box-shadow: 0px -3px 7px 1px rgba(0,0,0,0.74);
         padding: .5em;

         .flex-container {
            display: flex;
            width: 100vw;
            height: 6vh;
            
            #basket {
               display: flex;
               filter: invert(100%);
               transform: scale(80%);
               align-items: center;
               margin-bottom: .8vh;
            }

            p {
               display: flex;
               align-items: center;
               color: white;
               margin-left: .6ch;

               b {
                  margin-right: 1ch;
                  font-size: large;
               }
            }

            #open {
               display: block;
               margin-left: auto;
               margin-right: 1.2ch;
               transform: scale(50%);
               opacity: 50%;
               margin-bottom: .7vh;
            }
         }
      }

      .outer-div {
         display: grid;
         width: 100vw;
         
         .inner-div {
            // Using grid and grid-area 1/1 to force the inner divs into the same area. 
            // If you don't do this you get a bouncing effect where the incoming div is
            // pushed below the outgoing div and then "pops up" jarringly.
            grid-area: 1/1;	

            .grid-container {
               display: grid;
               grid-template-columns: 25vw auto auto 15.2vw;
               // margin: .5%;
               margin-bottom: 30%;

               div {
                  display: flex;
                  justify-content: center;
                  align-items: center;
						background-color: #161616;
						color: white;
                  margin-bottom: .6vh;
               }

               .grid-cell-price {
                  justify-content: left;
                  font-style: Italic;
                  font-size: 80%;
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
