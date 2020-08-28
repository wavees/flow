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
      value: `https://flow.wavees.ml/chat/join/${encodeURIComponent(currentInvitation.words)}`
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
<div style="min-height: 100vh; { backgrounds[Math.floor(Math.random() * backgrounds.length)] }" class="relative w-full lg:w-40vw shadow-lg flex flex-col items-center justify-center py-12 md:py-0">
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
    <h1 class="text-white text-xl font-semibold ml-2">Invitations</h1>
  </div>

  <!-- Canvas -->
  <div class="w-64 h-64 bg-white rounded-lg relative">
    {#if loading}
      <div class="absolute inset-x-0 top-0 w-full h-full rounded-lg flex justify-center items-center">
        <Spinner size="25" />
      </div>
    {/if}
    <canvas class="w-full h-full rounded-lg" id="code"></canvas>
  </div>

  <div style="{ loading ? "visibility: hidden;" : "" }" class="w-full px-4 md:px-6 lg:px-8 mt-6 text-center">
    <input class="rounded-lg text-center bg-white text-gray-900 w-full py-2" readonly type="text" bind:value={currentInvitation.words}>
    <p class="mt-3 text-sm text-gray-100">Join string</p>
  </div>
</div>