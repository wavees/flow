<script>
  // Let's import some modules and components
  import socket from "../../../network/socket.js";
  import { user } from "../../../config/stores/user.js";

  import { onMount } from "svelte";

  import { stores } from "@sapper/app";
  import { goto } from "@sapper/app";

  // page store
  const { page } = stores();

  import { Spinner } from "darkmode-components/src/index";

  let backgrounds = [
    "background: linear-gradient(to right, #00b4db, #0083b0);",
    "background: linear-gradient(to right, #ff9966, #ff5e62);",
    "background: linear-gradient(to right, #7f00ff, #e100ff);",
    "background: linear-gradient(to right, #4568dc, #b06ab3);"
  ];

  onMount(() => {
    const token = $user.user.token;
    const words = $page.params.words;

    // Let's now send our request
    // to server.
    socket.emit('useInvite', words);
  });

  socket.on('invitationUsed', (data) => {
    console.log(data);
    goto(`/chats`);
  });
</script>

<div style="min-height: 100vh; { backgrounds[Math.floor(Math.random() * backgrounds.length)] }" class="relative w-full lg:w-40vw shadow-lg flex flex-col items-center justify-center py-12 md:py-0">
  <Spinner size="65" color="#fff" />
</div>