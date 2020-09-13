<script>
  // Let's import application's styles
  import Tailwind from "../styles/tailwind.svelte";

	// import
	import { fade } from "svelte/transition";
	import { onMount } from "svelte";

	// Importing components
	import { Background, Spinner } from "../components";

	import UserManager from "../application/managers/UserManager.js";
	import ErrorManager from "../application/managers/ErrorManager.js";

	// Let's start our user service
	onMount(() => {
		UserManager.startService();
	});
</script>

<svelte:head>
	<link rel="stylesheet" href="./fonts/Junegull/junegull.css">
	<title>Wavees Flow</title>
</svelte:head>

{ #if $UserManager.loaded } 
	<main style="height: 100vh; overflow: hidden;">

		<!-- And now let's check if we have any errors -->
		{ #if $ErrorManager.majorError }
			<Background type="error" classes="relative w-full h-full flex justify-center items-center bg-white">
				<slot></slot>
			</Background>
		{ :else }
			<Background type="normal" classes="relative w-full h-full flex justify-center items-center bg-white">
				<slot></slot>
			</Background>
		{ /if }
	</main>
{ :else }
	<div class="absolute w-full h-screen flex justify-center items-center bg-white">
		<!-- Branding -->
		<div transition:fade class="flex flex-col justify-center items-center">
			<Spinner size="15"  />
		</div>
	</div>
{ /if }