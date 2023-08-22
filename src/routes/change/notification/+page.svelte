<script>
	import { fade } from 'svelte/transition';
	import { urlB64ToUint8Array } from '$lib/frontendUtils/utils.js';
	import Topbar from '$lib/components/Topbar.svelte';
	import Notice from '$lib/components/dialogs/Notice.svelte';

	let showModal = false;
	let modalTitle;
	let modalText;

	let submitting = false;
	let pushSubscriptionData;
	let subscribeForm;
	let deleteForm;

	async function notificationRequest() {
		if (Notification.permission === 'default') {
			modalTitle = 'Értesítések bekapcsolása.';
			modalText = 'Ahhoz hogy infót kapj a rendelésed állapotáról engedélyezd az értesítéseket.';
			showModal = true;
			await Notification.requestPermission();
		}

		return Notification.permission;
	}

	async function pushSubscribe() {
		if (await notificationRequest() === 'granted') {
			const serviceWorker = await navigator.serviceWorker.getRegistration('/');
			const applicationServerKey = urlB64ToUint8Array('BN5M32D0WPnvIRlNo8YoJ4Obrb4ok0ULSSbyDqCvhoq0KdTMJ2xKm3YytmPPk2Ve32OyipWUpjt_4r0H_pyifbI');

			pushSubscriptionData = JSON.stringify(await serviceWorker.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey }));
			localStorage.setItem('pushSubscriptionData', pushSubscriptionData);

			subscribeForm[0].value = pushSubscriptionData;
			subscribeForm.submit();
		}
	}

	async function pushDelete() {
		localStorage.removeItem('pushSubscriptionData');
		pushSubscriptionData = undefined;
		deleteForm.submit();
	}

</script>

<main in:fade={{ duration: 180 }}>
	<Topbar
		targeturl={'/profil'}
		text={'Értesítések'}
	></Topbar>

	<Notice bind:showModal title={modalTitle} text={modalText}></Notice>

	<div class="text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">

		{#if localStorage.getItem('pushSubscriptionData')}

			<h1 class="text-tertiary text-2xl">Az értesítések bevannak kapcsolva</h1>

			{#if !submitting}
				<button on:click={pushDelete} class="button-primary button-notification-on">Értesítések kikapcsolása</button>
			{:else}
				<button in:fade={{ duration: 200 }} class="button-primary button-notification-submitting">Értesítések kikapcsolása</button>
			{/if}
		{:else}
			{#if !submitting}
				<button on:click={pushSubscribe} class="button-primary">Értesítések bekapcsolása</button>
			{:else}
				<button  class="button-primary button-notification-submitting">Értesítések bekapcsolása</button>
			{/if}
		{/if}

	</div>

	<!-- Registration forms -->
	<form bind:this={subscribeForm} action="?/subscribe" method="post">
		<input hidden name="pushSubscriptionData" type="text">
	</form>

	<form bind:this={deleteForm} action="?/delete" method="post">
	</form>
</main>

<style>
	.button-notification-on {
		@apply bg-background outline outline-1 outline-tertiary text-tertiary;
	}

	.button-notification-submitting {
		@apply bg-background outline outline-1 outline-tertiary text-tertiary brightness-50;
	}
</style>