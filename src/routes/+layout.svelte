<script>
	import PageTransition from '$lib/components/PageTransition.svelte';
	import {
		page
	} from '$app/stores';
	import {
		onMount
	} from 'svelte';
	import {
		pwaInfo
	} from 'virtual:pwa-info';
	import '../app.css';

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

	onMount(async () => {
		if (pwaInfo) {
			const {
				registerSW
			} = await import('virtual:pwa-register');
			registerSW({
				immediate: true,
				onRegistered(r) {
				// uncomment following code if you want check for updates
				// r && setInterval(() => {
				//    console.log('Checking for sw update')
				//    r.update()
				// }, 20000 /* 20s for testing purposes */)
					console.log(`SW Registered: ${r}`);
				},
				onRegisterError(error) {
					console.log('SW registration error', error);
				}
			});
		}
	});

  $: webManifest = pwaInfo ? pwaInfo.webManifest.linkTag : '';
</script>

{#if !noKeyURLs.includes($page.url.pathname)}
   <PageTransition url={$page.url}>
      <slot />
   </PageTransition>
{:else}
   <slot />
{/if}

<svelte:head>
	<title>{splash[Math.floor(Math.random() * splash.length)]}</title>
	<link href="https://cdn.jsdelivr.net/gh/hung1001/font-awesome-pro-v6@44659d9/css/all.min.css" rel="stylesheet" type="text/css" />
    {@html webManifest}
</svelte:head>

<style>
	:global(*) {
		-webkit-tap-highlight-color: transparent;
	}

	:global(body) {
		background-color: #201a17;
		@apply text-secondary;
	}
</style>