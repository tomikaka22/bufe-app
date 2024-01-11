<script>
   import { fade } from 'svelte/transition';
   import { goto } from '$app/navigation';
   import { deserialize } from '$app/forms';
	import { Splide, SplideSlide } from '@splidejs/svelte-splide';
	import '@splidejs/svelte-splide/css/core';
   import { cart, total } from '$lib/stores/Cart.js';
	import { touchRadius } from '$lib/frontendUtils/utils.js';
	import { forint } from '$lib/frontendUtils/utils.js';

   export let data;
console.log(data.idopontok)
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
		localStorage.removeItem('CartContent');
		localStorage.removeItem('Total');
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
			console.log(result.data.error);
			delete $cart[result.data.sok];
			$cart = $cart; // kell reactivity miatt
			recalculate();
			submitting = false;
		}
	}

</script>

<main class="pb-[5.25rem]" in:fade={{ duration: 180 }}>

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

	<!-- Feltétek nélkül -->
	<div class="grid grid-flow-row mx-4 pt-0 rounded-xl">
		{#each Object.keys($cart) as termek, _ (_)}
			{#each $cart[termek] as x, i (i)}
				{#if !x.feltet.length}
					<div class="rounded-2xl overflow-hidden mb-2">
						<div class="p-2 h-20 grid grid-cols-3 items-center text-center bg-foreground">
							<div class="aspect-square overflow-hidden h-full rounded-xl">
								<img class="w-full h-full object-cover" src="{x.foto ? `/api/files/termekek/${x.id}/${x.foto}` : '/termek-drop.avif'}" alt="">
							</div>
							<div class="font-semibold line-clamp-3 break-words">
								{termek}
							</div>
							<div class="grid grid-rows-2 justify-items-end gap-2">
								<div class="outline outline-1 outline-tertiary text-tertiary rounded-lg font-semibold px-1 h-6 py-1 flex flex-row justify-center items-center">
									<button use:touchRadius={'.25rem'} on:click={() => { subtractAmount(termek, i); }} class="bg-tertiary text-on-tertiary h-full aspect-square rounded-md flex justify-center items-center transition-all">-</button>
									{#key x.darab}
										<span in:fade class="px-2">{x.darab} db</span>
									{/key}
									<button use:touchRadius={'.25rem'} on:click={() => { addAmount(termek, i); }} class="bg-tertiary text-on-tertiary h-full aspect-square rounded-md flex justify-center items-center transition-all">+</button>
								</div>
								<div class="outline outline-1 outline-tertiary text-tertiary rounded-lg font-semibold px-2 w-fit h-6 py-1 flex items-center justify-center">
									{#key x.darab}
										<span in:fade>{forint(x.ar)}</span>
									{/key}
								</div>
							</div>
						</div>
					</div>
				{/if}
			{/each}
		{/each}
	</div>
	<!-- feltétekkel -->
	<div class="grid grid-flow-row mx-4 pt-0 rounded-xl">
		{#each Object.keys($cart) as termek, _ (_)}
			{#each $cart[termek] as x, i (i)}
				{#if x.feltet.length}
					<div class="rounded-2xl overflow-hidden mb-2">
						<div class="p-2 h-20 grid grid-cols-3 items-center text-center bg-foreground">
							<div class="aspect-square overflow-hidden h-full rounded-xl">
								<img class="w-full h-full object-cover" src="{x.foto ? `/api/files/termekek/${x.id}/${x.foto}` : '/termek-drop.avif'}" alt="">
							</div>
							<div class="font-semibold line-clamp-3 break-words">
								{termek}
							</div>
							<div class="grid grid-rows-2 justify-items-end gap-2">
								<div class="outline outline-1 outline-tertiary text-tertiary rounded-lg font-semibold px-1 w-fit h-6 py-1 flex gap-2 justify-center items-center">
									<button on:click={() => { subtractAmount(termek, i); }} class="bg-tertiary text-on-tertiary h-full aspect-square rounded-md flex justify-center items-center">-</button>
									{#key x.darab}
										<span in:fade>{x.darab} db</span>
									{/key}
									<button on:click={() => { addAmount(termek, i); }} class="bg-tertiary text-on-tertiary h-full aspect-square rounded-md flex justify-center items-center">+</button>
								</div>
								<div class="outline outline-1 outline-tertiary text-tertiary rounded-lg font-semibold px-2 w-fit h-6 py-1 flex items-center justify-center">
									{#key x.darab}
										<span in:fade>{forint(x.ar)}</span>
									{/key}
								</div>
							</div>
						</div>
						<!-- Feltétek -->
						<div class="w-full p-1.5 flex flex-wrap gap-1.5 bg-surface-variant">
							{#each x.feltet as feltet}
								<p class="bg-foreground text-on-surface-variant font-semibold rounded-lg px-1.5 flex justify-center items-center">
									<button class="mr-1 h-5 w-5 py-[0.05rem]" on:click={() => {feltetRemove(termek,i,feltet);}}>
										<svg xmlns="http://www.w3.org/2000/svg" class="w-full h-full text-error" fill="currentColor" height="48" viewBox="0 -960 960 960" width="48">
											<path d="M334.522-288 480-433.478 625.478-288 672-334.522 526.522-480 672-625.478 625.478-672
												480-526.522 334.522-672 288-625.478 433.478-480 288-334.522 334.522-288ZM480.078-65.869q-85.469
												0-161.006-32.395-75.536-32.395-131.975-88.833-56.438-56.439-88.833-131.897-32.395-75.459-32.395-160.928
												0-86.469 32.395-162.006 32.395-75.536 88.745-131.504 56.349-55.968 131.849-88.616 75.5-32.648 161.017-32.648
												86.516 0 162.12 32.604 75.603 32.604 131.529 88.497t88.549 131.452Q894.696-566.584 894.696-480q0 85.547-32.648
												161.075-32.648 75.527-88.616 131.896-55.968 56.37-131.426 88.765-75.459 32.395-161.928 32.395ZM480-145.087q139.739
												0 237.326-97.732Q814.913-340.551 814.913-480q0-139.739-97.587-237.326-97.587-97.587-237.609-97.587-139.021 0-236.826
												97.587-97.804 97.587-97.804 237.609 0 139.021 97.732 236.826Q340.551-145.087 480-145.087ZM480-480Z"
											/>
										</svg>
									</button>
									<span class="truncate max-w-[7.5rem]">{feltet}</span>
								</p>
							{/each}
						</div>
					</div>
				{/if}
			{/each}
		{/each}
	</div>

	{#if Object.keys($cart).length && data.szunetArray.length}
		<!-- Fizetési mód -->
		<div class="px-8">
			<div class="my-5 grid grid-cols-2 text-center items-center w-full cursor-pointer">
				<button class:activeFizetes={fizetes === 'Készpénz'} on:click={() => {fizetes = 'Készpénz';}} class="ml-[1px] py-2 text-secondary rounded-l-xl border border-secondary transition-all">
					<p>Készpénz</p>
				</button>
				<button class:activeFizetes={fizetes === 'Bankkártya'} on:click={() => {fizetes = 'Bankkártya';}} class="py-2 text-secondary rounded-r-xl border border-l-0 border-secondary transition-all">
					<p>Bankkártya</p>
				</button>
			</div>
		</div>

		<!-- Szünet Választó -->
		<div class="mb-5 flex justify-center items-center">
			<div class="flex flex-col justify-center items-center font-semibold rounded-2xl">
				<button use:touchRadius={'.5rem'} class="bg-secondary flex justify-center items-center rounded-2xl w-20 mb-2 text-2xl text-on-secondary transition-all after:-rotate-90 after:content-['>']" on:click={() => {szunetSplide.splide.go('<');}}>
				</button>
				<div class="overflow-hidden flex rounded-xl outline outline-1 outline-outline">
					<Splide bind:this={szunetSplide} on:moved={e => {idopont = data.szunetArray[e.detail.index];}} options={{ arrows: false, pagination: false, direction: 'ttb', height: '2rem', perMove: 1 }}>
						{#each data.szunetArray as szunet}
							<SplideSlide>
								<div class:activeSzunet={szunet === idopont} class="w-full h-full flex justify-center items-center px-4">
									<!-- Todo: Színek -->
									<p
										class:text-[#ff5d5d]="{data.idopontok[szunet] >= 20 && szunet === idopont}"
										class:text-[#ff9f51]="{data.idopontok[szunet] >= 10 && szunet === idopont}"
										>
										{szunet} {data.idopontok[szunet] ? ` - ${30 - data.idopontok[szunet]} szabad` : ' - 30 szabad'}
									</p>
								</div>
							</SplideSlide>
						{/each}
					</Splide>
				</div>
				<button use:touchRadius={'.5rem'} class="bg-secondary flex justify-center items-center rounded-2xl w-20 mt-2 text-2xl text-on-secondary transition-all after:rotate-90 after:content-['>']" on:click={() => {szunetSplide.splide.go('>');}}>
				</button>
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