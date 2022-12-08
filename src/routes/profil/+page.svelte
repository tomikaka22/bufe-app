<script>
import Topbar from '$lib/components/Topbar.svelte';
import { slide, fly } from 'svelte/transition';
import { cubicOut } from 'svelte/easing';

export let data;
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
      <img src="favicon.png" alt="">
      <h1>{data.name}</h1>
   </div>

   <div in:slide class="options-container">
      <div class="options-grid">
         <div class="options-cell">
            <p>Lorem.</p>
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
      <div class="options-grid">
         <div class="options-cell">
            <p>Lorem, ipsum dolor.</p>
         </div>
         <div class="options-cell">
            <p>❌</p>
         </div>
      </div>
      <div class="options-grid">
         <div class="options-cell">
            <p>Lorem ipsum dolor sit.</p>
         </div>
         <div class="options-cell">
            <p>✔️</p>
         </div>
      </div>
      <div class="options-grid">
         <div class="options-cell">
            <p>Lorem ipsum dolor sit amet.</p>
         </div>
         <div class="options-cell">
            <p>❌</p>
         </div>
      </div>
      <div class="options-grid">
         <div class="options-cell">
            <p>Lorem ipsum dolor sit amet consectetur.</p>
         </div>
         <div class="options-cell">
            <p>✔️</p>
         </div>
      </div>
   </div>

   <div in:fly={{y: 120}} class="logout">
      <form method="POST">
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
}
</style>