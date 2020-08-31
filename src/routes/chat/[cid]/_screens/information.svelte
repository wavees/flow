<script>
  // Let's import some modules and components
  import socket from "../../../../network/socket.js";
  import { user } from "../../../../config/stores/user.js";

  import { fade } from "svelte/transition";
  import { goto } from "@sapper/app";

  import { onMount } from "svelte";

  import { Spinner } from "darkmode-components/src/index";

  // Components
  import ChatName from "../../../../components/Chat/Settings/Information/ChatName.svelte";

  onMount(() => {
    // By the way, let's request some
    // information about our chat...
    socket.emit("chat", cid);
  
    // Let's now get our invitations list...
    socket.emit("invitations", cid);
  });

  socket.on('chat', (data) => {
    chat = data;
    chatName = data.name;
  });

  let chat = {
    name: "undefined"
  };

  export let cid;
  export let noHeader = false;

  let backButtonHovering = false;
  let chatName;
</script>

<div class="flex w-full h-screen pt-8">
  <!-- Some kind of a Header -->
  {#if !noHeader}
    <div style="z-index: 2;" class="absolute inset-x-0 top-0 py-4 px-4">
      <button on:mouseover={() => backButtonHovering = true} on:mouseout={() => backButtonHovering = false} on:click={() => history.back()} class="px-2 py-2 rounded-lg { backButtonHovering ? "bg-white" : "" }">
        <span style="height: 1.2rem;">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="{ backButtonHovering ? "#000" : "#fff" }" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-left"><polyline points="15 18 9 12 15 6"></polyline></svg>
        </span>
      </button>
    </div>

    <div style="z-index: 1;" class="absolute inset-x-0 top-0 w-full flex justify-center items-center py-4">
      <img style="height: 2.2rem;" src="./icons/clipboard.png" alt="Info">

      <div class="ml-2 flex flex-col items-start">
        <h1 class="text-white text-xl font-semibold">Chat's information</h1>
        <span class="text-xs border-b-1 border-dotted border-green-400 text-white font-semibold">{chat.name.slice(0, 25)}{chat.name.split('').length >= 25 ? "..." : ""}</span>
      </div>
    </div>
  {/if}

  <!-- Canvas -->
  <div style="overflow-y: auto;" class="relative w-full flex-grow pt-12 pb-6">
    <div class="flex absolute flex-col items-center justify-center w-full px-4 md:px-8 lg:px-16">
      <!-- Change chat name -->
      <ChatName on:changeChat={(e) => {
        chat = e.detail;
      }} cid={cid} chatName={chatName} originalChatName={chat.name} />

      <!-- Change chat Avatar -->
      <div class="relative my-6 bg-white rounded-lg py-4 pb-12 px-4 w-full">
        
        <!-- Texts + icon -->
        <div class="flex">
          <img style="height: 1.2rem;" src="./icons/" alt="">

          <div class="mr-2">
            <h1 class="opacity-75 text-black text-xl font-semibold">Chat Avatar</h1>
            <p class="text-gray-700 text-sm"></p>
          </div>
        </div>

        <!-- Input -->
        <div class="mt-4 w-full">
          <input class="w-full px-1 bg-transparent text-gray-800 border-b-2 border-dotted border-green-700" type="text" bind:value={chatName}>
        </div>

        <!-- Some texts.. -->
        <div class="absolute inset-x-0 bottom-0 w-full text-center pb-2">
          <p class="text-gray-700 opacity-75 text-extra-xs">Chat's Avatar will update automatically when you upload it.</p>
        </div>
      </div>

      <!-- Change chat Type -->
      <div class="relative bg-white rounded-lg py-4 pb-12 px-4 w-full">
        
        <!-- Texts + icon -->
        <div class="flex">
          <img style="height: 1.2rem;" src="./icons/" alt="">

          <div class="mr-2">
            <h1 class="opacity-75 text-black text-xl font-semibold">Chat name</h1>
            <p class="text-gray-700 text-sm">Change your chat's name, f*ck yeah!</p>
          </div>
        </div>

        <!-- Input -->
        <div class="mt-4 w-full">
          <input class="w-full px-1 bg-transparent text-gray-800 border-b-2 border-dotted border-green-700" type="text" bind:value={chatName}>
        </div>

        <!-- Some texts.. -->
        <div class="absolute inset-x-0 bottom-0 w-full text-center pb-2">
          <p class="text-gray-700 opacity-75 text-extra-xs">Chat's name will save automatically as you type.</p>
        </div>
      </div>
    </div>
  </div>
</div>