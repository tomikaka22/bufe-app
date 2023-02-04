<script>
import { slide, fly, fade } from 'svelte/transition';
import { cubicOut } from 'svelte/easing';
import { enhance } from '$app/forms';
import Topbar from '$lib/components/Topbar.svelte';

export let data;
let form;
</script>

<main in:fade={{duration: 180}}>

   <Topbar
      target={'Menü'}
      targeturl={'/'}
      text={'Profil'}
      background={'none'}
      flyin={{y: -200}}
      hideProfile={1}
   ></Topbar>

   <div in:fly={{y: -120, easing: cubicOut}} class="profile">
      <form use:enhance bind:this={form} action="?/changeAvatar" method="POST" enctype="multipart/form-data">
         <label for="avatar">
            <img src="/api/avatar" alt="">
            <label for="avatar">
               <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
               </svg>
            </label>
         </label>
         <h1>{data.name}</h1>
         <input on:input={form.submit()} hidden type="file" name="avatar" id="avatar" value="" accept="image/*">
      </form>
   </div>


   <div in:slide class="options-container">
      <div class="options-grid">
         <div class="options-cell">
            <p>Jelszó módositása</p>
         </div>
         <div class="options-cell">
            <p>❌</p>
         </div>
      </div>
      <div class="options-grid">
         <div class="options-cell">
            <p>Lorem, ipsum.</p>
         </div>
         <div class="options-cell">
            <p>✔️</p>
         </div>
      </div>
   </div>

   <div in:fly={{y: 120}} class="logout">
      <form method="POST" action="?/logout">
         <button>Kijelentkezés</button>
      </form>  
   </div>

</main>


<style lang="postcss">

</style>