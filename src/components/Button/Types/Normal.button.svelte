<script>
  // Importing components and declaring
  // some needed variables
  let hovered = false;

  // Let's now export our global
  // settings object.
  export let settings = {
    classes: "",

    // Backgrounds
    background: "#fff",
    hoveredBackground: "#000",

    // Text colors
    text: "#000",
    hoveredText: "#fff"
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
  style="--bg-default: { settings.background || "#fff"  }; 
      --bg-hovered: { settings.hoveredBackground || "#000" };
      
      --text-default: { settings.text || "#000" };
      --text-hovered: { settings.hoveredText || "#fff" };"

  class="{ settings.classes } rounded-lg px-4 py-2 { hovered ? `background-hovered text-hovered` : "background-default text-default" }" 
  
  on:click
  
  on:mouseover={() => hovered = true} 
  on:mouseout={() => hovered = false}>

  <slot></slot>
</button>