<script>
   import { fade, fly } from 'svelte/transition';
   import { cubicOut } from 'svelte/easing';
   import { enhance } from '$app/forms';
   import Topbar from '$lib/components/Topbar.svelte';
   
   export let data;
   let form;
   </script>
   
   <main in:fade={{ duration: 180 }} class="pb-20">
      <Topbar
         target={'Menü'}
         targeturl={'/'}
         text={'Profil'}
         background={'none'}
         flyin={{ y: -200 }}
         hideProfile={1}
      ></Topbar>
   
      <div in:fly={{ y: -120, easing: cubicOut }} class="w-full flex justify-center items-center">
         <form use:enhance bind:this={form} action="?/changeAvatar" method="POST" enctype="multipart/form-data">
            <h1 class="text-center text-[#ffb68e] text-3xl font-semibold my-2">{data.name}</h1>
            <label for="avatar">
               <img class="rounded-[5rem] hover:rounded-3xl transition-all" src="/api/avatar" alt="">
            </label>
            <input on:input={form.submit()} hidden type="file" name="avatar" id="avatar" value="" accept="image/*">
         </form>
      </div>
   
      <p class="text-[#201a17] bg-[#ffb68e] font-semibold w-max mx-auto rounded-3xl hover:rounded-lg transition-all p-2 px-4 my-3">Jelszó módositása</p>
      <p class="text-[#201a17] bg-[#ffb68e] font-semibold w-max mx-auto rounded-3xl hover:rounded-lg transition-all p-2 px-4 my-3">Lorem, ipsum.</p>
      <p class="text-lg text-center mt-2">Kedvencek:</p>
   
      <div class="p-4 max-h-full overflow-y-auto drop-shadow-md">
         {#if Object.keys(data.currentUser.favs).length != 0}
            {#each Object.keys(data.currentUser.favs) as fav, i (i)}
            <div class="flex bg-foreground text-neutral-800 p-2 rounded-lg mb-2">
               <div class="basis-3/12">
                  <img class="w-14 h-14 object-cover rounded-md" src="/api/termekfoto/?termek={data.currentUser.favs[fav].id}" alt="">
               </div>
               <div class="basis-8/12 flex items-center justify-center text-xl">
                  <span><a href="/{fav}">{fav}</a></span>
               </div>
               <div class="flex items-center justify-end">
                  <form
                     method="post"
                     action="?/removeFav"
                     use:enhance
                  >
                     <input hidden type="text" name="removedFav" value="{fav}">
                     <button class="shadow-background bg-on-secondary text-on-secondary-container font-semibold transition-all p-3 rounded-3xl text-lg hover:bg-primary hover:text-on-primary hover:rounded-lg">
                        <div class="flex justify-center items-center"><i class="fa-solid fa-star"/></div>
                     </button>
                  </form>
               </div>
            </div>
            {/each}
         {:else}
            <div class="text-center text-2xl">Még nincs egy kedvenced sem</div>
         {/if}
      </div>
   
      <div in:fly={{ y: 120 }} class="bottom-0 w-screen mb-10">
         <form class="flex justify-center" method="POST" action="?/logout">
            <button class="text-[#ffb68e] font-semibold outline outline-[#9f8d84] outline-1 w-max mx-auto rounded-3xl hover:rounded-lg transition-all p-2">Kijelentkezés</button>
         </form>
      </div>
   </main>