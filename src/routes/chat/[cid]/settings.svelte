<script>
  // Let's import some modules and components
  import socket from "../../../network/socket.js";
  import { user } from "../../../config/stores/user.js";

  import { goto } from "@sapper/app";
  import { fade } from "svelte/transition";

  import { onMount } from "svelte";

  import InformationScreen from "./_screens/information.svelte";
  import InvitationsScreen from "./_screens/invitations.svelte";

  import InvitationsPanel from "../../../components/Chat/Settings/InvitationsPanel.svelte"
  import MembersPanel from "../../../components/Chat/Settings/MembersPanel.svelte";
  import InformationPanel from "../../../components/Chat/Settings/InformationPanel.svelte";

  // Page Store
  import { stores } from "@sapper/app";
  const { page } = stores();

  onMount(() => {
    setTimeout(() => {
      loaded = true;
    }, 50);
  });

  let currentScreen;
  let loaded = false;
  let backButtonHovering = false;

  let backgrounds = [
    "background: linear-gradient(to right, #00b4db, #0083b0);",
    "background: linear-gradient(to right, #ff9966, #ff5e62);",
    "background: linear-gradient(to right, #7f00ff, #e100ff);",
    "background: linear-gradient(to right, #4568dc, #b06ab3);"
  ];
</script>

{#if !loaded}
  <div out:fade style="z-index: 2;" class="absolute inset-x-0 top-0 w-full h-full">
    <div style="min-height: 100vh;" class="bg-white rounded-lg w-full md:w-40wv"></div>
  </div>
{/if}

<!-- Main Layout -->
<div style="min-height: 100vh; { backgrounds[Math.floor(Math.random() * backgrounds.length)] }" class="relative w-full lg:w-40vw shadow-lg flex flex-col items-center justify-center pt-16 pb-6 md:py-0">
  <!-- Some kind of a Header -->
  <div style="z-index: 2;" class="absolute inset-x-0 top-0 py-4 px-4">
    <button on:mouseover={() => backButtonHovering = true} on:mouseout={() => backButtonHovering = false} on:click={() => history.back()} class="px-2 py-2 rounded-lg { backButtonHovering ? "bg-white" : "" }">
      <span style="height: 1.2rem;">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="{ backButtonHovering ? "#000" : "#fff" }" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-left"><polyline points="15 18 9 12 15 6"></polyline></svg>
      </span>
    </button>
  </div>

  <div class="absolute inset-x-0 top-0 w-full flex justify-center items-center py-4">
    <img style="height: 2.2rem;" src="./icons/toolbox.png" alt="Wrench">
    <h1 class="text-white text-xl font-semibold ml-2">Settings</h1>
  </div>

  <!-- CurrentScreen -->
  {#if currentScreen == "invitations"}
    <div style="z-index: 999;" class="absolute inset-x-0 top-0 px-2 w-full flex flex-col items-center h-screen">
      <div on:click={(e) => currentScreen = null} class="cursor-pointer w-full flex-grow">
      </div>

      <div transition:fade style="overflow-y: auto;" class="bg-white flex-grow rounded-lg shadow-md flex items-center">
        <InvitationsScreen noHeader={true} inversed={true} cid={$page.params.cid} />
      </div>

      <div on:click={(e) => currentScreen = null} class="cursor-pointer w-full flex-grow">
      </div>
    </div>
  { :else if currentScreen == "information" }
    <div style="z-index: 999;" class="absolute inset-x-0 top-0 px-2 w-full flex flex-col items-center h-screen">
      <div on:click={(e) => currentScreen = null} class="cursor-pointer w-full flex-grow">
      </div>

      <div transition:fade style="overflow-y: auto;" class="bg-white flex-grow rounded-lg shadow-md flex items-center">
        <InformationScreen noHeader={true} inversed={true} cid={$page.params.cid} />
      </div>

      <div on:click={(e) => currentScreen = null} class="cursor-pointer w-full flex-grow">
      </div>
    </div>
  {/if}

  <!-- Content -->
  <div style="overflow-y: auto; overflow-x: hidden;" class="w-full flex-grow flex items-center relative">
    <div class="w-full h-full md:h-auto flex flex-col absolute md:relative md:flex-row md:flex-wrap px-4 md:justify-center md:items-center">
      <!-- Invitations -->
      <div class="my-4 w-full md:w-1/2 h-48 px-12 md:px-4">
        <InvitationsPanel on:screen={(e) => currentScreen = e.detail} cid={$page.params.cid} />
      </div>

      <!-- Chat Information -->
      <div class="my-4 w-full md:w-1/2 h-48 px-12 md:px-4">
        <InformationPanel on:screen={(e) => currentScreen = e.detail} cid={$page.params.cid} />
      </div>

      <!-- Members -->
      <div class="my-4 w-full md:w-1/2 h-48 px-12 md:px-4">
        <MembersPanel on:screen={(e) => currentScreen = e.detail} cid={$page.params.cid} />
      </div>

      <!-- Security -->
      <div class="my-4 w-full md:w-1/2 h-48 px-12 md:px-4">
        <div class="w-full h-full rounded-lg cursor-pointer bg-white py-4 px-4 relative">
          <!-- Image -->
          <img style="width: 3rem;" src="./icons/crying-face.png" alt="Fuck no">

          <!-- Texts -->
          <div class="mt-4 pr-4 md:pr-6">
            <h1 class="font-semibold text-black text-xl opacity-75">My Friends</h1>
            <p class="text-gray-700 text-xs">Apparently, you don't have any friends. But hey! Don't be sad!</p>
          </div>

          <!-- CockBlocked -->
          <div style="background: rgba(0,0,0,0.5)" class="absolute inset-x-0 top-0 w-full h-full flex flex-col justify-center items-center rounded-lg">
            <img style="height: 2.2rem;" src="./icons/lock.png" alt="Lock">

            <!-- Texts -->
            <div class="mt-2 text-center">
              <h1 class="text-base font-semibold text-white">Blocked</h1>
              <p class="text-xs text-gray-100">And... No, this section is blocked because it's fucking needless</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>