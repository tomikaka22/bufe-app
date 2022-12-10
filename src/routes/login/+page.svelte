<script>
import { fade } from "svelte/transition";

export let form;

let email = form?.email
let password
</script>

<main>
   <div class="login">
      <img src="favicon.png" alt="" />

      <form method="post">
         <label id="email-form-label" for="email-form">Kandós E-mail:</label><br />
         <input name='email' bind:value={email} id="email-form" type="text" /> <p>@kkszki.hu</p>
         <br />
         <label for="password-form">Jelszó:</label><br />
         <input name='password' bind:value={password} id="password-form" type="password" />
         {#if email && password}
            <button in:fade={{duration: 400}}>Belépés</button>
         {/if}
         <br>
         {#if form?.error}
            <p id="error">{form?.error}</p>
         {/if}
      </form>
   </div>

   <div class="regin-button">
      <h2>Nincs még fiókod?</h2> <a href="/register"><button>Regisztráció</button></a>
   </div>
   
</main>

<style lang="scss">

   .regin-button {
      width: 100vw;
      text-align: center;
      margin-top: 5vh;
      color: white;

      button {
         background-color: rgb(20, 20, 20);
         padding: 1ch;
         border-radius: 4vw;
         color: white;
         margin-top: 1ch;
      }
   }

   .login {
      text-align: center;
      margin-top: 50%;
      color: white;

      img {
         display: block;
         margin: auto;
         margin-bottom: 10%;
      }
   }

   form {
      input {
         border: 0.2vw solid white;
         border-radius: 4vw;
         width: 50%;
         color: white;
         background-color: rgb(20, 20, 20);
         padding-top: 1vh;
         padding-bottom: 1vh;
         padding-left: 3vw;
         margin-top: 1vh;
         margin-bottom: 3vw;
      }

      #email-form-label {
         margin-right: 10ch;
      }

      #email-form {
         width: calc(50% - 10ch);
      }

      p {
         // transform: translateX(-10vw);
         display: inline-block;
      }

      button {
         border-radius: 4vw;
         width: 80%;
         padding: 3vw;
         margin-top: 2vh;
         background-color: rgb(20, 20, 20);
         color: white;
      }

      #error {
         margin-top: 1vh;
         color: var(--accent-color);
      }
   }

</style>
