<script>
	import PageTransition from '$lib/components/PageTransition.svelte';
	import { page } from '$app/stores';
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