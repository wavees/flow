<script>
  // Declaring some variables
  let colors = [
    "bg-blue-500",
    "bg-green-500",
    "bg-indigo-500",
    "bg-orange-500"
  ];

  // Export username, size and avatar variables
  export let word = "UN";
  
  export let size = 2.3
</script>

<div class="rounded-full flex justify-center items-center relative" style="width: {size}em; height: {size}em;">
  <div class="absolute rounded-full flex justify-center items-center {colors[Math.floor(Math.random() * colors.length)]}" style="z-index: 1; width: {size}em; height: {size}em;">
    <span style="font-size: {size / 2}em;" class="font-semibold text-white">
      {word.split("")[0].toUpperCase()}
    </span>
  </div>
</div>