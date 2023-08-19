<script>
	export let midText;
	export let modal;
	export let input;
</script>

<div class="bg-surface-variant shadow-sm shadow-background grid grid-cols-3 font-semibold px-3.5 py-3.5 mb-5 w-full items-center sticky top-0 z-10">
	<div class="text-start">
		<button on:click={modal.close()} class="w-24 outline outline-1 transition-all hover:rounded-lg hover:bg-primary hover:outline-none hover:text-on-primary rounded-3xl p-0.5 px-4"><h1>Bezár</h1></button>
	</div>
	<div class="text-center text-lg text-primary">{midText}</div>
	<div class="text-end">
		<button on:click={input.submit()} class="w-24 outline outline-1 transition-all hover:rounded-lg hover:bg-primary hover:outline-none hover:text-on-primary rounded-3xl p-0.5 px-4"><h1>Mentés</h1></button>
	</div>
</div>
