<script>
   import { fly } from 'svelte/transition';

   export let targeturl;
   export let target;
   export let text;
   export let flyin;
   export let hideProfile;
</script>

<div in:fly={flyin} class="w-full text-[#ffb68e] font-semibold">
   <div class="w-full grid grid-cols-3 text-center py-1">
      <div class="flex justify-center items-center mr-auto">
         <a class="ml-4 mr-auto flex items-center" id="header-left" href="{targeturl}"><span class="mr-1">&lt;</span>{target}</a>
      </div>
      <div class="flex justify-center items-center">
         <h1>{text}</h1>
      </div>
      <div class="flex justify-center items-center">
         <a class="w-10 ml-auto mr-5" class:hideProfile href='/profil' >
				<img class="max-w-full rounded-xl hover:rounded-md transition-all" src="/api/avatar" alt="">
			</a>
      </div>
   </div>
</div>

<style lang="postcss">
	.hideProfile {
		visibility: hidden;
	}
</style>