<script>
   import { fade, fly, slide } from 'svelte/transition';
	import { register } from 'swiper/element/bundle';
   import { onMount } from 'svelte';
   import { cart, total } from '$lib/stores/Cart.js';
   import { navigation } from '$lib/stores/Navigation.js';
   import Topbar from '$lib/components/Topbar.svelte';

   export let data;

	let swiper;
   let cartshow = 0;

	onMount(() => {
		register();
		swiper.addEventListener('slidechange', (e) => {
			$navigation = e.detail[0].activeIndex;
		});

		if (localStorage.getItem('CartContent')) {
			cartshow = 1;
			$cart = JSON.parse(localStorage.getItem('CartContent'));
			$total = JSON.parse(localStorage.getItem('Total'));
		}
	});

	function navigate(i) {
		swiper.swiper.slideTo(i);
		$navigation = i;
	}

	// Search Bar
	const originalData = structuredClone(data);
	let searchWord;

	function search() {
		data.termekek = originalData.termekek.filter(termek => termek.termek.toLowerCase().includes(searchWord.toLowerCase()));

		// Navigáljon arra a kategoriara amiben az a termek talalhato ahol a keresett szo a legtobbet elofordul.
		if (searchWord.length > 0) { // ha nincs itt ez az if, akkor mindig visszaugrik az Etel kategoriara, mivel ott fordul elo a legtobbet empty string.
			const kategoria = {
				'Étel': 0,
				'Ital': 0,
				'Nasi': 0
			};

			data.termekek.forEach(termek => {
				kategoria[termek.kategoria] += termek.termek.toLowerCase().split(searchWord.toLowerCase()).length - 1;
			});

			switch (Object.values(kategoria).sort().reverse()[0]) {
				case kategoria.Étel:
					navigate(0);
					break;
				case kategoria.Ital:
					navigate(1);
					break;
				case kategoria.Nasi:
					navigate(2);
			}
		}

	}
</script>

<main in:fade={{ duration: 180 }}>

   <Topbar
      target={'Menü'}
      targeturl={'/'}
      text={'Termékek'}
      flyin={{ y: -200 }}
      hideProfile={0}
   ></Topbar>

