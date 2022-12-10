<script>
import { page } from "$app/stores";
import { slide, fly } from 'svelte/transition';
import { cubicOut } from 'svelte/easing';
import Topbar from '$lib/components/Topbar.svelte';

export let data;
let form;
</script>

<main>

   <Topbar
      target={'Menü'}
      targeturl={'/'}
      text={'Profil'}
      background={'none'}
      flyin={{y: -200}}
      hideProfile={1}
   ></Topbar>

   <div in:fly={{y: -120, easing: cubicOut}} class="profile">
      <form bind:this={form} action="?/changeAvatar" method="post" enctype="multipart/form-data">
         <label for="avatar">
            <img src="/api/avatar" alt="">
            <label for="avatar">
               <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
               </svg>
            </label>
         </label>
         <h1>{data.name}</h1>
         <input on:input={form.submit()} hidden type="file" name="avatar" id="avatar" accept="image/*">
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

<style lang="scss">

.logout {
   width: 100vw;
   position: fixed;
   bottom: 0;

   button {
      background-color: #161616;
      color: rgba(255, 0, 0, 0.9);
      border-radius: 20px;
      border: 1px solid #252525;
      padding: 1ch;
      display: block;
      margin: 0 auto;
      margin-bottom: 10%;
   }
}

.options-container {
   display: grid;
   grid-template-columns: auto;
   color: rgba(255, 255, 255, 0.9);
   // border: 1px solid rgba(255, 255, 255, 0.048);
   border-radius: 20px;
   background-color: #252525;
   margin: 5%;

   .options-grid {
      display: grid;
      padding: 5%;
      border-bottom: 1px solid var(--accent-color);
      
      &:nth-of-type(2n) {
         background-color: #161616;
      }

      &:last-of-type {
         border-bottom: none;
         border-bottom-left-radius: 20px;
         border-bottom-right-radius: 20px;
      }

      grid-template-columns: auto auto;

      .options-cell {

         &:last-of-type {
            margin-left: auto;
         }

      }
   }
}

.profile {
   margin-top: 15%;
   color: white;
   text-align: center;

   h1 {
      margin-top: 1ch;
      font-size: x-large;
   }

   svg {
      width: 10%;
      position: fixed;
   }

   img {
      border-radius: 50%;
      width: 100px;
   }
}
</style>