<script>
  // Let's import some modules and components
  import socket from "../../../../network/socket.js";
  import { user } from "../../../../config/stores/user.js";

  import { fade } from "svelte/transition";
  import { goto } from "@sapper/app";

  import { onMount } from "svelte";

  import { Spinner } from "darkmode-components/src/index";

  import InvitationCopyButtom from "../../../../components/Chat/Invitations/CopyButton.svelte";

  onMount(() => {
    setTimeout(() => {
      loaded = true;
    }, 50);

    // By the way, let's request some
    // information about our chat...
    socket.emit("chat", cid);
  
    // Let's now get our invitations list...
    socket.emit("invitations", cid);
  });

  socket.on('event.chat/joined', (data) => {
    if (data.chat == cid) {
      if (closeOnConnection) {
        goto(`/chat/${cid}`);
      };
    };
  });

  socket.on('chat', (data) => {
    chat = data;
  });

  socket.on("invitations", (invitations) => {
    loading = false;
    currentInvitation = invitations[0];

    // And now let's update our qrcode canvas...
    var qr = new QRious({
      element: document.getElementById('code'),
      value: `https://flow.wavees.ml/chat/join/${encodeURIComponent(currentInvitation.words)}`,
      size: 250
    });
  });

  let chat = {
    name: "undefined"
  };

  export let cid;
  export let noHeader = false;
  export let inversed = false;
  export let closeOnConnection = false;

  let currentInvitation = {};
  let invitations = [];
  let loaded = false;
  let loading = true;

  let flipped = false;

  let backButtonHovering = false;
</script>

<style>
  .container {
    -webkit-perspective: 800px;
    -ms-perspective: 800px;
    perspective: 800px;
  }

  .card {
    width: 100%;
    height: 100%;
    position: absolute;
    -webkit-transform-style: preserve-3d;
    transform-style: preserve-3d;
    -webkit-transition: -webkit-transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    transition: -webkit-transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    transition: transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    transition: transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275), -webkit-transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    border-radius: 6px;
    box-shadow: 0 6px 16px rgba(0,0,0,0.15);
    cursor: pointer;
  }
  .card .div {
    position: absolute;
    width: 100%;
    height: 100%;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    border-radius: 6px;
    background: #fff;
    display: -webkit-box;
    display: -ms-flexbox;
    display: box;
    display: flex;
    -webkit-box-pack: center;
    -o-box-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -o-box-align: center;
    align-items: center;
    font: 16px/1.5 "Helvetica Neue", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    color: #47525d;
  }
  .card .back {
    -webkit-transform: rotateY(180deg);
    transform: rotateY(180deg);
  }
  .card.flipped {
    -webkit-transform: rotateY(180deg);
    transform: rotateY(180deg);
  }
</style>

<div class="flex flex-col items-center justify-center">
  <!-- Some kind of a Header -->
  {#if !noHeader}
    <div style="z-index: 2;" class="absolute inset-x-0 top-0 py-4 px-4">
      <button on:mouseover={() => backButtonHovering = true} on:mouseout={() => backButtonHovering = false} on:click={() => history.back()} class="px-2 py-2 rounded-lg { backButtonHovering ? "bg-white" : "" }">
        <span style="height: 1.2rem;">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="{ backButtonHovering ? "#000" : "#fff" }" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-left"><polyline points="15 18 9 12 15 6"></polyline></svg>
        </span>
      </button>
    </div>

    <div style="z-index: 1;" class="absolute inset-x-0 top-0 w-full flex justify-center items-center py-4">
      <img style="height: 2.2rem;" src="./icons/handshake.png" alt="Handshake">

      <div class="ml-2 flex flex-col items-start">
        <h1 class="text-white text-xl font-semibold">Invitation for chat</h1>
        <span class="text-xs border-b-1 border-dotted border-green-400 text-white font-semibold">{chat.name.slice(0, 25)}{chat.name.split('').length >= 25 ? "..." : ""}</span>
      </div>
    </div>
  {/if}

  <!-- Canvas -->
  <div on:click={() => {
    if (flipped) {
      flipped = false;
    } else {
      flipped = true;
    };
  }} class="w-64 h-64 container rounded-lg relative flex justify-center items-center">
    <div class="{ flipped ? "flipped" : "" } card">
      <!-- Front Side -->
      <div class="front div w-full h-full p-2">
        {#if loading}
          <div class="absolute inset-x-0 top-0 w-full h-full rounded-lg flex justify-center items-center">
            <Spinner size="25" />
          </div>
        {/if}
        <canvas class="w-full h-full rounded-lg" id="code"></canvas>
      </div>

      <!-- Back Side -->
      <div class="back div w-full h-full select-none flex flex-col">
        <!-- Texts -->
        <div class="px-4 md:px-8 text-center">
          <h1 class="text-xl text-black font-semibold">You can use your mobile phone!</h1>
          <p class="text-xs text-gray-700">And yes, you can download and use our mobile application! It'll be a lot easier for you. And, by the way, there are a lot of different interesting features in mobile version!</p>
        </div>

        <!-- Links to Download -->
        <div class="mt-4 px-4 md:px-8">
          <button class="rounded-lg items-center py-2 bg-white border-1 border-solid border-blue-400 w-full flex justify-start px-4 md:px-6">
            <!-- Icon -->
            <img style="height: 1.6rem;" src="./icons/inbox-tray.png" alt="Inbox Icon">

            <!-- Texts -->
            <div class="ml-4 flex flex-col items-start">
              <h1 class="text-sm font-semibold">Download</h1>
              <p class="text-extra-xs text-gray-700">from Wavees Servers</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  </div>

  <div style="{ loading ? "visibility: hidden;" : "" }" class="w-full px-4 md:px-6 lg:px-8 mt-6 text-center">
    <!-- Some Texts -->
    <div class="text-center px-4 md:px-8 lg:px-12">
      <h1 class="font-semibold text-xl { inversed ? "text-black opacity-75" : "text-white" }">Here's your chat Invitation Link</h1>
      <p class="{ inversed ? "text-gray-700" : "text-gray-100" } text-sm">And yes, it's an QRCode! But if you'll press on <span class="border-b-2 border-dotted border-green-500">Show Link</span> button, than you'll be able to share direct link to this chat! (Can be used when you are trying to connect two Computers)</p>
    </div>

    <!-- Buttons -->
    <div class="w-full flex mt-6 px-4 md:px-8">
      <button class="py-2 px-4 w-full mr-3 { inversed ? "bg-black text-white" : "bg-white text-gray-900" } rounded-lg">
        How to use
      </button>

      <div class="w-full">
        <InvitationCopyButtom classes="w-full" inversed={inversed} invitation={currentInvitation.words} />
      </div>
    </div>
  </div>

  {#if closeOnConnection}
    <div class="absolute w-full inset-x-0 bottom-0 flex items-center justify-center py-2">
      <p class="text-extra-xs text-gray-200">This screen will close if someone joins this chat.</p>

      <!-- Button to cancel this action -->
      <p on:click={() => closeOnConnection = false} class="text-extra-xs ml-1 cursor-pointer border-b-1 border-dotted border-gray-200 text-white">Do not close</p>
    </div>
  {/if}
</div>