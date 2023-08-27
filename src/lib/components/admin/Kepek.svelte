<script>
	import AdminTopbar from '$lib/components/AdminTopbar.svelte';

	export let data;
	export let kepekModal;

	let input;

</script>

<dialog class="bg-surface-variant w-fit rounded-2xl text-secondary" bind:this={kepekModal}>
	<AdminTopbar midText={'Képek'} input={input} modal={kepekModal}></AdminTopbar>

		<form bind:this={input} enctype="multipart/form-data" action="?/foto" method="POST" class="w-full flex gap-5 flex-wrap justify-center mb-5">
			{#each data.termekekLista as termek, i (i)}

				<div class="flex flex-col justify-center w-44 h-44 text-center font-semibold">
					<p class="py-1 px-2 bg-primary-container rounded-t-2xl text-on-primary-container">{termek.termek}</p>

					<label class="cursor-pointer rounded-b-2xl overflow-hidden w-full h-full">
						<div class="relative w-full h-full">
							{#if termek.foto}
								<img class="w-full h-full brightness-50 object-cover" id="{termek.id}" src="/api/files/termekek/{termek.id}/{termek.foto}" alt="">
							{:else}
								<img class="w-full h-full brightness-50 object-cover" id="{termek.id}" alt="">
							{/if}
							<svg class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary" fill="currentColor" xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48">
								<path d="M440-437ZM100-120q-24 0-42-18t-18-42v-513q0-23 18-41.5t42-18.5h147l73-87h274v60H348l-73
								87H100v513h680v-414h60v414q0 24-18.5 42T780-120H100Zm680-574v-86h-86v-60h86v-87h60v87h87v60h-87v86h-60ZM439.5-267q72.5
								0 121.5-49t49-121.5q0-72.5-49-121T439.5-607q-72.5 0-121 48.5t-48.5 121q0 72.5 48.5 121.5t121 49Zm0-60q-47.5 0-78.5-31.5t-31-79q0-47.5 31-78.5t78.5-31q47.5
								0 79 31t31.5 78.5q0 47.5-31.5 79t-79 31.5Z"/>
							</svg>
						</div>

						<input on:change={(e) => {document.getElementById(termek.id).src = URL.createObjectURL(e.target.files[0]); }} id="{termek.id}Input" hidden type="file" name="{termek.id}" value="" accept="image/*">
					</label>
				</div>

			{/each}
		</form>

</dialog>