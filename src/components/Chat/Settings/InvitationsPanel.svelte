<script>
  // Let's import some modules and components
  import { goto } from "@sapper/app";
  // Page store
  import { stores } from "@sapper/app";
  const { page } = stores();

  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();
</script>

<div on:click={() => goto(`/chat/${$page.params.cid}/invitations`)} class="w-full h-full rounded-lg cursor-pointer bg-white py-4 px-4 relative">
  <!-- Image -->
  <img style="width: 3rem;" src="./icons/waving-hand-sign.png" alt="Yeah!">

  <!-- Texts -->
  <div class="mt-4 pr-4 md:pr-6">
    <h1 class="font-semibold text-black text-xl opacity-75">Invitations</h1>
    <p class="text-gray-700 text-xs">Invite your friend to this chat! <span class="rounded-lg px-2 py-1 bg-gray-200 text-whtie">Retrieve</span> all invitation codes and <span class="rounded-lg px-2 py-1 bg-gray-200 text-whtie">create</span> new ones!</p>
  </div>
</div>