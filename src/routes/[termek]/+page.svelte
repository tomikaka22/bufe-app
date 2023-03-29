<script>
   import { page } from '$app/stores';
   import { goto } from '$app/navigation';
   import { fade } from 'svelte/transition';
   import { cart, total } from '$lib/stores/Cart.js';
	import { touchRadius } from '$lib/frontendUtils/touchRadius.js';
   import Topbar from '$lib/components/Topbar.svelte';

   export let data;

   const termek = data.termekek.termek;
   const darab = data.termekek.darab;
   const description = data.termekek.leiras;

   let tempcart = { [termek] : { 'ar': 0, 'darab': 0, 'feltet': [] } };
   $: amount = 1;
   $: price = data.termekek.ar * amount;

	if (localStorage.getItem('CartContent') != null) {
		$cart = JSON.parse(localStorage.getItem('CartContent'));
		tempcart = $cart;
		if (tempcart[termek] === undefined) {
			tempcart[termek] = { 'ar': 0, 'darab': 0, 'feltet': [] };
		}
	}

	function addItem() {
		if (amount < darab - tempcart[termek].darab) {
			amount++;
		}
	}

	function subtractItem() {
		if (amount > 1) {
			amount--;
		}
	}

	function buy() {
		if (tempcart[termek].darab < darab) {
			$cart[termek] = { 'ar': tempcart[termek].ar + price, 'darab': tempcart[termek].darab + amount, 'feltet': tempcart[termek].feltet };

			$total = { 'ar': 0, 'darab': 0 };
			Object.keys($cart).forEach(termek => {
				$total.ar += $cart[termek].ar;
				$total.darab += $cart[termek].darab;
			});

			localStorage.setItem('CartContent',JSON.stringify($cart));
			localStorage.setItem('Total',JSON.stringify($total));

			goto('/list?Category='.concat($page.url.searchParams.get('Category')));
		} else {
			alert(`Túl sok ${termek} van már a kosárban!`);
		}
	}

	function feltetChange(feltet,feltetAr) {
		if (tempcart[termek].feltet.includes(feltet)) {
			tempcart[termek].feltet = tempcart[termek].feltet.filter(item => item !== feltet);
			price -= Number(feltetAr);
		} else {
			tempcart[termek].feltet = [ ...tempcart[termek].feltet, feltet ];
			price += Number(feltetAr);
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
					<img class="w-full h-full rounded-3xl transition-all" src="{termek}.jpg" alt="" on:click={(e) => {touchRadius(e.target, '1rem', '1.5rem');}}>
				</div>
			</div>

			<h4 class="my-2 text-center font-semibold">{description}</h4>

			<!-- {#if data.termekek.feltetek}
			<div class="flex w-full justify-center items-center">
				<div>
					<p>Feltétek:</p>
					<div>
						{#each Object.keys(data.termekek.feltetek) as feltet}
							<div>{feltet}</div>
							<div><input on:change={() => {feltetChange(feltet,data.termekek.feltetek[feltet].ar,data.termekek.feltetek[feltet].darab)}} type="checkbox" name="{feltet}"></div>
							<div>{data.termekek.feltetek[feltet].ar} Ft</div>
						{/each}
					</div>
				</div>
			</div>
		{/if} -->

		{#if darab !== 0}
		<div class="flex w-full justify-center">
			<div class="my-5 flex justify-center items-center text-on-secondary-container text-3xl rounded-2xl">
				<div class="bg-primary flex justify-center items-center rounded-2xl w-16 text-on-primary transition-all" on:click="{(e) => {subtractItem(); touchRadius(e.target.parentElement, '0.5rem', '1rem', 40);}}">
					<button class="p-3 px-5">-</button>
				</div>
				<div class="px-5 py-2 text-tertiary">{#key amount}<span in:fade="{{ duration: 200 }}">{amount}</span>{/key}</div>
				<div class="bg-primary flex justify-center items-center rounded-2xl w-16 text-on-primary transition-all" on:click="{(e) => {addItem(); touchRadius(e.target.parentElement, '0.5rem', '1rem', 40);}}">
					<button class="p-3 px-5">+</button>
				</div>
			</div>
		</div>

	{:else}
		<div class="flex w-full mt-5 justify-center items-center">
			<div class="text-lg transition-all bg-on-error text-error rounded-xl py-2 px-10 font-semibold">
				<div>Elfogyott</div>
			</div>
		</div>
	{/if}

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
							<div class="flex justify-between mx-2 mb-2 outline outline-1 outline-outline rounded-xl p-2 transition-all" class:active={tempcart[termek].feltet.includes(feltet)} on:click={() => {feltetChange(feltet,data.termekek.feltetek[feltet].ar,data.termekek.feltetek[feltet].darab);}}>
								<div>{feltet}</div> <div class:ar={tempcart[termek].feltet.includes(feltet)} class="text-on-tertiary-container">{data.termekek.feltetek[feltet].ar} Ft</div>
							</div>
						{/each}
					</div>
				</div>
			</div>
		{/if}

		<div class="w-full fixed bottom-6 left-0 flex justify-center">
			<button style="box-shadow: 0px 0px 5px 2px #2b221d;" class="w-full shadow-background bg-primary-container text-on-secondary-container font-semibold transition-all py-2 px-10 mx-5 rounded-3xl text-lg hover:bg-primary hover:text-on-primary hover:rounded-lg" on:click={buy}>kosárba</button>
		</div>

	</div>

</main>

<style lang="postcss">
	.active {
		background-color: #4b481d;
		color: #eae5ab;
		outline: none;
		border-radius: .5rem;
	}

	.ar {
		color: #ffdbca;
	}
</style>