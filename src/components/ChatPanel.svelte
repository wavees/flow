<script>
  // Let's now import some modules and components
  import { Avatar } from "darkmode-components/src/index";
  import { goto } from "@sapper/app";

  import { onMount } from "svelte";

  import { slide } from "svelte/transition";

  import Popover from "svelte-popover";

  onMount(() => {
    console.log("CHAT");
    console.log(chat);
  });
  
  let opened  = false;
  let clicked = false;
  export let chat = {};
</script>

<div on:click={() => goto(`/chat/${chat.id}`)} in:slide class="cursor-pointer my-1 w-full flex justify-between items-center rounded-lg hover:bg-gray-200 hover:shadow-lg px-6 py-2">
  <!-- Avatar -->
  <div class="flex items-center">
    <Avatar type="image" avatar={chat.avatar || "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/237/kissing-face-with-smiling-eyes_1f619.png"} />

    <!-- Name and Last Message -->
    <div class="ml-4">
      <h1 class="text-xl font-semibold">{chat.name}</h1>
      <p class="text-sm"><span class="text-gray-700">Test User:</span> Hello everybody!</p>
    </div>
  </div>

  <!-- Some information -->
  <div class="h-full flex flex-col justify-between">
    <p class="text-gray-700 text-xs">Day ago</p>

    <!-- Some user icons -->
    <div class="relative flex justify-center">
      {#each chat.members.slice(0, 3) as member}
        <span class="">
          <!-- <Avatar size="1.5" /> -->
        </span>
      {/each}
    </div>
  </div>

</div>