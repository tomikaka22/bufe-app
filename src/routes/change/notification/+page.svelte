<script>
	import { fade } from 'svelte/transition';
	import { urlB64ToUint8Array } from '$lib/frontendUtils/utils.js';
	import Topbar from '$lib/components/Topbar.svelte';
	import Notice from '$lib/components/dialogs/Notice.svelte';

	export let data;

	let showModal = false;
	let modalTitle;
	let modalText;

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

			const pushSubscriptionData = JSON.stringify(await serviceWorker.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey }));
			localStorage.setItem('pushSubscriptionData', pushSubscriptionData);

			subscribeForm[0].value = pushSubscriptionData;
			subscribeForm.submit();
		}
	}

	async function pushDelete() {
		localStorage.removeItem('pushSubscriptionData');
		deleteForm.submit();
	}

</script>

<main in:fade={{ duration: 180 }}>
	<Topbar
		targeturl={'/profil'}
		text={'Értesítések'}
	></Topbar>

	<Notice bind:showModal title={modalTitle} text={modalText}></Notice>

	<div class="absolute -z-10 text-center top-0 bottom-0 left-0 right-0 flex flex-col justify-center items-center">

		{#if data.linkedSubscription}

			{#if JSON.parse(localStorage.getItem('pushSubscriptionData'))?.keys.auth === data.linkedSubscription?.keys.auth }
				<h1 class="text-tertiary text-2xl mx-6">Az értesítések bevannak kapcsolva</h1>
				<button on:click={pushDelete} class="button-primary button-notification-on">Értesítések kikapcsolása</button>
			{:else}
				<h1 class="text-error text-2xl mx-6">Az értesítések már bevannak kapcsolva egy másik eszközön.</h1>
				<button on:click={pushSubscribe} class="outline outline-1 outline-error-container text-error font-semibold p-2 px-4 mt-3 rounded-3xl hover:rounded-lg transition-all">Értesítések átirányítása</button>
			{/if}

		{:else}
			<button on:click={pushSubscribe} class="button-primary">Értesítések bekapcsolása</button>
		{/if}

	</div>

	<!-- Registration forms -->
	<form bind:this={subscribeForm} action="?/subscribe" method="post">
		<input hidden name="pushSubscriptionData" type="text">
	</form>

	<form bind:this={deleteForm} action="?/delete" method="post">
	</form>
</main>

<style lang="postcss">
	.button-notification-on {
		@apply bg-background outline outline-1 outline-tertiary text-tertiary;
	}
</style>