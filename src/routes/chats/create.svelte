<script>
  // Let's now import some modules
  // and components.
  import socket from "../../network/socket.js";
  import { user } from "../../config/stores/user.js";

  import axios from "axios";

  import { fade, slide } from 'svelte/transition';

  import {
    Spinner
  } from "darkmode-components/src/index";

  import { onMount } from "svelte";
  import { goto } from "@sapper/app";

  let loaded = false;

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

    // Let's now get our randomized chat name...
    axios.get('https://random-word-api.herokuapp.com/word?number=2&swear=0')
    .then((response) => {
      chatName = response.data.map((string) => string.charAt(0).toUpperCase() + string.slice(1)).join(' ');
    });
  });

  function createChat() {
    loading = true;

    socket.emit('createChat', { name: chatName })
  };

  socket.on('chatCreation', (chat) => {
    setTimeout(() => {
      goto(`/chat/${chat.id}/invitations`);
    }, 150);
  });

  let backButtonHovering = false;

  let loading = false;
  let chatName = "New Chat";
</script>

{#if !loaded}
  <div out:fade style="z-index: 2;" class="absolute inset-x-0 top-0 bg-white w-full h-full"></div>
{/if}

<!-- Main Layout -->
<div style="min-height: 100vh; { backgrounds[Math.floor(Math.random() * backgrounds.length)] }" class="relative w-full lg:w-40vw shadow-lg flex flex-col items-center justify-center py-12 md:py-0">
  <!-- Some kind of a Header -->
  <div style="z-index: 2;" class="absolute inset-x-0 top-0 py-4 px-4">
    <button on:mouseover={() => backButtonHovering = true} on:mouseout={() => backButtonHovering = false} on:click={() => goto(`/chats`)} class="px-2 py-2 rounded-lg { backButtonHovering ? "bg-white" : "" }">
      <span style="height: 1.2rem;">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="{ backButtonHovering ? "#000" : "#fff" }" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-left"><polyline points="15 18 9 12 15 6"></polyline></svg>
      </span>
    </button>
  </div>

  <div class="absolute inset-x-0 top-0 w-full flex justify-center items-center py-4">
    <img style="height: 2.2rem;" src="./icons/speech-balloon.png" alt="Chat Bubble">
    <h1 class="text-white text-xl font-semibold ml-2">Chat creation</h1>
  </div>

  <div>
    {#if loading}
      <div class="flex flex-col items-center">
        <Spinner size="65" color="#fff" />

        <h1 class="text-xl text-white font-semibold mt-6">Creating your chat...</h1>
      </div>
    { :else }
      <!-- Texts -->

      <div>
        <!-- Chat Name -->
        <div class="mt-6 w-full">
          <input bind:value={chatName} type="text">
        </div>

        <!-- Buttons -->
        <div class="mt-6">
          <!-- Create Chat -->
          <button on:click={() => createChat()} class="py-2 bg-white rounded-lg px-4 w-full text-center">
            Create chat named <span class="border-b-2 border-dotted border-green-600">{chatName}</span>
          </button>

          <!-- Cancel Button -->
        </div>
      </div>
    {/if}
  </div>
</div>