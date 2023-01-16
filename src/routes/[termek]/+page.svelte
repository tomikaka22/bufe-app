<script>
   import { page } from "$app/stores";
   import { goto } from "$app/navigation";
   import { fade } from "svelte/transition";
   import { cart, total } from "$lib/stores/Cart.js";
   import Topbar from '$lib/components/Topbar.svelte';
	import BottomButton from '$lib/components/BottomButton.svelte';

   export let data;

   const termek = data.termekek.termek;
   const darab = data.termekek.darab
   const description = data.termekek.leiras

   let tempcart = {[termek] : { 'ar': 0, 'darab': 0, 'feltet': [] }};
   $: amount = 1;
   $: price = data.termekek.ar * amount;

   if (localStorage.getItem('CartContent') != null) {
      $cart = JSON.parse(localStorage.getItem('CartContent'));
      tempcart = $cart;
      if (tempcart[termek] == undefined) {
         tempcart[termek] = { 'ar': 0, 'darab': 0, 'feltet': [] }
      }
   }

   function addItem() {
      if (amount < darab - tempcart[termek].darab) {
         amount++
      }
   };
   
   function subtractItem() {
      if (amount > 1) {
         amount--
      }
   };

   function buy() {
      if (tempcart[termek].darab < darab) {
			$cart[termek] = {'ar': tempcart[termek].ar + price, 'darab': tempcart[termek].darab + amount, 'feltet': tempcart[termek].feltet}

			Object.keys($cart).forEach(termek => {
				$total.ar += $cart[termek].ar
				$total.darab += $cart[termek].darab
			});

         localStorage.setItem('CartContent',JSON.stringify($cart));
         localStorage.setItem('Total',JSON.stringify($total));

         goto("/list?Category=".concat($page.url.searchParams.get('Category')))
      } else {
         alert(`Túl sok ${termek} van már a kosárban!`)
      }
   };

	function feltetChange(feltet,feltetAr,feltetDarab) {
		if (tempcart[termek].feltet.includes(feltet)) {
			tempcart[termek].feltet = tempcart[termek].feltet.filter(item => item != feltet)
			price -= Number(feltetAr)
		} else {
			tempcart[termek].feltet = [ ...tempcart[termek].feltet, feltet] 
			price += Number(feltetAr)
		}
	}

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
		<div class="termek-container">
			<h1>{termek}</h1>
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
		<div class="feltetek">
			<p id="feltetek">Feltétek:</p>

			<div class="feltet-container">
				{#each Object.keys(data.termekek.feltetek) as feltet}
					<div class="feltet-cell feltet">{feltet}</div>
					<div class="feltet-cell check"><input on:change={() => {feltetChange(feltet,data.termekek.feltetek[feltet].ar,data.termekek.feltetek[feltet].darab)}} type="checkbox" name="{feltet}"></div>
					<div class="feltet-cell ar">{data.termekek.feltetek[feltet].ar} Ft</div>
				{/each}
			</div>
		</div>
	{/if}
		
	</div>

</main>

<style lang="scss">

.feltetek {
	padding-bottom: .5rem;

	p {
		color: white;
		text-align: center;
		margin-top: 1rem;
		margin-bottom: .5rem;
	}
}

.feltet-container {
		display: grid;
		grid-template-columns: 49% auto 49%;
		margin: 0 5%;
		color: white;
		border-radius: 1em;
		overflow: hidden;
		text-align: center;
		font-size: larger;

		&:last-of-type {
			margin-bottom: 6%;
		}

		.feltet-cell {
			background-color: var(--main-color);
			padding: .5em 0;
		}

		.feltet {
			&:nth-of-type(even) {
				background-color: #141414;
			}
		}

		.check {
			&:nth-of-type(odd) {
				background-color: #141414;
			}
		}

		.ar {
			&:nth-of-type(even) {
				background-color: #141414;
			}
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

		.termek-container {
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
