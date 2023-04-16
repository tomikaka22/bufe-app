<script>
	import { fade } from 'svelte/transition';

	export let form;

	let email = form?.email;
	let password;
</script>

	<main in:fade={{ duration: 180 }} class="w-screen h-screen flex items-center">
		<div class="text-center">

			<!-- <h1 class="block mx-auto mb-10 text-3xl">Kandó Büfé</h1> -->
			<img src="favicon.png" class="block mx-auto mb-10" alt="" />
			<form method="post">
				<input placeholder="Kandós e-mail" class="bg-[#201a17] transition-all duration-100 ease-in outline outline-[#9f8d84] focus:placeholder:text-background outline-1 w-32 py-2 px-3 mt-2 mb-5 rounded-xl placeholder:text-center text-center focus:outline-[#ffb68e] placeholder:text-[#e6beaa] focus:outline-2" name='email' bind:value={email} type="text" /> <p class="inline-block">@kkszki.hu</p>
				<br>
				<input placeholder="Jelszó" class="bg-[#201a17] transition-all duration-100 ease-in outline outline-[#9f8d84] focus:placeholder:text-background outline-1 w-52 py-2 px-3 mt-2 mb-5 rounded-xl placeholder:text-center text-center focus:outline-[#ffb68e] placeholder:text-[#e6beaa] focus:outline-2" name='password' bind:value={password} type="password" />
				<br>
				{#if email && password}
					<button class="w-36 bg-[#ffb68e] text-[#201a17] p-2 rounded-full mt-2 focus:rounded-md transition-all font-semibold" in:fade={{ duration: 300 }}>Belépés</button>
				{/if}
				{#if form?.error && !password}
					<p in:fade={{ duration: 300 }} class="text-[#ffb4ab] font-semibold">{form?.error}</p>
				{/if}
			</form>
			<div class="w-screen text-center mt-6">
				<h2>Nincs még fiókod?</h2>
				<a href="/register"><button class="text-[#ffb68e] font-semibold outline outline-[#9f8d84] outline-1 w-max mx-auto rounded-full p-2 mt-2">Regisztráció</button></a>
				<a class="fixed bottom-0 left-0 w-full mb-10" href="https://demo.bufe.tomikaka.hu">
					<button class="text-[#ffb68e] font-semibold outline outline-[#9f8d84] outline-1 w-max mx-auto rounded-full p-2 mt-2">Demo-oldal</button>
				</a>
			</div>
		</div>
	</main>