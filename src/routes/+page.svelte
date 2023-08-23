<script>
   import { fade } from 'svelte/transition';

   export let data;
</script>

<main in:fade={{ duration: 180 }} class="w-screen h-screen absolute">

	<h1 class="text-3xl ml-6 mt-3 font-semibold">Jónapot <span class="text-primary">{data.name}!</span></h1>

	<div class="text-on-background px-6">
		<a href="/list">
			<div class="bg-[#52443c] bg-[url('/termek-drop.avif')] bg-cover bg-center bg-no-repeat rounded-3xl hover:rounded-2xl transition-all overflow-clip">
				<p class="py-12 pl-10 font-semibold text-lg my-3 backdrop-brightness-[.6]">Termékek</p>
			</div>
		</a>
		<a href="/profil?referrer=/">
			<div class="bg-[#52443c] bg-[url('/api/avatar')] bg-cover bg-center bg-no-repeat rounded-3xl hover:rounded-2xl transition-all overflow-clip">
				<p class="py-12 pl-10 font-semibold text-lg my-3 backdrop-brightness-[.6]">Profil</p>
			</div>
		</a>
		<a href="/rendelesek">
			<div class="bg-[#52443c] bg-cover bg-center bg-no-repeat rounded-3xl hover:rounded-2xl transition-all overflow-clip">
				<p class="py-12 pl-10 font-semibold text-lg my-3 backdrop-brightness-[.6]">Rendelések</p>
			</div>
		</a>
	</div>

	{#if data.legutobbi6Termek.length}
		<h2 class="text-center">Legutóbb vásárolt termékeid</h2>
		<div class="flex justify-center items-center flex-wrap">
			{#each data.legutobbi6Termek as termek}
				<div class="rounded-2xl transition-all overflow-hidden bg-secondary-container hover:rounded-lg mx-1.5 my-2">
					<a href="{termek}?referrer=/">
						<div class="w-24 aspect-video bg-center bg-no-repeat bg-cover" style="background-image: url('termek-drop.avif');">
							<div class="h-full w-full backdrop-brightness-50 flex justify-center items-center text-center px-2">
								<p class="font-semibold text-primary">{termek}</p>
							</div>
						</div>
					</a>
				</div>
			{/each}
		</div>
	{/if}

	<!-- kedvencek -->
	<p class="text-center mt-4">Kedvencek</p>
	<div class="w-full grid grid-flow-col justify-start overflow-x-scroll snap-x snap-mandatory mt-1 gap-3 p-2 bg-foreground">
		{#each data.kedvencek as kedvenc}
			<div class="snap-center rounded-2xl transition-all overflow-hidden bg-on-primary hover:rounded-lg w-28">
				<a href="{kedvenc.termek}?referrer=/list">
					<div class="w-28 aspect-[5/4] bg-center bg-no-repeat bg-cover" style="background-image: url('/api/files/termekek/{kedvenc.id}/{kedvenc.foto}');">
						<div class="h-full w-full px-2 backdrop-brightness-50 flex justify-center items-center text-center">
							<p class="font-semibold text-primary">{kedvenc.termek}</p>
						</div>
					</div>
				</a>
			</div>
		{/each}
	</div>

</main>