<script>
	import { fade } from 'svelte/transition';

	export let form;

	let email = form?.email;
	let password;
</script>

	<main in:fade={{ duration: 180 }} class="w-screen h-screen flex items-center">
		<div class="text-center">

			<!-- <h1 class="block mx-auto mb-10 text-3xl">Kandó Büfé</h1> -->
			<img src="Logo.svg" class="block mx-32 mb-10" alt="" />
			<form class="flex flex-col items-center gap-5" method="post">
				<div class="flex items-center gap-1 w-52">
					<input placeholder="e-mail" autocapitalize="none" name='email' bind:value={email} type="text" class="bg-background duration-100 ease-in outline outline-outline focus:placeholder:text-background outline-1 w-full py-2 px-3 rounded-xl placeholder:text-center text-center focus:outline-primary placeholder:text-secondary focus:outline-2 transition-all"/>
					<p class="inline-block">@kkszki.hu</p>
				</div>
				<input type="password" name="password" bind:value={password} placeholder="Jelszó" class="bg-background outline outline-outline outline-1 w-52 py-2 px-3 rounded-xl placeholder:text-center text-center focus:placeholder:text-background focus:outline-primary placeholder:text-secondary focus:outline-2 transition-all"/>
				{#if email && password}
					<button class="w-36 bg-primary text-background p-2 rounded-full mt-6 focus:rounded-md transition-all font-semibold" in:fade={{ duration: 300 }}>Belépés</button>
				{/if}
				{#if form?.error && !password}
					<p in:fade={{ duration: 300 }} class="text-error font-semibold">{form?.error}</p>
				{/if}
			</form>
			<div class="w-screen text-center mt-6">
				<a href="/register">
					<button class="text-primary font-semibold outline outline-outline outline-1 w-max mx-auto rounded-full p-2 px-4">Regisztráció</button>
				</a>
			</div>
			<div class="mt-2">
				<a href="/change/password"><button class="text-primary font-semibold outline outline-outline outline-1 w-max mx-auto rounded-full p-2 px-4 mt-2">Elfelejtett jelszó</button></a>
			</div>
		</div>
	</main>