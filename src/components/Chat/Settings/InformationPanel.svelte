<script>
  // Let's now import some modules and components.
  import socket from "../../../network/socket.js";
  import { onMount } from "svelte";

  import { user } from "../../../config/stores/user.js";

  onMount(() => {
    // And now let's send our request to check
    // user's permisisons.
    socket.emit('checkPermission', $user.user.token, cid, "changeAvatar");
    socket.emit('checkPermission', $user.user.token, cid, "deleteChat");
    socket.emit('checkPermission', $user.user.token, cid, "changeName");
  });

  socket.on('checkedPermission', (data) => {
    if (data.type == "permission") {
      switch (data.permission) {
        case "changeName":
          loadedPermissionsCount += 1;

          permissions.changeName = data.granted;

          if (loadedPermissionsCount >= permissionsCount) {
            permissions.loaded = true;
          };
          break;
        case "changeAvatar":
          loadedPermissionsCount += 1;

          permissions.changeAvatar = data.granted;
          
          if (loadedPermissionsCount >= permissionsCount) {
            permissions.loaded = true;
          };
          break;
        case "deleteChat":
          loadedPermissionsCount += 1;

          permissions.deleteChat = data.granted;
          
          if (loadedPermissionsCount >= permissionsCount) {
            permissions.loaded = true;
          };
          break;
      };
    };
  });

  export let cid;

  let permissionsCount = 3;
  let loadedPermissionsCount = 0;
  let permissions = {
    loaded: false,

    changeName: false,
    changeAvatar: false,
    deleteChat: false
  };
</script>

<div class="w-full h-full rounded-lg cursor-pointer bg-white py-4 px-4 relative">
  <!-- Image -->
  <img style="width: 3rem;" src="./icons/clipboard.png" alt="Clipboard here">

  <!-- Texts -->
  <div class="mt-4 pr-4 md:pr-6">
    <h1 class="font-semibold text-black text-xl opacity-75">Information</h1>
    <p class="text-gray-700 text-xs"><span class="rounded-lg px-2 py-1 { permissions.loaded ? permissions.deleteChat ? "bg-green-200" : "bg-red-200" : "bg-gray-200" }">Delete</span> this chat or change its <span class="rounded-lg px-2 py-1 { permissions.loaded ? permissions.changeName ? "bg-green-200" : "bg-red-200" : "bg-gray-200" }">Name</span> and <span class="rounded-lg px-2 py-1 { permissions.loaded ? permissions.changeName ? "bg-green-200" : "bg-red-200" : "bg-gray-200" }">Avatar</span> right here!</p>
  </div>
</div>