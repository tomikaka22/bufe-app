<script>
   import { fade } from 'svelte/transition';

   export let form;

   let name = form?.name;
	let name2 = form?.name2;
   let email = form?.email.replace('@kkszki.hu', '');
   const error = form?.error;
   let password;
   let passwordConfirm;
	let licenseCheck;

	let offsetHeight;
	let offsetWidth;
	let offsetTop;
	let offsetLeft;

	function initLicense(node) {
		const license = document.getElementById('license');
		const backdrop = document.getElementById('backdrop');

		offsetHeight = node.offsetHeight + 'px';
		offsetWidth = node.offsetWidth + 'px';
		offsetTop = node.offsetTop + 'px';
		offsetLeft = node.offsetLeft + 'px';

		license.style.height = offsetHeight;
		license.style.width = offsetWidth;
		license.style.top = offsetTop;
		license.style.left = offsetLeft;
		license.style.display = 'block';

		setTimeout(() => {
			backdrop.style.visibility = 'visible';
			backdrop.style.opacity = '1';

			license.style.visibility = 'visible';
			license.style.width = '75%';
			license.style.height = '75%';
			license.style.top = '50%';
			license.style.left = '50%';
			license.style.transform = 'translate(-50%, -50%)';
		}, 5);
	}

	function closeLicense() {
		const license = document.getElementById('license');
		const backdrop = document.getElementById('backdrop');

		backdrop.style.opacity = '0';
		backdrop.style.visibility = 'hidden';

		license.style.transitionDuration = '300ms';
		license.style.opacity = '0';
		license.style.visibility = 'hidden';

		setTimeout(() => {
			license.style.transform = 'none';
			license.style.height = offsetHeight;
			license.style.width = offsetWidth;
			license.style.top = offsetTop;
			license.style.left = offsetLeft;
			license.style.transitionDuration = '700ms';
			license.style.opacity = '1';
			license.style.display = 'hidden';
		}, 300);

	}

</script>

