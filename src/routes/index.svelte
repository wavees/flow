<script>
  // Let's now import some modules
  // and components.
  import socket from "../network/socket.js";
  import { user } from "../config/stores/user.js";

  import { fade } from 'svelte/transition';

  import { onMount } from "svelte";
  import { goto } from "@sapper/app";

  import NetworkStatus from "../components/NetworkStatus.svelte";
  import Button from "../components/Buttons/Normal.svelte";

  let background;
  let buttonBackground;

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
  });
</script>

{#if !loaded}
  <div out:fade style="z-index: 2;" class="absolute inset-x-0 top-0 bg-white w-full h-full"></div>
{/if}

<!-- Main Layout -->
<div style="height: 100vh; overflow-y: auto; { backgrounds[Math.floor(Math.random() * backgrounds.length)] }" class="relative w-full lg:w-40vw shadow-lg flex flex-col items-center justify-center">
  <!-- Header -->
  <!-- <div class="absolute inset-x-0 top-0 w-full py-4 flex justify-center">
    #Logotype

    <h1>Flow</h1>
  </div> -->

  <!-- Hero with some Icons -->
  
  <div class="py-24 md:py-0">
    <!-- Some Texts -->
    <div class="w-full text-center px-8 lg:px-16 mt-32 md:mt-0">
      <h1 class="font-semibold text-3xl text-white">Connect your PCs and Phones</h1>
      <p class="text-base md:text-sm text-gray-100">Connect your computers and phones for the most convenient, fast and secure data transfer between all of them.</p>
    </div>

    <!-- Icons -->
    <div class="mt-8 w-full flex flex-wrap justify-center">
      <!-- Fully Free -->
      <div class="flex flex-col items-center">
        <div class="w-24 h-24 mx-4 md:mx-8 my-4 md:my-0 bg-white rounded-lg flex flex-col items-center justify-center">
          <img style="width: 3rem;" src="./icons/money-with-wings.png" alt="">
        </div>

        <!-- Text -->
        <div class="text-center mt-1 md:mt-4">
          <h1 class="text-white text-sm md:text-base">Fully free</h1>
          <p class="text-xs text-gray-200"></p>
        </div>
      </div>

      <!-- No Registration -->
      <div class="flex flex-col items-center">
        <div class="w-24 h-24 mx-4 md:mx-8 my-4 md:my-0 bg-white rounded-lg flex flex-col items-center justify-center">
          <img style="width: 3rem;" src="./icons/incoming-envelope.png" alt="">
        </div>

        <!-- Text -->
        <div class="text-center mt-1 md:mt-4">
          <h1 class="text-white text-sm md:text-base">No Registration</h1>
          <p class="text-xs text-gray-200"></p>
        </div>
      </div>

      <!-- Community Powered -->
      <div class="flex flex-col items-center">
        <div class="w-24 mx-4 md:mx-8 my-4 md:my-0 h-24 bg-white rounded-lg flex flex-col items-center justify-center">
          <img style="width: 3rem;" src="./icons/unicorn-face.png" alt="">
        </div>

        <!-- Text -->
        <div class="text-center mt-1 md:mt-4">
          <h1 class="text-white text-sm md:text-base">Community Powered</h1>
          <p class="text-xs text-gray-200"></p>
        </div>
      </div>
    </div>

    <!-- Buttons -->
    <div class="mt-8 text-white w-full flex flex-col items-center">
      {#if $user.user.id != null}
        <!-- User Avatar and some Account information -->
        <!-- <div class="">

        </div> -->

        <!-- Go to my Chats button -->
        <Button on:click={(e) => {
          goto('/chats');
        }} classes="mt-6" background="transparent" whiteOnHover={true}>
          Go to my Chats
        </Button>
      { :else }
        <button>
        
        </button>
      {/if}
    </div>
  </div>
</div>