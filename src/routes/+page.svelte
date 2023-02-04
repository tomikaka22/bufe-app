<script>
   import { fade } from 'svelte/transition';

   export let data;
</script>

<main in:fade={{duration: 180}}>

<h1>Jónapot <span style="color: var(--accent-color);">{data.name}!</span></h1>

<div class="grid-container">

	<a href="/list" class="grid-cell termekek-cell">
		<p>Termekek</p>
	</a>
	<a href="/profil" class="grid-cell profil-cell">
		<p>Profil</p>
	</a>
	<a href="/rendelesek" class="grid-cell rendelesek-cell">
		<p>Rendelések</p>
	</a>
	<a href="/kosar?referrer=/" class="grid-cell kosar-cell">
		<p>Kosár</p>
	</a>
	<a href="/{data.randomTermek}?referrer=/" class="grid-cell random-cell">
		<p>Random</p>
	</a>

</div>

<h2>{data.splash}</h2>

</main>
<style lang="postcss">

</style>