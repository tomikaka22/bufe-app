<script>
   import { slide } from 'svelte/transition';
   import Topbar from '$lib/components/Topbar.svelte';

   export let data;
	delete data.name;
</script>

<main>

   <Topbar
      target={'Menü'}
      targeturl={'/'}
      text={'Rendelések'}
      background={'none'}
      flyin={{y: -200}}
   ></Topbar>

   {#each [...Object.keys(data)].reverse() as item ([...Object.keys(data)].reverse())}

		{#if data[item].status == 'folyamatban'}
			<p id="card-text">folyamatban</p>
		{:else if data[item].status == 'torolve'}
			<p style="color: rgba(255, 255, 255, 0.5)" id="card-text">törölve</p>
		{:else if data[item].status == ''}
			<p style="color: #cf610088;" id="card-text">Függőben</p>
		{:else}
			<p style="color: rgba(255, 255, 255, 0.8);" id="card-text">{data[item].updated.slice(0, -8)}</p>
		{/if}

		{#if data[item].status == 'fuggoben'}
			<div in:slide class="rendeles-card fuggoben-card">
				<div class="rendeles-cell">
					{#each [...Object.keys(data[item].rendeles)].reverse() as a}
						{#if a != 'name'}
							<p class:torolve-cell='{data[item].status == 'torolve'}'>{a}</p>
						{/if}
					{/each}
				</div>

				<div class="rendeles-cell">
					{#each [...Object.keys(data[item].rendeles)].reverse() as a}
						{#if a != 'name'}
							<p class:torolve-cell='{data[item].status == 'torolve'}'>{data[item].rendeles[a][0]} db</p>
						{/if}
					{/each}
				</div>

				<div class="rendeles-cell">
					{#each [...Object.keys(data[item].rendeles)].reverse() as a}
						{#if a != 'name'}
							<p class:torolve-cell='{data[item].status == 'torolve'}'>{data[item].rendeles[a][1]} Ft</p>
						{/if}
					{/each}
				</div>
			</div>
		{/if}

		{#if data[item].status == 'folyamatban'}
		<div in:slide class="rendeles-card folyamatban-card">
			<div class="rendeles-cell">
				{#each [...Object.keys(data[item].rendeles)].reverse() as a}
					{#if a != 'name'}
						<p>{a}</p>
					{/if}
				{/each}
			</div>

			<div class="rendeles-cell">
				{#each [...Object.keys(data[item].rendeles)].reverse() as a}
					{#if a != 'name'}
						<p>{data[item].rendeles[a][0]} db</p>
					{/if}
				{/each}
			</div>

			<div class="rendeles-cell">
				{#each [...Object.keys(data[item].rendeles)].reverse() as a}
					{#if a != 'name'}
						<p>{data[item].rendeles[a][1]} Ft</p>
					{/if}
				{/each}
			</div>
		</div>
	{/if}

	{#if data[item].status == 'torolve'}
		<div in:slide class="rendeles-card torolve-card">
			<div class="rendeles-cell">
				{#each [...Object.keys(data[item].rendeles)].reverse() as a}
					{#if a != 'name'}
						<p class:torolve-cell='{data[item].status == 'torolve'}'>{a}</p>
					{/if}
				{/each}
			</div>

			<div class="rendeles-cell">
				{#each [...Object.keys(data[item].rendeles)].reverse() as a}
					{#if a != 'name'}
						<p class:torolve-cell='{data[item].status == 'torolve'}'>{data[item].rendeles[a][0]} db</p>
					{/if}
				{/each}
			</div>

			<div class="rendeles-cell">
				{#each [...Object.keys(data[item].rendeles)].reverse() as a}
					{#if a != 'name'}
						<p class:torolve-cell='{data[item].status == 'torolve'}'>{data[item].rendeles[a][1]} Ft</p>
					{/if}
				{/each}
			</div>
		</div>
	{/if}

	{#if data[item].status == 'kesz'}
		<div in:slide class="rendeles-card kesz-card">
			<div class="rendeles-cell">
				{#each [...Object.keys(data[item].rendeles)].reverse() as a}
					{#if a != 'name'}
						<p>{a}</p>
					{/if}
				{/each}
			</div>

			<div class="rendeles-cell">
				{#each [...Object.keys(data[item].rendeles)].reverse() as a}
					{#if a != 'name'}
						<p>{data[item].rendeles[a][0]} db</p>
					{/if}
				{/each}
			</div>

			<div class="rendeles-cell">
				{#each [...Object.keys(data[item].rendeles)].reverse() as a}
					{#if a != 'name'}
						<p>{data[item].rendeles[a][1]} Ft</p>
					{/if}
				{/each}
			</div>
		</div>
	{/if}

	{#if data[item].status == ''}
		<div in:slide class="rendeles-card fuggoben-card">
			<div class="rendeles-cell">
				{#each [...Object.keys(data[item].rendeles)].reverse() as a}
					{#if a != 'name'}
						<p>{a}</p>
					{/if}
				{/each}
			</div>

			<div class="rendeles-cell">
				{#each [...Object.keys(data[item].rendeles)].reverse() as a}
					{#if a != 'name'}
						<p>{data[item].rendeles[a][0]} db</p>
					{/if}
				{/each}
			</div>

			<div class="rendeles-cell">
				{#each [...Object.keys(data[item].rendeles)].reverse() as a}
					{#if a != 'name'}
						<p>{data[item].rendeles[a][1]} Ft</p>
					{/if}
				{/each}
			</div>
		</div>
	{/if}

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

   .rendeles-card {
      width: 85vw;
      margin: 3% auto;
      padding: 5% 3%;
      outline: 2px solid rgb(51, 51, 51);
      background-color: #161616;
      display: grid;
      grid-template-columns: 50% 25% 25%;
      border-radius: 1em;

      .rendeles-cell {
         display: flex;
         flex-direction: column;
         justify-content: center;
         gap: 5%;

         p {
            color: rgba(255, 255, 255, 0.932);
            border-bottom: 1px solid #cf610088;
            font-size: medium;

            &:last-of-type {
               border-bottom: 0;
            }
         }
      }
   }

	.fuggoben-card {
		background-color: #cf610062;
		opacity: 70%;
	}

	.folyamatban-card {
		background-color: #cf610086;
	}

	.torolve-card {
		background-color: rgb(53, 53, 53);
	}

	.torolve-cell {
		text-decoration: line-through;
		color: rgba(255, 255, 255, 0.5);
		text-decoration-color: lightgray;

	}

	#card-text {
		text-align: center;
		color: var(--accent-color);
		font-weight: 800;
		
	}
}

</style>