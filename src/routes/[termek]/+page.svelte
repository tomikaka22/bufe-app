<script>
   import { page } from '$app/stores';
   import { goto } from '$app/navigation';
	import { deserialize } from '$app/forms';
   import { fade } from 'svelte/transition';
   import { cart, total } from '$lib/stores/Cart.js';
	import { touchRadius } from '$lib/frontendUtils/utils.js';
   import Topbar from '$lib/components/Topbar.svelte';
	import Notice from '$lib/components/dialogs/Notice.svelte';
	import Leiras from '$lib/components/Leiras.svelte';

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
      text={data.termekek.kategoria}
   ></Topbar>

	<Notice bind:showModal title={modalTitle} text={modalText}></Notice>

	<div class="px-10">
		<div>
			<h1 class="text-primary text-center mb-2 text-3xl font-semibold line-clamp-2 break-words">{termek}</h1>
			<div class="flex justify-center w-full">
				<button on:click={flipIMG}>
					{#if !showFavorite}
						<div in:fade={{ duration: 200 }} class="w-[19rem] aspect-square rounded-3xl transition-all overflow-hidden">
							<img class="w-full h-full object-cover" src="{data.termekek.foto ? `/api/files/termekek/${data.termekek.id}/${data.termekek.foto}` : '/termek-drop.avif'}" alt="">
						</div>
					{:else}
						<form method="POST" in:fade={{ duration: 200 }} class="w-[19rem] aspect-square rounded-3xl bg-foreground flex flex-col justify-center items-center">
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

			<div class="flex justify-center items-start gap-3 mt-3 px-5">

				<Leiras leiras={data.termekek.leiras}></Leiras>

				{#key price}
					<div class="rounded-lg px-2 outline outline-1 outline-tertiary font-semibold text-lg whitespace-nowrap">
						<h2 class="font-semibold text-tertiary text-center" in:fade="{{ duration: 200 }}">{price} Ft</h2>
					</div>
				{/key}
			</div>

	{#if maxAmount}
		{#if data.termekek.feltetek}
			<div class="flex w-full justify-center">
				<div class="w-full rounded-2xl mx-8 mt-4 transition-all">
					<p class="text-center mb-1 font-semibold">Feltétek</p>
					{#each Object.keys(data.termekek.feltetek) as feltet}
						<button class:active={feltetek.includes(feltet)} class="flex w-full justify-between mb-2 outline outline-1 outline-outlin rounded-xl p-2 transition-all" on:click={() => {feltetChange(feltet);}}>
							<div class="truncate">{feltet}</div> <div class:ar={feltetek.includes(feltet)} class="text-on-tertiary-container ml-5 whitespace-nowrap">{data.termekek.feltetek[feltet].ar} Ft</div>
						</button>
					{/each}
				</div>
			</div>
		{/if}

		<div class="flex w-full justify-center">
			<div class="mt-5 flex justify-center items-center text-3xl rounded-2xl">
				<button use:touchRadius={'.55rem'} class="bg-secondary flex justify-center items-center rounded-2xl w-14 aspect-square text-on-secondary transition-all" on:click={subtractAmount}>
					-
				</button>
				<div class="px-5 py-2 text-tertiary">{#key darab}<span in:fade="{{ duration: 200 }}">{darab}</span>{/key}</div>
				<button use:touchRadius={'.55rem'} class="bg-secondary flex justify-center items-center rounded-2xl w-14 aspect-square text-on-secondary transition-all" on:click={addAmount}>
					+
				</button>
			</div>
		</div>

		<div class="flex w-full justify-center items-center">
			<button on:click={buy} class="text-lg transition-all bg-primary-container text-on-primary-container py-2 px-8 mt-4 mb-32 rounded-3xl hover:rounded-lg hover:bg-primary hover:text-on-primary font-semibold">
				Kosárba
			</button>
		</div>
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
</style>