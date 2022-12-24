<script>
	export let url = '';
</script>

{#key url}
	<div>
		<slot />
	</div>
{/key}
