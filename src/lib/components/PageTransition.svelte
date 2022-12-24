<script>
	import { fade } from 'svelte/transition';
	export let url = '';
</script>

{#key url}
	<div>
		<slot />
	</div>
{/key}
