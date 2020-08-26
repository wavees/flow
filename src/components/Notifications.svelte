<script>
  // Importing components and modules
  import socket from "../network/socket.js";

  import {
    Avatar
  } from "darkmode-components/src/index";

  import Popover from "svelte-popover";
</script>

<!-- Main Layout -->
<Popover placement="top-center" arrow={false}>
  <button class="rounded-lg h-8 hover:bg-gray-300 flex items-center px-2 py-2 mx-2" slot="target">
    <img style="height: 1.2rem;" src="./icons/bell.svg" alt="Bell Icon">
  </button>

  <div slot="content" class="pb-4">
    <div style="width: 20rem; max-height: 65vh; overflow: hidden;" class="shadow-lg bg-white rounded-lg flex flex-col items-center text-center py-6">
      <!-- Let's now list all user's projects -->

      <div class="px-2 md:px-4 my-4">
        <h1 class="font-semibold">Notifications</h1>
        <p class="text-xs text-gray-700 mt-4"><span class="border-b-1 border-dotted border-gray-700">Notifications</span> are used to tell you about our newest updates, questions to community and much-much more! And yes, instead of email-spam, we'll spam your notifications panel! We'll send some tutorials and tips about Wavees Flow and Wavees Services right here. We hope that you don't mind =)</p>
      </div>

      <div style="overflow-y: auto;" class="w-full px-2 md:px-4 mt-4 relative">

      </div>
    </div>
  </div>
</Popover>