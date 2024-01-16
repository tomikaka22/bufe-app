<script>
	import { fade } from 'svelte/transition';
</script>

<div in:fade={{ duration: 180 }} class="bg-secondary-container bg-opacity-50 w-full h-14 rounded-b-full flex items-center justify-between px-8 py-1">

	<div class="h-full flex justify-center items-center gap-1">
		<img class="h-full object-contain" src="favicon.png" alt="">
		<p class="font-semibold">büfé-app</p>
	</div>

	<a href="/install">
		<div class="font-semibold bg-primary text-on-primary rounded-3xl px-2 py-1 transition-all hover:rounded-lg">alkalmazás</div>
	</a>

</div>