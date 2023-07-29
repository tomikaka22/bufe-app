<script>
   import { fade } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import { expoOut } from 'svelte/easing';
	import { invalidateAll } from '$app/navigation';
	import { Splide, SplideSlide } from '@splidejs/svelte-splide';
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

<main in:fade={{ duration: 180 }}>

   <Topbar
      target={'Menü'}
      targeturl={'/'}
      text={'Rendelések'}
      background={'none'}
      flyin={{ y: -200 }}
		hideProfile={0}
   ></Topbar>

	<div class="mx-6">
		<div class="flex w-full mt-1 justify-center items-center">
			<div class="outline outline-primary outline-1 rounded-lg px-5 font-semibold text-lg py-1">
				<h3 class="font-semibold text-primary">Összesen: <span>{data.total} Ft</span></h3>
			</div>
		</div>

		<div class="my-5">
			{#each data.elozmenyLista as record, i (record.id)}
				<div animate:flip={{ duration: 700, easing: expoOut }}>
					{#if record.status === 'kesz'}
						<h2 class="text-center my-3 font-semibold">{record.updated.slice(0, -5)}</h2>
						<Splide on:inactive={e => { handleSubmit(e.detail.splide.root.children[0].children[0].children[0].children[0]); }} options={{ arrows: false, start: 1, flickPower: 1, gap: '2rem' }}>
							<SplideSlide>
								<form class="bg-error-container w-full h-full rounded-r-full flex justify-end items-center font-semibold" method="POST" on:submit|preventDefault={handleSubmit}>
									<input hidden name="recordID" type="text" value="{JSON.stringify(record.id)}">
									<p class="mr-5">Törlés</p>
								</form>
							</SplideSlide>
							<SplideSlide>
								<div class="rounded-3xl overflow-hidden flex flex-col justify-around border border-1 border-outline">
									<div class="p-2 bg-surface rounded-3xl">
										{#each Object.keys(record.termekek) as termek}
											{#each record.termekek[termek] as x}
												<a href="{termek}?referrer=/rendelesek" class="grid h-16 grid-cols-4 items-center justify-items-center py-1 mb-1 last-of-type:mb-0">
													<div style="background-image: url('{termek}.jpg');" class="flex justify-center items-center h-full w-full bg-primary bg-no-repeat bg-center bg-cover rounded-2xl overflow-hidden">
														<div class="w-full h-full backdrop-brightness-[.4] flex justify-center items-center text-center text-on-background">
															<p>{x.darab} db</p>
														</div>
													</div>
													<div class="text-center col-span-2">{termek}</div>
													<div class="text-center">{x.ar} Ft</div>
												</a>
											{/each}
										{/each}
									</div>
								</div>
							</SplideSlide>
						</Splide>
					{:else if record.status === 'fuggoben'}
						<h2 class="text-center my-3 text-outline font-semibold">Függőben</h2>
						<Splide on:inactive={e => { handleSubmit(e.detail.splide.root.children[0].children[0].children[0].children[0]); }} options={{ arrows: false, start: 1, flickPower: 1, gap: '2rem' }}>
							<SplideSlide>
								<form class="bg-error-container w-full h-full rounded-r-full flex justify-end items-center font-semibold" method="POST" on:submit|preventDefault={handleSubmit}>
									<input hidden name="recordID" type="text" value="{JSON.stringify(record.id)}">
									<p class="mr-5">Törlés</p>
								</form>
							</SplideSlide>
							<SplideSlide>
								<div class="rounded-3xl overflow-hidden flex flex-col justify-around brightness-75 border border-1 border-outline">
									<div class="p-2 bg-surface rounded-3xl">
										{#each Object.keys(record.termekek) as termek}
											{#each record.termekek[termek] as x}
												<a href="{termek}?referrer=/rendelesek" class="grid h-16 grid-cols-4 items-center justify-items-center py-1 mb-1 last-of-type:mb-0">
													<div style="background-image: url('{termek}.jpg');" class="flex justify-center items-center h-full w-full bg-primary bg-no-repeat bg-center bg-cover rounded-2xl overflow-hidden">
														<div class="w-full h-full backdrop-brightness-[.4] flex justify-center items-center text-center text-on-background">
															<p>{x.darab} db</p>
														</div>
													</div>
													<div class="text-center col-span-2">{termek}</div>
													<div class="text-center">{x.ar} Ft</div>
												</a>
											{/each}
										{/each}
									</div>
								</div>
							</SplideSlide>
						</Splide>
					{:else if record.status === 'folyamatban'}
						<h2 class="text-center my-3 text-primary font-semibold">Átvehető!</h2>
						<div class="rounded-3xl overflow-hidden flex flex-col justify-around border-2 border-primary font-semibold">
							<div class="p-2 bg-surface rounded-3xl">
								{#each Object.keys(record.termekek) as termek}
									{#each record.termekek[termek] as x}
										<a href="{termek}?referrer=/rendelesek" class="grid h-16 grid-cols-4 items-center justify-items-center py-1 mb-1 last-of-type:mb-0">
											<div style="background-image: url('{termek}.jpg');" class="flex justify-center items-center h-full w-full bg-primary bg-no-repeat bg-center bg-cover rounded-2xl overflow-hidden">
												<div class="w-full h-full backdrop-brightness-[.4] flex justify-center items-center text-center text-on-background">
													<p>{x.darab} db</p>
												</div>
											</div>
											<div class="text-center col-span-2">{termek}</div>
											<div class="text-center">{x.ar} Ft</div>
										</a>
									{/each}
								{/each}
							</div>
						</div>
					{:else if record.status === 'torolve'}
						<h2 class="text-center my-3 text-outline"><del>Törölve</del></h2>
						<Splide on:inactive={e => { handleSubmit(e.detail.splide.root.children[0].children[0].children[0].children[0]); }} options={{ arrows: false, start: 1, flickPower: 1, gap: '2rem' }}>
							<SplideSlide>
								<form class="bg-error-container w-full h-full rounded-r-full flex justify-end items-center font-semibold" method="POST" on:submit|preventDefault={handleSubmit}>
									<input hidden name="recordID" type="text" value="{JSON.stringify(record.id)}">
									<p class="mr-5">Törlés</p>
								</form>
							</SplideSlide>
							<SplideSlide>
								<div class="rounded-3xl overflow-hidden flex flex-col justify-around brightness-50">
									<div class="p-2 bg-surface rounded-3xl">
										{#each Object.keys(record.termekek) as termek}
											{#each record.termekek[termek] as x}
												<a href="{termek}?referrer=/rendelesek" class="grid h-16 grid-cols-4 items-center justify-items-center py-1 mb-1 last-of-type:mb-0">
													<div style="background-image: url('{termek}.jpg');" class="flex justify-center items-center h-full w-full bg-primary bg-no-repeat bg-center bg-cover rounded-2xl overflow-hidden">
														<div class="w-full h-full backdrop-brightness-[.4] flex justify-center items-center text-center text-on-background">
															<p>{x.darab} db</p>
														</div>
													</div>
													<div class="text-center col-span-2">{termek}</div>
													<div class="text-center">{x.ar} Ft</div>
												</a>
											{/each}
										{/each}
									</div>
								</div>
							</SplideSlide>
						</Splide>
					{/if}
				</div>
			{/each}
		</div>

	</div>
</main>

<style lang="postcss">

</style>