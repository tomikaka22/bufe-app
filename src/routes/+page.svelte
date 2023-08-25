<script>
	import { version } from '$app/environment';
   import { fade } from 'svelte/transition';
	import { forint } from '$lib/frontendUtils/utils.js';

   export let data;
</script>

<main in:fade={{ duration: 180 }}>

	<h1 class="font-semibold text-3xl text-center my-4">Jónapot <span class="text-primary">{data.name}!</span></h1>


	<div class="w-full flex flex-col justify-center items-center px-6 gap-5">

		<a href="/list" class="w-full h-32 rounded-2xl overflow-hidden bg-foreground relative">
			<img src="/termek-drop.avif" class="object-cover w-full h-full" alt="">
			<p class="absolute top-0 flex w-full h-full justify-center items-center backdrop-brightness-50 text-2xl font-semibold text-primary">Vásárlás!</p>
		</a>

		<div class="w-full h-full flex gap-5">
			<div class="w-full h-[22.5rem] flex flex-col gap-5">
				<div class="bg-foreground h-56 w-full rounded-2xl p-2 px-4">
					<div class="w-full h-full flex flex-col justify-center items-center brightness-50">
						<svg xmlns="http://www.w3.org/2000/svg" height="80" fill="currentColor"
							viewBox="0 -1600 1600 1600" width="80">
							<path d="M358.973 -266.667q-38.428 0 -65.368
							-26.938Q266.667 -320.545 266.667 -358.973v-882.053q0
							-38.428 26.938 -65.368Q320.545 -1333.333 358.973
							-1333.333h681.54L1333.333 -1040.513v681.54q0 38.428
							-26.938 65.368Q1279.455 -266.667 1241.027 -266.667H358.973Zm0
							-51.282h882.053q17.948 0 29.487 -11.538t11.538 -29.487v-647.62H1007.308v-275.458H358.973q-17.948
							0 -29.487 11.538t-11.538 29.487v882.053q0 17.948 11.538 29.487t29.487 11.538Zm140.642
							-223.462h600.77v-51.282H499.615v51.282Zm0 -465.898H800v-51.282H499.615v51.282Zm0
							232.95h600.77v-51.283H499.615v51.283Zm-181.667 -507.693v275.458Z"/>
						</svg>
						<p class="-mt-1 font-semibold">Nincsenek hírek.</p>
					</div>
				</div>

				<a href="/rendelesek" class="bg-foreground w-full grid grid-rows-2 rounded-2xl aspect-video">
					<div class="flex gap-3 text-tertiary font-semibold text-2xl justify-center items-center">
						<p class="outline outline-1 px-2 rounded-lg outline-tertiary h-fit w-fit">{data.total.darab} db</p>
						<p class="outline outline-1 px-2 rounded-lg outline-tertiary h-fit w-fit">{forint(data.total.ar)}</p>
					</div>

					<div class="border-t text-center flex items-center justify-center">
						<p class="text-primary text-2xl font-semibold mb-1">Rendeléseim</p>
					</div>
				</a>
			</div>

			<div class="w-1/2 h-[22.5rem] overflow-y-scroll snap-y snap-mandatory px-2 rounded-2xl bg-foreground relative">
				{#if data.kedvencek}
					{#each data.kedvencek as kedvenc}
						<div class="h-20 w-full my-2 snap-center rounded-2xl transition-all overflow-hidden bg-on-primary hover:rounded-lg">
							<a href="{kedvenc.termek}?referrer=/list">
								<div class="w-full h-full bg-center bg-no-repeat bg-cover relative" style="background-image: url('/api/files/termekek/{kedvenc.id}/{kedvenc.foto}');">
									<div class="w-full h-full px-2 flex justify-center items-center text-center">
										<p class="font-semibold text-primary z-10">{kedvenc.termek}</p>
									</div>
									<div class="absolute top-0 w-full h-full bg-[black] opacity-50"></div> <!-- Undorító hack a chrome miatt -->
								</div>
							</a>
						</div>
					{/each}
				{:else}
					<div class="absolute top-0 left-0 w-full h-full flex flex-col brightness-50 justify-center items-center">
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
	<p class="text-center mt-3.5 text-sm">{version}</p>

</main>