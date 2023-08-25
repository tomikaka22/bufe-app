<script>
   import { page } from '$app/stores';
   import { goto } from '$app/navigation';
	import { deserialize } from '$app/forms';
   import { fade } from 'svelte/transition';
   import { cart, total } from '$lib/stores/Cart.js';
	import { touchRadius } from '$lib/frontendUtils/touchRadius.js';
   import Topbar from '$lib/components/Topbar.svelte';
	import Notice from '$lib/components/dialogs/Notice.svelte';

   export let data;

	let showFavorite = false;

	let showModal = false;
	let modalTitle;
	let modalText;

   const termek = data.termekek.termek;
   const maxAmount = data.termekek.darab;

	let totalDarab = 0; // eddigi hozzaadott termekek + darab
   let darab = 1;
   $: price = data.termekek.ar * darab + feltetek.map((feltet => { return Number(data.termekek.feltetek[feltet].ar); })).reduce((a, b) => a + b, 0) * darab; // 1 db termék ára szorozva darabbal, feltétek árának összege szorozva darabbal
	let feltetek = [];

	if (localStorage.getItem('CartContent')) {
		$cart = JSON.parse(localStorage.getItem('CartContent'));
		if ($cart[termek])
			$cart[termek].forEach(x => {
				totalDarab += x.darab;
			});
	}

	function subtractAmount() {
		if (darab > 1) {
			darab--;
			totalDarab--;
		}
	}

	function addAmount() {
		if (totalDarab+1 < maxAmount) {
			darab++;
			totalDarab++;
		}
	}

	function feltetChange(feltet) {
		if (feltetek.includes(feltet)) {
			feltetek = feltetek.filter(item => item !== feltet);
		} else {
			feltetek = [ ...feltetek, feltet ];
		}
		feltetek.sort();
	}

	function buy() {
		if (totalDarab < maxAmount) {
			let alreadyInCart = false;
			if ($cart[termek]) {
				$cart[termek].forEach((x, i) => {	// Ha már van egy ugyanilyen termék ugyanilyen feltétekkel akkor összevonja a kettő rendelést és növeli a darabszámát, árát
					if (JSON.stringify(x.feltet) === JSON.stringify(feltetek)) {
						$cart[termek][i].darab += darab;
						$cart[termek][i].ar += price;
						alreadyInCart = true;
					}
				});
			}
			if (!alreadyInCart)	// Hozzáadja a terméket a kosárhoz ha nincs benne ugyanilyen feltétekkel rendelkező termék.
				$cart[termek] = $cart[termek] ? [ ...$cart[termek], { 'ar': price, darab, 'feltet': feltetek } ] : [ { 'ar': price, darab, 'feltet': feltetek } ];

			$total = { 'ar': 0, 'darab': 0 };	// Kosár total újraszámolása
			Object.keys($cart).forEach(termek => {
				$cart[termek].forEach(x => {
					$total.ar += x.ar;
					$total.darab += x.darab;
				});
			});

			localStorage.setItem('CartContent',JSON.stringify($cart));
			localStorage.setItem('Total',JSON.stringify($total));

			goto('/list?Category='.concat($page.url.searchParams.get('Category')));
		} else {
			modalTitle = 'Hiba.';
			modalText = `Túl sok ${termek} van már a kosárban!`;
			showModal = true;
		}

	}

	async function flipIMG(e) {
		if (e.target.id === 'svg-star' || e.target.id === 'svg-path') {
			const form = document.querySelector('form');
			const formData = new FormData(form);

			const response = await fetch(form.action, {
				method: 'POST',
				body: formData
			});

			const result = deserialize(await response.text());

			if (result.type === 'success')
				if (data.kedvencek.includes(data.termekek.id))
					data.kedvencek = data.kedvencek.filter(kedvenc => kedvenc !== data.termekek.id);
				else
					data.kedvencek = [ ...data.kedvencek, data.termekek.id ];
		}
		else
			showFavorite = !showFavorite;
	}

</script>

