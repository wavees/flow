<script>
  // Let's now import some modules and
  // components.
  import { user } from "../../config/stores/user.js";

  import { fade, slide } from 'svelte/transition';

  import Notifications from "../../components/Notifications.svelte";
  import NetworkStatus from "../../components/NetworkStatus.svelte";

  import socket from "../../network/socket.js";

  import axios from "axios";
  import api from "../../config/application/api";

  import { Avatar, Spinner } from "darkmode-components/src/index";

  import ChatPanel from "../../components/ChatPanel.svelte";

  import { onMount } from "svelte";
  import { goto } from "@sapper/app";

  let loaded;

  let backgrounds = [
    "background: linear-gradient(to right, #00b4db, #0083b0);",
    "background: linear-gradient(to right, #ff9966, #ff5e62);",
    "background: linear-gradient(to right, #7f00ff, #e100ff);",
    "background: linear-gradient(to right, #4568dc, #b06ab3);"
  ];

  onMount(() => {
    setTimeout(() => {
      loaded = true;

      // Let's update our chats
      if (!$user.chats.loaded) {
        user.clearChats();
        // And now let's load our chats.
        axios.get(`${api.current.url}/${api.current.version}/chats`, { headers: { "Authorization": `Bearer ${$user.token}` } })
        .then((response) => {
          const chats = response.data;
          console.log("CHATS:");
          console.log(chats);

          user.updateChats(chats)
        }).catch((error) => {
          console.log("ERROR WHILE LOADING CHATS LIST");
          console.log(error.response.data);
        });
      };
    }, 50);
  });

  socket.on('event.chat/created', (data) => {
    // Let's now add this chat to our
    // chat list.
    user.addChat(data.response.chat);
  });
</script>

{#if !loaded}
  <div out:fade style="z-index: 3;" class="absolute inset-x-0 top-0 bg-white w-full h-full"></div>
{/if}

<!-- Main Layout -->
<div style="height: 100vh; overflow-y: auto;" class="w-full md:w-40vw bg-white shadow-lg">
  <div class="relative flex flex-col">
    <!-- Some kind of a Header -->
    <div class="w-full flex w-full justify-between px-4 md:px-6 pt-6">
      <h1 class="text-2xl font-semibold block">My Chats</h1>

      <!-- Create new Chat button -->
      <button on:click={() => goto('/chat/create')} class="">
        <img style="height: 1.2rem;" src="./icons/plus.svg" alt="Create new Chat">
      </button>
    </div>

    <!-- Chats List -->
    <div style="z-index: 1;" class="py-2 flex flex-col flex-grow justify-center px-4 md:px-6">
      <!-- Chat Entry -->

      {#if !$user.chats.loaded}
        <!-- Chats Loading -->
        <div style="min-height: 80vh;" class="w-full flex flex-col justify-center items-center">
          <Spinner size="15" />
        </div>
      { :else }
        {#if $user.chats.list.length > 0}
          <!-- content here -->
          <div class="pb-12">
            {#each $user.chats.list as chat}
              <ChatPanel chat={chat} />
            {/each}
          </div>
        { :else }
          <!-- Empty Chat List -->
          <div style="min-height: 80vh;" class="w-full flex flex-col justify-center items-center">
            <img style="width: 20vw;" src="./illustrations/undraw_Taken.svg" alt="Nothing Found">

            <h1 class="mt-6">Nothing Found!</h1>
          </div>
        {/if}
      {/if}
    </div>
  </div>

  <div style="z-index: 2;" class="absolute inset-x-0 bottom-0 w-full flex justify-center">
    <div class="w-full md:w-40vw flex justify-between px-4 md:px-8 py-2 bg-white">
      <!-- User Account -->
      <div class="flex items-center">
        <Avatar size="1.8" type="word" word="H" />

        <p class="text-sm font-semibold ml-2">{$user.name}</p>

        <!-- Chevron Icon -->
        <img class="ml-2" style="height: 1.2rem;" src="./icons/chevron-up.svg" alt="Chevron Down">
      </div>

      <!-- Notification and Network Status -->
      <div class="flex items-center">
        <!-- Network Status -->
        <NetworkStatus />

        <!-- Notification -->
        <Notifications />
      </div>
    </div>
  </div>
</div>