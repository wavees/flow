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
      randomizingName = false;
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

  function randomizeName() {
    randomizingName = true;

    // Let's now get our randomized chat name...
    axios.get('https://random-word-api.herokuapp.com/word?number=2&swear=0')
    .then((response) => {
      randomizingName = false;
      chatName = response.data.map((string) => string.charAt(0).toUpperCase() + string.slice(1)).join(' ');
    });
  };

  let randomizingName = true;
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

  <div class="w-full">
    {#if loading}
      <div class="flex flex-col items-center">
        <Spinner size="25" color="#fff" />

        <h1 class="text-xl text-white font-semibold mt-6">Creating your chat...</h1>
      </div>
    { :else }
      <div class="w-full relative h-48 flex flex-wrap px-4">
        <!-- Chat Name -->
        <div class="w-1/2 h-full my-4 md:my-0 px-4">
          <div class="rounded-lg bg-white w-full h-full py-4 px-3">
            <!-- Texts -->
            <div>
              <h1 class="font-semibold text-xl text-gray-900 opacity-75">Chat name</h1>
              <p class="text-xs text-gray-700">~ Make it more memorable and lovable</p>
            </div>

            <!-- Input -->
            <div class="mt-4 w-full">
              <input class="w-full px-1 bg-transparent text-gray-800 border-b-2 border-dotted border-green-700" type="text" bind:value={chatName}>
            </div>

            <!-- Buttons -->
            <div class="mt-6 w-full">
              <button on:click={() => randomizeName()} class="flex justify-center w-full py-2 items-center text-sm text-gray-900">
                {#if randomizingName}
                  <Spinner size="15" />
                
                  <p class="ml-2">Randomizing..</p>
                { :else }
                  <img style="height: 1rem;" src="./icons/twisted-rightwards-arrows.png" alt="<3">
                  
                  <p class="ml-2">Randomize!</p>
                {/if}
              </button>
            </div>
          </div>
        </div>

        <!-- Chat Type -->
        <div class="w-1/2 h-full my-4 md:my-0 px-4">
          <div style="overflow-y: hidden;" class="rounded-lg bg-white w-full h-full relative py-4 px-3">
            <!-- Texts -->
            <div>
              <h1 class="font-semibold text-xl text-gray-900 opacity-75">Publicity</h1>
              <p class="text-xs text-gray-700">~ Will you share this chat with someone to talk to?</p>
            </div>

            <!-- Buttons -->
            <div class="mt-4 w-full">
              <!-- Public -->
              <button class="border-1 border-solid border-transparent px-3 py-3 rounded-lg w-full text-start">
                <h1 class="font-semibold text-xs">Public</h1>
                <p class="text-extra-xs text-gray-700">Oh... So you decided to be more public, yeah?</p>
              </button>

              <!-- Only for my Devices -->
              <button class="border-1 border-solid border-blue-500 px-3 py-3 rounded-lg w-full text-start">
                <h1 class="font-semibold text-xs">Only for Me</h1>
                <p class="text-extra-xs text-gray-700">We'll make this chat <span class="border-b-1 border-dotted border-gray-700">Super-Duper-Mega</span> private (no)</p>
              </button>
            </div>

            <!-- CockBlocked -->
            <div style="background: rgba(0,0,0,0.5)" class="absolute inset-x-0 top-0 w-full h-full flex flex-col justify-center items-center rounded-lg">
              <img style="height: 2.2rem;" src="./icons/lock.png" alt="Lock">

              <!-- Texts -->
              <div class="mt-2 text-center">
                <h1 class="text-base font-semibold text-white">Blocked</h1>
                <p class="text-xs text-gray-100">Still in development, huh?</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    {/if}
  </div>

  <!-- Buttons -->
  <div class="absolute inset-x-0 bottom-0 w-full py-3 px-4 md:px-8 lg:px-12">
    <div class="w-full flex { loading ? "hidden" : "" } ">
      <!-- Create Chat -->
      <button on:click={() => createChat()} class="py-2 mr-3 bg-white rounded-lg w-full text-center text-gray-900">
        Create chat
      </button>

      <!-- Cancel -->
      <button on:click={() => goto('/chats')} class="ml-3 py-2 bg-white rounded-lg w-full text-center text-gray-900">
        Cancel
      </button>
    </div>
  </div>
</div>