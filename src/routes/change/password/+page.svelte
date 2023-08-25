<script>
	import { fade } from 'svelte/transition';
	import Topbar from '$lib/components/Topbar.svelte';

	export let form;

	let email = form?.email;
</script>

	<main in:fade={{ duration: 180 }}>
		<Topbar
			targeturl={'/profil'}
			text={'Jelszó'}
		></Topbar>

		<div class="text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">

			<img src="/favicon.png" class="block mx-auto" alt="" />
			{#if form?.status === 200}
				<h1 class="mt-5 font-semibold text-lg w-max">Kövesd az E-mailben kapott utasításokat!</h1>
			{:else}
			{#if form?.status}
				<h1>Hiba! {form.status}</h1>
				{:else}
					<h1 class="mt-5 font-semibold text-lg">Add meg az E-mail címed!</h1>
					<form class="mt-3" method="post">
						<div class="flex justify-center items-center gap-1 mt-2">
							<input name='email' autocapitalize="none" bind:value={email} type="text" placeholder="Kandós e-mail" class="bg-[#201a17] transition-all duration-100 ease-in outline outline-[#9f8d84] focus:placeholder:text-background outline-1 w-32 py-2 px-3 rounded-xl placeholder:text-center text-center focus:outline-[#ffb68e] placeholder:text-[#e6beaa] focus:outline-2"/>
							<p>@kkszki.hu</p>
						</div>
						<br>
						{#if email}
							<button class="bg-primary text-on-primary p-2 px-4 w-max rounded-full focus:rounded-md transition-all font-semibold" in:fade={{ duration: 300 }}>Jelszó változtató E-mail küldése</button>
						{/if}
					</form>
				{/if}
			{/if}
		</div>
	</main>