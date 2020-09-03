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

  onMount(() => {
    const token = $user.user.token;
    const words = $page.params.words;

    // Let's now send our request
    // to server.
    socket.emit('useInvite', words);
  });

  socket.on('invitationUsed', (data) => {
    goto(`/chat/${data.cid}`);
  });
</script>

<div class="absolute w-full h-screen flex justify-center items-center bg-white">
  <!-- Branding -->
  <div class="flex flex-col justify-center items-center">
    <Spinner size="15"  />
  </div>
</div>