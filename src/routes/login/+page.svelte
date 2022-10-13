<main>
   <div class="login">
      <img src="favicon.png" alt="" />

      <form action="" method="post">
         <label for="email-form">Kandós E-mail:</label><br />
         <input id="email-form" type="email" /><br />
         <label for="password-form">Jelszó:</label><br />
         <input id="password-form" type="password" />
         <button>Belépés</button>
      </form>

   </div>
</main>

<style lang="scss">
   * {
      margin: 0;
      padding: 0;
      list-style: none;
      text-decoration: none;
      border: none;
   }

   .login {
      text-align: center;
      margin-top: 50%;

      img {
         display: block;
         margin: auto;
         margin-bottom: 10%;
      }
   }

   form {
      input {
         border: 0.2vw solid orange;
         border-radius: 4vw;
         width: 80%;
         color: black;
         padding-top: 2.5vw;
         padding-bottom: 2.5vw;
         padding-left: 3vw;
         margin-top: 2vw;
         margin-bottom: 3vw;
      }

      button {
         border-radius: 4vw;
         width: 80%;
         padding: 3vw;
         margin-top: 5vw;
         background-color: orange;
      }
   }

</style>
