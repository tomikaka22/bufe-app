<script>
   import { fade } from 'svelte/transition';

   export let data;
</script>

<main in:fade={{ duration: 180 }} class="px-6 w-screen h-screen absolute">

	<h1 class="text-3xl mt-3 font-semibold">Jónapot <span class="text-[#ffb68f]">{data.name}!</span></h1>

	<div class="text-[#ffdbca]">
		<a href="/list">
			<div class="bg-[#52443c] bg-[url('/termek-drop.jpg')] bg-cover bg-center bg-no-repeat rounded-3xl hover:rounded-2xl transition-all overflow-clip">
				<p class="py-12 pl-10 font-semibold text-lg my-3 backdrop-brightness-[.6]">Termekek</p>
			</div>
		</a>
		<a href="/profil">
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

	{#if data.legutobbi6Termek.length !== 0}
		<h2 class="text-center">Legutóbb vásárolt termékeid</h2>
		<div class="flex justify-center items-center flex-wrap">
			{#each data.legutobbi6Termek as termek}
				<div class="rounded-2xl transition-all overflow-hidden bg-secondary-container hover:rounded-lg mx-1.5 my-2">
					<a href="{termek}?referrer=/">
						<div class="w-24 h-20 bg-center bg-no-repeat bg-cover" style="background-image: url('{termek}.jpg');">
							<div class="h-full w-full backdrop-brightness-50 flex justify-center items-center text-center px-2">
								<p class="font-semibold text-primary">{termek}</p>
							</div>
						</div>
					</a>
				</div>
			{/each}
		</div>
	{/if}

</main>