<script>
   import { cart } from "$lib/stores/Cart.js";
   import { slide, fade } from "svelte/transition";
   import { total } from "$lib/stores/Cart.js";

   export let data;


   if (localStorage.getItem('CartContent') != null) {
      $cart = JSON.parse(localStorage.getItem('CartContent'));
   }
   
   function recalculate() {
      $total = [0,0];
      for (let i = 0; i < Object.keys($cart).length; i++) {
         let cnt = $cart[Object.keys($cart)[i]];
         $total[1] += Number(cnt[1]); 
         $total[0] += Number(cnt[0])
      };
   }

   function urites() {
      localStorage.clear();
      $cart = {};
      $total = [0,0];
      history.back();
   };

   function subtractAmount(item) {
      if ($cart[item[0]][1] > 1) {
         let price = item[1][0] / item[1][1];
         $cart[item[0]][0] -= price;
         $cart[item[0]][1]--;
         recalculate();
         localStorage.setItem('CartContent', JSON.stringify($cart))
      } else {
         delete $cart[item[0]];
         $cart = $cart; // Muszaj reactivity miatt
         recalculate();
         localStorage.setItem('CartContent', JSON.stringify($cart));
         if (Object.keys($cart).length === 0) {
            localStorage.removeItem('CartContent');
            history.back()
         }
      }
   };

   function addAmount(item) {
      if ($cart[item[0]][1] < data.maxamount[item[0]]) {
         let price = item[1][0] / item[1][1];
         $cart[item[0]][0] += price;
         $cart[item[0]][1]++;
         recalculate();
         localStorage.setItem('CartContent', JSON.stringify($cart))
      };
   };

</script>

<main>
   <h1 style="color: white; font-size: xx-large;">kosár</h1>

   <div class="urites">
      <button on:click={urites}>Űrités</button>
   </div>

   {#key $total}
   <h1 in:fade="{{duration: 200}}" style="color: white; ">{$total[1]} db termék, összesen: {$total[0]} Ft</h1>
   {/key}
   
   <div in:slide class="kosar">
      {#each Object.entries($cart) as a}
      <div out:slide|local class="tartalom">
         <h2>{a[0]}</h2>
         <h3>{a[1][0]} Ft</h3>
         <div class="amount">
            <p on:click="{() => {subtractAmount(a)}}" id="p-first">-</p><h4>{a[1][1]} db</h4><p on:click="{() => {addAmount(a)}}">+</p>
         </div>
      </div>
      {/each}
   </div>

   <div class="vissza">
      <button on:click={() => {history.back();}}>Vissza</button>
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

   main {
      width: 100vw;
      height: 100vh;

      .kosar {
         padding-top: 2%;

         margin: 5% 0;
         text-align: center;
         outline: 0.1ch solid white;

         .tartalom {
            h2 {
            color: white;
            font-size: larger;
         }

         h3 {
            color: white;
            font-size: 2ch;
         }
         }

      }

      .amount {
         display: flex;
         margin-bottom: 5%;

         h4 {
            display: flex;
            justify-content: center;
            align-items: center;
            flex: 1%;
            color: white;
         }

         p {
            color: white;
            display: flex;
            align-items: center;
            flex: 1%;
            font-weight: bolder;
            font-size: x-large;
            user-select: none;
         }
         
         #p-first {
            justify-content: end;
         }
   }

      h1 {
         text-align: center;
         margin-top: 5%;
      }

      .urites {
         width: 100vw;

         button {
            display: block;
            border-radius: 50em;
            padding: 2em;
            color: white;
            background-color: #222222;
            margin: 0 auto;
            font-weight: bolder;
            margin-top: 5%;
         }
      }

      .vissza {
         width: 100vw;

         button {
            display: block;
            border-radius: 50em;
            padding: 2em;
            color: black;
            margin: 0 auto;
            font-weight: bolder;
         }
      }
   }
</style>
