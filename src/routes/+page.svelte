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

<style lang="scss">
main {
	width: 100vw;
	height: 100vh;
	padding: 0 5%;
	display: flex;
	flex-direction: column;
	justify-content: center;

	h1 {
		color: white;
		text-align: center;
		font-size: x-large;
		margin: 2%;
	}

	h2 {
		color: white;
		text-align: center;
		margin-top: 18%;
	}

	.grid-container {
		display: grid;
		grid-template-columns: repeat(6, auto);
		grid-template-rows: repeat(4, auto);
		gap: 5%;

		.grid-cell {
			border-radius: 1.2em;
			background-color: var(--main-color);
			display: grid;
			align-items: center;
			justify-items: center;
			background-repeat: no-repeat;
			background-size: cover;
			background-position: center;
			padding: 15% 10%;

			p {
				color: black;
				font-size: x-large;
				-webkit-text-stroke: .8px white;
				font-weight: 800;
			}
		}

		.termekek-cell {
			grid-column-start: span 6;
			background-image: url('/favicon.png');
		}

		.profil-cell {
			grid-column-start: span 3;
			grid-row-start: span 3;
			background-image: url('/api/avatar');
		}

		.rendelesek-cell {
			grid-column-start: span 3;
			background-image: url('/favicon.png');
		}

		.kosar-cell {
			grid-column-start: span 1;
			grid-row-start: span 2;
			background-image: url('/shopping-basket.png');
			background-size: contain;
		}

		.random-cell {
			grid-column-start: span 2;
			grid-row-start: span 2;
			background-image: url('/favicon.png');
		}

	}

}

</style>
