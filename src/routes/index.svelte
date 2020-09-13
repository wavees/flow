<script>
  // Let's now import some modules
  // and components.
  import socket from "../network/socket.js";
  import UserManager from "../application/managers/UserManager.js";

  import backgrounds from "../config/themes/backgrounds.js";

  import { fade } from 'svelte/transition';

  import { _ } from "svelte-i18n";
  
  import { onMount } from "svelte";
  import { goto } from "@sapper/app";

  // Importing components
  import { Button, Heading, Text, Container } from "../components";

  import NetworkStatus from "../components/NetworkStatus.svelte";

  let buttonBackground;

  // Let's now determine if this
  // screen is loaded or no (currently
  // used as some kind of a transition between
  // pages)
  let loaded = false;

  onMount(() => {
    setTimeout(() => {
      loaded = true;
    }, 50);
  });
</script>

<!-- Loading Screen (just white screen) -->
{#if !loaded}
  <div out:fade style="z-index: 2;" class="absolute inset-x-0 top-0 bg-white w-full h-full"></div>
{/if}

<!-- Main Layout -->
<Container>
  <div class="py-24 md:py-0">
    <!-- Some Texts -->
    <div class="w-full text-center px-8 lg:px-16 mt-32 md:mt-0">
      <Heading weight="semibold" size="3xl">{$_("landing.hero.title", { default: "Connect your PCs and Phones" })}</Heading>
      <Text classes="text-base md:text-sm" color="gray-100">{$_("landing.hero.subtitle", { default: "Connect your computers and phones for the most convenient, fast and secure data transfer between all of them." })}</Text>
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
      {#if $UserManager.uid != null}
        <!-- Go to my Chats button -->
        <Button on:click={(e) => {
          goto('/chats');
        }} classes="mt-6">
          Go to my Chats
        </Button>
      { :else }
        <button>

        </button>
      {/if}
    </div>
  </div>
</Container>