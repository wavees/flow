<script>
  // Let's now import some modules and components
  import { Avatar } from "darkmode-components/src/index";
  import { goto } from "@sapper/app";

  import { slide } from "svelte/transition";

  import Popover from "svelte-popover";

  let opened  = false;
  let clicked = false;
  export let chat = {};
</script>

<div on:click={() => goto(`/chat/${chat.id}`)} in:slide class="cursor-pointer my-1 w-full flex justify-between items-center rounded-lg hover:bg-gray-200 hover:shadow-lg px-6 py-2">
  <!-- Avatar -->
  <div class="flex items-center">
    <Avatar type="word" word="C" />

    <!-- Name and Last Message -->
    <div class="ml-4">
      <h1 class="text-xl font-semibold">{chat.name}</h1>
      <p class="text-sm"><span class="text-gray-700">Test User:</span> Hello everybody!</p>
    </div>
  </div>

  <!-- Buttons -->
  <div class="float-right">
    <!-- More Buttons and Information -->
    <Popover bind:open={opened} action="hover" arrow={false} placement="bottom-center" overlayColor="rgba(0,0,0,0.1)">
      <button on:click={() => goto(`/chat/${chat.id}/settings`)} slot="target" class="px-2 py-2 rounded-lg hover:bg-white">
        <img style="height: 1.2rem;" src="./icons/grid.svg" alt="...">
      </button>
      
      <div slot="content" class="pt-4">
        <div style="width: 7vw;" class="shadow-lg rounded-lg flex bg-white items-center justify-center { clicked ? "py-4" : "py-2" } px-4 text-center">
          <h1 class="text-sm text-gray-800">Chat Settings</h1>
        </div>
      </div>
    </Popover>
  </div>

</div>