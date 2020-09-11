<script>
  // Importing some components
  import backgrounds from "../../config/themes/backgrounds.js";

  // Exporting container's parameters
  export let size = "40vw";
  export let background = backgrounds[Math.floor(Math.random() * backgrounds.length)];
</script>

<!-- Layout -->
<div style="height: 100vh; overflow-y: auto; {background.includes("background:") ? background : "background: " + background}" class="relative w-full lg:w-{size} shadow-lg flex flex-col items-center justify-center">
  <slot></slot>
</div>