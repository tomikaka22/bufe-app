<script>
	import { fade } from 'svelte/transition';
	import Button from '$lib/components/Button.svelte';

	export let data;
</script>

	<main in:fade={{ duration: 180 }} class="w-screen h-screen flex items-center">
		<div class="text-center">
			<img src="favicon.png" class="block mx-auto" alt="" />

			<div class="w-full text-center mt-6">
				<h1 class="font-semibold text-xl">Sikeres Regisztráció <span class="text-primary font-extrabold">{data.name.split(' ')[1]}</span>!</h1>
				<p class="mx-5 my-2">Az applikáció használatához erősítsd meg az E-mail címed!</p>
			</div>

			<div class="w-full flex justify-center mt-5">
				<a href="https://gmail.com" target="_blank">
					<Button text={'Gmail megnyitása'}></Button>
				</a>
			</div>

			<form method="POST" action="?/resend" class="w-full flex justify-center mt-2">
				<button class="text-secondary bg-secondary-container font-semibold w-max rounded-3xl hover:bg-primary-container hover:text-on-primary-container hover:rounded-lg transition-all p-2 px-4">E-mail újraküldése</button>
			</form>

			<div class="w-full text-center mt-5">
				<a href="/login"><button class="text-[#ffb68e] font-semibold outline outline-[#9f8d84] outline-1 w-max mx-auto rounded-3xl hover:rounded-lg transition-all p-2 mt-2">Belépés</button></a>
			</div>

			<div class="fixed bottom-0 w-screen mb-10">
				<form class="flex justify-center" method="POST" action="?/logout">
					<button class="text-[#ffb68e] font-semibold outline outline-[#9f8d84] outline-1 w-max mx-auto rounded-3xl hover:rounded-lg transition-all p-2">Kijelentkezés</button>
				</form>
			</div>
		</div>
	</main>