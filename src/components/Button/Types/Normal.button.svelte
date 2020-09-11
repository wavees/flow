<script>
  // Importing components and declaring
  // some needed variables
  let hovered = false;

  // Let's now export our global
  // settings object.
  export let settings = {
    classes: "",
    hoveredBackground: "#000"
  };
</script>

<style>
  .background {
    background: var(--bg)
  }
</style>

<button
  style="--bg: { settings.hoveredBackground || "#000" }"

  class="{ settings.classes } rounded-lg px-4 py-2 { hovered ? `background` : "bg-white text-gray-900" }" 
  
  on:click
  
  on:mouseover={() => hovered = true} 
  on:mouseout={() => hovered = false}>
  
  <slot></slot>
</button>