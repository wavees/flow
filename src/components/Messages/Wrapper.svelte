<script>
  // Importing modules
  import axios from "axios";
  import { onMount } from "svelte";

  import { user } from "../../config/stores/user.js";

  // Let's import some components
  import PlainMessage from "./Types/Plain.svelte";

  onMount(() => {
    // And now let's get some information about our
    // author
    axios.get(`https://api.flow.wavees.ml/v1/account`, { headers: { "Authorization": `Bearer ${author.uid}` } })
    .then((response) => {
      let data = response.data;

      if (data.type == "userAccount") {
        authorData = data;
      };
    });
  });

  let authorData = {
    name: "undefined",
    avatar: ""
  };

  // Let's now export some variables 
  export let author = { type: "systemBot" };
  export let message = { type: "plain", content: "Undefined Message" }
</script>

{#if message.type == "plain"}
  <PlainMessage author={authorData} message={message.content} side={$user.user.id == author.uid ? "right" : "left"} />
<!-- { :else if message.type == "system" } -->
{/if}