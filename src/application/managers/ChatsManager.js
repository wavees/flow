// import
import { writable } from "svelte/store";

function createChatsStore() {
  // Default object for the store
  let store = {
    list: [],
    loaded: false
  };

  // Get some functions from writable store...
  const { subscribe, update } = writable(store);

  // Return subscribe function and some other
  // functions to manipulate this store.
  return {
    subscribe,

    // clearStore
    clearStore: () => {
      update((object) => {
        object = store;

        return object;
      });
    },

    // clearStore
    // Clears this store
    clearChats: () => {
      update((object) => {
        object = {
          loaded: false,
          list: []
        };

        return object;
      });
    },

    // updateChats
    // Function, that'll update our
    // chats list
    updateChats: (chats) => {
      update((object) => {
        object.loaded = true;

        object.list = chats;
        
        return object;
      });
    },

    addChat: (chat) => {
      update((object) => {
        object.list.push(chat);
        
        // Let's update our loaded state (if needed)
        if (object.loaded != true) {
          object.loaded = true;
        };

        return object;
      });
    },

    changeChat: (cid, chat) => {
      update((object) => {
        let chats = object.list;

        // And now let's try to update this
        // chat info in our chats array...
        let itemIndex = chats.indexOf(chats.find(x => x.id == cid));

        if (itemIndex !== -1) {
          chats[itemIndex] = chat;
        };

        object.list = chats;

        return object;
      });
    },
  }
};

const _store = createChatsStore();

export default _store;