<script>
   import { fade } from 'svelte/transition';

   export let form;

   let name = form?.name;
   let email = form?.email.replace('@kkszki.hu', '');
   const error = form?.error;
   let password;
   let passwordConfirm;
</script>

<main in:fade={{ duration: 180 }} class="w-screen h-screen flex items-center">
	<div class="text-center">

		<img src="favicon.png" class="block mx-auto mb-10" alt="" />
      <form method="post">
         <input placeholder="Teljes név" name='name' bind:value={name} type="name" class="bg-[#201a17] outline outline-[#9f8d84] outline-1 w-52 py-2 px-3 mt-2 mb-5 rounded-xl placeholder:text-center text-center focus:placeholder:text-background focus:outline-[#ffb68e] placeholder:text-[#e6beaa] focus:outline-2 transition-all"/>
			<br>
         <input placeholder="Kandós e-mail" autocapitalize="none" name='email' bind:value={email} type="text" class="bg-[#201a17] duration-100 ease-in outline outline-[#9f8d84] focus:placeholder:text-background outline-1 w-32 py-2 px-3 mt-2 mb-5 rounded-xl placeholder:text-center text-center focus:outline-[#ffb68e] placeholder:text-[#e6beaa] focus:outline-2 transition-all"/> <p class="inline-block">@kkszki.hu</p>
			<br>
         <input placeholder="Jelszó" name='password' bind:value={password} type="password" class="bg-[#201a17] outline outline-[#9f8d84] outline-1 w-52 py-2 px-3 mt-2 mb-5 rounded-xl placeholder:text-center text-center focus:placeholder:text-background focus:outline-[#ffb68e] placeholder:text-[#e6beaa] focus:outline-2 transition-all"/>
			<br>
         <input placeholder="Jelszó újra" name='passwordConfirm' bind:value={passwordConfirm} type="password" class="bg-[#201a17] outline outline-[#9f8d84] outline-1 w-52 py-2 px-3 mt-2 mb-5 rounded-xl placeholder:text-center text-center focus:placeholder:text-background focus:outline-[#ffb68e] placeholder:text-[#e6beaa] focus:outline-2 transition-all"/>
         <br>
         {#if name && email && password && passwordConfirm && password == passwordConfirm}
			<button class="w-36 bg-[#ffb68e] text-[#201a17] p-2 rounded-full mt-2 focus:rounded-md transition-all font-semibold">Regisztráció</button>
         {/if}
         <br>
         {#if error && !password || error && !password && !email}
            <p id="error" class="text-[#ffb4ab] text-lg text-center px-2 font-semibold">{form?.error}</p>
         {/if}
      </form>

		<div class="w-screen text-center mt-6">
			<h2>Van már fiókod?</h2>
			<a href="/login"><button class="text-[#ffb68e] font-semibold outline outline-[#9f8d84] outline-1 w-max mx-auto rounded-full p-2 mt-2">Bejelentkezés</button></a>
		</div>

   </div>

</main>