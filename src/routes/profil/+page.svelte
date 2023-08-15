<script>
	import { fade, fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';

	export let data;

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

   <div in:fly={{ y: -120, easing: cubicOut }} class="w-full flex justify-center items-center">
      <form use:enhance action="?/changeAvatar" method="POST" enctype="multipart/form-data">
			<h1 class="text-center text-[#ffb68e] text-3xl font-semibold my-2">{data.name}</h1>
         <label for="avatar">
            <img class="rounded-[5rem] hover:rounded-3xl transition-all" src="/api/avatar" alt="">
         </label>
         <input on:input={(e) => {e.target.form.submit();}} hidden type="file" name="avatar" id="avatar" value="" accept="image/*">
      </form>
   </div>

	<!-- Értesítések button -->
	{#if localStorage.getItem('pushSubscriptionData')}
		<div class="flex justify-center">
			<a href="/change/notification" class="button-primary button-notification-on">Értesítések</a>
		</div>
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
         <button class="text-[#ffb68e] font-semibold outline outline-[#9f8d84] outline-1 w-max mx-auto rounded-3xl hover:rounded-lg transition-all p-2 px-4">Kijelentkezés</button>
      </form>
   </div>

</main>

<style>
	.button-notification-on {
		@apply
		bg-background
		outline
		outline-1
		outline-tertiary
		text-tertiary;
	}
</style>