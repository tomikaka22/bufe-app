<script>
	import PageTransition from '$lib/components/PageTransition.svelte';
	import { navigating } from '$app/stores';
	import { afterNavigate, beforeNavigate } from '$app/navigation';
	import { page } from '$app/stores';
	import { fade } from 'svelte/transition';
	import '../app.css';
   import { onMount } from 'svelte';
   import { cart, total } from '$lib/stores/Cart.js';

	const noKeyURLs = [ '/admin', '/rendelesek' ];

	const hideNavbarRoutes = [ '/login', '/register', '/admin', '/offline', '/verify', '/verify/verified', '/banned' ];
	const backgroundConflict = [ '/list','/kosar' ];

	const termekekRoutes = [ '/list', '/[termek]' ];
	const homeRoutes = [ '/', '/rendelesek', '/rendelesek/[rendeles]' ];
	const kosarRoutes = [ '/kosar' ];
	const profilRoutes = [ '/profil', '/change/notification', '/change/password', '/change/delete' ];

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

		if (localStorage.getItem('CartContent')) {
			$cart = JSON.parse(localStorage.getItem('CartContent'));
			$total = JSON.parse(localStorage.getItem('Total'));
		}
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

{#if !hideNavbarRoutes.includes($page.url.pathname)}
	<div class:navbar-background-noconflict={!backgroundConflict.includes($page.url.pathname)} class="bg-foreground text-on-background grid grid-cols-4 gap-8 justify-evenly justify-items-center fixed bottom-0 w-full text-sm h-[5.25rem] transition-all px-5 pt-3 z-10">
		<a href="/" class="flex flex-col h-16 w-full transition-all" class:active-nav={homeRoutes.includes($page.route.id)}>
			<div class="w-full h-1/2 flex justify-center items-center rounded-3xl py-1 transition-all" class:active-img={homeRoutes.includes($page.route.id)}>
				{#if homeRoutes.includes($page.route.id)}
					<svg class="h-full w-full text-primary" fill="currentColor" xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48"><path d="M160-120v-480l320-240 320 240v480H560v-280H400v280H160Z"/></svg>
				{:else}
					<svg class="h-full w-full text-secondary" fill="currentColor" xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48"><path d="M220-180h150v-250h220v250h150v-390L480-765 220-570v390Zm-60 60v-480l320-240 320 240v480H530v-250H430v250H160Zm320-353Z"/></svg>
				{/if}
			</div>
			<div class="w-full h-1/2 flex justify-center items-center" class:active-text={homeRoutes.includes($page.route.id)}>
				Főoldal
			</div>
		</a>

		<a href="/list" class="flex flex-col h-16 w-full transition-all" class:active-nav={termekekRoutes.includes($page.route.id)}>
			<div class="w-full h-1/2 flex justify-center items-center rounded-3xl py-1 transition-all" class:active-img={termekekRoutes.includes($page.route.id)}>
				{#if termekekRoutes.includes($page.route.id)}
					<svg class="h-full w-full text-primary" fill="currentColor" xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48"><path d="M80-558v-40q0-109 105-175.5T480-840q190 0 295 66.5T880-598v40H80Zm0 176v-60q33 0 57.5-22t78.5-22q54 0 71.5 22t58.5 22q41 0 60.5-22t73.5-22q54 0 73.5 22t60.5 22q41 0 58.5-22t71.5-22q54 0 78.5 22t57.5 22v60q-54 0-74.5-22T744-426q-41 0-58.5 22T614-382q-54 0-73.5-22T480-426q-41 0-60.5 22T346-382q-54 0-71.5-22T216-426q-41 0-61.5 22T80-382Zm60 262q-24 0-42-18t-18-42v-128h800v128q0 24-18 42t-42 18H140Z"/></svg>
				{:else}
					<svg class="h-full w-full text-secondary" fill="currentColor" xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48"><path d="M80-558v-40q0-109 105-175.5T480-840q190 0 295 66.5T880-598v40H80Zm62-60h676q-3-69-96.5-115.5T480-780q-148 0-242.5 46.5T142-618ZM80-382v-60q33 0 57.5-22t78.5-22q54 0 71.5 22t58.5 22q41 0 60.5-22t73.5-22q54 0 73.5 22t60.5 22q41 0 58.5-22t71.5-22q54 0 78.5 22t57.5 22v60q-54 0-74.5-22T744-426q-41 0-58.5 22T614-382q-54 0-73.5-22T480-426q-41 0-60.5 22T346-382q-54 0-71.5-22T216-426q-41 0-61.357 22T80-382Zm60 262q-24 0-42-18t-18-42v-128h800v128q0 24-18 42t-42 18H140Zm0-60h680v-68H140v68Zm0-68h680-680Zm2-370h676-676Z"/></svg>
				{/if}
			</div>
			<div class="w-full h-1/2 flex justify-center items-center" class:active-text={termekekRoutes.includes($page.route.id)}>
				Termékek
			</div>
		</a>

		<a href="/kosar" class="flex flex-col h-16 w-full transition-all" class:active-nav={kosarRoutes.includes($page.route.id)}>
			<div class="w-full h-1/2 relative flex justify-center items-center rounded-3xl py-1 transition-all" class:active-img={kosarRoutes.includes($page.route.id)}>
				{#if kosarRoutes.includes($page.route.id)}
					<svg class="h-full w-full text-primary" fill="currentColor" xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48"><path d="M286.788-81Q257-81 236-102.212q-21-21.213-21-51Q215-183 236.212-204q21.213-21 51-21Q317-225 338-203.788q21 21.213 21 51Q359-123 337.788-102q-21.213 21-51 21Zm400 0Q657-81 636-102.212q-21-21.213-21-51Q615-183 636.212-204q21.213-21 51-21Q717-225 738-203.788q21 21.213 21 51Q759-123 737.788-102q-21.213 21-51 21ZM205-801h589.074q22.964 0 34.945 21Q841-759 829-738L694-495q-11 19-28.559 30.5Q647.881-453 627-453H324l-56 104h491v60H277q-42 0-60.5-28t.5-63l64-118-152-322H51v-60h117l37 79Z"/></svg>
				{:else}
					<svg class="h-full w-full text-secondary" fill="currentColor" xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48"><path d="M286.788-81Q257-81 236-102.212q-21-21.213-21-51Q215-183 236.212-204q21.213-21 51-21Q317-225 338-203.788q21 21.213 21 51Q359-123 337.788-102q-21.213 21-51 21Zm400 0Q657-81 636-102.212q-21-21.213-21-51Q615-183 636.212-204q21.213-21 51-21Q717-225 738-203.788q21 21.213 21 51Q759-123 737.788-102q-21.213 21-51 21ZM235-741l110 228h288l125-228H235Zm-30-60h589.074q22.964 0 34.945 21Q841-759 829-738L694-495q-11 19-28.559 30.5Q647.881-453 627-453H324l-56 104h491v60H277q-42 0-60.5-28t.5-63l64-118-152-322H51v-60h117l37 79Zm140 288h288-288Z"/></svg>
				{/if}
				{#if $total.darab}
					{#if $total.darab < 10}
						<p class="absolute top-0 right-3 font-semibold bg-primary text-on-primary px-1 text-xs rounded-3xl">{$total.darab}</p>
					{:else}
						<p class="absolute top-0 right-2 font-semibold bg-primary text-on-primary px-1 text-xs rounded-3xl">{$total.darab}</p>
					{/if}
				{/if}
			</div>
			<div class="w-full h-1/2 flex justify-center items-center" class:active-text={kosarRoutes.includes($page.route.id)}>
				Kosár
			</div>
		</a>

		<a href="/profil" class="flex flex-col h-16 w-full transition-all" class:active-nav={profilRoutes.includes($page.route.id)}>
			<div class="w-full h-1/2 flex justify-center items-center rounded-3xl py-1 transition-all" class:active-img={profilRoutes.includes($page.route.id)}>
				<div class:rounded-xl={profilRoutes.includes($page.route.id)} class="h-full aspect-square rounded-lg overflow-hidden flex justify-center items-center transition-all relative">
					<img class="h-full w-full" src="/api/avatar" alt="">
					<div class:opacity-40={!profilRoutes.includes($page.route.id)} class="absolute w-full h-full bg-on-primary transition-all opacity-0"></div>
				</div>
			</div>
			<div class="w-full h-1/2 flex justify-center items-center" class:active-text={profilRoutes.includes($page.route.id)}>
				Profil
			</div>
		</a>
	</div>
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

	.active-nav {
		@apply font-semibold;
	}

	.active-img {
		@apply bg-secondary-container;
	}

	.active-text {
		@apply text-secondary;
	}

	.navbar-background-noconflict {
		@apply bg-background;
	}
</style>