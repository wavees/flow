<script>
  // Let's import some modules and components
  import { user } from "../../../config/stores/user.js";

  import axios from "axios";
  import api from "../../../config/application/api";

  import { onMount } from "svelte";

  import { stores } from "@sapper/app";
  import { goto } from "@sapper/app";

  // page store
  const { page } = stores();

  import { Spinner } from "darkmode-components/src/index";

  onMount(() => {
    const token = $user.user.token;
    const words = $page.params.words;

    // Let's now send our request
    // to server.
    axios.post(`${api.current.url}/${api.current.version}/chats/invite`, { words }, { headers: { "Authorization": `Bearer ${token}` } })
    .then((response) => {
      if (response.data.cid != null) {
        goto(`/chat/${response.data.cid}`, true);
      };
    }).catch((response) => {
      const error = response.response.data;

      if (error.error == "UserAlreadyAChatMember") {
        goto(`/chat/${error.cid}`);
      };
     });
  });
</script>

<div class="absolute w-full h-screen flex justify-center items-center bg-white">
  <!-- Branding -->
  <div class="flex flex-col justify-center items-center">
    <Spinner size="15"  />
  </div>
</div>