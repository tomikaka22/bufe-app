<script>
   import { fade } from 'svelte/transition';
	import { page } from '$app/stores';
   import { goto } from '$app/navigation';
   import { deserialize } from '$app/forms';
	import { Splide, SplideSlide } from '@splidejs/svelte-splide';
	import '@splidejs/svelte-splide/css/core';
   import { cart, total } from '$lib/stores/Cart.js';
	import { touchRadius } from '$lib/frontendUtils/touchRadius.js';
	import { forint } from '$lib/frontendUtils/formazo.js';
   import Topbar from '$lib/components/Topbar.svelte';

   export let data;

	let szunetSplide;
	let fizetes = 'Készpénz';
	let idopont = data.szunetArray[0];

	if (localStorage.getItem('CartContent')) {
		$cart = JSON.parse(localStorage.getItem('CartContent'));
		$total = JSON.parse(localStorage.getItem('Total'));
	}

	function recalculate() {
		$total = { 'ar': 0, 'darab': 0 };
		Object.keys($cart).forEach(termek => {
			$cart[termek].forEach(x => {
				$total.ar += x.ar;
				$total.darab += x.darab;
			});
		});
		localStorage.setItem('CartContent',JSON.stringify($cart));
		localStorage.setItem('Total',JSON.stringify($total));
	}

	function urites() {
		localStorage.clear();
		$cart = {};
		$total = { 'ar': 0, 'darab': 0 };
	}

	function subtractAmount(termek,i) {
		if ($cart[termek][i].darab > 1) {
			const price = $cart[termek][i].ar / $cart[termek][i].darab;

			$cart[termek][i].ar -= price;
			$cart[termek][i].darab--;

			recalculate();
		} else {
			$cart[termek].splice(i,1);
			if ($cart[termek].length === 0)
				delete $cart[termek];
			$cart = $cart; // Muszaj reactivity miatt
			recalculate();

			if (Object.keys($cart).length === 0) {
				localStorage.removeItem('CartContent');
				history.back();
			}
		}
	}

	function addAmount(termek,i) {
		let totalDarab = 0;
		const maxAmount = data.termekek.find(x => { return x.termek === termek; }).darab;

		$cart[termek].forEach(x => {
			totalDarab += x.darab;
		});

		if (totalDarab < maxAmount) {
			const price = $cart[termek][i].ar / $cart[termek][i].darab;

			$cart[termek][i].ar += price;
			$cart[termek][i].darab++;
			recalculate();
		}

	}

	function feltetRemove(termek,i,feltet) {
		$cart[termek][i].feltet = $cart[termek][i].feltet.filter(item => item !== feltet);
		const ar = data.termekek.find(x => { return x.termek === termek; }).feltetek[feltet].ar;
		$cart[termek][i].ar -= ar;
	}

	async function handleSubmit() {
		const data = new FormData(this);
		const response = await fetch(this.action, {
			method: 'POST',
			body: data
		});

		const result = deserialize(await response.text());

		if (result.type === 'success') {
			urites();
			goto('/rendelesek');
		} else {
			alert(result.data.error);
			delete $cart[result.data.sok];
			$cart = $cart; // kell reactivity miatt
			recalculate();
		}
	}

</script>

