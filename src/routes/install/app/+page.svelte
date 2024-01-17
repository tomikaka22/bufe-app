<script>
	import { fade } from 'svelte/transition';
   import Topbar from '$lib/components/Topbar.svelte';

	export let data;

	let index = data.browserNumber;
</script>

<main in:fade={{ duration: 180 }}>

	<Topbar
		targeturl={'/install'}
		text={'Telepítés'}
	></Topbar>

	<h1 class="text-4xl font-semibold text-primary text-center mt-5">Telepítés</h1>

	<div class="px-8 mt-5">
		<div class="grid grid-cols-3 text-center items-center w-full cursor-pointer">
			<button class:activeChrome={ index === 0 } on:click={() => { index = 0; }} class="ml-[1px] py-2 text-secondary rounded-l-xl border border-primary transition-all">
				<p>Chrome</p>
			</button>
			<button class:activeFirefox={ index === 1 } on:click={() => { index = 1; }} class="py-2 text-secondary border border-l-0 border-primary transition-all">
				<p>Firefox</p>
			</button>
			<button class:activeSafari={ index === 2 } on:click={() => { index = 2; }} class="py-2 text-secondary rounded-r-xl border border-l-0 border-primary transition-all">
				<p>Safari</p>
			</button>
		</div>
	</div>

	{#if index === 0}
		<div in:fade={{ duration: 200 }}>

			<p class="text-center my-3 mt-5 px-5 font-semibold">A legegyszerűbb mód, ha megnyomod a "Hozzáadás a képernyőhöz" gombot.</p>
			<p class="text-center my-3 px-5 font-semibold">Ha nincs ilyen gomb, nyomj a jobboldali hamburger menüre.</p>

			<div class="w-5/6 mx-auto mt-5 rounded-2xl overflow-hidden relative">
				<img class="w-full h-full" src="/Chrome-menu.avif" alt="">

				<div class="absolute top-0 flex w-full justify-end mt-[26%]">
					<p class="text-center font-semibold mr-[5%]">Hamburger menü</p>
				</div>
			</div>

			<p class="text-center mt-5 px-5 font-semibold">Nyomj a telepítés gombra.</p>
			<div class="w-5/6 mx-auto mt-5 rounded-2xl overflow-hidden">
				<img class="w-full h-full" src="/Chrome-install.avif" alt="">
			</div>

		</div>
	{:else if index === 1}
		<div in:fade={{ duration: 200 }}>
			<p class="text-center my-3 mt-5 px-5 font-semibold">Nyomj a hamburger menüre a jobb sarokban.</p>

			<div class="w-5/6 mx-auto mt-5 rounded-2xl overflow-hidden relative">
				<img class="w-full h-full" src="/Firefox-menu.avif" alt="">

				<div class="absolute top-0 flex w-full justify-end mt-[26%]">
					<p class="text-center font-semibold mr-[5%]">Hamburger menü</p>
				</div>
			</div>

			<p class="text-center mt-5 px-5 font-semibold">Nyomj a telepítés gombra.</p>
			<div class="w-5/6 mx-auto mt-5 rounded-2xl overflow-hidden">
				<img class="w-full h-full" src="/Firefox-install.avif" alt="">
			</div>
		</div>
	{:else if index === 2}
		<div in:fade={{ duration: 200 }}>
			<img class="w-5/6 mx-auto mt-5 rounded-2xl" src="/Chrome.avif" alt="">
			<p class="text-center my-5 px-5 font-semibold">
				Lorem ipsum dolor sit, amet consectetur adipisicing elit.
			</p>
		</div>
	{/if}

	<p class="text-center mt-3 px-5 py-2 font-semibold bg-foreground">A telepítéshez az utasításokat kövesd itt, vagy az app böngészős verziójában!</p>

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