<script>
   import { fade } from "svelte/transition";
   
   export let form;
   let email = form?.email
   let error = form?.error
   let password
   </script>
   
   <main in:fade={{duration: 180}} class="font-sofia bg-white w-screen h-screen">
      <div class="login flex flex-col items-center pt-24">
         <h1 class="font-extrablack text-5xl text-cyan-500 drop-shadow-md">Kandó Büfé</h1>
         <h2 class="text-cyan-500 text-2xl font-bold mt-12 mb-6 drop-shadow-md">Bejelentkezés</h2>
   
         <form method="post" class="flex flex-col items-center">
            <div class="flex flex-row mb-6 drop-shadow-xl">
               <input placeholder="Kandós e-mail" name='email' bind:value={email} id="email-form" type="text" class="border-gray bg-gray-1 p-2 rounded-md outline-cyan-500" />
            </div>
            <div class="flex flex-row mb-6 drop-shadow-xl">
               <label for="password-form"></label><br />
               <input placeholder="Jelszó" name='password' bind:value={password} id="password-form" type="password" class="border-gray bg-gray-1 p-2 rounded-md outline-cyan-500" />
            </div>
            <div class="flex flex-col justify-center">
               {#if email && password}
                  <button in:fade={{duration: 300}} class="bg-cyan-500 text-white text-lg px-8 py-2 rounded-md font-semibold shadow-lg shadow-cyan-500/50">Belépés</button>
               {/if}
            </div>
            {#if error && !email || !password && error != undefined}
               <p id="error" class="text-red-1 text-lg font-semibold">{error}</p>
            {/if}
         </form>
   
         <div class="regin-button flex flex-col items-center">
            <h2 class="mt-3 mb-1 drop-shadow-md">Nincs még fiókod?</h2>
            <a href="/register"><button class="bg-gray-50 text-cyan-500 text-lg px-8 py-2 rounded-md font-semibold drop-shadow-xl">Regisztráció</button></a>
         </div>
   
      </div>
      
</main>