<script>
  export let user = {};
</script>

<!-- Message Layout -->
<div class="w-full flex justify-center text-center my-4">
  <div class="bg-purple-300 flex items-center rounded-full px-4 py-3">
    <!-- User Icon -->
    <div class="">
      <div style="width: 1.6rem; height: 1.6rem; background-image: url({user.avatar || "./avatars/default.png"}); background-size: cover; background-position: center center;" class="rounded-full"></div>
    </div>

    <!-- User Name -->
    <p class="ml-2 text-white"><span class="text-md font-semibold">{user.name}</span> joined this chat</p>
  </div>
</div>