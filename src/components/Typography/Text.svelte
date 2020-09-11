<script>
  // Let's now export some parameters
  export let size = "sm"; 
  export let color = "white";
  export let weight = "light";

  export let classes;
</script>

<h1 class="{"text-" + size} {"text-" + color} {"font-" + weight} {classes}">
  <slot></slot>
</h1>