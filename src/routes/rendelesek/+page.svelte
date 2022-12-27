<script>
   import { slide } from 'svelte/transition';
   import Topbar from '$lib/components/Topbar.svelte';
	import { fade } from 'svelte/transition';

   export let data;
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
	
	{#each data.elozmenyLista as record}

		{#if record.status == 'fuggoben'}
			<h1 class="status">Függőben</h1>
		{:else if record.status == 'folyamatban'}
			<h1 class="status">Átvehető!</h1>
		{:else if record.status == 'kesz'}
			<h1 class="status">{record.updated.slice(0, -8)}</h1>
		{:else}
			<h1 style="opacity: 45%;" class="status">Törölve</h1>
		{/if}

		<div class="grid-container {record.status}">
			{#each Object.keys(record.termekek) as termek}
				<div class="grid-cell termek">{termek}</div>
				<div class="grid-cell darab">{record.termekek[termek].darab} db</div>
				<div class="grid-cell ar">{record.termekek[termek].ar} Ft</div>
			{/each}
		</div>
	{/each}
	
</main>

<style lang="scss">

:global(*) {
      margin: 0;
      padding: 0;
      list-style: none;
      text-decoration: none;
      -webkit-tap-highlight-color: transparent;
   }

	:global(body) {
		background-color: black;
      scrollbar-width: none;

      ::-webkit-scrollbar {
         width: 0;
      }
	}

   /* ----------------------------------------- */

main {

	.status {
		color: white;
		text-align: center;
		margin-top: 5%;
		margin-bottom: 1%;
	}

	.grid-container {
		background-color: var(--main-color);
		display: grid;
		grid-template-columns: auto auto auto;
		margin: 0 5%;
		color: white;
		border-radius: 1em;
		overflow: hidden;
		text-align: center;
		font-size: larger;

		.grid-cell {
			padding: .5em 0;
		}

		.termek {
			&:nth-of-type(even) {
				background-color: #161616;
			}
		}

		.darab {
			&:nth-of-type(odd) {
				background-color: #161616;
			}
		}

		.ar {
			&:nth-of-type(even) {
				background-color: #161616;
			}
		}

	}

	.fuggoben {
		opacity: 70%;
		outline: 2px solid white;
	}

	.folyamatban {
		outline: 2px solid var(--accent-color);
	}

	.torolve {
		text-decoration: line-through;
		opacity: 50%;
	}

	.kesz {

	}

	.total {
		background-color: #252525;
		padding: .5em;
		margin: 3%;
		margin-bottom: 5%;
		border-radius: 1em;

		h3 {
			color: white;
			text-align: center;

			span {
				color: var(--accent-color);
			}
		}
	}


}

</style>