<script>
   const username = "felhasználónév";
</script>

<main>
   <div class="welcome">
      <h1>Jónapot {username}!</h1>
   </div>

   <div class="outer-div">
      <div class="inner-div">
         <div class="grid-container">
            <a href="/list" class="grid-cell top">
                  <img src="favicon.png" alt="" />
                  <p>Termékek böngészése</p>
            </a>
            <a href="/" class="grid-cell">
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

   <h1 style="color: rgb(230, 230, 230); text-align: center; margin-top: 4%;">Menü</h1>
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
            margin: 5% 0;
            font-size: x-large;
            color: white;
            text-align: center;
            margin-top: 30%;
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
               // justify-items: center;
               background-color: #161616;
               padding: 5%;
               margin: 2%;
               margin-bottom: 0;

               .grid-cell {
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  border-radius: 25px;
                  background-color: #252525;
                  transform: scale(110%);
                  margin: 3%;
                  margin-top: 2%;
                  padding: 2%;
                  flex-direction: column;
                  
                  p {
                     margin-top: 1%;
                     color: white;
                  }
               }

               .top {
                  grid-column-start: 1;
                  grid-column-end: 3;
                  margin-bottom: 8%;

               }

            }
         }
      }
   }
</style>
