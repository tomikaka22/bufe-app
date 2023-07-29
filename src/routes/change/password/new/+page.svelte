<script>
	import { fade } from 'svelte/transition';

	export let form;

	let password;
	let password2;
</script>

	<main in:fade={{ duration: 180 }} class="w-screen h-screen flex justify-center items-center">
		<div class="text-center">

			{#if form?.status === 200}
				<img src="/favicon.png" class="block mx-auto" alt="" />

				<div class="w-full text-center mt-6">
					<h1 class="font-semibold text-xl">Sikeres jelszó változtatás!</h1>
					<p class="mx-5 my-2">Menj vissza az applikációba és jelentkezz be.</p>
				</div>

			{:else}

				{#if form?.status}
					<h1>Hiba! {form.status}</h1>
				{:else}
					<img src="/favicon.png" class="block mx-auto" alt="" />
					<h1 class="mt-2 font-semibold text-lg text-primary">Adj meg egy új jelszót.</h1>
					<form class="mt-3" method="post">
						<input name='password' type="password" placeholder="Jelszó" bind:value={password} class="bg-[#201a17] transition-all duration-100 ease-in outline outline-[#9f8d84] focus:placeholder:text-background outline-1 w-52 py-2 px-3 rounded-xl placeholder:text-center text-center focus:outline-[#ffb68e] placeholder:text-[#e6beaa] focus:outline-2"/>
						<br>
						<input name='password2' type="password" placeholder="Jelszó mégegyszer" bind:value={password2} class="bg-[#201a17] transition-all duration-100 ease-in outline outline-[#9f8d84] focus:placeholder:text-background outline-1 w-52 py-2 px-3 mt-5 rounded-xl placeholder:text-center text-center focus:outline-[#ffb68e] placeholder:text-[#e6beaa] focus:outline-2"/>
						<br>
						{#if password && password2 && password === password2 && password.length >= 8}
							<button class="w-auto bg-[#ffb68e] text-[#201a17] p-2 px-4 rounded-full mt-5 focus:rounded-md transition-all font-semibold" in:fade={{ duration: 300 }}>Jelszó megváltoztatása</button>
						{/if}

						{#if password && password2 && password.length < 8 && password.length === password2.length}
							<p class="mt-5 font-semibold text-error text-xl">A megadott jelszó nem elég hosszú</p>
						{/if}

						{#if password && password2 && password !== password2}
							<p class="mt-5 font-semibold text-error text-xl">A jelszavak nem egyeznek!</p>
						{/if}


						<p class="mt-3 font-semibold">Legalább 8 karakter</p>
						<p>(nagybetű és szimbólum ajánlott)</p>
					</form>
				{/if}
			{/if}
		</div>
	</main>