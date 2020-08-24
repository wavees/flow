<script>
  // Importing modules
  import { user } from "../../config/stores/user.js";
  import { general } from "../../config/stores/global.js";

  import Cookie from "cookie-universal";

  // Importing components
  import {
    Spinner
  } from "darkmode-components/src/index";

  // Cookie Manager
  const cookies = Cookie();

  let loading = false;

  function click() {
    loading = true;
    user.clearStore();

    // And now let's start our
    // small token checker...
    const check = setInterval(() => {
      // Let's now check if we have
      // our account token.
      if (cookies.get('_account_token', { path: "/" })) {
        // And now let's try to load our user...
        user.setToken(cookies.get('_account_token', { path: "/" }))
      };
    }, 25);

    user.subscribe((object) => {
      if (object.loaded == true) {
        if (object.tokens.length > 0) {
          loading = false;
          clearInterval(check);
        };
      };
    });

    let loginURI = `https://account.${$general.globalURL}/authorize/${encodeURIComponent("https://ideas.wavees.ml/login/:code")}?permissions=${$general.account.permissions.join(',')}`
    // https://ideas.wavees.ml/login/:code

    // Let's firstly prepare our popup window
    let height = screen.height;
    let width = screen.width / 3;

    let left = (screen.width - width) / 2;
    let top = (screen.height - height) / 4;
    window.open(loginURI, "Wavees Authorization", 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' + width + ', height=' + height + ', top=' + top + ', left=' + left);
  };

  export let classes;
</script>

<!-- Main Layout -->
<button on:click={(e) => click()} class="{classes} bg-blue-500 rounded-md flex items-center justify-center font-semibold py-4 text-center text-white shadow-lg relative">
  {#if loading}
    <div class="absolute w-full h-full rounded-lg bg-blue-500 opacity-75 flex justify-center items-center">
      <Spinner size="12" color="#fff" />
    </div>
  { /if}
  <div>
    <slot>Log in</slot>
  </div>
</button>