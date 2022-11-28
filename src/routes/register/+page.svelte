<script>
   import { fade } from "svelte/transition";

   export let form;

   let name = form?.name;
   let email = form?.email.replace('@kkszki.hu', '')
   let password;
   let passwordConfirm;
</script>

<main>
   <div class="login">
      <img src="favicon.png" alt="" />
      <form method="post">
         <label for="name-form">Teljes név:</label><br>
         <input name='name' bind:value={name} id="name-form" type="name" /><br />
         <label id="email-form-label" for="email-form">Kandós E-mail:</label><br />
         <input name='email' bind:value={email} id="email-form" type="text" /> <p>@kkszki.hu</p>
         <br />
         <label for="password-form">Jelszó:</label><br>
         <input name='password' bind:value={password} id="password-form" type="password" /> <br>
         <label for="password-confirm-form">Jelszó újra:</label><br>
         <input name='passwordConfirm' bind:value={passwordConfirm} id="password-confirm-form" type="password" />
         
         {#if name && email && password && passwordConfirm && password == passwordConfirm}
            <button in:fade={{duration: 400}}>Regisztrálás</button>          
         {/if}
         <br>
         {#if form?.error}
            <p id="error">{form?.error}</p>
         {/if}
      </form>
   </div>

   <div class="regin-button">
      <h2>Van már fiókod?</h2> <a href="/login"><button>Belépés</button></a>
   </div>

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
      scrollbar-width: none;
	}
   
   // ------------------------------------------

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
      margin-top: 20%;
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
         padding-top: 2.5vw;
         padding-bottom: 2.5vw;
         padding-left: 3vw;
         margin-top: 2vw;
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
         margin-top: 5vw;
         background-color: rgb(20, 20, 20);
         color: white;
      }

      #error {
         margin-top: 1vh;
         color: var(--accent-color);
      }
   }
</style>
