<script>
  import Popover from "svelte-popover";
  import { goto } from "@sapper/app";

  export let cid;

  export let placement = "bottom-center";
  export let inversedColors = false;
  let buttonHovered = false;
</script>

<Popover placement={placement} action="hover" arrow={false} overlayColor="rgba(0,0,0,0.1)">
  <button on:click={() => goto(`/chat/${cid}/settings`)} slot="target" on:mouseover={() => buttonHovered = true} on:mouseout={(e) => buttonHovered = false} class="{ buttonHovered ? inversedColors ? "bg-black" : "bg-white" : "" } rounded-lg px-2 py-2">
    <svg style="height: 1.2rem; width: 1.2rem;" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="{ buttonHovered ? inversedColors ? "#fff" : "#000" : inversedColors ? "#000" : "#fff" }" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-grid"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
  </button>

  <div slot="content" class=" { placement.includes("bottom") ? "pt-4" : "pb-4" } ">
    <div style="width: 15vw;" class="shadow-lg rounded-lg flex bg-white items-center justify-center py-2 px-4 text-center">
      <img class="mr-1" style="height: 1rem;" src="./icons/toolbox.png" alt="=)">
        
      <h1 class="text-sm text-gray-800">Chat Settings</h1>
    </div>
  </div>
</Popover>