<script>
	import { fade } from 'svelte/transition';
	import { Splide, SplideSlide } from '@splidejs/svelte-splide';
	import '@splidejs/svelte-splide/css/core';

	export let data;

	let splide;
	let splideIndex = data.browserNumber;
</script>

<main>
	<h1 class="text-4xl font-semibold text-primary text-center mt-5">Telepítés</h1>
	<div class="w-full flex justify-center">
		<Splide on:moved={(e) => { splideIndex = e.detail.index; }} bind:this={splide} options={{ arrows: false, start: data.browserNumber, flickPower: 100 }}>

			<SplideSlide class="px-16 pt-5">
				<div class="w-full h-full flex justify-center items-center">
					<img class="border-x border-foreground rounded-3xl transition-all" src="/Chrome.avif" alt="">
				</div>
			</SplideSlide>

			<SplideSlide class="px-16 pt-5">
				<img class="border-x border-foreground rounded-3xl transition-all" src="/Firefox.avif" alt="">
			</SplideSlide>

			<SplideSlide class="px-16 pt-5">
				<div class="w-full h-full flex justify-center items-center">
					<img class="border-x border-foreground rounded-3xl transition-all" src="/Chrome.avif" alt="">
				</div>
			</SplideSlide>

		</Splide>
	</div>

	<div class="px-8 mt-5">
		<div class="grid grid-cols-3 text-center items-center w-full cursor-pointer">
			<button class:activeChrome={ splideIndex === 0 }  on:click={() => { splide.go(0); splideIndex = splide.splide.index; }} class="ml-[1px] py-2 text-secondary rounded-l-xl border border-primary transition-all">
				<p>Chrome</p>
			</button>
			<button class:activeFirefox={ splideIndex === 1 }  on:click={() => { splide.go(1); splideIndex = splide.splide.index; }} class="py-2 text-secondary border border-l-0 border-primary transition-all">
				<p>Firefox</p>
			</button>
			<button class:activeSafari={ splideIndex === 2 }  on:click={() => { splide.go(2); splideIndex = splide.splide.index; }} class="py-2 text-secondary rounded-r-xl border border-l-0 border-primary transition-all">
				<p>Safari</p>
			</button>
		</div>
	</div>

	{#if splideIndex === 0}
		<p in:fade={{ duration: 200 }} class="text-center my-5 mt-3 px-5 font-semibold">
			Nyomj a megjelenő <span class="text-primary">"Hozzáadás a képernyőhöz"</span> gombra, vagy a jobboldali hamburger menüből válaszd ki a <span class="text-primary">"Telepítés"</span> gombot.
		</p>
	{:else if splideIndex === 1}
		<p in:fade={{ duration: 200 }} class="text-center my-5 mt-3 px-5 font-semibold">
			Nyomj a jobboldali hamburger menüre és válaszd ki a <span class="text-primary">"Telepítés"</span> gombot.
		</p>
	{:else if splideIndex === 2}
		<p in:fade={{ duration: 200 }} class="text-center my-5 mt-3 px-5 font-semibold">
			Lorem ipsum dolor sit, amet consectetur adipisicing elit.
		</p>
	{/if}

</main>

<style lang="postcss">
	.activeChrome {
		@apply
		bg-[#dd5144]
		bg-opacity-10
		border-secondary
		text-[#dd5144]
		font-semibold
	}

	.activeFirefox {
		@apply
		bg-[#8460fa]
		bg-opacity-10
		border-secondary
		text-[#8460fa]
		font-semibold
	}

	.activeSafari {
		@apply
		bg-[#4c8bf5]
		bg-opacity-10
		border-secondary
		text-[#4c8bf5]
		font-semibold
	}
</style>