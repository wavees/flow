<script>
  // Importing modules
  import { goto } from "@sapper/app";
  import { _ } from "svelte-i18n";

  // Importing components
  import { Button, Container } from "../components";
</script>

<Container background="white">
  <!-- 
    Default screen:
    Some kind of an error
    page -->
  <div class="w-full h-full flex flex-col justify-center items-center">
    <h1 class="text-xl text-black">{$_("errors.notFound.title", { default: "Not Found" })}</h1>
    <p class="text-black text-sm opacity-75">{$_("errors.notFound.subtitle", { default: "Requested page not found" })}</p>

    <!-- Button -->
    <Button classes="mt-6" on:click={() => goto('/')}>
      Go home
    </Button>
  </div>
</Container>