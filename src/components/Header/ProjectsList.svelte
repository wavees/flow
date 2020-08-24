<script>
  // Importing components and modules
  import { currentData as data } from "../../config/stores/currentData.js";
  import socket from "../../network/socket.js";

  import {
    Avatar
  } from "darkmode-components/src/index";

  import Popover from "svelte-popover";
</script>

<!-- Main Layout -->
<Popover let:open placement="bottom-center" arrow={false}>
  <button class="rounded-lg h-8 { open ? "bg-white" : "hover:bg-gray-300" } rounded-lg flex items-center px-4" slot="target">
    <p class="ml-2 text-xs text-gray-800">{!$data.organizations.loaded ? "Loading..." : $data.organizations.list[0].name}</p>

    <!-- Chevron -->
    <img style="height: 1rem;" class="ml-2" src="./icons/chevron-down.svg" alt="Chevron Down">
  </button>

  <div slot="content" class="pt-4">
    <div style="width: 20rem; max-height: 65vh; overflow: hidden;" class="shadow-lg bg-white rounded-lg flex flex-col items-center text-center py-6">
      <!-- Let's now list all user's projects -->

      <div class="px-2 md:px-4 my-4">
        <h1 class="font-semibold">Choose Organization</h1>
        <p class="text-xs text-gray-700 mt-4"><span class="border-b-1 border-dotted border-gray-700">Organizations</span> is a new way to team up in Wavees Ideas. And we seriously do not know why we did it. Maybe somebody could use it? Well, maybe somebody...</p>
      </div>

      <div style="overflow-y: auto;" class="w-full px-2 md:px-4 mt-4 relative">
        {#each $data.organizations.list as organization}
          <button class="my-2 h-12 w-full flex px-4 md:px-6 rounded-lg items-center bg-gray-200 hover:bg-gray-300">
            <Avatar word="{organization.name}" size="2" />
            
            <!-- Organization name and description -->
            <div class="ml-3 flex flex-col items-start">
              <h1 class="text-xs">{organization.name.slice(0, 15)}{organization.name.split('').length >= 15 ? "..." : ""}</h1>
              <p class="text-extra-xs text-gray-700">{organization.description == null ? organization.type == "UserOrganization" ? "Your own organization" : "Normal Organization" : `${organization.description.slice(0, 20)}${organization.description.split('').length >= 20 ? "..." : ""}`}</p>
            </div>
          </button>
        {/each}
      </div>
    </div>
  </div>
</Popover>