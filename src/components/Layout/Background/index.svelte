<script>
  // Let's now import all our background
  // types.
  import NormalBackground from "./Types/Normal.background.svelte";
  import ErrorBackground from "./Types/Error.background.svelte";

  // And now let's export some
  // components parameters
  export let type = "normal";
  export let classes;
</script>

<!-- 
  @type Error Background
  @description Ordinary background,
  but with another line color (red)
 -->
{#if type == "error"}
  <ErrorBackground classes={classes}>
    <slot></slot>
  </ErrorBackground>

<!-- 
  @type Normal Background
  @description Just a normal background
 -->
{ :else }
  <NormalBackground classes={classes}>
    <slot></slot>
  </NormalBackground>
{/if}