<script>
  // Importing our button types
  import NormalButton from "./Types/Normal.button.svelte";

  // Exporting some settings
  export let type = "normal";

  // Button-related parameters

  // Backgrounds
  export let background;
  export let hoveredBackground;

  // Texts
  export let textColor;
  export let hoveredTextColor;

  export let classes;

  // Settings object for our buttons
  $: settings = {
    // Backgrounds' settings
    background: background,
    hoveredBackground: hoveredBackground,

    // Texts' settings
    text: textColor,
    hoveredText: hoveredTextColor,

    // Our custom classes
    classes: classes
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