<main in:fade={{ duration: 180 }} class="w-screen h-screen flex items-center">
	<div class="text-center">

		<img src="favicon.png" class="block mx-auto mb-10" alt="" />
      <form class="flex flex-col gap-5 items-center" method="post">
			<div class="flex w-52 h-full justify-center duration-100 ease-in outline outline-1 outline-outline focus-within:outline-primary focus-within:outline-2 mx-auto py-2 rounded-xl">
				<input bind:value={name} name="name" type="text" placeholder="Vezetéknév" class="bg-background placeholder:text-sm border-r border-outline outline-none focus:placeholder:text-background w-full text-center placeholder:text-secondary transition-all">
				<input bind:value={name2} name="name2" type="text" placeholder="Keresztnév" class="bg-background placeholder:text-sm outline-none focus:placeholder:text-background w-full text-center placeholder:text-secondary transition-all">
			</div>

         <div class="w-52 flex gap-1 items-center mx-auto">
				<input placeholder="e-mail" autocapitalize="none" name='email' bind:value={email} type="text" class="bg-background duration-100 ease-in outline outline-outline focus:placeholder:text-background outline-1 w-full py-2 px-3 rounded-xl placeholder:text-center text-center focus:outline-primary placeholder:text-secondary focus:outline-2 transition-all"/>
				<p>@kkszki.hu</p>
			</div>

         <input placeholder="Jelszó" name='password' bind:value={password} type="password" class="bg-background outline outline-outline outline-1 w-52 py-2 px-3 rounded-xl placeholder:text-center text-center focus:placeholder:text-background focus:outline-primary placeholder:text-secondary focus:outline-2 transition-all"/>

         <input placeholder="Jelszó újra" name='passwordConfirm' bind:value={passwordConfirm} type="password" class="bg-background outline outline-outline outline-1 w-52 py-2 px-3 rounded-xl placeholder:text-center text-center focus:placeholder:text-background focus:outline-primary placeholder:text-secondary focus:outline-2 transition-all"/>
         {#if name && name2 && email && password && passwordConfirm && password === passwordConfirm && licenseCheck}
				<button class="w-36 bg-primary text-background p-2 rounded-full mt-2 focus:rounded-md transition-all font-semibold">Regisztráció</button>
         {/if}
         {#if error && !password || error && !password && !email}
            <p id="error" class="text-error text-lg text-center px-2 font-semibold">{form?.error}</p>
         {/if}
      </form>

		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div id="backdrop" on:click={closeLicense} class="backdrop-brightness-50 absolute top-0 bottom-0 left-0 right-0 invisible opacity-0 transition-all duration-300"></div>

		<div id="license" class="bg-foreground rounded-[2rem] absolute transition-all duration-700 overflow-scroll invisible hidden" style="transition-timing-function: cubic-bezier(0.05, 0.7, 0.1, 1.0);">
			<div class="relative p-6">
				<h1 class="font-semibold text-2xl text-center mb-3 text-primary">Felhasználói Feltételek és Körülmények</h1>
				<div class="text-sm pb-16 text-left">
					<h2 class="text-lg font-semibold mb-1">1. Bevezető</h2>
					<p>Ez a Felhasználói Feltételek és Körülmények (“T&C”) dokumentum szabályozza a Büfé-app (“Alkalmazás”) használatát. Az Alkalmazás egy progresszív webalkalmazás (PWA). Az Alkalmazás használatával Ön elfogadja ezt a T&C-t.</p>

					<h2 class="text-lg font-semibold my-1">2. Licenc</h2>
					<p>Az Alkalmazás nyílt forráskódú. Ezt a licencet az Affero General Public License szabályozza, amely lehetővé teszi az Alkalmazás szabad használatát, terjesztését és módosítását.</p>

					<h2 class="text-lg font-semibold my-1">3. Felhasználói kötelezettségek</h2>
					<p>A Felhasználó köteles tiszteletben tartani az Alkalmazás használatának szabályait. A Felhasználó nem okozhat kárt a büfének, beleértve, de nem kizárólag, hogy nem veszi át az elkészített rendelést. Az Alkalmazást csak rendeltetésszerűen szabad használni. A Felhasználó nem végezhet rosszindulatú tevékenységeket, mint például DDoS támadásokat.</p>

					<h2 class="text-lg font-semibold my-1">4. Büfé jogai és felelőssége</h2>
					<p>A büfé fenntartja a jogot, hogy bármikor törölje a rendeléseket. A büfé semmilyen felelősséget nem vállal az Alkalmazás használatából eredő károkért.</p>

					<h2 class="text-lg font-semibold my-1">5. Garancia</h2>
					<p>Az Alkalmazás "ahogy van" alapon kerül szolgáltatásra, anélkül, hogy bármilyen kifejezett vagy hallgatólagos garanciát vállalnánk, beleértve, de nem kizárólag, a piacképességre, a bizonyos célra való alkalmasságra vagy a jogok megsértésének hiányára vonatkozó garanciákat.</p>

					<h2 class="text-lg font-semibold my-1">6. Felelősség korlátozása</h2>
					<p>Az Alkalmazás fejlesztői nem vállalnak felelősséget semmilyen közvetlen, közvetett, véletlen, különleges, jelentős vagy következményes károkért, amelyek az Alkalmazás használatából vagy használatának képtelenségéből adódnak.</p>

					<h2 class="text-lg font-semibold my-1">7. Módosítások</h2>
					<p>Ez a T&C bármikor módosítható. A módosítások érvénybe lépése előtt értesítjük a Felhasználókat.</p>

					<h2 class="text-lg font-semibold my-1">8. Elfogadás</h2>
					<p>Az Alkalmazás használatával Ön elfogadja ezt a T&C-t. Ha nem ért egyet ezzel a T&C-vel, akkor nem használhatja az Alkalmazást.</p>
				</div>
				<button on:click={closeLicense} class="absolute bottom-6 right-7 p-3 font-semibold text-sm text-primary">OK</button>
			</div>
		</div>

		<div class="mt-6 text-sm">
			Elfogadom a <button on:click={(e) => { initLicense(e.target); }} class="underline cursor-pointer ">Felhasználói Feltételek és Körülmények</button>et
			<input bind:checked={licenseCheck} type="checkbox" name="" id="">
		</div>

		<div class="w-screen text-center mt-6">
			<h2>Van már fiókod?</h2>
			<a href="/login"><button class="text-primary font-semibold outline outline-outline outline-1 w-max mx-auto rounded-full p-2 mt-2">Bejelentkezés</button></a>
		</div>

   </div>

</main>

<style lang="postcss">

</style>