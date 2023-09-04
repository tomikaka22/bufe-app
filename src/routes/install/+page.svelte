<script>
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
					<img class:activeChromeImg={ splideIndex === 0 } class="border-x border-secondary-container rounded-3xl transition-all" src="/Chrome.avif" alt="">
				</div>
			</SplideSlide>

			<SplideSlide class="px-16 pt-5">
				<img class:activeFirefoxImg={ splideIndex === 1 } class="border-x border-secondary-container rounded-3xl transition-all" src="/Firefox.avif" alt="">
			</SplideSlide>

			<SplideSlide class="px-16 pt-5">
				<div class="w-full h-full flex justify-center items-center">
					<img class:activeSafariImg={ splideIndex === 2 } class="border-x border-secondary-container rounded-3xl transition-all" src="/Chrome.avif" alt="">
				</div>
			</SplideSlide>

		</Splide>
	</div>

	<div class="px-8">
		<div class="my-5 grid grid-cols-3 text-center items-center w-full cursor-pointer">
			<button class:activeChrome={ splideIndex === 0 }  on:click={() => { splide.go(0); }} class="ml-[1px] py-2 text-secondary rounded-l-xl border border-primary transition-all">
				<p>Chrome</p>
			</button>
			<button class:activeFirefox={ splideIndex === 1 }  on:click={() => { splide.go(1); }} class="py-2 text-secondary border border-l-0 border-primary transition-all">
				<p>Firefox</p>
			</button>
			<button class:activeSafari={ splideIndex === 2 }  on:click={() => { splide.go(2); }} class="py-2 text-secondary rounded-r-xl border border-l-0 border-primary transition-all">
				<p>Safari</p>
			</button>
		</div>
	</div>

</main>

<style lang="postcss">
	.activeChrome {
		@apply
			font-semibold
			bg-[#dd5144]
			text-background
			border-[#dd5144]
		;
	}

	.activeFirefox {
		@apply
			font-semibold
			bg-[#8460fa]
			text-background
			border-[#a485ff]
		;
	}

	.activeSafari {
		@apply
			font-semibold
			bg-[#4c8bf5]
			text-background
			border-[#4c8bf5]
		;
	}

	.activeChromeImg {
		@apply border-[#dd5144];
	}

	.activeFirefoxImg {
		@apply border-[#8460fa];
	}

	.activeSafariImg {
		@apply border-[#4c8bf5];
	}
</style>