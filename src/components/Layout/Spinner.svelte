<script>
  export let size = 30;
  export let color = "#3498db";

  // Let's prepare our style variable
  let style =
    // Border styles and colors
    `border: ${size/6}px solid ${color};` +
    `border-top-color: transparent;` +
    
    // Spinner's width and height
    `width: ${size}px;` +
    `height: ${size}px`;
</script>

<!-- 
  Spinner itself
  It's spinning, spinning, it can't stop!
   -->
<div style="{style}" class="spinner">
</div>

<!-- 
  Other styles
  Let's just pretend we need this thing.
   -->
<style>
  .spinner {
    display: inline-block;
    border-radius: 50%;
    animation: spin 1s ease-in-out infinite;
    -webkit-animation: spin 1s ease-in-out infinite;
  }

  @keyframes spin {
    to { -webkit-transform: rotate(360deg); }
  }
  @-webkit-keyframes spin {
    to { -webkit-transform: rotate(360deg); }
  }
</style>