<main in:fade={{ duration: 180 }}>

   <Topbar
      targeturl={$page.url.searchParams.get('referrer') || '/list'}
      text={termek}
   ></Topbar>

	<Notice bind:showModal title={modalTitle} text={modalText}></Notice>

	<div class="px-6">
		<div>
			<h1 class="text-primary text-center mb-2 text-xl font-semibold">{termek}</h1>
			<div class="flex justify-center w-full">
				<button on:click={flipIMG}>
					{#if !showFavorite}
						<div in:fade={{ duration: 200 }} class="w-72 aspect-square rounded-3xl transition-all overflow-hidden bg-no-repeat bg-center bg-[url('/termek-drop.avif')]">
							<img class="w-full h-full failover-image" id="{data.termekek.foto}" src="/api/files/termekek/{data.termekek.id}/{data.termekek.foto}" alt="">
						</div>
					{:else}
						<form method="POST" in:fade={{ duration: 200 }} class="w-72 aspect-square rounded-3xl bg-foreground flex flex-col justify-center items-center">
							{#if data.kedvencek.includes(data.termekek.id)}
								<svg in:fade id="svg-star" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
									height="80" viewBox="0 -1600 1600 1600" width="80"><path id="svg-path" d="m388.333 -133.333
									108.333 -468.333L133.333 -916.667l480 -41.667 186.667 -441.667 186.667 441.667
									480 41.667 -363.333 315 108.333 468.333 -411.667 -248.333L388.333 -133.333Z"/>
								</svg>
							{:else}
								<svg in:fade id="svg-star" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
									height="80" viewBox="0 -1600 1600 1600" width="80"><path id="svg-path" d="M538.333 -341.667
									800 -498.332l261.667 158.333 -70 -296.665 230 -200 -303.335 -26.665 -118.333 -280
									-118.333 278.333 -303.335 26.665 230 200 -70 296.665Zm-150 208.332 108.333 -468.333L133.333
									-916.667l480 -41.667 186.667 -441.665 186.665 441.667 480 41.667 -363.335 315 108.333 468.333L800
									-381.667 388.333 -133.335ZM800 -725Z"/>
								</svg>
							{/if}
							<input type="text" hidden name="id" value="{data.termekek.id}">
								<p class="font-semibold">Kedvenc</p>
						</form>
					{/if}
				</button>
			</div>

			<h4 class="text-center font-semibold mt-2">{data.termekek.leiras}</h4>

	{#if maxAmount}
		{#key price}
			<div class="flex w-full justify-center items-center">
				<div class="mt-5 outline outline-tertiary outline-1 rounded-lg px-5 font-semibold text-lg py-1">
					<h2 class="font-semibold text-on-tertiary-container" in:fade="{{ duration: 200 }}">{price} Ft</h2>
				</div>
			</div>
		{/key}

		<div class="flex w-full justify-center">
			<div class="mt-5 flex justify-center items-center text-3xl rounded-2xl">
				<div class="bg-secondary flex justify-center items-center rounded-2xl w-16 text-on-secondary transition-all" on:click="{(e) => {subtractAmount(); touchRadius(e.target.parentElement, '0.5rem', '1rem', 40);}}">
					<button class="p-3 px-5">-</button>
				</div>
				<div class="px-5 py-2 text-tertiary">{#key darab}<span in:fade="{{ duration: 200 }}">{darab}</span>{/key}</div>
				<div class="bg-secondary flex justify-center items-center rounded-2xl w-16 text-on-secondary transition-all" on:click="{(e) => {addAmount(); touchRadius(e.target.parentElement, '0.5rem', '1rem', 40);}}">
					<button class="p-3 px-5">+</button>
				</div>
			</div>
		</div>

		<div class="flex w-full justify-center items-center">
			<button on:click={buy} class="mt-5 text-lg transition-all bg-primary-container text-on-primary-container py-2 px-10 rounded-3xl hover:rounded-lg hover:bg-primary hover:text-on-primary font-semibold">
				Kosárba
			</button>
		</div>

		{#if data.termekek.feltetek}
			<div class="flex w-full justify-center">
				<div class="w-10/12 mt-3 rounded-2xl mb-32 transition-all">
					<p class="text-center my-1 font-semibold">Feltétek</p>
					<div>
						{#each Object.keys(data.termekek.feltetek) as feltet}
							<div class:active={feltetek.includes(feltet)} class="flex justify-between mx-2 mb-2 outline outline-1 outline-outlin rounded-xl p-2 transition-all" on:click={() => {feltetChange(feltet);}}>
								<div>{feltet}</div> <div class:ar={feltetek.includes(feltet)} class="text-on-tertiary-container">{data.termekek.feltetek[feltet].ar} Ft</div>
							</div>
						{/each}
					</div>
				</div>
			</div>
		{/if}
	{:else}
		<div class="flex w-full mt-5 justify-center items-center">
			<div class="text-lg transition-all bg-on-error text-error rounded-xl py-2 px-10 font-semibold">
				<div>Elfogyott</div>
			</div>
		</div>
	{/if}

	</div>

</main>

<style lang="postcss">
	.active {
		background-color: #4b481d;
		color: #eae5ab;
		outline: none;
		border-radius: .5rem;
		@apply font-semibold;
	}

	.ar {
		@apply text-secondary;
	}

	.failover-image[id=''] {
		visibility: hidden;
	}
</style>