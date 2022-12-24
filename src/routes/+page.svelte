<script>
   import { fade } from 'svelte/transition';

   export let data;
</script>

<main in:fade={{duration: 180}}>
   <div class="welcome">
      <h1>Jónapot <span>{data.name}!</span></h1>
   </div>

   <div class="outer-div">
      <div class="inner-div">
         <div class="grid-container">
            <a href="/list" class="grid-cell top">
                  <img src="favicon.png" alt="" />
                  <p>Termékek böngészése</p>
            </a>
            <a href="/profil" class="grid-cell">
                  <img src="favicon.png" alt="" />
                  <p>Profil</p>
            </a>
            <a href="/rendelesek" class="grid-cell">
                  <img src="favicon.png" alt="" />
                  <p>Rendelések</p>
            </a>
         </div>
      </div>
   </div>
   <h2>{data.splash}</h2>
</main>

<style lang="scss">
   :global(*) {
      margin: 0;
      padding: 0;
      list-style: none;
      text-decoration: none;
      -webkit-tap-highlight-color: transparent;
   }

   :global(body) {
      background-color: black;
   }

   main {
      width: 100vw;
      height: 100vh;
      overflow-y: hidden;

      .welcome {
         h1 {
            font-size: x-large;
            color: white;
            text-align: center;
            margin-top: 30%;

            span {
               color: var(--accent-color);
            }
         }
      }

      .outer-div {
         display: grid;
         width: 100vw;

         .inner-div {
            grid-area: 1/1;

            .grid-container {
               display: grid;
               grid-template-columns: auto auto;
               grid-template-rows: auto auto;
               column-gap: 5.5%;
               border-radius: 25px;
               margin: 5%;
               margin-bottom: 0;
               row-gap: 4%;
               
               .grid-cell {
                  display: flex;
                  align-items: center;
                  border-radius: 25px;
                  background-color: #252525;
                  transform: scale(110%);
                  margin: 3%;
                  flex-direction: column;
                  border: 1px solid rgba(255, 255, 255, 0.048);
                  
                  p {
                     color: white;
                  }
               }

               .top {
                  grid-column-start: 1;
                  grid-column-end: 3;

               }

            }
         }
      }

      h2 {
         color: white;
         text-align: center;
         margin-top: 10%;
      }
   }
</style>