<main in:fade={{ duration: 180 }}>

   <Topbar
   target={'Vissza'}
   targeturl={$page.url.searchParams.get('referrer')}
   text={'Kosár'}
   hideProfile={0}
   flyin={0}
   ></Topbar>

   <div class="flex w-full justify-center">
		<button class="text-primary font-semibold outline outline-outline outline-1 w-max rounded-3xl p-2 px-6 transition-all hover:rounded-lg hover:bg-primary hover:text-on-primary hover:outline-none" on:click={() => {urites(); goto('/');}}>Űrités</button>
	</div>

	<!-- Ár, darab -->
	<div in:fade class="flex justify-center gap-3 text-tertiary text-xl my-1">
		<div class="outline outline-1 outline-tertiary font-semibold w-max rounded-lg py-1 px-3 my-3">
			{#key $total.ar}
				<span in:fade>{forint($total.ar)} Ft</span>
			{/key}
		</div>
		<div class="outline outline-1 outline-tertiary font-semibold w-max rounded-lg py-1 px-3 my-3">
			{#key $total.darab}
				<span in:fade>{$total.darab} db</span>
			{/key}
		</div>
	</div>

	<div class="grid grid-cols-2 gap-5 mx-6">
		{#each Object.keys($cart) as termek}
			{#each $cart[termek] as x, i (i)}
				<div>
					<!-- Termék -->
					<div class="rounded-2xl overflow-hidden">
						<div class="relative bg-cover bg-center bg-no-repeat" style="background-image: url('{termek}.jpg');">
							<div class="absolute top-2 left-2 z-10 font-semibold">
								{#key x.ar}
									<p in:fade|local class="text-[#343108] bg-tertiary rounded-lg px-1">
										{forint(x.ar)} Ft
									</p>
								{/key}
							</div>
							<div class="h-32 backdrop-brightness-[.4] flex justify-center items-center">
								<p class="font-semibold text-center text-on-background">{termek}</p>
							</div>
						</div>
						<!-- Amount gombok -->
						<div class="bg-foreground p-2 text-center text-on-secondary font-extrabold">
							<button class="w-6 bg-secondary rounded-lg transition-all" on:click="{(e) => {subtractAmount(termek,i); touchRadius(e.target, '.3rem', '.5rem');}}">-</button>
								{#key x.darab}
									<span in:fade|local class="text-tertiary mx-3">{x.darab} <span class="text-secondary">db</span></span>
								{/key}
							<button class="w-6 bg-secondary rounded-lg transition-all" on:click="{(e) => {addAmount(termek,i); touchRadius(e.target, '.3rem', '.5rem');}}">+</button>
						</div>
						<!-- Feltétek -->
						{#if x.feltet.length}
							<div class="text-on-surface-variant bg-surface-variant bg-opacity-70 flex flex-col py-1">
								<div class="px-2 leading-4">
									{#each x.feltet as feltet, _ (_)}
										<div class="flex items-center gap-1 py-1">
											<div class="w-5 h-5 bg-secondary rounded-lg transition-all text-on-secondary font-semibold flex justify-center items-center" on:click={() => {feltetRemove(termek,i,feltet);}}>-</div> <div>{feltet}</div>
										</div>
									{/each}
								</div>
							</div>
						{/if}
					</div>
				</div>
			{/each}
		{/each}
	</div>

	{#if Object.keys($cart).length && data.szunetArray.length}
		<!-- Fizetési mód -->
		<div class="px-8">
			<div class="my-5 grid grid-cols-2 text-center items-center w-full cursor-pointer">
				<div class:activeFizetes={fizetes === 'Készpénz'} on:click={() => {fizetes = 'Készpénz';}} class="ml-[1px] py-2 text-secondary rounded-l-xl border border-secondary transition-all">
					<p>Készpénz</p>
				</div>
				<div class:activeFizetes={fizetes === 'Bankkártya'} on:click={() => {fizetes = 'Bankkártya';}} class="py-2 text-secondary rounded-r-xl border border-l-0 border-secondary transition-all">
					<p>Bankkártya</p>
				</div>
			</div>
		</div>

		<!-- Szünet Választó -->
		<div class="mb-5 flex justify-center items-center">
			<div class="flex flex-col justify-center items-center font-semibold rounded-2xl">
				<div class="bg-secondary flex justify-center items-center rounded-2xl w-20 mb-2 text-2xl text-on-secondary transition-all after:-rotate-90 after:content-['>']" on:click={(e) => {szunetSplide.splide.go('<'); touchRadius(e.target, '.5rem', '1rem');}}>
				</div>
				<div class="overflow-hidden flex rounded-xl outline outline-1 outline-outline">
					<Splide bind:this={szunetSplide} on:moved={e => {idopont = data.szunetArray[e.detail.index];}} options={{ arrows: false, pagination: false, direction: 'ttb', height: '2rem', perMove: 1 }}>
						{#each data.szunetArray as szunet}
							<SplideSlide>
								<div class:activeSzunet={szunet === idopont} class="w-full h-full flex justify-center items-center px-4">
									{szunet}
								</div>
							</SplideSlide>
						{/each}
					</Splide>
				</div>
				<div class="bg-secondary flex justify-center items-center rounded-2xl w-20 mt-2 text-2xl text-on-secondary transition-all after:rotate-90 after:content-['>']" on:click={(e) => {szunetSplide.splide.go('>'); touchRadius(e.target, '.5rem', '1rem');}}>
				</div>
			</div>
		</div>

		<!-- Vásárlás gomb -->
		<form class="w-full flex justify-center" method="POST" on:submit|preventDefault={handleSubmit}>
			<input hidden type="text" name="rendeles" value="{JSON.stringify($cart)}">
			<input hidden type="text" name="fizetes" value="{fizetes}">
			<input hidden type="text" name="idopont" value="{idopont}">
			<button class="p-4 px-8 mb-10 font-semibold text-lg bg-primary-container text-on-primary-container rounded-xl focus:rounded-md transition-all">Vásárlás!</button>
		</form>
	{/if}

</main>

<style lang="postcss">

	.activeFizetes {
		@apply bg-tertiary-container;
		@apply text-on-tertiary-container;
		@apply border-tertiary;
		@apply font-semibold;
	}

	.activeSzunet {
		@apply text-tertiary;
	}

</style>