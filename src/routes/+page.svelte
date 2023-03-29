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
			<div class="bg-[#52443c] bg-[url('/money.png')] bg-cover bg-center bg-no-repeat rounded-3xl hover:rounded-2xl transition-all overflow-clip">
				<p class="py-12 pl-10 font-semibold text-lg my-3 backdrop-brightness-[.6]">Rendelések</p>
			</div>
		</a>
	</div>

	<div class="flex">
		<div>

		</div>
		<div>

		</div>
		<div>

		</div>
	</div>

	<!-- <h2 class="text-center">{data.splash}</h2> -->

</main>