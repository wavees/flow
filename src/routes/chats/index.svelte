<script>
  // Let's now import some modules and
  // components.
  import { user } from "../../config/stores/user.js";

  import { fade } from 'svelte/transition';

  import Notifications from "../../components/Notifications.svelte";
  import NetworkStatus from "../../components/NetworkStatus.svelte";

  import socket from "../../network/socket.js";

  import { Avatar } from "darkmode-components/src/index";

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
    }, 50);
  });
</script>

{#if !loaded}
  <div out:fade style="z-index: 2;" class="absolute inset-x-0 top-0 bg-white w-full h-full"></div>
{/if}

<!-- Main Layout -->
<div style="height: 100vh; overflow-y: auto;" class="w-full md:w-40vw bg-white shadow-lg">
  <div class="relative flex flex-col">
    <!-- Some kind of a Header -->
    <div class="w-full flex w-full justify-between px-4 md:px-6 pt-6">
      <h1 class="text-2xl font-semibold block">My Chats</h1>

      <!-- Create new Chat button -->
      <button on:click={() => goto('/chats/create')} class="">
        <img style="height: 1.2rem;" src="./icons/plus.svg" alt="Create new Chat">
      </button>
    </div>

    <!-- Chats List -->
    <div class="py-2 flex flex-col flex-grow justify-center px-4 md:px-6">
      <!-- Chat Entry -->
      <!-- <div class="cursor-pointer w-full flex items-center rounded-lg hover:bg-gray-200 hover:shadow-lg px-6 py-2">
        #Avatar
        <Avatar type="word" word="C" />

        #Name and Last Message
        <div class="ml-4">
          <h1 class="text-xl font-semibold">Chat Name</h1>
          <p class="text-sm"><span class="text-gray-700">Test User:</span> Hello everybody!</p>
        </div>

      </div> -->
      
      <!-- Empty Chat List -->
      <div style="min-height: 80vh;" class="w-full flex flex-col justify-center items-center">
        <img style="width: 20vw;" src="./illustrations/undraw_Taken.svg" alt="Nothing Found">

        <h1 class="mt-6">Nothing Found!</h1>
      </div>
    </div>
  </div>

  <div class="absolute inset-x-0 bottom-0 w-full flex justify-center">
    <div class="w-full md:w-40vw flex justify-between px-4 md:px-8 py-2">
      <!-- User Account -->
      <div class="flex items-center">
        <Avatar size="1.8" type="word" word="H" />

        <p class="text-sm font-semibold ml-2">{$user.user.name}</p>

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