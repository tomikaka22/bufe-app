<script>
   import { fly } from "svelte/transition";

   export let targeturl;
   export let target;
   export let text;
   export let background;
   export let flyin;
   export let hideProfile;
</script>

<div in:fly={flyin} class="header" style="background-color: {background};">
   <div class="header-content">
      <div class="header-cell">
         <a data-sveltekit-noscroll id="header-left" href="{targeturl}"><span>&lt;</span>{target}</a>
      </div>
      <div class="header-cell">
         <h1>{text}</h1>
      </div>
      <div class="header-cell">
         <a data-sveltekit-noscroll class:hideProfile id="header-right" href='/profil'><img src="/api/avatar" alt=""></a>
      </div>
   </div>
</div>

<style lang="scss">
      .header {
         width: 100%;
         height: auto;
         border-bottom-left-radius: 1em;
         border-bottom-right-radius: 1em;

         .header-content {
            width: 100%;
            display: grid;
            grid-template-columns: 33.33% 33.33% 33.33%;
            text-align: center;
            padding: 1% 0;

            .header-cell {
               display: flex;
               justify-content: center;
               align-items: center;
               color: white;

               #header-left {
                  margin-left: 5%;
                  margin-right: auto;
                  color: var(--accent-color);
                  display: flex;
                  align-items: center;

                  span {
                     font-size: 3ch;
                     margin-right: 10%;
                  }
               }

               #header-right {
                  width: 28%;
                  margin-left: auto;
                  margin-right: 5%;

                  img {
                     width: 100%;
                     vertical-align: middle;
                     border-radius: 50%;
                  }
               }
            }
         }

         .hideProfile {
            visibility: hidden;
         }

      }
</style>