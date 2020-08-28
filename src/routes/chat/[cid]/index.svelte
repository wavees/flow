<script>
  // Let's import some modules and components
  import socket from "../../../network/socket.js";
  import { user } from "../../../config/stores/user.js";

  import { fade } from "svelte/transition";

  import { onMount } from "svelte";

  onMount(() => {
    setTimeout(() => {
      loaded = true;
    }, 50);
  });

  let loaded = false;
</script>

{#if !loaded}
  <div out:fade style="z-index: 2;" class="absolute inset-x-0 top-0 w-full h-full">
    <div style="min-height: 100vh;" class="bg-white rounded-lg w-full md:w-40wv"></div>
  </div>
{/if}

<!-- Main Layout -->
<div style="min-height: 100vh;" class="relative w-full lg:w-40vw bg-white shadow-lg flex flex-col items-center justify-center py-12 md:py-0">
  <!-- Some kind of a Header -->
  <div class="absolute inset-x-0 top-0 w-full flex justify-center items-center py-4">
    <img style="height: 2.2rem;" src="./icons/wrench.png" alt="Wrench">
    <h1 class="text-white text-xl font-semibold ml-2">Settings</h1>
  </div>

  <!-- Canvas -->
</div>