import { writable } from "svelte/store";

function createErrorManagerStore() {
  // Default store contents
  let store = {
    // @settings majorError
    // Determines if whatever our application
    // have any app-breaking errors.
    majorError: false
  };

  // Let's get some important methods from our writable store
  const { subscribe, update } = writable(store);

  // And now let's build and return our store.
  return {
    subscribe,

    // @function log
    
    // Function, to log
    // our error and to
    // check it's type and
    // to check if it's
    // a major or minor error.
    log: (object) => {
      console.log("LOGGED ERROR");
      console.log(object);
    }
  };
};

const _store = createErrorManagerStore();

export default _store;