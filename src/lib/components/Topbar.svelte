<script>
   import { fly } from "svelte/transition";

   export let targeturl;
   export let target;
</script>

<div in:fly={{y: -200}} class="header">
   <div class="header-content">
      <a class="header-cell" href="{targeturl}"><h2 id="header-left">&lt;</h2><p style="margin-right: auto;">{target}</p></a>
      <div class="header-cell">
         <h1>Termékek:</h1>
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
         background-color: #36200b;
         border-bottom-left-radius: 1em;
         border-bottom-right-radius: 1em;

         .header-content {
            width: 100%;
            display: grid;
            grid-template-columns: 33.33% 33.33% 33.33%;
            text-align: center;

            .header-cell {
               display: flex;
               justify-content: center;
               align-items: center;
               color: white;

               img {
                  width: 30%;
               }

               #header-left {
                  margin-left: 5%;
                  margin-right: 1px;
                  font-size: 3ch;
                  // filter: invert(85%);

               }

               #header-right {
                  margin-left: auto;
                  margin-right: 5%;
               }
            }
         }
      }
</style>