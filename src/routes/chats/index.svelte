<script>
  // Let's now import some modules and
  // components.
  import { UserManager, ChatsManager, ErrorManager } from "../../application/managers";

  import { _ } from "svelte-i18n";

  import { onMount } from "svelte";
  import { goto } from "@sapper/app";

  import { fade, slide } from 'svelte/transition';

  // Importing components
  import Notifications from "../../components/Notifications.svelte";
  import NetworkStatus from "../../components/NetworkStatus.svelte";

  // Let's now import some actions 

  // @action GetChats
  import GetChats from "../../application/actions/chats/retrieve.js";

  // Importing components
  import { Button, Heading, Text, Container } from "../../components";
  import backgrounds from "../../config/themes/backgrounds.js";


  // Importing icons
  import { PlusIcon } from "../../icons";

  // OLD

  import socket from "../../network/socket.js";

  import { Avatar, Spinner } from "darkmode-components/src/index";

  import ChatPanel from "../../components/ChatPanel.svelte";

  let loaded;

  onMount(() => {
    setTimeout(() => {
      loaded = true;

      // Let's update our chats
      if (!$ChatsManager.loaded) {
        ChatsManager.clearChats();
        // And now let's load our chats.
        GetChats($UserManager.token)
        .then((chats) => {
          ChatsManager.updateChats(chats);
        }).catch((error) => {
          ErrorManager.log({ error, zone: "user/getChats" });
        });
      };
    }, 50);
  });

  socket.on('event.chat/created', (data) => {
    // Let's now add this chat to our
    // chat list.
    ChatsManager.addChat(data.response.chat);
  });
</script>

{#if !loaded}
  <div out:fade style="z-index: 3;" class="absolute inset-x-0 top-0 bg-white w-full h-full"></div>
{/if}

<!-- @section Container -->
<Container background="#fff">
  
  <!-- 
    @section Header 
   -->
  
  <div class="w-full flex justify-between px-4 md:px-6 py-4">
    <!-- "My Chats" text -->
    <Heading color="#000" weight="semibold">{$_("application.chats.title", { default: "My Chats" })}</Heading>

    <!-- Create new Chat button -->
    <Button type="icon" icon={PlusIcon} on:click={() => goto('/chat/create')} />
  </div>

  <!-- 
    @section Chats List 
   -->

  <div class="flex flex-col flex-grow justify-center px-4 md:px-6">
    <!-- Chat Entry -->

    {#if !$ChatsManager.loaded}
      <!-- Chats Loading -->
      <div style="min-height: 80vh;" class="w-full flex flex-col justify-center items-center">
        <Spinner size="15" />
      </div>
    { :else }
      {#if $ChatsManager.list.length > 0}
        <!-- content here -->
        {#each $ChatsManager.list as chat}
          <ChatPanel chat={chat} />
        {/each}
      { :else }
        <!-- Empty Chat List -->
        <div style="min-height: 80vh;" class="w-full flex flex-col justify-center items-center">
          <img style="width: 20vw;" src="./illustrations/undraw_Taken.svg" alt="Nothing Found">

          <h1 class="mt-6">Nothing Found!</h1>
        </div>
      {/if}
    {/if}
  </div>

  <!-- 
    @section Footer
   -->
  <div class="w-full flex justify-between px-4 md:px-6 py-2">
    <!-- User Account -->
    <div class="flex items-center">
      <Avatar size="1.8" type="word" word="H" />

      <p class="text-sm font-semibold ml-2">{$UserManager.name}</p>

      <!-- Chevron Icon -->
      <img class="ml-2" style="height: 1.2rem;" src="./icons/chevron-up.svg" alt="Chevron Down">
    </div>

    <!-- Notification and Network Status -->
    <div class="flex items-center">
      <!-- Network Status -->
      <NetworkStatus />

      <!-- Notification -->
      <Notifications />
    </div>
  </div>
</Container>