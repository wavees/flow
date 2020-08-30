<script>
  import Popover from "svelte-popover";
  import clipboard from "clipboard-copy";

  function copy() {
    // Copy text
    invitationUrl = "https://flow.wavees.ml/chat/join/" + invitation;

    clipboard(invitationUrl);
  };

  let invitationUrl;
  export let classes;
  export let invitation;
  export let placement = "top-center";
  let opened = false;
</script>

<Popover placement={placement} action="click" arrow={false} overlayColor="rgba(0,0,0,0.1)">
  <button on:click={copy} slot="target" class="{classes} py-2 px-4 md:px-6 rounded-lg bg-white flex items-center justify-center text-gray-900">
    <img style="height: 1.2rem;" class="mr-2" src="./icons/link.svg" alt="Link Icon">
    Copy Link
  </button>

  <div slot="content" class=" { placement.includes("bottom") ? "pt-4" : "pb-4" } ">
    <div style="width: 22vw;" class="shadow-lg rounded-lg flex bg-white items-center justify-center py-2 px-4 text-center">
      <img class="mr-2" style="height: 1rem;" src="./icons/waving-hand-sign.png" alt="=)">
        
      <h1 class="text-sm text-gray-800">Chat Join url copied to clipboard!</h1>
    </div>
  </div>
</Popover>