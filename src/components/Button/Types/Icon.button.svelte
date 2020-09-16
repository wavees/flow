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

    component: null,

    // Backgrounds
    background: {
      default: "#fff",
      hovered: "#000"
    },

    // Icon's colors
    color: {
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

  /* Hovered background */
  .background-hovered {
    background: var(--bg-hovered)
  }
</style>

<button
  style="--bg-default: { settings.background.default || "#fff"  }; 
      --bg-hovered: { settings.background.hovered || "#000" };"

  class="{ settings.classes } rounded-lg px-2 py-2 { hovered ? `background-hovered` : "background-default" }" 
  
  on:click

  on:mouseover={(e) => {
    hovered = true;
    dispatch("mouseover", e);
  }}
  on:mouseout={(e) => {
    hovered = false;
    dispatch("mouseout", e);
  }}>

  {#if settings.component != null}
    <svelte:component this={settings.component} color={ hovered ? settings.color.hovered || "#fff" : settings.color.default || "#000" } />
  {/if}
</button>