<div class="w-screen h-screen absolute">

	{#if data.nepszeruTermekek.length !== 0}
		<h2 class="pl-6 pb-4 font-semibold text-primary">Népszerű ételek:</h2>
		<swiper-container class="mx-3" css-mode={'true'} slides-per-view={'auto'}>
			{#each data.nepszeruTermekek as termek}
				<swiper-slide class="rounded-2xl transition-all overflow-hidden bg-secondary-container hover:rounded-lg w-28 mx-1.5">
					<a href="{termek.termek}?referrer=/list">
						<div class="w-28 h-24 bg-center bg-no-repeat bg-cover" style="background-image: url('{termek.termek}.jpg');">
							<div class="h-full w-full backdrop-brightness-50 flex justify-center items-center text-center">
								<p class="font-semibold text-primary">{termek.termek}</p>
							</div>
						</div>
					</a>
				</swiper-slide>
			{/each}
		</swiper-container>
	{/if}

	<div class="w-full flex justify-center gap-2 my-4">
		<input class="w-2/6 rounded-lg bg-background outline outline-outline transition-all px-1 focus:px-3 focus:py-1 focus:rounded-md focus:w-4/6 focus:outline-primary" type="text" bind:value={searchWord} on:input={search}>
	</div>

	<swiper-container class="mb-32"
	initial-slide={$navigation}
	resistance-ratio={'0.5'}
	speed={'370'}
	space-between={'20'}
	slides-per-view={'1'}
	bind:this={swiper}
		>

		<swiper-slide>
			<div class="mx-6 flex flex-col gap-5 text-secondary">
				{#each data.termekek as termek}
					{#if termek.kategoria === 'Étel'}
						<a href="{termek.termek}?referrer=/list" class="rounded-2xl transition-all overflow-hidden hover:rounded-lg">
							<div class="h-32 overflow-clip">
								<img class="w-full h-full object-cover" src="{termek.termek}.jpg" alt="">
							</div>
							<div class="bg-foreground p-3 font-semibold flex justify-between">
								<div class="w-9/12">
									<p class="text-primary">{termek.termek}</p>
									<p class="text-xs font-normal">{termek.leiras}</p>
								</div>
								<div class="text-on-tertiary self-center">
									<p class="bg-tertiary rounded-lg px-1">{termek.ar} Ft</p>
								</div>
							</div>
						</a>
					{/if}
				{/each}
			</div>
		</swiper-slide>
		<swiper-slide>
			<div class="mx-6 bg-foreground rounded-2xl" in:slide={{ duration: 500 }}>
				{#each data.termekek as termek}
					{#if termek.kategoria === 'Ital'}
					<div class="text-secondary">
						<a class="grid grid-cols-3 items-center justify-items-center" class:elfogyott={termek.darab === 0} href="{termek.termek}?referrer=/list">
							<div class="h-24">
								<img class='max-w-full max-h-full p-4' src='favicon.png' alt=''>
							</div>
							<div class="text-center">{termek.termek}</div>
							<div>{termek.ar} Ft</div>
						</a>
					</div>
					{/if}
				{/each}
			</div>
		</swiper-slide>
		<swiper-slide>
			<div class="mx-6 bg-foreground rounded-2xl" in:slide={{ duration: 500 }}>
				{#each data.termekek as termek}
					{#if termek.kategoria === 'Nasi'}
					<div class="text-secondary">
						<a class="grid grid-cols-3 items-center justify-items-center" class:elfogyott={termek.darab === 0} href="{termek.termek}?referrer=/list">
							<div class="h-24">
								<img class='max-w-full max-h-full p-4' src='favicon.png' alt=''>
							</div>
							<div class="text-center">{termek.termek}</div>
							<div>{termek.ar} Ft</div>
						</a>
					</div>
					{/if}
				{/each}
			</div>
		</swiper-slide>
	</swiper-container>

	{#if cartshow}
	<div class="w-screen flex justify-center fixed bottom-0 z-10">
		<div in:fly={{ y: 200 }} class="p-3 flex justify-center gap-6 text-secondary bg-on-secondary rounded-2xl mb-16 opacity-95 font-semibold">
			<div class="flex justify-center w-12 rounded-xl" class:active='{$navigation === 0}' on:click={() => {navigate(0);}}><p class="p-1">Étel</p></div>
			<div class="flex justify-center w-12 rounded-xl" class:active='{$navigation === 1}' on:click={() => {navigate(1);}}><p class="p-1">Ital</p></div>
			<div class="flex justify-center w-12 rounded-xl" class:active='{$navigation === 2}' on:click={() => {navigate(2);}}><p class="p-1">Nasi</p></div>
		</div>
	</div>

	<!-- Kosar  -->
	<a href="kosar?referrer=/list">
		<div in:fly={{ y: 100, delay: 100 }} class='fixed bottom-0 z-10 w-full'>
			<div class="bg-on-secondary text-primary rounded-3xl transition-all hover:rounded-t-md hover:rounded-b-xl m-2 p-2 flex justify-between items-center px-5 opacity-95">
				<b class="text-primary">{$total.ar} Ft</b>
				<b class="text-secondary" >Kosár</b>
				<b class="bg-secondary-container p-1 px-3 rounded-full">{$total.darab} db</b>
			</div>
		</div>
	</a>

	{:else}
	<div class="w-screen flex justify-center fixed bottom-0 z-10">
		<div in:fly={{ y: 200 }} class="p-3 flex justify-center gap-6 text-secondary bg-on-secondary rounded-2xl mb-10 opacity-[0.97] font-semibold">
			<div class="flex justify-center w-12 rounded-xl" class:active='{$navigation === 0}' on:click={() => {navigate(0);}}><p class="p-1">Étel</p></div>
			<div class="flex justify-center w-12 rounded-xl" class:active='{$navigation === 1}' on:click={() => {navigate(1);}}><p class="p-1">Ital</p></div>
			<div class="flex justify-center w-12 rounded-xl" class:active='{$navigation === 2}' on:click={() => {navigate(2);}}><p class="p-1">Nasi</p></div>
		</div>
	</div>
	{/if}
</div>



</main>

<style lang="postcss">
	.active {
		@apply transition-all;
		@apply duration-500;
		@apply text-primary;
		@apply bg-secondary-container;
	}
</style>