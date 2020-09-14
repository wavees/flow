<script>
  // Let's now import some modules and
  // components.
  import UserManager from "../../application/managers/UserManager.js";
  import ChatsManager from "../../application/managers/ChatsManager.js";
  import ErrorManager from "../../application/managers/ErrorManager.js";

  import { fade, slide } from 'svelte/transition';

  // Importing components
  import Notifications from "../../components/Notifications.svelte";
  import NetworkStatus from "../../components/NetworkStatus.svelte";

  import backgrounds from "../../config/themes/backgrounds.js";

  // Let's now import some actions 

  // @action GetChats
  import GetChats from "../../application/actions/chats/retrieve.js";

  import socket from "../../network/socket.js";

  import { Avatar, Spinner } from "darkmode-components/src/index";

  import ChatPanel from "../../components/ChatPanel.svelte";

  import { onMount } from "svelte";
  import { goto } from "@sapper/app";

  let loaded;

  onMount(() => {
    setTimeout(() => {
      loaded = true;

      // Let's update our chats
      if (!$ChatsManager.loaded) {
        ChatsManager.clearChats();
        // And now let's load our chats.
        GetChats($UserManager.token)
        .then((chats) => {
          ChatsManager.updateChats(chats);
        }).catch((error) => {
          ErrorManager.log({ error, zone: "user/getChats" });
        });
      };
    }, 50);
  });

  socket.on('event.chat/created', (data) => {
    // Let's now add this chat to our
    // chat list.
    ChatsManager.addChat(data.response.chat);
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

      {#if !$ChatsManager.loaded}
        <!-- Chats Loading -->
        <div style="min-height: 80vh;" class="w-full flex flex-col justify-center items-center">
          <Spinner size="15" />
        </div>
      { :else }
        {#if $ChatsManager.list.length > 0}
          <!-- content here -->
          <div class="pb-12">
            {#each $ChatsManager.list as chat}
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

        <p class="text-sm font-semibold ml-2">{$UserManager.name}</p>

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