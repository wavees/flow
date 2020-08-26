<script>
  // Let's now import some modules
  // and components.
  import socket from "../../network/socket.js";
  import { user } from "../../config/stores/user.js";

  import { fade } from 'svelte/transition';

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
  });
</script>

{#if !loaded}
  <div out:fade style="z-index: 2;" class="absolute inset-x-0 top-0 bg-white w-full h-full"></div>
{/if}

<!-- Main Layout -->
<div style="min-height: 100vh; { backgrounds[Math.floor(Math.random() * backgrounds.length)] }" class="relative w-full lg:w-40vw shadow-lg flex flex-col items-center justify-center py-12 md:py-0">

</div>