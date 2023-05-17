<script>
   import { page } from '$app/stores';
   import { goto } from '$app/navigation';
   import { fade } from 'svelte/transition';
   import { cart, total } from '$lib/stores/Cart.js';
	import { touchRadius } from '$lib/frontendUtils/touchRadius.js';
   import Topbar from '$lib/components/Topbar.svelte';

   export let data;

   const termek = data.termekek.termek;
   const maxAmount = data.termekek.darab;

	let totalDarab = 0; // eddigi hozzaadott termekek + darab
   let darab = 1;
   $: price = data.termekek.ar * darab + feltetek.map((feltet => { return Number(data.termekek.feltetek[feltet].ar); })).reduce((a, b) => a + b, 0) * darab; // 1 db termék ára szorozva darabbal, feltétek árának összege szorozva darabbal
	let feltetek = [];

	if (localStorage.getItem('CartContent')) {
		$cart = JSON.parse(localStorage.getItem('CartContent'));
		if ($cart[termek])
			$cart[termek].forEach(x => {
				totalDarab += x.darab;
			});
	}

	function subtractAmount() {
		if (darab > 1) {
			darab--;
			totalDarab--;
		}
	}

	function addAmount() {
		if (totalDarab+1 < maxAmount) {
			darab++;
			totalDarab++;
		}
	}

	function feltetChange(feltet) {
		if (feltetek.includes(feltet)) {
			feltetek = feltetek.filter(item => item !== feltet);
		} else {
			feltetek = [ ...feltetek, feltet ];
		}
		feltetek.sort();
	}

	function buy() {
		if (totalDarab < maxAmount) {
			let alreadyInCart = false;
			if ($cart[termek]) {
				$cart[termek].forEach((x, i) => {	// Ha már van egy ugyanilyen termék ugyanilyen feltétekkel akkor összevonja a kettő rendelést és növeli a darabszámát, árát
					if (JSON.stringify(x.feltet) === JSON.stringify(feltetek)) {
						$cart[termek][i].darab += darab;
						$cart[termek][i].ar += price;
						alreadyInCart = true;
					}
				});
			}
			if (!alreadyInCart)	// Hozzáadja a terméket a kosárhoz ha nincs benne ugyanilyen feltétekkel rendelkező termék.
				$cart[termek] = $cart[termek] ? [ ...$cart[termek], { 'ar': price, darab, 'feltet': feltetek } ] : [ { 'ar': price, darab, 'feltet': feltetek } ];

			$total = { 'ar': 0, 'darab': 0 };	// Kosár total újraszámolása
			Object.keys($cart).forEach(termek => {
				$cart[termek].forEach(x => {
					$total.ar += x.ar;
					$total.darab += x.darab;
				});
			});

			localStorage.setItem('CartContent',JSON.stringify($cart));
			localStorage.setItem('Total',JSON.stringify($total));

			goto('/list?Category='.concat($page.url.searchParams.get('Category')));
		} else {
			alert(`Túl sok ${termek} van már a kosárban!`);
		}

	}

</script>

<main in:fade={{ duration: 180 }}>

   <Topbar
      target={'Vissza'}
      targeturl={$page.url.searchParams.get('referrer')}
      text={''}
      background={'none'}
      hideProfile={0}
      flyin={0}
   ></Topbar>

	<div class="px-6">
		<div>
			<h1 class="text-primary text-center mb-2 text-xl font-semibold">{termek}</h1>
			<div class="flex justify-center">
				<div class="w-10/12">
					<img class="w-full h-full rounded-3xl transition-all" src="{termek}.jpg" alt="" on:click={(e) => {touchRadius(e.target, '1rem', '1.5rem');}} on:error={img => {img.target.src='favicon.png';}}>
				</div>
			</div>

			<h4 class="my-2 text-center font-semibold">{data.termekek.leiras}</h4>

	{#if maxAmount}
		<div class="flex w-full justify-center">
			<div class="my-5 flex justify-center items-center text-3xl rounded-2xl">
				<div class="bg-secondary flex justify-center items-center rounded-2xl w-16 text-on-secondary transition-all" on:click="{(e) => {subtractAmount(); touchRadius(e.target.parentElement, '0.5rem', '1rem', 40);}}">
					<button class="p-3 px-5">-</button>
				</div>
				<div class="px-5 py-2 text-tertiary">{#key darab}<span in:fade="{{ duration: 200 }}">{darab}</span>{/key}</div>
				<div class="bg-secondary flex justify-center items-center rounded-2xl w-16 text-on-secondary transition-all" on:click="{(e) => {addAmount(); touchRadius(e.target.parentElement, '0.5rem', '1rem', 40);}}">
					<button class="p-3 px-5">+</button>
				</div>
			</div>
		</div>

		{#key price}
			<div class="flex w-full mt-1 justify-center items-center">
				<div class="outline outline-tertiary outline-1 rounded-lg px-5 font-semibold text-lg py-1" on:click={(e) => {touchRadius(e.target, '0.3rem', '0.5rem');}}>
					<h2 class="font-semibold text-on-tertiary-container" in:fade="{{ duration: 200 }}">{price} Ft</h2>
				</div>
			</div>
		{/key}

		{#if data.termekek.feltetek}
			<div class="flex w-full justify-center">
				<div class="w-10/12 rounded-2xl mt-5 mb-32 transition-all">
					<p class="text-center my-1 font-semibold">Feltétek</p>
					<div>
						{#each Object.keys(data.termekek.feltetek) as feltet}
							<div class:active={feltetek.includes(feltet)} class="flex justify-between mx-2 mb-2 outline outline-1 outline-outlin rounded-xl p-2 transition-all" on:click={() => {feltetChange(feltet);}}>
								<div>{feltet}</div> <div class:ar={feltetek.includes(feltet)} class="text-on-tertiary-container">{data.termekek.feltetek[feltet].ar} Ft</div>
							</div>
						{/each}
					</div>
				</div>
			</div>
		{/if}
	{:else}
		<div class="flex w-full mt-5 justify-center items-center">
			<div class="text-lg transition-all bg-on-error text-error rounded-xl py-2 px-10 font-semibold">
				<div>Elfogyott</div>
			</div>
		</div>
	{/if}

		<div class="w-full fixed bottom-6 left-0 flex justify-center">
			<button on:click={buy} style="box-shadow: 0px 0px 5px 2px #2b221d;" class="w-full shadow-background bg-primary-container text-on-secondary-container font-semibold transition-all py-2 px-10 mx-5 rounded-3xl text-lg hover:bg-primary hover:text-on-primary hover:rounded-lg">kosárba</button>
		</div>

	</div>

</main>

<style lang="postcss">
	.active {
		background-color: #4b481d;
		color: #eae5ab;
		outline: none;
		border-radius: .5rem;
		@apply font-semibold;
	}

	.ar {
		@apply text-secondary;
	}
</style>