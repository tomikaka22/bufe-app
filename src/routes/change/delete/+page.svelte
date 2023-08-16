<script>
	import { fade } from 'svelte/transition';
	import { goto } from '$app/navigation';
	import Topbar from '$lib/components/Topbar.svelte';

	export let form;

	async function handleSubmit(event) {
		const data = new FormData(this);
		await fetch(this.action, {
			method: 'POST',
			body: data
		});

		localStorage.clear();
		goto('/login');
	}

</script>

	<main in:fade={{ duration: 180 }}>
		<Topbar
			targeturl={'/profil'}
			text={'Jelszó'}
		></Topbar>

		{#if form?.error}
		<div class="text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
			<div class="w-64">
				<h1 class="font-semibold text-xl text-[#ff0000ce]">Hiba!</h1>
				<p class="font-semibold text-error">{form.error}</p>
			</div>
		</div>
		{:else}
			<div class="text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
				<div class="w-64">
					<h1 class="font-semibold text-xl">Biztos vagy benne hogy törlöd a fiókod?</h1>
					<form on:submit|preventDefault={handleSubmit} method="POST">
						<button class="bg-error-container text-on-error-container hover:bg-error hover:text-on-error hover:rounded-lg p-2 px-6 rounded-3xl mt-2 transition-all font-semibold" in:fade={{ duration: 300 }}>Fiók törlése</button>
					</form>
				</div>
			</div>
		{/if}
	</main>