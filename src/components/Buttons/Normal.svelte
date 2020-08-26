<script>

  export let whiteOnHover = true;
  export let background = "linear-gradient(to right, #0f2027, #203a43, #2c5364)";
  export let classes;
  let hovered = false;
</script>

<style>
  .background {
    background: var(--bg)
  }
</style>

<button on:click style="--bg: {background}" class="{ classes } rounded-lg px-4 py-2 { hovered ? `background ${whiteOnHover ? "text-white" : "text-gray-900"}` : "bg-white text-gray-900" }" on:mouseover={() => hovered = true} on:mouseout={() => hovered = false}>
  <slot></slot>
</button>