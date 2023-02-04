<script>
   import { fade } from "svelte/transition";

   export let form;

   let name = form?.name;
   let email = form?.email.replace('@kkszki.hu', '')
   let password;
   let passwordConfirm;
</script>

<main in:fade={{duration: 180}}>
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

		<div class="regin-button">
			<h2>Van már fiókod?</h2> <a href="/login"><button>Belépés</button></a>
		</div>

   </div>

</main>

<style lang="postcss">

</style>