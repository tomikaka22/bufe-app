<script>
   import { fade } from 'svelte/transition';
   import { goto } from '$app/navigation';
	import { forint } from '$lib/frontendUtils/utils.js';
   import { cart, total } from '$lib/stores/Cart.js';
   import Topbar from '$lib/components/Topbar.svelte';
	import Notice from '$lib/components/dialogs/Notice.svelte';

	export let data;
	let showModal = false;
	let modalTitle;
	let modalText;

	const status = {
		fuggoben: 'Függőben',
		folyamatban: 'Átvehető!',
		kesz: 'Kész',
		torolve: 'Törölve'
	};

	function rebuy() {
		$cart = data.record.termekek;

		$total = { 'ar': 0, 'darab': 0 };	// Kosár total újraszámolása
		Object.keys($cart).forEach(termek => {
			$cart[termek].forEach(x => {
				$total.ar += x.ar;
				$total.darab += x.darab;
			});
		});

		goto('/kosar');
	}

	async function share() {
		const shareData = {
			title: 'bufe-app',
			text: 'Rendelésem a büfé-appon:',
			url: data.href
		};

		try {
			await navigator.share(shareData);
		} catch (error) {
			modalTitle = 'Hiba.';
			modalText = 'Sikertelen megosztás.';
			showModal = true;
		}
	}

</script>

<main class="pb-[6.5rem]" in:fade={{ duration: 180 }}>

	<Topbar
		targeturl={'/rendelesek'}
		text={data.record.updated.slice(0, -5)}
	>
	</Topbar>

	<Notice bind:showModal title={modalTitle} text={modalText}></Notice>

	<div class="flex w-full justify-center items-center">
		<div class="outline outline-primary outline-1 rounded-lg px-5 font-semibold text-lg py-1">
			<h3 class="font-semibold text-primary">Összesen: <span>{forint(data.record.total)}</span></h3>
		</div>
	</div>

	<div class="grid grid-flow-row p-2 pt-0 gap-2 mx-1 mt-5 rounded-xl">

		<!-- Feltétek nélkül -->
		{#each Object.keys(data.record.termekek) as termek}
			{#each data.record.termekek[termek] as x}

				{#if !x.feltet.length}
					<div class="rounded-xl overflow-hidden">
						<a href="/{termek}?referrer={data.pathname}" class="p-2 h-20 grid grid-cols-3 items-center text-center bg-foreground">
							<div class="aspect-square overflow-hidden h-full rounded-xl">
								<img class="w-full h-full object-cover" src="{x.foto ? `/api/files/termekek/${x.id}/${x.foto}` : '/termek-drop.avif'}" alt="">
							</div>
							<div class="font-semibold">
								{termek}
							</div>
							<div class="flex flex-col items-end gap-2">
								<div class="outline outline-1 outline-tertiary text-tertiary rounded-lg font-semibold px-2 w-fit">{forint(x.ar)}</div>
								<div class="outline outline-1 outline-tertiary text-tertiary rounded-lg font-semibold px-2 w-fit">{x.darab} db</div>
							</div>
						</a>
					</div>
				{/if}

			{/each}
		{/each}

		<!-- feltétekkel -->
		{#each Object.keys(data.record.termekek) as termek}
			{#each data.record.termekek[termek] as x}

				{#if x.feltet.length}
					<div class="rounded-xl overflow-hidden">
						<a href="/{termek}?referrer={data.pathname}" class="p-2 h-20 grid grid-cols-3 items-center text-center bg-foreground">
							<div class="aspect-square overflow-hidden h-full rounded-xl">
								<img class="w-full h-full object-cover" src="{x.foto ? `/api/files/termekek/${x.id}/${x.foto}` : '/termek-drop.avif'}" alt="">
							</div>
							<div class="font-semibold">
								{termek}
							</div>
							<div class="flex flex-col items-end gap-2">
								<div class="outline outline-1 outline-tertiary text-tertiary rounded-lg font-semibold px-2 w-fit">{forint(x.ar)}</div>
								<div class="outline outline-1 outline-tertiary text-tertiary rounded-lg font-semibold px-2 w-fit">{x.darab} db</div>
							</div>
						</a>
						<!-- Feltétek -->
						<div class="w-full p-1.5 flex flex-wrap gap-1.5 bg-surface-variant">
							{#each x.feltet as feltet}
								<p class="bg-foreground text-on-surface-variant font-semibold rounded-lg px-2 flex justify-center items-center">{feltet}</p>
							{/each}
						</div>
					</div>
				{/if}

			{/each}
		{/each}
	</div>

	<div class="flex justify-center gap-3 mb-3 mt-1 font-semibold w-full">
		<h3 class="outline outline-2 outline-primary text-primary px-2 rounded-lg">{status[data.record.status]}</h3>
		<h3 class="outline outline-2 outline-tertiary text-tertiary px-2 rounded-lg">{data.record.fizetes}</h3>
	</div>
	<div class="flex justify-center gap-5 font-semibold w-full">
		<h3 class="outline outline-2 outline-secondary px-2 rounded-lg">{data.record.idopont}</h3>
	</div>

	<div class="flex w-full justify-center mt-5">
		<button on:click={share} class="px-5 py-2 font-semibold text-lg bg-secondary-container text-on-secondary-container hover:bg-on-secondary-container hover:text-secondary-container rounded-xl hover:rounded-md transition-all">Megosztás</button>
	</div>

	<div class="flex w-full justify-center mt-3">
		<button on:click={rebuy} class="p-3 px-6 font-semibold text-lg bg-primary-container text-on-primary-container hover:bg-primary hover:text-on-primary rounded-xl hover:rounded-md transition-all">Újravásárlás!</button>
	</div>

</main>

<style lang="postcss">
	.failover-image[id=''] {
		visibility: hidden;
	}
</style>