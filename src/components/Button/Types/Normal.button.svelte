<script>
  // Importing components and declaring
  // some needed variables
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  let hovered = false;

  // Let's now export our global
  // settings object.
  export let settings = {
    classes: "",

    // Backgrounds
    background: {
      default: "#fff",
      hovered: "#000"
    },

    // Text colors
    text: {
      default: "#000",
      hovered: "#fff"
    }
  };
</script>

<style>
  /* Default background */
  .background-default {
    background: var(--bg-default)
  }

  /* Default text color */
  .text-default {
    color: var(--text-default)
  }


  /* Hovered background */
  .background-hovered {
    background: var(--bg-hovered)
  }

  /* Hovered text color */
  .text-hovered {
    color: var(--text-hovered)
  }
</style>

<button
  style="--bg-default: { settings.background.default || "#fff"  }; 
      --bg-hovered: { settings.background.hovered || "#000" };
      
      --text-default: { settings.text.default || "#000" };
      --text-hovered: { settings.text.hovered || "#fff" };"

  class="{ settings.classes } rounded-lg px-4 py-2 { hovered ? `background-hovered text-hovered` : "background-default text-default" }" 
  
  on:click
  
  on:mouseover={(e) => {
    hovered = true;
    dispatch("mouseover", e);
  }} 
  on:mouseout={(e) => {
    hovered = false;
    dispatch("mouseout", e);
  }}>

  <slot></slot>
</button>