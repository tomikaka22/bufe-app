<script>
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { flip } from 'svelte/animate';
	import { expoOut } from 'svelte/easing';
	import Termekek from '$lib/components/admin/Termekek.svelte';
	import Darab from '$lib/components/admin/Darab.svelte';
	import Arak from '$lib/components/admin/Arak.svelte';
	import Leiras from '$lib/components/admin/Leiras.svelte';
	import Feltet from '$lib/components/admin/Feltet.svelte';
	import Kategoria from '$lib/components/admin/Kategoria.svelte';
	import Kepek from '$lib/components/admin/Kepek.svelte';
	import Ban from '$lib/components/admin/Ban.svelte';

	export let data;

	let darabModal;
	let termekModal;
	let arakModal;
	let leirasModal;
	let feltetModal;
	let kategoriaModal;
	let kepekModal;
	let banModal;

	setInterval(async () => {
		invalidateAll();
	}, 8000);

</script>

<main>

	<div class="grid grid-rows-[3rem_auto] h-screen">
		<!-- Gombok -->
		<div class="outline outline-1 py-2 flex text-center items-center justify-evenly z-10">
			<button class="outline outline-1 transition-all hover:rounded-lg hover:bg-primary hover:outline-none hover:text-on-primary rounded-3xl p-1 px-2" on:click={termekModal.showModal()}>Termékek</button>
			<button class="outline outline-1 transition-all hover:rounded-lg hover:bg-primary hover:outline-none hover:text-on-primary rounded-3xl p-1 px-2" on:click={darabModal.showModal()}>Darab</button>
			<button class="outline outline-1 transition-all hover:rounded-lg hover:bg-primary hover:outline-none hover:text-on-primary rounded-3xl p-1 px-2" on:click={arakModal.showModal()}>Árak</button>
			<button class="outline outline-1 transition-all hover:rounded-lg hover:bg-primary hover:outline-none hover:text-on-primary rounded-3xl p-1 px-2" on:click={leirasModal.showModal()}>Leírás</button>
			<button class="outline outline-1 transition-all hover:rounded-lg hover:bg-primary hover:outline-none hover:text-on-primary rounded-3xl p-1 px-2" on:click={feltetModal.showModal()}>Feltét</button>
			<button class="outline outline-1 transition-all hover:rounded-lg hover:bg-primary hover:outline-none hover:text-on-primary rounded-3xl p-1 px-2" on:click={kategoriaModal.showModal()}>Kategória</button>
			<button class="outline outline-1 transition-all hover:rounded-lg hover:bg-primary hover:outline-none hover:text-on-primary rounded-3xl p-1 px-2" on:click={kepekModal.showModal()}>Képek</button>
			<button class="outline outline-1 transition-all hover:rounded-lg hover:bg-primary hover:outline-none hover:text-on-primary rounded-3xl p-1 px-2" on:click={banModal.showModal()}>Tiltás</button>
		</div>

		<!-- Rendelések -->
		<div class="h-full w-full snap-y snap-mandatory overflow-y-scroll">
			{#each data.szunetArray as szunet}
				<div class="h-max snap-center">
					<div class="grid grid-cols-[20%_80%] h-full w-full min-h-[4rem]">
						<!-- X. Óra előtti szünet -->
						<div class="px-2 border-r border-b font-semibold text-lg flex items-center justify-center text-center">
							{szunet}
						</div>

						<div class="border-b flex flex-row items-center h-full w-full">
							<div class="grid grid-rows-2 h-full w-full">
								<!-- Függőben rendelések -->
								<div class="p-2 border-b border-surface-variant flex items-center overflow-x-scroll">
									{#each data.rendelesek.fuggoben as rendeles, i (rendeles.id)}
										<div animate:flip={{ duration: 700, easing: expoOut }}>
											{#if rendeles.idopont === szunet}
												<div class="bg-tertiary-container p-1 rounded-lg max-h-full min-w-max m-1">
													<div class="flex w-full justify-between gap-3 mb-2">
														<form use:enhance action="?/torles" method="POST">
															<input hidden type="text" name="recordID" value="{JSON.stringify(rendeles.id)}">
															<button class="bg-error text-on-error hover:bg-on-error hover:text-error hover:rounded-lg transition-all font-semibold px-1.5 rounded-3xl">&#10005;</button>
														</form>
															<p class="font-semibold">{rendeles.fizetes}</p>
														<form use:enhance action="?/kesz" method="POST">
															<input hidden type="text" name="recordID" value="{JSON.stringify(rendeles.id)}">
															<button class="bg-tertiary text-on-tertiary hover:bg-on-tertiary hover:text-tertiary hover:rounded-lg transition-all font-semibold px-1.5 rounded-3xl">&#10003;</button>
														</form>
													</div>
													<div class="flex justify-center gap-1 items-start h-full">
														{#each Object.keys(rendeles.termekek) as termek}
															{#each rendeles.termekek[termek] as x}
																<div class="font-semibold text-center px-0.5 flex flex-col justify-center items-center">
																	<p class="w-full bg-primary text-on-primary px-1 my-0.5 rounded-md">{termek}</p>
																	<p class="w-full bg-tertiary text-on-tertiary px-1 my-0.5 rounded-md">{x.darab} db, {x.ar} Ft</p>
																	{#each x.feltet as feltet}
																		<p class="w-full text-on-secondary-container outline outline-1 outline-outline px-2 my-0.5 rounded-md font-normal">{feltet}</p>
																	{/each}
																</div>
															{/each}
														{/each}
													</div>
												</div>
											{/if}
										</div>
									{/each}
								</div>
								<!-- Kész rendelések -->
								<div class="p-2 flex items-center overflow-x-scroll">
									{#each data.rendelesek.kesz as rendeles, i (rendeles.id)}
										<div animate:flip={{ duration: 700, easing: expoOut }}>
											{#if rendeles.idopont === szunet}
												<div class="bg-surface-variant p-1 rounded-lg max-h-full min-w-max m-1">
													<div class="flex w-full justify-between gap-3 mb-2">
														<form use:enhance action="?/torles" method="POST">
															<input hidden type="text" name="recordID" value="{JSON.stringify(rendeles.id)}">
															<button class="bg-error text-on-error hover:bg-on-error hover:text-error hover:rounded-lg transition-all font-semibold px-1.5 rounded-3xl">&#10005;</button>
														</form>
															<p class="font-semibold">{rendeles.fizetes}</p>
														<form use:enhance action="?/atadva" method="POST">
															<input hidden type="text" name="recordID" value="{JSON.stringify(rendeles.id)}">
															<button class="bg-tertiary text-on-tertiary hover:bg-on-tertiary hover:text-tertiary hover:rounded-lg transition-all font-semibold px-1.5 rounded-3xl">&#10003;</button>
														</form>
													</div>
													<div class="flex justify-center gap-1 items-start h-full">
														{#each Object.keys(rendeles.termekek) as termek}
															{#each rendeles.termekek[termek] as x}
																<div class="font-semibold text-center px-0.5 flex flex-col justify-center items-center">
																	<p class="w-full bg-primary text-on-primary px-1 my-0.5 rounded-md">{termek}</p>
																	<p class="w-full bg-tertiary text-on-tertiary px-1 my-0.5 rounded-md">{x.darab} db, {x.ar} Ft</p>
																	{#each x.feltet as feltet}
																		<p class="w-full text-on-secondary-container outline outline-1 outline-outline px-2 my-0.5 rounded-md font-normal">{feltet}</p>
																	{/each}
																</div>
															{/each}
														{/each}
													</div>
												</div>
											{/if}
										</div>
									{/each}
								</div>

							</div>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>

<!-- Modalok: -->
<Termekek bind:termekModal data={data}></Termekek>
<Darab bind:darabModal data={data}></Darab>
<Arak bind:arakModal data={data}></Arak>
<Leiras bind:leirasModal data={data}></Leiras>
<Feltet bind:feltetModal data={data}></Feltet>
<Kategoria bind:kategoriaModal data={data}></Kategoria>
<Kepek bind:kepekModal data={data}></Kepek>
<Ban bind:banModal data={data}></Ban>

</main>

