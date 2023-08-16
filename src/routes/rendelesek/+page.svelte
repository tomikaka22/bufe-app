<script>
   import { fade } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import { expoOut } from 'svelte/easing';
	import { invalidateAll } from '$app/navigation';
	import { Splide, SplideSlide } from '@splidejs/svelte-splide';
	import { forint } from '$lib/frontendUtils/utils.js';
	import '@splidejs/svelte-splide/css/core';
   import Topbar from '$lib/components/Topbar.svelte';

   export let data;

	async function handleSubmit(form) {
		const data = new FormData(form);
		await fetch(form.action, {
			method: 'POST',
			body: data
		});

		invalidateAll();
	}

</script>

<main class="pb-[6.5rem]" in:fade={{ duration: 180 }}>

   <Topbar
      target={'Menü'}
      targeturl={'/'}
      text={'Rendelések'}
      background={'none'}
      flyin={{ y: -200 }}
		hideProfile={0}
   ></Topbar>

	<div>

		<div class="flex w-full mt-1 justify-center items-center">
			<div class="outline outline-primary outline-1 rounded-lg px-5 font-semibold text-lg py-1">
				<h3 class="font-semibold text-primary">Összesen: <span>{data.total} Ft</span></h3>
			</div>
		</div>

		<div class="mt-5">
			{#each data.elozmenyLista as record, i (record.id)}
				<div  animate:flip={{ duration: 700, easing: expoOut }}>
					{#if record.status === 'fuggoben'}
						<h3 class="text-center mb-1 font-semibold">Függőben</h3>
					{:else if record.status === 'torolve'}
						<h3 class="text-center mb-1 brightness-50 line-through font-semibold">Törölve</h3>
					{:else if record.status === 'folyamatban'}
						<h3 class="text-center mb-1 font-semibold text-primary">Átvehető!</h3>
					{:else}
						<h3 class="text-center mb-1 font-semibold">{record.updated.slice(0, -5)}</h3>
					{/if}

					<Splide on:inactive={e => { handleSubmit(e.detail.splide.root.children[0].children[0].children[0].children[0]); e.detail.splide.go('>'); }} options={{ arrows: false, start: 1, flickPower: 1, gap: '1.5rem' }}>

						<SplideSlide>
							<form class="bg-error-container w-full h-full rounded-r-full flex justify-end items-center font-semibold" method="POST" on:submit|preventDefault={handleSubmit}>
								<input hidden name="recordID" type="text" value="{JSON.stringify(record.id)}">
								<p class="mr-5">Törlés</p>
							</form>
						</SplideSlide>

						<SplideSlide>
							<div class:line-through={record.status === 'torolve'} class:brightness-50={record.status === 'torolve'} class="m-1 h-full">
								<div class="grid grid-flow-row p-2 pt-0 gap-2 mx-2 rounded-xl">
									<!-- Feltétek nélkül -->
									{#each Object.keys(record.termekek) as termek}
										{#each record.termekek[termek] as x}
											{#if !x.feltet.length}
												<div class:atveheto={record.status === 'folyamatban'} class="rounded-2xl overflow-hidden">
													<a href="/{termek}?referrer={data.pathname}" class="p-2 h-20 grid grid-cols-3 items-center text-center bg-foreground">
														<div class="bg-background aspect-square overflow-hidden h-full rounded-xl">
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
									{#each Object.keys(record.termekek) as termek}
										{#each record.termekek[termek] as x}
											{#if x.feltet.length}
												<div class="rounded-2xl overflow-hidden">
													<a href="/{termek}?referrer={data.pathname}" class="p-2 h-20 grid grid-cols-3 items-center text-center bg-foreground">
														<div class="bg-background aspect-square overflow-hidden h-full rounded-xl">
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
								<div class="flex justify-center gap-3 mt-1 font-semibold w-full">
									<h3 class="outline outline-2 outline-secondary px-2 rounded-lg">{record.idopont}</h3>
									<h3 class="outline outline-2 outline-tertiary text-tertiary px-2 rounded-lg">{record.fizetes}</h3>
								</div>
							</div>
						</SplideSlide>

					</Splide>
				</div>
			{/each}
		</div>

	</div>
</main>

<style lang="postcss">
	.atveheto {
		@apply
		outline
		outline-2
		outline-primary;
	}
</style>