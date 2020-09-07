<script>
  // Let's import some modules and components
  import socket from "../../../../network/socket.js";
  import { fade } from "svelte/transition";
  import { user } from "../../../../config/stores/user.js";

  import axios from "axios";
  import api from "../../../../config/application/api.js";

  import { onMount } from "svelte";

  // Components
  import ChatName from "../../../../components/Chat/Settings/Information/ChatName.svelte";

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

    let cachedChat = $user.chats.list.find(x => x.id == $page.params.cid);

    if (cachedChat != null) {
      chat = cachedChat;
      chatName = cachedChat.name;
    } else {
      axios.get(`${api.current.url}/${api.current.version}/chats/${$page.params.cid}`, { headers: { "Authorization": `Bearer ${$user.user.token}` } })
      .then((response) => {
        loaded = true;

        chat = response.data;
        chatName = response.data.name;

        // And now let's "cache" this chat.
        user.addChat(chat);
      }).catch((error) => {
        console.log("ERROR WHILE GETTING CHAT INFORMATION");
        console.log(error.response.data);
      });
    };

    // And now let's send socket request to listen to
    // some data.
    if (socket.connected) {
      socket.emit('listenTo', [ `chat/change-${$page.params.cid}`, `chat/messages-${$page.params.cid}` ]);
    };

    socket.on('connection', () => {
      socket.emit('listenTo', [ `chat/change-${$page.params.cid}`, `chat/messages-${$page.params.cid}` ]);
    });
  });

  function changeChat(e) {
    chat = e;
  };

  let chat = {
    name: "undefined"
  };
  
  let chatName;
  let backButtonHovering = false;
  let loaded = false;
</script>

{#if !loaded}
  <div out:fade style="z-index: 2;" class="absolute inset-x-0 top-0 w-full h-full">
    <div style="min-height: 100vh;" class="bg-white rounded-lg w-full md:w-40wv"></div>
  </div>
{/if}

<!-- Main Layout -->
<div style="min-height: 100vh; { backgrounds[Math.floor(Math.random() * backgrounds.length)] }" class="relative flex items-center w-full lg:w-40vw shadow-lg py-12 md:py-0 md:pt-8">
  <div class="flex flex-col w-full h-screen items-center relative pt-20">
    <!-- Some kind of a Header -->
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
        <span class="text-xs border-b-1 border-dotted border-green-400 text-white font-semibold">{chat.name != null ? chat.name.slice(0, 25) : ""}{chat.name != null ? chat.name.split('').length >= 25 ? "..." : "" : ""}</span>
      </div>
    </div>

    <!-- Canvas -->
    <div style="overflow-y: auto;" class="relative w-full flex-grow pb-8">
      <div class="flex absolute flex-col items-center justify-center w-full px-4 md:px-8 lg:px-16">
        <!-- Change chat name -->
        <ChatName on:changeChat={(e) => {
          changeChat(e.detail);
        }} cid={$page.params.cid} chatName={chatName} originalChatName={chat.name} />
      </div>
    </div>
  </div>
</div>