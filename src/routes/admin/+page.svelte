<script>
import { fade } from "svelte/transition";


export let data;

let darabModal;
let termekModal;
let arakModal;
let tempTermekek = {}
let tempTermekekRemove = []

function termekModalInput(event) { // Hozzáadja (Zölddel) a beirt termékeket.
   event.preventDefault()
   const data = Object.fromEntries(new FormData(event.target).entries())

   tempTermekek[data.termek] = [data.ar,data.darab]
}

function termekModalInputRemove(event) { // Kitörli a (Zöld) frissen hozzáadott (Még nem véglegesitett) termékeket.
   event.preventDefault()
   const data = Object.fromEntries(new FormData(event.target).entries())

   delete tempTermekek[Object.keys(data)[0]]
   tempTermekek = tempTermekek // Kell reaktivitas miatt
}

function termekModalRemove(event) { // Kitörli a már (régen) véglegesen hozzáadott termekeket.
   event.preventDefault()
   const data = Object.fromEntries(new FormData(event.target).entries())

   if (!tempTermekekRemove.includes(Object.keys(data)[0])) {
      tempTermekekRemove.push(Object.keys(data)[0])
      tempTermekekRemove = tempTermekekRemove // Kell reaktivitas miatt
   } else {
      tempTermekekRemove = tempTermekekRemove.filter(id => id != Object.keys(data)[0])
   }
}

async function orderInProgress(item) {
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
         method: 'PATCH',
         body: JSON.stringify(item)
      });
      reloadData()
   }
};

async function deleteOrder(item,type) {
   if (confirm('Biztos törli a rendelést?')) {
      await fetch('/api/vasarlas', {
         method: 'DELETE',
         body: JSON.stringify({
               'item': item,
               'type': type
            })
      });
      reloadData()
   }
};

async function reloadData() {
   let adat = await fetch('/api/vasarlas');
   data.rendelesek = await adat.json()
};

setInterval(reloadData, 10000);

</script>

