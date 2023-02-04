<script>
import { fade } from "svelte/transition";

export let form;

let email = form?.email
let password
</script>

<main in:fade={{duration: 180}}>
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

		<div class="regin-button">
			<h2>Nincs még fiókod?</h2> <a href="/register"><button>Regisztráció</button></a>
		</div>

   </div>
   
</main>
