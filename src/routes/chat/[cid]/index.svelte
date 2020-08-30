<script>
  // Let's import some modules and components
  import socket from "../../../network/socket.js";
  import { user } from "../../../config/stores/user.js";

  import { fade } from "svelte/transition";

  import { onMount } from "svelte";

  import NetworkStatus from "../../../components/NetworkStatus.svelte";
  import SettingsButton from "../../../components/Chat/SettingsButton.svelte";

  import { goto } from "@sapper/app";

  // Page Store
  import { stores } from "@sapper/app";
  const { page } = stores();

  let backgrounds = [
    "background: linear-gradient(to right, #00b4db, #0083b0);",
    "background: linear-gradient(to right, #ff9966, #ff5e62);",
    "background: linear-gradient(to right, #7f00ff, #e100ff);",
    "background: linear-gradient(to right, #4568dc, #b06ab3);"
  ];

  onMount(() => {
    setTimeout(() => {
      loaded = true;
    }, 50);

    socket.emit("chat", $page.params.cid);
  });

  socket.on('chat', (data) => {
    chat = data;
  });

  let chat = {
    name: "undefined"
  };

  let loaded = false;
  let backButtonHovering = false;
</script>

{#if !loaded}
  <div out:fade style="z-index: 2;" class="absolute inset-x-0 top-0 w-full h-full">
    <div style="min-height: 100vh;" class="bg-white rounded-lg w-full md:w-40wv"></div>
  </div>
{/if}

<!-- Main Layout -->
<div style="min-height: 100vh;" class="relative w-full lg:w-40vw bg-white shadow-lg flex flex-col items-center justify-center py-12 md:py-0">
  <!-- Some kind of a Header -->
  <div class="absolute inset-x-0 top-0 w-full flex justify-between items-center py-4">
    <div class="w-full flex px-4">
      <button on:mouseover={() => backButtonHovering = true} on:mouseout={() => backButtonHovering = false} on:click={() => history.back()} class="px-2 py-2 rounded-lg { backButtonHovering ? "bg-black" : "" }">
        <span style="height: 1.2rem;">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="{ backButtonHovering ? "#fff" : "#000" }" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-left"><polyline points="15 18 9 12 15 6"></polyline></svg>
        </span>
      </button>
    </div>
    
    <div class="flex w-full justify-center items-center">
      <img style="height: 1.2rem;" src="./icons/speech-balloon.png" alt="Chat Bubble">
      
      <div class="ml-2">
        <!-- <h1 class="text-white text-xl font-semibold">Chat</h1> -->
        <span class="text-xs border-b-1 border-dotted border-green-400 text-gray-800 font-medium">{chat.name.slice(0, 25)}{chat.name.split('').length >= 25 ? "..." : ""}</span>
      </div>
    </div>

    <!-- Network status and chat Settings -->
    <div class="w-full flex justify-end px-4">
      <NetworkStatus placement="bottom-center" />

      <!-- Settings button -->
      <SettingsButton cid={$page.params.cid} inversedColors={true} />
    </div>
  </div>
  <!-- Canvas -->
</div>