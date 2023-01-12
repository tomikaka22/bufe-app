<script>
   import { page } from "$app/stores";
   import { goto } from "$app/navigation";
   import { fade } from "svelte/transition";
   import { cart, total } from "$lib/stores/Cart.js";
   import Topbar from '$lib/components/Topbar.svelte';
	import BottomButton from '$lib/components/BottomButton.svelte';

   export let data;
console.log(data)
   const item = $page.params.items;
   const darab = data.termekek.darab
   const description = data.termekek.leiras

   let tempcart = {[item] : [0,0]};
   $: amount = 1;
   $: price = data.termekek.ar * amount;

   if (localStorage.getItem('CartContent') != null) {
      $cart = JSON.parse(localStorage.getItem('CartContent'));
      tempcart = $cart;
      if (tempcart[item] == undefined) {
         tempcart[item] = [0,0]
      }
   }

   function addItem() {
      if (amount < darab - tempcart[item][1]) {
         amount++
      }
   };
   
   function subtractItem() {
      if (amount > 1) {
         amount--
      }
   };

   function buy() {
      if (tempcart[item][1] < darab) {
         $cart[item] = [tempcart[item][0] + price, tempcart[item][1] + amount];

         $total = [0,0]
         for (let i = 0; i < Object.keys($cart).length; i++) { // atmegy minden key-en a kosar obejtben
            let cnt = $cart[Object.keys($cart)[i]]; // cnt = kosar object i-ik eleme
            $total[1] += Number(cnt[1]);  // hozzaadja a kosar object i-ik kulcsanak az 1. tagjat (ár)
            $total[0] += Number(cnt[0])   // hozzaadja a kosar object i-ik kulcsanak a 2. tagjat (mennyiség)
         };

         localStorage.setItem('CartContent',JSON.stringify($cart));
         localStorage.setItem('Total',JSON.stringify($total));

         goto("/list?Category=".concat($page.url.searchParams.get('Category')))
      } else {
         alert(`Túl sok ${item} van már a kosárban!`)
      }
   };

</script>

<main in:fade={{duration: 180}}>

   <Topbar
      target={'Vissza'}
      targeturl={$page.url.searchParams.get('referrer')}
      text={''}
      background={'none'}
      hideProfile={0}
      flyin={0}
   ></Topbar>


	<div class="container">

	
		<div class="item-container">
			<h1>{item}</h1>
			{#key price}<h2 in:fade="{{duration: 200}}">{price} Ft</h2>{/key}
			<img src="favicon.png" alt="" />
			
			{#if darab != 0}
				<div class="grid-container">
					<div class="inner-grid">
						<div class="button-cell">
							<button on:click="{subtractItem}">➖</button>
						</div>
						{#key amount}<div in:fade="{{duration: 200}}" class="amount-cell">{amount}</div>{/key}
						<div class="button-cell">
							<button on:click="{addItem}">➕</button>
						</div>
					</div>
				</div>

				<h4>{description}</h4>

				<BottomButton
					text={'kosárba!'}
					action={buy}
				></BottomButton>
			
			{:else}
				<div class="grid-container">
					<div class="inner-grid">
						<div class="button-cell">
						</div>
						<div class="amount-cell elfogyott">Elfogyott</div>
						<div class="button-cell">
						</div>
					</div>
				</div>
			{/if}
		</div>
		
	{#if data.termekek.feltetek}
		<div class="feltet">
			<p>Feltétek</p>
		</div>
	{/if}
		
	</div>

</main>

<style lang="scss">

	.feltet {
		padding: 5%;
		color: white;

		p {
			font-size: larger;
			text-align: center;
		}
	}

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
		padding: 1em 0;
      color: white;
      text-align: center;
   }

   img {
      display: block;
      margin: auto;
      margin-top: 1ch;
      width: 70%;
   }

	.container {
		background-color: rgb(20, 20, 20);
		margin: 0 5%;
		border-radius: 2em;

		.item-container {
			background-color: var(--main-color);
			margin-top: 5%;
			border-radius: 2em;

			.grid-container {
				width: 100%;
				display: grid;
				justify-items: center;
				margin-top: 5%;

				.inner-grid {
					width: 85%;
					display: grid;
					grid-template-columns: auto 10% auto;
					align-items: center;
					justify-items: center;
					background-color: rgb(20, 20, 20);
					color: white;
					border-radius: 2em;

					button {
						border: 0;
						margin: 20% 0;
						padding: 1.5rem;
						border-radius: 1.5em;
					}

					.elfogyott {
						margin: 1.5rem;
					}

					.amount-cell {
						font-size: xx-large;
					}
				}
			}
		}
	}


</style>
