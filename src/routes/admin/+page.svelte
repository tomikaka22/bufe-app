<script>

export let data;
let darabModal;
let termekModal;
let arakModal;

async function dismissOrder(item) {
   if (confirm('Biztos kész a rendelés?')) {
      await fetch('/vasarlas_api', {
         method: 'DELETE',
         body: JSON.stringify(item)
      });
      reloadData()
   }
};

async function reloadData() {
   let adat = await fetch('/vasarlas_api');
   data = await adat.json()
};

setInterval( () => {
   reloadData()
}, 10000);

</script>

<main>
<div class="grid-container">
   <div class="grid-cell">
      {#each Object.keys(data.rendelesek) as orderID, i}
         <div class="rendeles-kartya">
            <h1>#{orderID}</h1>
            {#each Object.keys(data.rendelesek[orderID]) as a}
               <p><span style="color: chartreuse">{a},</span> <span style="color: red;">{data.rendelesek[orderID][a][1]}</span> db, <span style="color: red;">{data.rendelesek[orderID][a][0]}</span> Ft</p>
            {/each}
            <button on:click={() => {dismissOrder(Object.keys(data.rendelesek)[i])}}>Kész</button>
         </div>
      {/each}
   </div>
   <div style="margin-top: 1%;" class="grid-cell">
      <div class="inner-grid-container">
         <div class="inner-grid-cell">
            <h1>Ma népszerű termékek:</h1>
            {#each Array(3) as a}
                <p id="nepszeru">asd Étel</p>
            {/each}
         </div>
         <div class="inner-grid-cell">
            <h1>Mai bevétel:</h1>
            <p id="bevetel">6 900 Ft</p>
         </div>
         <div class="inner-grid-cell">
            <h1>Szerkesztés:</h1>
            <button on:click={darabModal.showModal()}>Darab</button>
            <button on:click={termekModal.showModal()}>Termékek</button>
            <button on:click={arakModal.showModal()}>Árak</button>
         </div>
      </div>
   </div>
</div>

<!-- Modalok: -->

<dialog class="darab-modal" bind:this={darabModal}>
   <h1>Darab modal</h1>
   <button on:click={darabModal.close()}><h1>Bezár</h1></button>
</dialog>

<dialog class="termekek-modal" bind:this={termekModal}>
   <h1>Termékek modal</h1>
   <button on:click={termekModal.close()}><h1>Bezár</h1></button>
</dialog>

<dialog class="arak-modal" bind:this={arakModal}>
   <h1>Árak modal</h1>
   <button on:click={arakModal.close()}><h1>Bezár</h1></button>
</dialog>

</main>

<style lang="scss">
   :global(*) {
      margin: 0;
      padding: 0;
      list-style: none;
      text-decoration: none;
   }

	:global(body) {
		background-color: rgb(15, 15, 15);
      scrollbar-width: none;
	}

   /* ----------------------------------------- */
   main {
      .grid-container {
         width: 100vw;
         min-height: 100vh;
         grid-template-columns: auto;
         grid-template-rows: 80% 20%;
         display: grid;

            .grid-cell {
               border-top: 1px solid white;
               color: white;

            .rendeles-kartya {
               text-align: center;
               font-size: x-large;
               float: left;
               border-radius: 1em;
               background-color: rgb(34, 34, 34);
               padding: 1em;
               margin-left: .8em;
               margin-top: .8em;
               outline: .1em solid rgb(255, 255, 255);

               h1 {
                  color: rgb(0, 174, 255);
                  font-size: xx-large;
               }

               button {
                  padding: .1rem;
               }
            }

            .inner-grid-container {
               display: grid;
               grid-template-columns: auto auto auto;
               grid-template-rows: auto;

               .inner-grid-cell {
                  h1 {
                     margin: 1ch 0;
                     font-size: x-large;
                     text-align: center;
                  }

                  p {
                     font-size: large;
                     text-align: center;
                  }

                  button {
                     background-color: rgb(34, 34, 34);
                     color: white;
                     width: 10em;
                     font-size: larger;
                     border-radius: 1em;
                     padding: .5em;
                     display: block;
                     margin: 0 auto;
                     margin-top: 1ch;
                  }
               }
            }
         }
      }

      dialog {
         margin: auto;
         background-color: rgb(31, 31, 31);
         color: white;
         border-radius: 1em;
         padding: .5em;
         border: 1px solid white;

         &::backdrop {
            background: rgba(0, 0, 0, 0.800);
         }

         button {
            background-color: rgb(50, 50, 50);
            color: white;
            font-size: larger;
            border-radius: 1em;
            padding: .5em;
         }
      }
   }

</style>