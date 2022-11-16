<main>
   <div class="login">
      <img src="favicon.png" alt="" />

      <form method="post">
         <label for="name-form">Teljes név:</label><br>
         <input name='name' id="name-form" type="name" /><br />
         <label for="email-form">Kandós E-mail:</label><br>
         <input name='email' id="email-form" type="email" /><br />
         <label for="password-form">Jelszó:</label><br>
         <input name='password' id="password-form" type="password" /> <br>
         <label for="password-confirm-form">Jelszó újra:</label><br>
         <input name='passwordConfirm' id="password-confirm-form" type="password" />
         <button>Regisztrálás</button>
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
      -webkit-tap-highlight-color: transparent;
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
