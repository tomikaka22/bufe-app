<script>
import { fade, fly } from 'svelte/transition';
import { cubicOut } from 'svelte/easing';
import { enhance } from '$app/forms';
import Topbar from '$lib/components/Topbar.svelte';

export let data;
let form;
</script>

<main in:fade={{ duration: 180 }}>

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

      <div class="p-4">
         <p class="text-center text-lg">Kedvenc termékek:</p>
         {#if Object.keys(data.currentUser.favs).length != 0}
            {#each Object.keys(data.currentUser.favs) as fav, i (i)}
            <div class="flex p-2 rounded-lg mb-2 bg-surface-variant">
               <div class="basis-3/12">
                  <img class="w-14 h-14 object-cover rounded-md" src="/api/termekfoto/?termek={data.currentUser.favs[fav].id}" alt="{fav}_kep">
               </div>
               <div class="basis-8/12 flex items-center justify-center text-xl">
                  <a href="/{fav}">{fav}</a>
               </div>
               <form
                  class="flex items-center"
                  method="post"
                  action="?/removeFav"
                  use:enhance
               >
                  <input hidden type="text" name="removedFav" value="{fav}">
                  <button class="flex justify-center items-center text-[#201a17] bg-[#ffb68e] p-2 w-9 h-9 rounded-xl">
                     <i class="fa-solid fa-star"/>
                  </button>
               </form>
            </div>
            {/each}
         {:else}
            <div class="text-center text-2xl text-white">Még nincs egy kedvenc terméked sem</div>
         {/if}
      </div>

   <div in:fly={{ y: 120 }} class="bottom-0 w-screen mb-10">
      <form class="flex justify-center" method="POST" action="?/logout">
         <button class="text-[#ffb68e] font-semibold outline outline-[#9f8d84] outline-1 w-max mx-auto rounded-3xl hover:rounded-lg transition-all p-2">Kijelentkezés</button>
      </form>
   </div>

</main>


<style lang="postcss">

</style>