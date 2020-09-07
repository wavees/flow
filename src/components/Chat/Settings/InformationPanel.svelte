<script>
  // Let's now import some modules and components.
  import { onMount } from "svelte";

  import axios from "axios";
  import api from "../../../config/application/api.js";

  import { goto } from "@sapper/app";
  // Page store
  import { stores } from "@sapper/app";
  const { page } = stores();

  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  import { user } from "../../../config/stores/user.js";

  onMount(() => {
    // And now let's send our request to check
    // user's permisisons.
    let permissions = ["changeAvatar", "deleteChat", "changeName"];

    permissions.forEach((permission) => {
      axios.get(`${api.current.url}/${api.current.version}/chats/${cid}/permission/${permission}`, { headers: { "Authorization": `Bearer ${$user.user.token}` } })
      .then((response) => {
        checkPermission(response.data);
      }).catch((error) => {
        console.log("ERROR WHILE CHECKING PERMISSION");
        console.log(erorr.response.data);
      });
    });
  });

  function checkPermission(data) {
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
  };

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

<div on:click={() => goto(`/chat/${$page.params.cid}/settings/information`)} class="w-full h-full rounded-lg cursor-pointer bg-white py-4 px-4 relative">
  <!-- Image -->
  <img style="width: 3rem;" src="./icons/clipboard.png" alt="Clipboard here">

  <!-- Texts -->
  <div class="mt-4 pr-4 md:pr-6">
    <h1 class="font-semibold text-black text-xl opacity-75">Information</h1>
    <p class="text-gray-700 text-xs"><span class="rounded-lg px-2 py-1 { permissions.loaded ? permissions.deleteChat ? "bg-green-200" : "bg-red-200" : "bg-gray-200" }">Delete</span> this chat or change its <span class="rounded-lg px-2 py-1 { permissions.loaded ? permissions.changeName ? "bg-green-200" : "bg-red-200" : "bg-gray-200" }">Name</span> and <span class="rounded-lg px-2 py-1 { permissions.loaded ? permissions.changeName ? "bg-green-200" : "bg-red-200" : "bg-gray-200" }">Avatar</span> right here!</p>
  </div>
</div>