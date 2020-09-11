<script>
  // Importing our button types
  import NormalButton from "./Types/Normal.button.svelte";

  // Exporting some settings
  export let type = "normal";

  // Button-related parameters
  export let hoveredBackground;
  export let classes;

  // Settings object for our buttons
  $: settings = {
    // 
    hoveredBackground,

    // Our custom classes
    classes
  };
</script>

{#if type == "ghost"}
   <!-- content here -->
{ :else }
  <!-- @type Normal -->
  <NormalButton on:click settings={settings}>
    <slot></slot>
  </NormalButton>
{/if}