<script>
  // Let's import some modules and components
  import socket from "../../../network/socket.js";
  import { user } from "../../../config/stores/user.js";

  import { fade } from "svelte/transition";

  import { onMount } from "svelte";

  import MessageWrapper from "../../../components/Messages/Wrapper.svelte";

  import NetworkStatus from "../../../components/NetworkStatus.svelte";
  import SettingsButton from "../../../components/Chat/SettingsButton.svelte";

  import { goto } from "@sapper/app";

  // Page Store
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
      socket.emit('getMessages', $page.params.cid);
      socket.emit('listenTo', [ `chat/change-${$page.params.cid}`, `chat/messages-${$page.params.cid}` ]);
    };

    socket.on('connection', () => {
      socket.emit('getMessages', $page.params.cid);
      socket.emit('listenTo', [ `chat/change-${$page.params.cid}`, `chat/messages-${$page.params.cid}` ]);
    });

    // Let's firstly try to find this chat's
    // data in cached storage.

    let cachedChat = $user.chats.list.find(x => x.id == $page.params.cid);

    if (cachedChat != null) {
      chat = cachedChat;
    };

    // But yeah, we'll update this chat's information
    // anyway.
    socket.emit("chat", $page.params.cid);
  });

  socket.on('chat', (data) => {
    chat = data;

    // And now let's also change our
    // cached chat information (if needed)
    user.changeChat($page.params.cid, chat);
  });

  socket.on('chatMessages', (data) => {
    if (!data.cid == $page.params.cid) return;

    // And now let's update our not-so-cached-messages
    if (!data.error) {
      messages = data.messages;
    };
  });


  // @EVENT
  // Chat Change
  socket.on('event.chat/changed', (data) => {
    // Let's just update our chat information.
    chat = data;
  });

  // @EVENT
  // Message Sent
  socket.on('event.chat/message', (data) => {
    if (data.cid == $page.params.cid) {
      // Let's now update our message list

      // Firstly we need to check if
      // it's a previous message or no (I dunno)
      if (data.type != "fastMessage") {
        if (!data.message.author.id == $user.user.uid) {
          let newMessages = messages;
          newMessages.push(data.message);

          messages = newMessages;
        };
      } else {
        let newMessages = messages;
        newMessages.push(data.message);

        messages = newMessages;
      };
    };
  });

  function sendMessage() {
    // Let's firstly check if we have
    socket.emit('sendMessage', $page.params.cid, { type: "plain", content: message });
    message = null;
  };

  let chat = {
    name: "undefined"
  };

  let message;
  let messages = [];

  let loaded = false;
  let backButtonHovering = false;
</script>

{#if !loaded}
  <div out:fade style="z-index: 2;" class="absolute inset-x-0 top-0 w-full h-full">
    <div style="min-height: 100vh;" class="bg-white rounded-lg w-full md:w-40wv"></div>
  </div>
{/if}

<!-- Main Layout -->
<div style="min-height: 100vh;" class="relative w-full lg:w-40vw bg-white rounded-b-2lg shadow-lg flex flex-col items-center justify-center py-12 md:py-0">
  <!-- Some kind of a Header -->
  <div class="w-full flex justify-between items-center py-4">
    <div class="w-full flex px-4">
      <button on:mouseover={() => backButtonHovering = true} on:mouseout={() => backButtonHovering = false} on:click={() => history.back()} class="px-2 py-2 rounded-lg { backButtonHovering ? "bg-black" : "" }">
        <span style="height: 1.2rem;">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="{ backButtonHovering ? "#fff" : "#000" }" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-left"><polyline points="15 18 9 12 15 6"></polyline></svg>
        </span>
      </button>
    </div>
    
    <div class="flex w-full justify-center items-center">
      <img style="height: 1.2rem;" src="./icons/speech-balloon.png" alt="Chat Bubble">
      
      <div class="ml-2 w-full">
        <!-- <h1 class="text-white text-xl font-semibold">Chat</h1> -->
        <span class="text-xs border-b-1 border-dotted border-green-400 text-gray-800 font-medium">{chat.name.slice(0, 25)}{chat.name.split('').length >= 25 ? "..." : ""}</span>
      </div>
    </div>

    <!-- Network status and chat Settings -->
    <div class="w-full flex justify-end px-4">
      <NetworkStatus placement="bottom-center" />

      <!-- Settings button -->
      <SettingsButton cid={$page.params.cid} inversedColors={true} />
    </div>
  </div>

  <!-- Messages List -->
  <div style="overflow-y: scroll;" class="w-full flex-grow relative">
    <div class="absolute w-full px-4 md:px-6">
      {#each messages as message}
        <MessageWrapper author={message.author} message={message.message} />
      {/each}
    </div>
  </div>

  <!-- Send new message bar -->
  <div class="w-full items-center">
    <div style="{ backgrounds[Math.floor(Math.random() * backgrounds.length)] }" class="rounded-full w-full flex items-center py-1 px-1">
      <input on:keyup={(e) => {
        if (e.keyCode === 13) {
          e.preventDefault();
          sendMessage();
        };
      }} bind:value={message} class="w-full h-full text-md py-3 pl-2 bg-transparent text-white" type="text" placeholder="Message...">

      <button on:click={(e) => {
        sendMessage();
      }} class="px-3 py-3 rounded-full bg-white">
        <svg style="height: 1.4rem; width: 1.4rem;" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-send"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
      </button>
    </div>
  </div>
</div>