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
  import { Spinner, Avatar, Button, Heading, Text, Container } from "../../components";
  import { backgrounds } from "../../application/theme"

  // Importing icons
  import { PlusIcon } from "../../icons";

  // OLD

  import socket from "../../network/socket.js";

  let loaded;

  onMount(() => {
    // Let's now connect to our socket and
    // listen to chats list updates
    if (socket.connected) {
      socket.emit('listenTo', [ "chat/creation" ]);
    };

    socket.on('connect', () => {
      socket.emit('listenTo', [ "chat/creation" ]);
    });

    // Let's now get our chats list
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

    // Timeout for transition animation.
    setTimeout(() => {
      loaded = true;
    }, 50);
  });

  socket.on('event.chat/created', (data) => {
    // Let's now add this chat to our
    // chat list.
    console.log("CHAT CREATED:");
    console.log(chat);
    ChatsManager.addChat(chat);
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

  <div style="overflow: hidden; overflow-y: auto;" class="flex flex-grow w-full relative">
    <!-- Chat Entry -->

    {#if !$ChatsManager.loaded}
      <!-- Chats Loading -->
      <div style="min-height: 80vh;" class="w-full flex flex-col justify-center items-center">
        <Spinner size="15" />
      </div>
    { :else }

      { #if $ChatsManager.list.length > 0 }

        <div class="w-full h-full absolute flex flex-wrap px-4">
          <!-- 
            @section Chat Panel
          -->
          { #each $ChatsManager.list as chat }
            <div on:click={() => goto(`/chat/${chat.id}`)} in:slide class="{chat.size == "big" ? "w-2/2 h-64" : "w-1/2 h-48"} relative px-1 py-1">
              
              <div class="w-full h-full bg-orange-600 rounded-md flex flex-col px-3 py-4">
                <!-- Avatar and chat Name -->
                <div class="w-full flex flex-col items-center">
                  <Avatar type="image" avatar={chat.avatar || "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/237/kissing-face-with-smiling-eyes_1f619.png"} />

                  <!-- Chat name -->
                  <Heading weight="{chat.size == "big" ? "bold" : "semibold"}" size="xl">{chat.name.slice(0, 35)}{chat.name.split("").length >= 35 ? "..." : ""}</Heading>

                  <!-- Chat's description -->
                  <Text color="text-gray-100">{chat.description == null ? "" : chat.description.slice(0, 100)}</Text>
                  <!-- {chat.description.split("").length >= 100 ? "..." : ""} -->
                </div>

                <!-- Some user icons -->
                <div class="flex justify-center mt-2 items-center">
                  { #each chat.members.slice(0, 3) as member }
                    <span class="">
                      <Avatar typw="word" word={member} size="1.5" />
                    </span>

                    {#if chat.members.length > 3}
                      <Text size="extra-xs" classes="ml-2">And others...</Text>
                    {/if}
                  { /each }
                </div>
              </div>
            </div>
          { /each }
        </div>

      { :else }
        <!-- Empty Chat List -->
        <div style="min-height: 80vh;" class="w-full flex flex-col justify-center items-center">
          <img style="width: 20vw;" src="./illustrations/undraw_Taken.svg" alt="Nothing Found">

          <h1 class="mt-6">Nothing Found!</h1>
        </div>
      { /if }
    { /if }
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