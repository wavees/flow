<script>
  import Popover from "svelte-popover";
  import clipboard from "clipboard-copy";

  function copy() {
    // Copy text
    invitationUrl = "https://flow.wavees.ml/chat/join/" + invitation;

    clipboard(invitationUrl);
  };

  let invitationUrl;
  export let inversed = false;
  export let classes;
  export let invitation;
  export let placement = "top-center";
  let opened = false;
</script>

<Popover placement={placement} action="click" arrow={false} overlayColor="rgba(0,0,0,0.1)">
  <button on:click={copy} slot="target" class="{classes} py-2 px-4 md:px-6 rounded-lg  flex items-center justify-center { inversed ? "bg-black text-white" : "bg-white text-gray-900" }">
    <svg style="height: 1.2rem;" class="mr-2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="{ inversed ? "#fff" : "#000" }" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>

    Copy Link
  </button>

  <div slot="content" class=" { placement.includes("bottom") ? "pt-4" : "pb-4" } ">
    <div style="width: 22vw;" class="shadow-lg rounded-lg flex bg-white items-center justify-center py-2 px-4 text-center">
      <img class="mr-2" style="height: 1rem;" src="./icons/waving-hand-sign.png" alt="=)">
        
      <h1 class="text-sm text-gray-800">Chat Join url copied to clipboard!</h1>
    </div>
  </div>
</Popover>