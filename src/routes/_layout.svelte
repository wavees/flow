<script>
  // Let's import application's styles
  import Tailwind from "../styles/tailwind.svelte";
	import socket from "../network/socket.js";

	// import
	import { fade } from "svelte/transition";
	import { onMount } from "svelte";

	import { Background } from "../components";

	// Importing components
	import {
		Spinner
	} from "darkmode-components/src/index";

	// Cookie Manager
	import Cookie from "cookie-universal";
	const cookies = Cookie();

	import { user } from "../config/stores/user.js";

	let connectionProblems = null;

	// onMount event
	// Here we'll check our user.
	onMount(() => {
		if (socket.connected) {
			user.checkAccount(cookies.get('_account_token', { path: "/" }));
		};
	});

	socket.on('connect', () => {
		user.checkAccount(cookies.get('_account_token', { path: "/" }));
	});
</script>

<svelte:head>
	<link rel="stylesheet" href="./fonts/Junegull/junegull.css">
	<title>Wavees Flow</title>
</svelte:head>

{ #if $user.user.loaded } 
	<main style="height: 100vh; overflow: hidden;">
		<Background type="normal" classes="relative w-full h-full flex justify-center items-center bg-white">
			<slot></slot>
		</Background>
	</main>
{ :else }
	<div class="absolute w-full h-screen flex justify-center items-center bg-white">
		<!-- Branding -->
		<div transition:fade class="flex flex-col justify-center items-center">
			<Spinner size="15"  />
		</div>
	</div>
{ /if }