<script>
  // Let's import some modules and components
  import socket from "../../../../network/socket.js";
  import { user } from "../../../../config/stores/user.js";

  import { fade } from "svelte/transition";
  import { goto } from "@sapper/app";

  import { onMount } from "svelte";

  import { Spinner } from "darkmode-components/src/index";

  // Components
  import ChatName from "../../../../components/Chat/Settings/Information/ChatName.svelte";

  onMount(() => {
    // By the way, let's request some
    // information about our chat...

    // Let's firstly check if we have got this
    // chat's information cached.
    let cachedChat = $user.chats.list.find(x => x.id == cid);

    if (cachedChat != null) {
      chat = cachedChat;
    };

    // But we'll update this chat's info anyway
    socket.emit("chat", cid);
  
    // Let's now get our invitations list...
    socket.emit("invitations", cid);
  });

  socket.on('chat', (data) => {
    chat = data;
    chatName = data.name;
  });

  let chat = {
    name: "undefined"
  };

  export let cid;
  export let noHeader = false;

  let backButtonHovering = false;
  let chatName;

  function changeChat(e) {
    chat = e;
  };
</script>

<div class="flex flex-col w-full h-screen items-center relative pt-20">
  <!-- Some kind of a Header -->
  {#if !noHeader}
    <div style="z-index: 2;" class="absolute inset-x-0 top-0 px-4 py-4 md:py-0">
      <button on:mouseover={() => backButtonHovering = true} on:mouseout={() => backButtonHovering = false} on:click={() => history.back()} class="px-2 py-2 rounded-lg { backButtonHovering ? "bg-white" : "" }">
        <span style="height: 1.2rem;">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="{ backButtonHovering ? "#000" : "#fff" }" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-left"><polyline points="15 18 9 12 15 6"></polyline></svg>
        </span>
      </button>
    </div>

    <div style="z-index: 1;" class="absolute inset-x-0 top-0 w-full flex justify-center items-center py-4 md:py-0">
      <img style="height: 2.2rem;" src="./icons/clipboard.png" alt="Info">

      <div class="ml-2 flex flex-col items-start">
        <h1 class="text-white text-xl font-semibold">Chat's information</h1>
        <span class="text-xs border-b-1 border-dotted border-green-400 text-white font-semibold">{chat.name.slice(0, 25)}{chat.name.split('').length >= 25 ? "..." : ""}</span>
      </div>
    </div>
  {/if}

  <!-- Canvas -->
  <div style="overflow-y: auto;" class="relative w-full flex-grow pb-8">
    <div class="flex absolute flex-col items-center justify-center w-full px-4 md:px-8 lg:px-16">
      <!-- Change chat name -->
      <ChatName on:changeChat={(e) => {
        changeChat(e.detail);
      }} cid={cid} chatName={chatName} originalChatName={chat.name} />
    </div>
  </div>
</div>