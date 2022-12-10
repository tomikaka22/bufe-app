<script>
   import { page } from "$app/stores";
   import { goto } from "$app/navigation";
   import { fade } from "svelte/transition";
   import { cart } from "$lib/stores/Cart.js";
   import Topbar from '$lib/components/Topbar.svelte';

   export let data;
   const item = $page.params.items;
   const maxamount = data.termekek[item].maxamount
   const description = data.termekek[item].description

   let tempcart = {[item] : [0,0]};
   $: amount = 1;
   $: price = data.termekek[item].price * amount;

   if (localStorage.getItem('CartContent') != null) {
      $cart = JSON.parse(localStorage.getItem('CartContent'));
      tempcart = $cart;
      if (tempcart[item] == undefined) {
         tempcart[item] = [0,0]
      }
   }

   function addItem() {
      if (amount < maxamount - tempcart[item][1]) {
         amount++
      }
   };
   
   function subtractItem() {
      if (amount > 1) {
         amount--
      }
   };

   function buy() {
      if (tempcart[item][1] < maxamount) {
         $cart[item] = [tempcart[item][0] + price, tempcart[item][1] + amount];
         localStorage.setItem('CartContent',JSON.stringify($cart));
         goto("/list?Category=".concat($page.url.searchParams.get('Category')))
      } else {
         alert(`Túl sok ${item} van már a kosárban!`)
      }
   };

</script>

<main>

   <Topbar
      target={'Vissza'}
      targeturl={`/list?Category=${$page.url.searchParams.get('Category')}`}
      text={''}
      background={'none'}
      hideProfile={0}
   ></Topbar>

   <h1>{item}</h1>
   {#key price}<h2 in:fade="{{duration: 200}}">{price} Ft</h2>{/key}
   <h4>{description}</h4>
   <div class="image"><img src="favicon.png" alt="" /></div>

{#if maxamount != 0}
   <div class="amount">
      <h1 on:click="{subtractItem}">-</h1>{#key amount}<h2 in:fade="{{duration: 200}}">{amount}</h2>{/key}<h1 on:click="{addItem}">+</h1>
   </div>

   <button on:click="{buy}" class="kosar">Kosárba</button>

{:else}
   <div style="margin-top: 5vh;" class="amount">
      <h1>-</h1><h2>Elfogyott</h2><h1>+</h1>
   </div>
{/if}

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
	}

   /* ----------------------------------------- */

   h1 {
      text-align: center;
      color: white;
      padding: 1ch;
      padding-bottom: 0;
      font-size: xx-large;
   }

   h2 {
      text-align: center;
      color: white;
      padding: .5ch;
      font-size: x-large;
   }

   h4 {
      color: white;
      text-align: center;
   }

   img {
      display: block;
      margin: auto;
      margin-top: 1ch;
      width: 70%;
   }

   .amount {
      display: flex;
      height: auto;
      width: auto;
      margin: 0 5vw;
      margin-top: 8%;

      h1 {
         background-color: white;
         color: black;
         border-radius: 30px;
         padding: 25px;
         transform: scale(80%);
      }

      h2 {
         color: white;
         font-size: xx-large;
      }

      * {
         display: flex;
         justify-content: center;
         align-items: center;
         flex: 33.3%;
         user-select: none;
      }
   }

   .kosar {
         display: block;
         margin: 0 auto;
         margin-top: 5%;
         padding: 25px;
         font-size: x-large;
         border-radius: 25px;
         background-color: var(--accent-color);
         border: none;
      }
</style>
