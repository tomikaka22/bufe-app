<script>

export let data;

let darabModal;
let termekModal;
let arakModal;


//  DEBUG ---------------------------------------------------
function tesztrendelés() {
   fetch("/api/vasarlas", {
   "body": "{\"Marhahúsos Étel\":[6000,5],\"Hell\":[2500,10],\"Xixo\":[2450,7],\"Chips\":[960,4],\"Mogyi\":[1380,6]}",
   "method": "POST",
});

fetch("/api/vasarlas", {
   "body": "{\"Hell\":[2500,10],\"Xixo\":[2450,7],\"Chips\":[960,4],\"Mogyi\":[1380,6]}",
   "method": "POST",
});

fetch("/api/vasarlas", {
   "body": "{\"Xixo\":[2450,7],\"Chips\":[960,4],\"Mogyi\":[1380,6]}",
   "method": "POST",
});

fetch("/api/vasarlas", {
   "body": "{\"Chips\":[960,4],\"Mogyi\":[1380,6]}",
   "method": "POST",
});

fetch("/api/vasarlas", {
   "body": "{\"Mogyi\":[1380,6]}",
   "method": "POST",
});
reloadData()
};

function clearRendelések() {
   fetch('/api/vasarlas', {
         method: 'DELETE',
         body: JSON.stringify('debugDelete')
      });
      reloadData()
};
// DEBUG ---------------------------------------------------


async function orderReady(item) {
   if (confirm('Biztos kész a rendelés?')) {
      await fetch('/api/vasarlas', {
         method: 'PUT',
         body: JSON.stringify(item)
      });
      reloadData()
   }
};

async function orderDone(item) {
   if (confirm('Biztos átvették a rendelést?')) {
      await fetch('/api/vasarlas', {
         method: 'DELETE',
         body: JSON.stringify(item)
      });
      reloadData()
   }
};

async function reloadData() {
   let adat = await fetch('/api/vasarlas');
   data = await adat.json()
};

setInterval(reloadData, 10000);

</script>

<main>
<div class="grid-container">
   <div class="grid-cell">
      <h1>Bejövő rendelések</h1>
      {#each Object.keys(data.rendelesek) as orderID, i}
         <div class="rendeles-kartya">
            <h1>#{orderID}</h1>
            {#each Object.keys(data.rendelesek[orderID]) as a}
               <p><span style="color: chartreuse">{a},</span> <span style="color: red;">{data.rendelesek[orderID][a][1]}</span> db, <span style="color: red;">{data.rendelesek[orderID][a][0]}</span> Ft</p>
            {/each}
            <button on:click={() => {orderReady(Object.keys(data.rendelesek)[i])}}>Kész</button>
         </div>
      {/each}
   </div>
   <div class="grid-cell">
      <h1>Kész rendelések</h1>
      {#each Object.keys(data.kesz) as orderID, i}
      <div class="rendeles-kartya rendeles-kartya-done">
         <h1>#{orderID}</h1>
         {#each Object.keys(data.kesz[orderID]) as a}
            <p><span style="color: chartreuse">{a},</span> <span style="color: red;">{data.kesz[orderID][a][1]}</span> db, <span style="color: red;">{data.kesz[orderID][a][0]}</span> Ft</p>
         {/each}
         <button on:click={() => {orderDone(Object.keys(data.kesz)[i])}}>Átadva</button>
      </div>
   {/each}
   </div>
   <div class="grid-cell">
      <div class="szerkesztes">
         <h1>Szerkesztés:</h1>
         <button on:click={darabModal.showModal()}>Darab</button>
         <button on:click={termekModal.showModal()}>Termékek</button>
         <button on:click={arakModal.showModal()}>Árak</button>
         <button style="color: yellow;" on:click={tesztrendelés}>Tesztrendelés</button>
         <button style="color: yellow; font-size: small" on:click={clearRendelések}>Rendelések törlése</button>
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
         min-height: 100vh;
         grid-template-columns: auto 50% 20%;
         grid-template-rows: auto;
         display: grid;

         .grid-cell {
            color: white;
            outline: .1em solid white;

            h1 {
               text-align: center;
               margin-top: .5em;
               font-size: larger;
            }

            button {
               background-color: #222;
               color: white;
               font-size: larger;
               border-radius: 1em;
               margin: 0 auto;
            }

            .rendeles-kartya {
               text-align: center;
               border-radius: 1em;
               background-color: rgb(34, 34, 34);
               outline: .1em solid rgb(255, 255, 255);
               display: inline-block;
               margin: .5em;
               padding: .5em;
               padding-top: 0;

               h1 {
                  color: rgb(0, 174, 255);
                  font-size: xx-large;
               }

               button {
                  padding: .4em;
                  // color: red;
                  
                  // &:first-of-type {
                  //    color: greenyellow;
                  // }
               }
            }

            .rendeles-kartya-done {
               background-color: #003500;
            }

            .szerkesztes {
               position: fixed;
               right: 1vw;


               button {
                  display: block;
                  margin-top: 1ch;
                  padding: .5em;
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