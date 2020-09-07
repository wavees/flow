<script>
  // Let's now import some modules and components.
  import { onMount } from "svelte";

  import axios from "axios";
  import api from "../../../config/application/api.js";

  import { user } from "../../../config/stores/user.js";

  onMount(() => {
    // And now let's send our request to check
    // user's permisisons.

    let permissions = ["banMembers", "kickMembers", "viewMembers"];

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
        case "banMembers":
          loadedPermissionsCount += 1;

          permissions.banMembers = data.granted;

          if (loadedPermissionsCount >= permissionsCount) {
            permissions.loaded = true;
          };
          break;
        case "kickMembers":
          loadedPermissionsCount += 1;
          
          permissions.kickMembers = data.granted;
          
          if (loadedPermissionsCount >= permissionsCount) {
            permissions.loaded = true;
          };
          break;
        case "viewMembers":
          loadedPermissionsCount += 1;
          
          permissions.viewMembers = data.granted;
          
          if (loadedPermissionsCount >= permissionsCount) {
            permissions.loaded = true;
          };
          break;
      };
    };
  };

  export let cid;

  let permissionsCount = 2;
  let loadedPermissionsCount = 0;
  let permissions = {
    loaded: false,

    banMembers: false,
    kickMembers: false,
    viewMembers: false
  };

  let memberIconList = [
    "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/237/wolf-face_1f43a.png",
    "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/237/fox-face_1f98a.png",
    "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/237/raccoon_1f99d.png",
    "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/237/cat_1f408.png",
    "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/237/lion-face_1f981.png"
  ];
</script>

<div class="w-full h-full rounded-lg cursor-pointer bg-white py-4 px-4 relative">
  <!-- Image -->
  <img style="width: 3rem;" src="{ memberIconList[Math.floor(Math.random() * memberIconList.length)] }" alt="Yeah!">

  <!-- Texts -->
  <div class="mt-4 pr-4">
    <h1 class="font-semibold text-black text-xl opacity-75">Members</h1>
    <p class="text-gray-700 text-xs">Here you can <span class="rounded-lg px-2 py-1 { permissions.loaded ? permissions.banMembers ? "bg-green-200" : "bg-red-200" : "bg-gray-200" }">Ban</span>, <span class="rounded-lg px-2 py-1 { permissions.loaded ? permissions.kickMembers ? "bg-green-200" : "bg-red-200" : "bg-gray-200" }">Kick</span> and <span class="rounded-lg px-2 py-1 { permissions.loaded ? permissions.viewMembers ? "bg-green-200" : "bg-red-200" : "bg-gray-200" }">View</span> all members of this chat!</p>
  </div>
</div>