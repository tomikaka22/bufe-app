<script>
	import { fade, fly } from 'svelte/transition';
	import { version } from '$app/environment';
	import { cubicOut } from 'svelte/easing';
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import Notice from '$lib/components/dialogs/Notice.svelte';

	export let data;

	let showVersion = 0;

	let showModal = false;
	let modalTitle;
	let modalText;

	function submitAvatar(e) {
		if (e.target.files[0].size < 10485760)
			e.target.form.submit();
		else {
			modalTitle = Math.round(e.target.files[0].size / 1048576) + ' MB túl sok.';
			modalText = 'A kép mérete maximum 10 MB lehet!';
			showModal = true;
		}
	}

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

	<Notice bind:showModal title={modalTitle} text={modalText}></Notice>

   <div in:fly={{ y: -120, easing: cubicOut }} class="w-full flex flex-col justify-center items-center">
		<button on:click={() => { showVersion++; }} class="text-center text-primary text-3xl font-semibold px-2 my-2">{data.name}</button>
      <form use:enhance action="?/changeAvatar" method="POST" enctype="multipart/form-data">
         <label for="avatar">
            <div class="w-72 rounded-[5rem] hover:rounded-3xl transition-all overflow-hidden">
					<img class="w-full h-full object-cover" src="/api/avatar" alt="">
				</div>
         </label>
         <input on:change={submitAvatar} hidden type="file" name="avatar" id="avatar" value="" accept="image/*">
      </form>
   </div>

	<!-- Értesítések button -->
	{#if data.linkedSubscription}

		{#if JSON.parse(localStorage.getItem('pushSubscriptionData'))?.keys.auth === data.linkedSubscription?.keys.auth }
			<div class="flex justify-center">
				<a href="/change/notification" class="button-primary button-notification-on">Értesítések</a>
			</div>
		{:else}
			<div class="flex justify-center">
				<a href="/change/notification" class="outline outline-1 outline-error-container text-error font-semibold p-2 px-4 mt-3 rounded-3xl hover:rounded-lg transition-all">Értesítések</a>
			</div>
		{/if}

	{:else}
		<div class="flex justify-center">
			<a href="/change/notification" class="outline outline-1 p-2 px-4 mt-3 rounded-3xl hover:rounded-lg transition-all">Értesítések</a>
		</div>
	{/if}

	<div class="flex justify-center">
		<a href="/change/password" class="text-on-secondary-container bg-secondary-container font-semibold w-max mx-auto rounded-3xl hover:rounded-lg transition-all p-2 px-4 mt-3">Jelszó módositása</a>
	</div>
	<div class="flex justify-center">
		<a href="/change/delete" class="text-on-secondary-container bg-secondary-container font-semibold w-max mx-auto rounded-3xl hover:rounded-lg transition-all p-2 px-4 mt-3">Fiók törlése</a>
	</div>

   <div in:fly={{ y: 120 }} class="fixed bottom-0 w-full mb-24">
      <form on:submit|preventDefault={handleSubmit} class="flex justify-center" method="POST" action="?/logout">
         <button class="text-primary font-semibold outline outline-outline outline-1 w-max mx-auto rounded-3xl hover:rounded-lg transition-all p-2 px-4">Kijelentkezés</button>
      </form>
   </div>

	{#if showVersion >= 5 }
		<div class="flex w-full mt-20 justify-center brightness-50 text-outline">
			<p>{version}</p>
		</div>
	{/if}

</main>

<style lang="postcss">
	.button-notification-on {
		@apply
		bg-background
		outline
		outline-1
		outline-tertiary
		text-tertiary;
	}
</style>