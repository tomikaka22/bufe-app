<script>
	import { fade } from 'svelte/transition';

	export let data;
</script>

	<main in:fade={{ duration: 180 }} class="w-screen h-screen flex justify-center items-center">
		{#if data.status === 200}
			<div class="text-center">
				<img src="/favicon.png" class="block mx-auto" alt="" />

				<div class="w-full text-center mt-6">
					<h1 class="font-semibold text-xl">Sikeres E-mail cím megerősítés!</h1>
					<p class="mx-5 my-2">Menj vissza az applikációba és nyomj a belépés gombra.</p>
				</div>
			</div>
		{:else}
			<div class="text-center">
				<img src="/favicon.png" class="block mx-auto" alt="" />

				<div class="w-full text-center mt-6">
					<h1 class="font-semibold text-xl">Hiba</h1>
					<p class="mx-5 my-2">{data.status}</p>
				</div>
			</div>
		{/if}
	</main>