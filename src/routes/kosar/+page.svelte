<script>
   import { fade } from 'svelte/transition';
	import { flip } from 'svelte/animate';
   import { goto } from '$app/navigation';
   import { deserialize } from '$app/forms';
	import { Splide, SplideSlide } from '@splidejs/svelte-splide';
	import '@splidejs/svelte-splide/css/core';
   import { cart, total } from '$lib/stores/Cart.js';
	import { touchRadius } from '$lib/frontendUtils/touchRadius.js';
	import { forint } from '$lib/frontendUtils/formazo.js';

   export let data;

	let szunetSplide;
	let fizetes = 'Készpénz';
	let idopont = data.szunetArray[0];
	let submitting = false;

	if (localStorage.getItem('CartContent')) {
		$cart = JSON.parse(localStorage.getItem('CartContent'));
		$total = JSON.parse(localStorage.getItem('Total'));
	}

	function recalculate() {
		$total = { 'ar': 0, 'darab': 0 };
		Object.keys($cart).forEach(termek => {
			const lastFeltet = [];
			$cart[termek].forEach((x,i) => {
				if (lastFeltet.includes(JSON.stringify(x.feltet))) {	// Ha megegyezik a current termék bármelyik előző termékkel, vonja össze őket.
					const match = lastFeltet.indexOf(JSON.stringify(x.feltet));
					$total.ar -= $cart[termek][match].ar;
					$total.darab -= $cart[termek][match].darab;

					$cart[termek][i].ar += $cart[termek][match].ar;
					$cart[termek][i].darab += $cart[termek][match].darab;

					$cart[termek].splice(match,1);
				}

				$total.ar += x.ar;
				$total.darab += x.darab;
				lastFeltet.push(JSON.stringify(x.feltet));
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
			const record = data.termekek.find(x => { return x.termek === termek; });

			$cart[termek][i].darab--;
			$cart[termek][i].ar = record.ar * $cart[termek][i].darab + $cart[termek][i].feltet.map(feltet => { return Number(record.feltetek[feltet].ar); }).reduce((a, b) => a + b, 0) * $cart[termek][i].darab;	// 1 db termék ára szorozva darabbal, feltétek árának összege szorozva darabbal
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
			const record = data.termekek.find(x => { return x.termek === termek; });

			$cart[termek][i].darab++;
			$cart[termek][i].ar = record.ar * $cart[termek][i].darab + $cart[termek][i].feltet.map(feltet => { return Number(record.feltetek[feltet].ar); }).reduce((a, b) => a + b, 0) * $cart[termek][i].darab;	// 1 db termék ára szorozva darabbal, feltétek árának összege szorozva darabbal
			recalculate();
		}

	}

	function feltetRemove(termek,i,feltet) {
		$cart[termek][i].feltet = $cart[termek][i].feltet.filter(item => item !== feltet);
		const record = data.termekek.find(x => { return x.termek === termek; });

		$cart[termek][i].ar = record.ar * $cart[termek][i].darab + $cart[termek][i].feltet.map(feltet => { return Number(record.feltetek[feltet].ar); }).reduce((a, b) => a + b, 0) * $cart[termek][i].darab;	// 1 db termék ára szorozva darabbal, feltétek árának összege szorozva darabbal
		recalculate();
	}

	async function handleSubmit() {
		submitting = true;
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
			submitting = false;
		}
	}

</script>

<main in:fade={{ duration: 180 }}>

   <div class="flex w-full justify-center mt-4">
		<button class="text-primary font-semibold outline outline-outline outline-1 w-max rounded-3xl p-2 px-6 transition-all hover:rounded-lg hover:bg-primary hover:text-on-primary hover:outline-none" on:click={() => {urites(); goto('/');}}>Űrités</button>
	</div>

	<!-- Ár, darab -->
	<div in:fade class="flex justify-center gap-3 text-tertiary text-xl my-1">
		<div class="outline outline-1 outline-tertiary font-semibold w-max rounded-lg py-1 px-3 my-3">
			{#key $total.ar}
				<span in:fade>{forint($total.ar)}</span>
			{/key}
		</div>
		<div class="outline outline-1 outline-tertiary font-semibold w-max rounded-lg py-1 px-3 my-3">
			{#key $total.darab}
				<span in:fade>{$total.darab} db</span>
			{/key}
		</div>
	</div>

		<div class="flex flex-wrap justify-center gap-5">
			{#each Object.keys($cart) as termek, _ (_)}
				<div animate:flip={{ duration: 500 }} class="flex flex-wrap items-start justify-center gap-5">
					{#each $cart[termek] as x, i (i)}
						<div class="bg-foreground rounded-2xl overflow-hidden font-semibold">
							<div class="w-40 h-[7.6rem] relative bg-no-repeat bg-center bg-cover bg-[url('termek-drop.jpg')]">
								<p class="absolute w-full h-full text-center text-on-background flex justify-center items-center backdrop-brightness-50 p-2">{termek}</p>
								{#key x.ar}
									<p in:fade class="absolute top-2 left-2 bg-tertiary text-on-tertiary rounded-lg px-1">{forint(x.ar)}</p>
								{/key}
							</div>
							<!-- +/- Gombok  -->
							<div class="bg-foreground text-center flex justify-center items-center gap-3.5 py-1.5 text-tertiary font-extrabold">
								<button on:click={e => { subtractAmount(termek, i); touchRadius(e.target, '.3rem', '.5rem'); }} class="rounded-lg bg-secondary text-on-secondary aspect-square w-6 flex justify-center items-center transition-all">-</button>
									{#key x.darab}
										<p in:fade>{x.darab} db</p>
									{/key}
								<button on:click={e => { addAmount(termek, i); touchRadius(e.target, '.3rem', '.5rem'); }} class="rounded-lg bg-secondary text-on-secondary aspect-square w-6 flex justify-center items-center transition-all">+</button>
							</div>
							<!-- Feltétel -->
							{#if x.feltet.length}
								<div class="text-on-surface-variant bg-surface-variant bg-opacity-70 flex flex-col py-1">
									<div class="px-2 leading-4">
										{#each x.feltet as feltet, _ (_)}
											<div class="flex items-center gap-1 py-1">
												<div class="w-5 h-5 bg-secondary rounded-lg transition-all text-on-secondary flex justify-center items-center font-extrabold" on:click={() => {feltetRemove(termek,i,feltet);}}>-</div> <div>{feltet}</div>
											</div>
										{/each}
									</div>
								</div>
							{/if}
						</div>
					{/each}
				</div>
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
		{#if !submitting}
			<form class="w-full flex justify-center" method="POST" on:submit|preventDefault={handleSubmit}>
				<input hidden type="text" name="rendeles" value="{JSON.stringify($cart)}">
				<input hidden type="text" name="fizetes" value="{fizetes}">
				<input hidden type="text" name="idopont" value="{idopont}">
				<button class="p-4 px-8 mb-10 font-semibold text-lg bg-primary-container text-on-primary-container hover:bg-primary hover:text-on-primary rounded-xl hover:rounded-md transition-all">Vásárlás!</button>
			</form>
		{:else}
			<div class="w-full flex justify-center">
				<button in:fade={{ duration: 200 }} class="p-4 px-8 mb-10 font-semibold text-lg bg-primary-container text-on-primary-container rounded-xl focus:rounded-md transition-all brightness-50">Vásárlás!</button>
			</div>
		{/if}

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