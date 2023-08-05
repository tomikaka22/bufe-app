<script>
	import PageTransition from '$lib/components/PageTransition.svelte';
	import { navigating } from '$app/stores';
	import { afterNavigate, beforeNavigate } from '$app/navigation';
	import { page } from '$app/stores';
	import { fade } from 'svelte/transition';
	import '../app.css';
   import { onMount } from 'svelte';

	const noKeyURLs = [ '/admin', '/rendelesek' ];

	const splash = [
		'Az otthon készitett étel sokkal egészségesebb.',
		'Ezen az oldalon nem pörög a cookie.',
		'Adsz egy csókot?',
		'Valaki hozzányúlt a spagettimhez!',
		'Nyisd ki a szád, jön a kaja gránát!',
		'A tényekben nem szabad hinni.',
		'www.kkszki.{!straight}',
		'Órán telefonozni szigorúan tilos.',
		'6 ember rendelt az appomon ezen a héten!',
		'Nuraphone rossz.',
		'Puppy linux < bármelyik másik distro.',
		'Szigma himek nem használnak classokat.',
		'Akik OTL-t hallgatnak nem számitanak.',
		'Pár rendelés és utóléred a kövér macskáimat.',
		'Tiborral ne húzz ujjat.',
		'App bepukkasztva',
		'Release date: valamikor',
		'Májkölszoft Binbóz',
		'Általam kedvelt tanároknak jónapot kivánok!',
		'🅱️ortfolio.',
		'Balu Mester > Sajt32',
		'Húszezresből mennyi van?',
		'““”̿ ̿ ̿ ̿ ̿’̿’̵͇̿̿з=(*‿*)=ε/̵͇̿̿/̿ ̿ ̿ ̿ ̿’““'
	];

	// ... - 'animáció'
	let interval;
	let loading = '';

	beforeNavigate(() => {
		interval = setInterval(() => {
			loading += '.';
			if (loading.length === 3)
				loading = '';
		}, 700);
	});

	afterNavigate(() => {
		if (interval) {
			clearInterval(interval);
			interval = undefined;
		}
	});

	function swRegister() {
		if ('serviceWorker' in navigator) {
			navigator.serviceWorker.register('/service-worker.js');
		}
	}

	onMount(() => {
		swRegister();
	});

</script>

{#if !noKeyURLs.includes($page.url.pathname)}
   <PageTransition url={$page.url}>
		{#if $navigating}
			<div in:fade={{ delay: 300 }} class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-primary font-semibold">
				<h1 class="text-xl text-center">Betöltés.{loading}</h1>
				<p in:fade={{ delay: 500 }} class="font-normal text-sm text-center text-secondary">{splash[Math.floor(Math.random() * splash.length)]}</p>
			</div>
		{:else}
			<slot />
		{/if}
   </PageTransition>
{:else}
   <slot />
{/if}

<svelte:head>
	<title>bufe-app</title>
</svelte:head>

<style>
	:global(*) {
		-webkit-tap-highlight-color: transparent;
		scrollbar-width: none;
	}

	:global(*)::-webkit-scrollbar {
		display: none;
	}

	:global(body) {
		background-color: #201a17;
		@apply text-secondary;
	}

	:global(.button-primary) {
		@apply text-on-primary bg-primary font-semibold w-max mx-auto rounded-3xl transition-all p-2 px-4 mt-3;
	}

	:global(.button-primary:hover) {
		@apply rounded-lg;
	}
</style>