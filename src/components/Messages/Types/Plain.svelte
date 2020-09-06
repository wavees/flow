<script>
  // Importing some modules and components

  export let author = {};
  export let message = "Undefined Message";

  export let side = "center";
</script>

<!-- Message Layout -->
<div class="w-full flex my-4 {side == "left" ? "justify-start" : "justify-end text-right"}">
  <div>
    {#if side == "left"}
      <p class="mb-2 text-black font-semibold text-xs">{author.name}</p>
    {/if}

    <div class="bg-blue-500 rounded-lg px-4 py-3">
      <!-- Author name -->
      
      <!-- Message Itself -->
      <div class="text-white text-sm">
        {message}
      </div>
    </div>

    <!-- Author Icon -->
    {#if side == "left"}
      <div class="">
        <div style="width: 2.6rem; height: 2.6rem; background-image: url({author.avatar || "https://miro.medium.com/max/720/1*W35QUSvGpcLuxPo3SRTH4w.png"}); background-size: cover; background-position: center center;" class="rounded-full"></div>
      </div>
    {/if}
  </div>
</div>