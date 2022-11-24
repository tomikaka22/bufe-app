<script>
   import { fly } from "svelte/transition";

   export let targeturl;
   export let target;
   export let text;
   export let background;
   export let flyin;
</script>

<div in:fly={flyin} class="header" style="background-color: {background};">
   <div class="header-content">
      <a class="header-cell" href="{targeturl}"><h2 id="header-left">&lt;</h2><p style="margin-right: auto;">{target}</p></a>
      <div class="header-cell">
         <h1>{text}</h1>
      </div>
      <div class="header-cell">
         <img id="header-right" src="favicon.png" alt="">
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

               p, h2 {
                  color: var(--accent-color);
               }

               #header-left {
                  margin-left: 5%;
                  margin-right: .5ch;
                  font-size: 3ch;
                  // filter: invert(85%);

               }

               #header-right {
                  margin-left: auto;
                  margin-right: 5%;
                  width: 28%;
               }
            }
         }
      }
</style>