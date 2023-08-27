<script>
	import AdminTopbar from '$lib/components/AdminTopbar.svelte';

	export let data;
	export let banModal;

	let input;

</script>

<dialog class="bg-surface-variant w-fit rounded-2xl text-secondary" bind:this={banModal}>
	<AdminTopbar midText={'Tiltás'} input={input} modal={banModal}></AdminTopbar>
		<div class="m-4">
			<h1 class="text-xl font-semibold text-primary">Kitiltott e-mailek:</h1>
			{#each data.banLista as ban, i (i)}
				<form bind:this={input} class="text-primary font-semibold text-lg" action="?/unban" method="POST">
					<div class="flex gap-2 items-center">
						<p class="px-2 my-1 w-fit bg-error rounded-lg text-on-error">{ban.email.replace('@kkszki.hu','')}</p>
						<button class="outline outline-1 px-2 rounded-2xl text-tertiary transition-all hover:text-error-container">Pardon</button>

						<input type="text" hidden name="email" value="{ban.email}">
					</div>
				</form>
			{/each}

			<h1 class="text-xl mt-10 font-semibold text-primary">e-mailek:</h1>
			{#each data.felhasznalokLista as user, i (i)}
				{#if !user.tiltas}
					<form class:hidden={user.id === 'u1fy74rt1m48tx1'} bind:this={input} class="text-primary font-semibold text-lg" action="?/ban" method="POST">
						<div class="flex gap-2 items-center">
							<p class="px-2 my-1 w-fit bg-tertiary rounded-lg text-on-tertiary">{user.email.replace('@kkszki.hu','')}</p>
							<button class="outline outline-1 px-2 rounded-2xl text-error transition-all hover:text-error-container">Tiltás</button>

							<input type="text" hidden name="id" value="{user.id}">
						</div>
					</form>
				{/if}
			{/each}
		</div>
 </dialog>