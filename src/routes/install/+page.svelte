<script>
	import { fade } from 'svelte/transition';
   import Topbar from '$lib/components/Topbar.svelte';
</script>

<main in:fade={{ duration: 180 }}>

	<Topbar
		targeturl={'/'}
		text={'Vissza'}
	></Topbar>

	<div class="text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
		<h1 class="text-primary text-3xl text-center font-semibold w-80">Hogy akarod használni az alkalmazást?</h1>

		<div class="w-full flex justify-between pt-5">

			<a href="/install/app" class="flex justify-center items-center flex-col transition-all hover:opacity-50">
				<img class="bg-foreground rounded-3xl p-1" src="favicon.png" alt="">
				<p class="font-semibold mt-1">App telepítése</p>
			</a>

			<a href="/login" class="flex justify-center items-center flex-col transition-all hover:opacity-50">
				<img class="bg-foreground rounded-3xl p-1" src="favicon.png" alt="">
				<p class="font-semibold mt-1">Böngészős Változat</p>
			</a>

		</div>
	</div>

</main>