<script>
  // Let's import some modules and components
  import socket from "../../../network/socket.js";
  import { user } from "../../../config/stores/user.js";

  import { fade } from "svelte/transition";
  import { goto } from "@sapper/app";

  import { onMount } from "svelte";

  import { Spinner } from "darkmode-components/src/index";

  // Page Store
  import { stores } from "@sapper/app";
  const { page } = stores();

  onMount(() => {
    setTimeout(() => {
      loaded = true;
    }, 50);

    // Let's now get our invitations list...
    socket.emit("invitations", $page.params.cid);
  });

  socket.on("invitations", (invitations) => {
    loading = false;
    currentInvitation = invitations[0];

    // And now let's update our qrcode canvas...
    var qr = new QRious({
      element: document.getElementById('code'),
      value: `https://flow.wavees.ml/chat/join/${encodeURIComponent(currentInvitation.words)}`,
      size: 250
    });
  });

  let currentInvitation = {};
  let invitations = [];
  let loaded = false;
  let loading = true;

  let backButtonHovering = false;

  let backgrounds = [
    "background: linear-gradient(to right, #00b4db, #0083b0);",
    "background: linear-gradient(to right, #ff9966, #ff5e62);",
    "background: linear-gradient(to right, #7f00ff, #e100ff);",
    "background: linear-gradient(to right, #4568dc, #b06ab3);"
  ];
</script>

{#if !loaded}
  <div out:fade style="z-index: 2;" class="absolute inset-x-0 top-0 w-full h-full">
    <div style="min-height: 100vh;" class="bg-white rounded-lg w-full md:w-40wv"></div>
  </div>
{/if}

<!-- Main Layout -->
<div style="min-height: 100vh; { backgrounds[Math.floor(Math.random() * backgrounds.length)] }" class="relative w-full lg:w-40vw shadow-lg flex flex-col items-center justify-center py-12 md:py-0 md:pt-8">
  <!-- Some kind of a Header -->
  <div style="z-index: 2;" class="absolute inset-x-0 top-0 py-4 px-4">
    <button on:mouseover={() => backButtonHovering = true} on:mouseout={() => backButtonHovering = false} on:click={() => goto(`/chat/${$page.params.cid}`)} class="px-2 py-2 rounded-lg { backButtonHovering ? "bg-white" : "" }">
      <span style="height: 1.2rem;">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="{ backButtonHovering ? "#000" : "#fff" }" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-left"><polyline points="15 18 9 12 15 6"></polyline></svg>
      </span>
    </button>
  </div>

  <div style="z-index: 1;" class="absolute inset-x-0 top-0 w-full flex justify-center items-center py-4">
    <img style="height: 2.2rem;" src="./icons/handshake.png" alt="Handshake">
    <h1 class="text-white text-xl font-semibold ml-2">Invitation</h1>
  </div>

  <!-- Canvas -->
  <div class="w-64 h-64 bg-white rounded-lg relative flex justify-center items-center p-2">
    {#if loading}
      <div class="absolute inset-x-0 top-0 w-full h-full rounded-lg flex justify-center items-center">
        <Spinner size="25" />
      </div>
    {/if}
    <canvas class="w-full h-full rounded-lg" id="code"></canvas>
  </div>

  <div style="{ loading ? "visibility: hidden;" : "" }" class="w-full px-4 md:px-6 lg:px-8 mt-6 text-center">
    <!-- Some Texts -->
    <div class="text-center px-4 md:px-8 lg:px-12">
      <h1 class="font-semibold text-xl text-white">Here's your chat Invitation Link</h1>
      <p class="text-gray-100 text-sm">And yes, it's an QRCode! But if you'll press on <span class="border-b-2 border-dotted border-green-500">Show Link</span> button, than you'll be able to share direct link to this chat! (Can be used when you are trying to connect two Computers)</p>
    </div>

    <!-- Buttons -->
    <div class="w-full flex mt-6 px-4 md:px-8">
      <button class="py-2 px-4 w-full mr-3 bg-white rounded-lg text-gray-900">
        How to use
      </button>

      <button class="py-2 w-full ml-3 rounded-lg bg-white flex items-center justify-center text-gray-900">
        <img style="height: 1.2rem;" class="mr-2" src="./icons/link.svg" alt="Link Icon">
        Show Link
      </button>
    </div>
  </div>
</div>