<script>
  // Let's import some modules and components
  import { fade } from "svelte/transition";
  import InvitationsScreen from "./_screens/invitations.svelte";

  import socket from "../../../network/socket.js";

  import { onMount } from "svelte";

  // Page Stores
  import { stores } from "@sapper/app";
  const { page } = stores();

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

    if (socket.connected) {
      socket.emit('listenTo', [ `chat/join-${$page.params.cid}` ]);
    };

    socket.on('connection', () => {
      socket.emit('listenTo', [ `chat/join-${$page.params.cid}` ]);
    });
  });

  let loaded = false;
</script>

{#if !loaded}
  <div out:fade style="z-index: 2;" class="absolute inset-x-0 top-0 w-full h-full">
    <div style="min-height: 100vh;" class="bg-white rounded-lg w-full md:w-40wv"></div>
  </div>
{/if}

<!-- Main Layout -->
<div style="min-height: 100vh; { backgrounds[Math.floor(Math.random() * backgrounds.length)] }" class="relative flex items-center w-full lg:w-40vw shadow-lg py-12 md:py-0 md:pt-8">
  <InvitationsScreen cid={$page.params.cid} closeOnConnection={$page.query.closeOnConnection} />
</div>