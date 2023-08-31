<script>
   import { fade } from 'svelte/transition';

   export let form;

   let name = form?.name;
	let name2 = form?.name2;
   let email = form?.email.replace('@kkszki.hu', '');
   const error = form?.error;
   let password;
   let passwordConfirm;
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
         {#if name && name2 && email && password && passwordConfirm && password === passwordConfirm}
				<button class="w-36 bg-primary text-background p-2 rounded-full mt-2 focus:rounded-md transition-all font-semibold">Regisztráció</button>
         {/if}
         {#if error && !password || error && !password && !email}
            <p id="error" class="text-error text-lg text-center px-2 font-semibold">{form?.error}</p>
         {/if}
      </form>

		<div class="w-screen text-center mt-6">
			<h2>Van már fiókod?</h2>
			<a href="/login"><button class="text-primary font-semibold outline outline-outline outline-1 w-max mx-auto rounded-full p-2 mt-2">Bejelentkezés</button></a>
		</div>

   </div>

</main>