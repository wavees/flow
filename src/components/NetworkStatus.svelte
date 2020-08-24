<script>
  // Importing modules
  import socket from "../network/socket.js";
  import Popover from "svelte-popover";

  socket.on('connect', () => {
    connected = true;
  });

  socket.on('disconnect', () => {
    connected = false;
  });

  let opened = false;
  let connected = socket.connected;
</script>

<Popover let:open={opened} placement="bottom-center" action="hover" arrow={false} overlayColor="rgba(0,0,0,0.1)">
  <button on:mouseover={(e) => opened = true} on:mouseover={(e) => opened = false} slot="target" class="mx-2 rounded-md { opened ? "bg-white" : "hover:bg-gray-100" } py-2 px-2">
    {#if connected}
      <svg style="width: 1.2rem; height: 1.2rem;" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4CAF50" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-wifi"><path d="M5 12.55a11 11 0 0 1 14.08 0"></path><path d="M1.42 9a16 16 0 0 1 21.16 0"></path><path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path><line x1="12" y1="20" x2="12.01" y2="20"></line></svg>
    { :else }
      <svg style="width: 1.2rem; height: 1.2rem;" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D32F2F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-wifi-off"><line x1="1" y1="1" x2="23" y2="23"></line><path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55"></path><path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39"></path><path d="M10.71 5.05A16 16 0 0 1 22.58 9"></path><path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88"></path><path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path><line x1="12" y1="20" x2="12.01" y2="20"></line></svg>
    {/if}
  </button>

  <div slot="content" class="pt-2">
    <div style="width: 15vw;" class="shadow-lg rounded-lg flex { connected ? "" : "flex-col" } bg-white items-center justify-center { connected ? "py-2" : "py-4" } px-4 text-center">
      {#if connected}
        <img class="mr-1" style="height: 1rem;" src="./icons/winking-face.png" alt="=)">
        
        <h1 class="text-sm text-gray-800">Network Stable</h1>
      { :else }
        <img style="height: 1.2rem;" class="mb-2" src="./icons/disappointed-but-relieved-face.png" alt="=C">

        <h1 class="text-sm text-gray-800">Network Unstable</h1>
        <p class="text-xs text-gray-700">You are not connected to Wavees Ideas servers.</p>
      {/if}
    </div>
  </div>
 </Popover>