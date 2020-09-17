<script>
  // Let's now import different avatars variations
  import RoundedAvatar from './Types/RoundedImage.avatar.svelte';
  import WordAvatar from "./Types/Word.avatar.svelte";

  export let type = "image";
  export let size = 2.5;

  // For rounded Avatar only
  export let username = "UN";
  export let avatar = null;

  // For word Avatar only
  export let word = "UN";

  // Loading bar color.
  export let spinnerColor;
</script>

{#if type == "image"}
  <RoundedAvatar {spinnerColor} {username} {avatar} {size} />
{ :else }
  <WordAvatar {size} {word} />
{/if}