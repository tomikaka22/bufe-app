<script>
   import { fade, fly } from 'svelte/transition';
	import { register } from 'swiper/element/bundle';
   import { onMount } from 'svelte';
   import { cart, total } from '$lib/stores/Cart.js';
   import { navigation } from '$lib/stores/Navigation.js';

   export let data;

	let swiper;
	let scrollYOld = 0;
	let navHide = false;

	onMount(() => {
		register();

		if (localStorage.getItem('CartContent')) {
			$cart = JSON.parse(localStorage.getItem('CartContent'));
			$total = JSON.parse(localStorage.getItem('Total'));
		}

		addEventListener('scroll', () => {
			if (window.scrollY > scrollYOld)
				navHide = true;
			else
				navHide = false;

			scrollYOld = window.scrollY;
		});
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
		const kategoria = {
			'Étel': 0,
			'Ital': 0,
			'Nasi': 0,
			'Egyéb' : 0
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
				break;
			case kategoria.Egyéb:
				navigate(3);
		}
	}
</script>

<main in:fade={{ duration: 180 }}>
<div class="w-screen h-screen absolute">

	<div class="w-full flex justify-center my-5">
		<div style="animation-timing-function: cubic-bezier(0.2, 0.0, 0, 1.0);" class="w-full h-10 mx-6 p-1 flex rounded-3xl overflow-hidden bg-foreground transition-all duration-[250ms] group focus-within:bg-surface-variant">
			{#if !searchWord}
				<svg in:fade={{ duration: 200 }} class="mx-2 py-1.5 text-outline group-focus-within:text-primary transition-all" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
					<!-- Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
					<path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/>
				</svg>
			{:else}
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<svg on:click={() => { searchWord = ''; search(); }} in:fade={{ duration: 200 }} class="mx-2 py-1.5 text-outline group-focus-within:text-primary transition-all" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
					<!-- Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
					<path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/>
				</svg>
			{/if}
			<input id="search" class="pr-2 p-1 bg-[transparent] placeholder:text-outline group-focus-within:placeholder:font-semibold outline-none w-full transition-all duration-300" type="text" placeholder="Keresés" bind:value={searchWord} on:input={search}>
		</div>
	</div>

	<swiper-container class="pb-5"
	auto-height={'true'}
	initial-slide={$navigation}
	resistance-ratio={'0.5'}
	space-between={'20'}
	slides-per-view={'1'}
	bind:this={swiper}
	on:slidechange={(e) => { $navigation = e.detail[0].activeIndex; }}
		>
		<swiper-slide>
			<div class="mx-6 flex flex-col gap-5 text-secondary">
				{#each data.termekek as termek}
					{#if termek.kategoria === 'Étel'}
						<a href="{termek.termek}?referrer=/list" class="rounded-2xl transition-all overflow-hidden hover:rounded-lg">
							<div class="h-28 overflow-clip">
								<img class="w-full h-full object-cover" src="{termek.termek}.jpg" on:error={img => {img.target.src='termek-drop.jpg';}} alt="">
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
			<div class="mx-6 flex flex-col gap-5 text-secondary">
				{#each data.termekek as termek}
					{#if termek.kategoria === 'Ital'}
						<a href="{termek.termek}?referrer=/list" class="rounded-2xl transition-all overflow-hidden hover:rounded-lg">
							<div class="h-28 overflow-clip">
								<img class="w-full h-full object-cover" src="{termek.termek}.jpg" on:error={img => {img.target.src='termek-drop.jpg';}} alt="">
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
			<div class="mx-6 flex flex-col gap-5 text-secondary">
				{#each data.termekek as termek}
					{#if termek.kategoria === 'Nasi'}
						<a href="{termek.termek}?referrer=/list" class="rounded-2xl transition-all overflow-hidden hover:rounded-lg">
							<div class="h-28 overflow-clip">
								<img class="w-full h-full object-cover" src="{termek.termek}.jpg" on:error={img => {img.target.src='termek-drop.jpg';}} alt="">
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
			<div class="mx-6 flex flex-col gap-5 text-secondary">
				{#each data.termekek as termek}
					{#if termek.kategoria === 'Egyéb'}
						<a href="{termek.termek}?referrer=/list" class="rounded-2xl transition-all overflow-hidden hover:rounded-lg">
							<div class="h-28 overflow-clip">
								<img class="w-full h-full object-cover" src="{termek.termek}.jpg" on:error={img => {img.target.src='termek-drop.jpg';}} alt="">
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
	</swiper-container>

	{#if !navHide}
		<div class="w-screen flex justify-center fixed bottom-0 z-10">
			<div in:fly={{ y: 200 }} out:fly|local={{ y: 100 }} class="p-3 flex justify-center gap-6 text-secondary bg-on-secondary rounded-2xl mb-24 opacity-[0.97] font-semibold">
				<button class="flex justify-center transition-all" on:click={() => {navigate(0);}}><p class:active='{$navigation === 0}' class="rounded-xl transition-all duration-300 py-1">Étel</p></button>
				<button class="flex justify-center transition-all" on:click={() => {navigate(1);}}><p class:active='{$navigation === 1}' class="rounded-xl transition-all duration-300 py-1">Ital</p></button>
				<button class="flex justify-center transition-all" on:click={() => {navigate(2);}}><p class:active='{$navigation === 2}' class="rounded-xl transition-all duration-300 py-1">Nasi</p></button>
				<button class="flex justify-center transition-all" on:click={() => {navigate(3);}}><p class:active='{$navigation === 3}' class="rounded-xl transition-all duration-300 py-1">Egyéb</p></button>
			</div>
		</div>
	{/if}
</div>



</main>

<style lang="postcss">
	.active {
		@apply text-primary;
		@apply bg-secondary-container;
		@apply px-2;
	}
</style>