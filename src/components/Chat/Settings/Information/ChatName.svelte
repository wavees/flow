<script>
  // Let's now import some modules and components...
  import socket from "../../../../network/socket.js";
  import { createEventDispatcher } from "svelte";

  import { onMount } from "svelte";
  import { Spinner } from "darkmode-components/src/index";

  import { user } from "../../../../config/stores/user.js";

  const dispatch = createEventDispatcher();

  // Function, that'll try to update chat's name
  function updateName(name) {
    socket.emit('changeChatName', cid, name == null ? chatName : name);
  };

  socket.on('chatName', (response) => {
    if (response.error == null) {
      if (response.id == cid) {
        // And now let's update this chat's information...
        dispatch("changeChat", response);
        user.changeChat(cid, response);
      };
    };
  });

  export let cid;
  export let chatName;
  export let originalChatName;
</script>

<div class="my-6 relative bg-white rounded-lg py-4 pb-12 px-4 w-full">
  
  <!-- Texts + icon -->
  <div class="flex">
    <img style="height: 1.2rem;" src="./icons/" alt="">

    <div class="mr-2">
      <h1 class="opacity-75 text-black text-xl font-semibold">Chat name
        {#if originalChatName != chatName}
          <Spinner size="15" />
        {/if}
      </h1>
      <p class="text-gray-700 text-sm">Change your chat's name, f*ck yeah!</p>
    </div>
  </div>

  <!-- Input -->
  <div class="mt-4 w-full">
    <input id="name" on:input={(e) => {
      updateName(e.target.value);
    }} bind:value={chatName} class="w-full px-1 bg-transparent text-gray-800 border-b-2 border-dotted border-green-700" type="text">
  </div>

  <!-- Some texts.. -->
  <div class="absolute inset-x-0 bottom-0 w-full text-center pb-2">
    <p class="text-gray-700 opacity-75 text-extra-xs">Chat's name will save automatically as you type.</p>
  </div>
</div>