<script>
  // Importing our button types
  import NormalButton from "./Types/Normal.button.svelte";
  import IconButton from "./Types/Icon.button.svelte";

  // Exporting some settings
  export let type = "normal";

  // Button-related parameters

  // Backgrounds
  export let foregroundColor;
  export let hoveredForegroundColor;

  export let backgroundColor;
  export let hoveredBackgroundColor;

  export let classes;

  // Icon-related
  export let icon;

  // Settings object for our buttons
  $: settings = {
    // @type Default button's settings

    // Applied to Normal Buttons
    normal: {
      // Buttons' background color
      background: {
        default: backgroundColor,
        hovered: hoveredBackgroundColor,
      },

      // Buttons' tex color
      text: {
        default: foregroundColor,
        hovered: hoveredForegroundColor
      },


      // Our custom classes
      classes: classes
    },

    
    // @type Icons' settings
    
    // Applied to all icons-related
    // buttons
    icon: {
      // Icon's component
      component: icon,
      
      // Icon's color settings
      color: {
        default: foregroundColor,
        hovered: hoveredForegroundColor
      },

      // Icon's background color settings
      background: {
        default: backgroundColor,
        hovered: hoveredBackgroundColor
      },

      // Our custom classes
      classes: classes
    }
  };
</script>

{ #if type == "ghost" }
   <!--Color content here -->
{ :else if type == "icon" }
  <IconButton 
    on:mouseout
    on:mouseover
    on:click settings={settings.icon}>
    <slot></slot>
  </IconButton>
{ :else }
  <!-- @type Normal -->
  <NormalButton
    on:mouseout
    on:mouseover
    on:click settings={settings.normal}>
    <slot></slot>
  </NormalButton>
{ /if }