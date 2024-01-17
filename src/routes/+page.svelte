<script>
	import { fade } from 'svelte/transition';
	import { Splide, SplideSlide } from '@splidejs/svelte-splide';
	import '@splidejs/svelte-splide/css/core';

	let slideIndex = 1;
	$: console.log(slideIndex);
</script>

<main in:fade={{ duration: 180 }}>
	<div class="bg-secondary-container bg-opacity-50 w-full h-14 rounded-b-full flex items-center justify-between px-8 py-1">

		<div class="h-full flex justify-center items-center gap-1">
			<img class="h-full object-contain" src="favicon.png" alt="">
			<p class="font-semibold">büfé-app</p>
		</div>

		<a href="/install">
			<div class="font-semibold bg-primary text-on-primary rounded-3xl px-2 py-1 transition-all hover:rounded-lg">alkalmazás</div>
		</a>

	</div>

	<h1 class="text-center font-semibold text-2xl mt-10 text-primary">Rendelj büféből a mobilodon</h1>

	<Splide on:move={e => { slideIndex = e.detail.index; }} class="mt-2.5 xl:bg-foreground xl:rounded-full xl:overflow-hidden xl:mx-10 xl:py-2" options={{ arrows: false, pagination: false, perPage: 3, focus: 'center', autoWidth: true, autoplay: true, interval: 4000, gap: '2rem', trimSpace: false, rewind: true, start: 1, easing: 'cubic-bezier(0.2, 0.0, 0, 1.0)' }}>
		<SplideSlide>
			<div class:activeSlide={slideIndex === 0} class="w-56 my-2 rounded-xl overflow-hidden opacity-40 transition-all duration-700">
				<img class="w-full h-full object-contain" src="/promo/0.avif" alt="">
			</div>
		</SplideSlide>

		<SplideSlide>
			<div class:activeSlide={slideIndex === 1} class="w-56 my-2 rounded-xl overflow-hidden opacity-40 transition-all duration-700">
				<img class="w-full h-full object-contain" src="/promo/1.avif" alt="">
			</div>
		</SplideSlide>

		<SplideSlide>
			<div class:activeSlide={slideIndex === 2} class="w-56 my-2 rounded-xl overflow-hidden opacity-40 transition-all duration-700">
				<img class="w-full h-full object-contain" src="/promo/2.avif" alt="">
			</div>
		</SplideSlide>

		<SplideSlide>
			<div class:activeSlide={slideIndex === 3} class="w-56 my-2 rounded-xl overflow-hidden opacity-40 transition-all duration-700">
				<img class="w-full h-full object-contain" src="/promo/3.avif" alt="">
			</div>
		</SplideSlide>
	</Splide>

	<h1 class="text-center font-semibold text-xl mt-2 text-primary">Vedd át sorbanállás nélkül.</h1>


</main>

<style lang="postcss">
	.activeSlide {
		@apply opacity-100
		outline
		outline-1
		outline-outline
		;
	}
</style>