<main>
<div class="grid-container">
   <div class="grid-cell">
      <h1>Bejövő rendelések</h1>
      {#each Object.keys(data.rendelesek.bejovo) as orderID, i (orderID)}
         <div transition:fade class="rendeles-kartya">
            <h2 on:click={() => {deleteOrder(Object.keys(data.rendelesek.bejovo)[i],'rendeles')}}>❌</h2>
            <h1>#{orderID}</h1>
            <h3>{data.rendelesek.bejovo[orderID].name}</h3>
            {#each Object.keys(data.rendelesek.bejovo[orderID].items) as a}
               <p><span style="color: chartreuse">{a},</span> <span style="color: red;">{data.rendelesek.bejovo[orderID].items[a][0]}</span> db, <span style="color: red;">{data.rendelesek.bejovo[orderID].items[a][1]}</span> Ft</p>
            {/each}
            <button on:click={() => {orderInProgress(orderID)}}>Kész</button>
         </div>
      {/each}
   </div>
   <div class="grid-cell">
      <h1>Kész rendelések</h1>
      {#each Object.keys(data.rendelesek.kesz) as orderID, i (orderID)}
      <div transition:fade class="rendeles-kartya rendeles-kartya-done">
         <h2 on:click={() => {deleteOrder(Object.keys(data.rendelesek.kesz)[i],'kesz')}}>❌</h2>
         <h1>#{orderID}</h1>
         <h3>{data.rendelesek.kesz[orderID].name}</h3>
         {#each Object.keys(data.rendelesek.kesz[orderID].items) as a}
            <p><span style="color: chartreuse">{a},</span> <span style="color: red;">{data.rendelesek.kesz[orderID].items[a][0]}</span> db, <span style="color: red;">{data.rendelesek.kesz[orderID].items[a][1]}</span> Ft</p>
         {/each}
         <button on:click={() => {orderDone(orderID)}}>Átadva</button>
      </div>
   {/each}
   </div>
   <div class="grid-cell">
      <div class="szerkesztes">
         <h1>Szerkesztés:</h1>
         <button on:click={darabModal.showModal()}>Darab</button>
         <button on:click={termekModal.showModal()}>Termékek</button>
         <button on:click={arakModal.showModal()}>Árak</button>
      </div>
   </div>
</div>

<!-- Modalok: -->

<dialog class="darab-modal" bind:this={darabModal}>
   <form action="?/darab" method="POST">
      {#each data.termekekLista as termekek, i (i)}
         <p>{termekek.termek} <input name="{termekek.id}" style="width: 6ch;" value="{termekek.darab}" type="number">db</p>
      {/each}
      <button>Mentés</button>
   </form>
   <button on:click={darabModal.close()}><h1>Bezár</h1></button>
</dialog>

<dialog class="termekek-modal" bind:this={termekModal}>
   <h2>Eddigi termékek:</h2>
      {#each data.termekekLista as termekek, i (i)}
         <form on:submit={termekModalRemove}>
            <p class:crossed-out="{tempTermekekRemove.includes(termekek.id)}">{termekek.termek}: {termekek.ar} Ft, {termekek.darab} db
               <input type="text" hidden name="{termekek.id}">
               <button id="formRemoveButton"> {#if tempTermekekRemove.includes(termekek.id)}↻{:else}❌{/if}</button>
            </p>
         </form>
      {/each}

   <h2 style="color: greenyellow;">Hozzáadandó termékek:</h2>
   {#each Object.keys(tempTermekek) as tempTermek, i (i)}
      <form on:submit={termekModalInputRemove}>
         <p style="color: green;">+ {tempTermek}: {tempTermekek[tempTermek][0]} Ft, {tempTermekek[tempTermek][1]} db 
            <input type="text" hidden name="{tempTermek}">
            <button id="formRemoveButton">❌</button>
         </p>
      </form>
   {/each}

   <form on:submit={termekModalInput}>
      Termék neve: <input type="text" name="termek" style="width: 20ch;"> Termék ára: <input type="number" name="ar" style="width: 6ch;"> Ft, Termék darab: <input type="number" name="darab" style="width: 6ch;"> db <button style="color: greenyellow;">+</button>
   </form>

   <form action="?/termekek" method="POST">
      <input hidden type="text" name="add" value="{JSON.stringify(tempTermekek)}">
      <input hidden type="text" name="remove" value="{JSON.stringify(tempTermekekRemove)}">
      <button>Mentés</button>
   </form>

   <button on:click={termekModal.close()}><h1>Bezár</h1></button>
</dialog>

<dialog class="arak-modal" bind:this={arakModal}>
   <form action="?/ar" method="POST">
      {#each data.termekekLista as termekek, i (i)}
      <p>{termekek.termek} <input name="{termekek.id}" style="width: 8ch;" value="{termekek.ar}" type="number">Ft</p>
      {/each}
   <button>Mentés</button>
   </form>
   <button on:click={arakModal.close()}><h1>Bezár</h1></button>
</dialog>

</main>

<style lang="scss">
   
   main {
      .grid-container {
         min-height: 100vh;
         grid-template-columns: auto 52% 20%;
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
               position: relative;

               h1 {
                  color: rgb(0, 174, 255);
                  font-size: xx-large;
               }

               p {
                  font-size: larger;
               }

               h2 {
                  position: absolute;
                  right: 1ch;
                  top: .8ch;
                  cursor: pointer;
               }

               h3 {
                  color: chocolate;
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
         padding: 1em;
         border: 1px solid white;

         &::backdrop {
            background: rgba(0, 0, 0, 0.800);
         }
         
         #formRemoveButton {
            margin-left: .5ch;
            padding: 0;
            border: none;
            background-color: rgba(0, 0, 0, 0);
            cursor: pointer;
         }

         button {
            background-color: rgb(50, 50, 50);
            color: white;
            font-size: larger;
            border-radius: 1em;
            padding: .5em;
         }
      }

      .crossed-out {
         text-decoration: line-through;
         text-decoration-color: lightgray;
         color: rgba(211, 211, 211, 0.75);
      }
   }

</style>