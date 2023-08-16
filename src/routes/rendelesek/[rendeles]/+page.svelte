<script>
   import { fade } from 'svelte/transition';
	import { forint } from '$lib/frontendUtils/utils.js';
   import Topbar from '$lib/components/Topbar.svelte';

	export let data;
</script>

<main class="pb-[6.5rem]" in:fade={{ duration: 180 }}>

	<Topbar
		targeturl={'/rendelesek'}
		text={'Rendelés'}
></Topbar>

	<div class="flex w-full mt-1 justify-center items-center">
		<div class="outline outline-primary outline-1 rounded-lg px-5 font-semibold text-lg py-1">
			<h3 class="font-semibold text-primary">Összesen: <span>{data.record.total} Ft</span></h3>
		</div>
	</div>

	<h3 class="text-center my-3">{data.record.updated.slice(0, -5)}</h3>

	<div class="grid grid-flow-row p-2 pt-0 gap-2 mx-1 rounded-xl">

		<!-- Feltétek nélkül -->
		{#each Object.keys(data.record.termekek) as termek}
			{#each data.record.termekek[termek] as x}

				{#if !x.feltet.length}
					<div class="rounded-xl overflow-hidden">
						<a href="/{termek}?referrer={data.pathname}" class="p-2 h-20 grid grid-cols-3 items-center text-center bg-foreground">
							<div class="bg-background aspect-square overflow-hidden h-full rounded-lg">
								<img class="w-full h-full object-cover" src="/termek-drop.jpg" alt="">
							</div>
							<div class="font-semibold">
								{termek}
							</div>
							<div class="flex flex-col items-end gap-2">
								<div class="bg-tertiary text-on-tertiary rounded-lg font-semibold px-1 w-fit">{forint(x.ar)}</div>
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
							<div class="bg-background aspect-square overflow-hidden h-full rounded-lg">
								<img class="w-full h-full object-cover" src="/termek-drop.jpg" alt="">
							</div>
							<div class="font-semibold">
								{termek}
							</div>
							<div class="flex flex-col items-end gap-2">
								<div class="bg-tertiary text-on-tertiary rounded-lg font-semibold px-1 w-fit">{forint(x.ar)}</div>
								<div class="outline outline-1 outline-tertiary text-tertiary rounded-lg font-semibold px-2 w-fit">{x.darab} db</div>
							</div>
						</a>
						<!-- Feltétek -->
						<div class="w-full p-1.5 flex flex-wrap gap-1.5 bg-surface-variant">
							{#each x.feltet as feltet}
								<p class="bg-secondary text-on-secondary font-semibold rounded-lg w-fit px-2">{feltet}</p>
							{/each}
						</div>
					</div>
				{/if}

			{/each}
		{/each}
	</div>

	<div class="flex justify-center gap-3 mb-3 mt-1 font-semibold w-full">
		<h3 class="outline outline-2 outline-primary text-primary px-2 rounded-lg">{data.record.status}</h3>
		<h3 class="outline outline-2 outline-tertiary text-tertiary px-2 rounded-lg">{data.record.fizetes}</h3>
	</div>
	<div class="flex justify-center gap-5 font-semibold w-full">
		<h3 class="outline outline-2 outline-secondary px-2 rounded-lg">{data.record.idopont}</h3>
	</div>

</main>