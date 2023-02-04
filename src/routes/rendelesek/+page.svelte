<script>
   import { slide, fade } from 'svelte/transition';
	import { deserialize } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
   import Topbar from '$lib/components/Topbar.svelte';

   export let data;
	let lastOpenMenu;

	function openMenu(i, record) {
		if (lastOpenMenu == i) lastOpenMenu = undefined
		else if (record.status != 'folyamatban') lastOpenMenu = i
	}

	async function handleSubmit(event) {
		if (confirm('Biztos végleg törlöd a rendelést? A törölt rendelések nem számitanak bele az ár összesitésbe!')) {
			const data = new FormData(this);
      	const response = await fetch(this.action, {
				method: 'POST',
				body: data
			})

			const result = deserialize(await response.text());

			if (result.type == 'success') {
				openMenu(lastOpenMenu)
				invalidateAll()
			};
		}
   }
</script>

<main in:fade={{duration: 180}}>

   <Topbar
      target={'Menü'}
      targeturl={'/'}
      text={'Rendelések'}
      background={'none'}
      flyin={{y: -200}}
		hideProfile={0}
   ></Topbar>

	<div class="total">
		<h3>Összesen: <span>{data.total} Ft</span></h3>
	</div>
	
	{#each data.elozmenyLista as record, i (record.id)}

		{#if record.status == 'fuggoben'}
			<h1 in:slide={{duration: 350}} class="status">Függőben</h1>
		{:else if record.status == 'folyamatban'}
			<h1 in:slide={{duration: 350}} class="status">Átvehető!</h1>
		{:else if record.status == 'kesz'}
			<h1 in:slide={{duration: 350}} class="status">{record.updated.slice(0, -8)}</h1>
		{:else}
			<h1 in:slide={{duration: 350}} style="opacity: 45%;" class="status">Törölve</h1>
		{/if}

		<div on:click={() => {openMenu(i,record)}} out:slide|local={{duration: 350}} class="grid-container {record.status}" class:menu-grid-container={lastOpenMenu == i}>
			{#each Object.keys(record.termekek) as termek}
				<div class="grid-cell termek">{termek}</div>
				<div class="grid-cell darab">{record.termekek[termek].darab} db</div>
				<div class="grid-cell ar">{record.termekek[termek].ar} Ft</div>
			{/each}
		</div>
		{#if lastOpenMenu == i && record.status != 'folyamatban'}
			<div in:slide={{duration: 250}} out:slide|local={{duration: 350}} class="menu">
				<form method="POST" on:submit|preventDefault={handleSubmit}>
					<input hidden name="recordID" type="text" value="{JSON.stringify(record.id)}">
					<button>Törlés</button>
				</form>
			</div>
		{/if}
	{/each}
	
</main>

<style lang="postcss">

</style>