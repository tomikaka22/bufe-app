<main class="text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
	<h1 class="text-primary text-3xl text-center font-semibold w-96">Kilettél tiltva.</h1>

	<div class="w-full flex justify-center">
		<button class="button-primary" on:click={() => { window.location.replace('/home'); }}>Újrapróbálkozás</button>
	</div>

	<form action="/change/delete" method="POST">
		<button class="bg-error-container text-on-error-container hover:bg-error hover:text-on-error hover:rounded-lg p-2 px-6 rounded-3xl mt-2 transition-all font-semibold">Fiók törlése</button>
	</form>
</main>

<form class="fixed bottom-0 w-full justify-center flex mb-24" method="POST" action="/profil?/logout">
	<button class="text-primary font-semibold outline outline-outline outline-1 w-max mx-auto rounded-3xl hover:rounded-lg transition-all p-2 px-4">Kijelentkezés</button>
</form>