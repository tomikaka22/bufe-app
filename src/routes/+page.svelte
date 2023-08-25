<script>
   import { fade } from 'svelte/transition';
	import { forint } from '$lib/frontendUtils/utils.js';

   export let data;
</script>

<main in:fade={{ duration: 180 }}>

	<h1 class="font-semibold text-3xl text-center my-4">Jónapot <span class="text-primary">{data.name}!</span></h1>


	<div class="w-full flex flex-col justify-center items-center gap-5">

		<a href="/list" class="w-[21.25rem] h-32 rounded-2xl overflow-hidden bg-foreground relative">
			<img src="/termek-drop.avif" class="object-cover w-full h-full" alt="">
			<p class="absolute top-0 flex w-full h-full justify-center items-center backdrop-brightness-50 text-2xl font-semibold">Vásárlás!</p>
		</a>

		<div class="w-fit flex px-4 gap-5 h-[22.5rem]">
			<div class="ml-auto h-full flex gap-5 flex-col">
				<div class="bg-foreground rounded-2xl flex-1 p-2 px-4">
					asd
				</div>
				<a href="/rendelesek" class="bg-foreground grid grid-rows-2 items-center w-52 aspect-video rounded-2xl">
					<div class="flex gap-3 justify-center items-center h-full">
						<p class="outline outline-1 outline-tertiary text-tertiary rounded-lg px-2 text-2xl font-semibold">{data.total.darab} db</p>
						<p class="outline outline-1 outline-tertiary text-tertiary rounded-lg px-2 text-2xl font-semibold">{forint(data.total.ar)}</p>
					</div>
					<div class="flex h-full justify-center items-center border-t border-b-outline">
						<p class="font-semibold text-2xl pb-1 text-primary">Rendeléseim</p>
					</div>
				</a>
			</div>
			<div class="mr-auto flex flex-col justify-center items-end">
				<div class="flex-1 w-28 overflow-y-scroll snap-y snap-mandatory px-2 rounded-2xl bg-foreground relative">
					{#if data.kedvencek}
						{#each data.kedvencek as kedvenc}
							<div class="h-20 w-24 my-2 snap-center rounded-2xl transition-all overflow-hidden bg-on-primary hover:rounded-lg">
								<a href="{kedvenc.termek}?referrer=/list">
									<div class="w-full h-full bg-center bg-no-repeat bg-cover" style="background-image: url('/api/files/termekek/{kedvenc.id}/{kedvenc.foto}');">
										<div class="w-full h-full px-2 backdrop-brightness-50 flex justify-center items-center text-center">
											<p class="font-semibold text-primary">{kedvenc.termek}</p>
										</div>
									</div>
								</a>
							</div>
						{/each}
					{:else}
						<div class="absolute h-full w-24 flex flex-col brightness-50 justify-center items-center">
							<svg id="svg-star" xmlns="http://www.w3.org/2000/svg"
								fill="currentColor"
								height="80" viewBox="0 -1600 1600 1600" width="80">
								<path d="M552.437 -360.258 800 -509.232l247.563 150.64
								-65.513 -281.922 217.82 -189.102L912.563 -855 800 -1120.255
								687.437 -856.667l-287.307 25.385L617.95 -641.538l-65.513 281.28Zm-114.1
								157.688 95.512 -411.277L214.75 -890.383l421.022 -36.537L800 -1314.737l164.228
								387.817L1385.25 -890.383 1066.152 -613.847l95.512 411.277L800 -420.772 438.337
								-202.57ZM800 -723.077Z"/>
							</svg>
							<p class="font-semibold -mt-1">Kedvencek</p>
						</div>
					{/if}
				</div>
			</div>
		</div>
	</div>

</main>