// import
import { writable } from "svelte/store";
import socket from "../../network/socket";

import Cookie from "cookie-universal";
const cookies = Cookie();

// We'll listen to any socket updates.
socket.on('account', (data) => {
  // Let's firstly check our user data
  // and then try to update it in our
  // store.
  const account = data;

  if (account.type == "userAccount") {
    // So now we need to update our account
    // information.
    user.updateUser(account);
  };
});

socket.on('accountCreation', (data) => {
  const token     = data.token;
  const account   = data.user;

  // And now let's just update our token
  // and user information!
  if (token.token != null) {
    cookies.set('_account_token', token.token, {
      path: "/"
    });
  };

  if (account.type == "userAccount") {
    user.updateUser(account)
  };
});

// 
function createUserStore() {
  // Default object for the store
  let store = {
    user: {
      loaded: false,

      id: null,
      token: null,

      name: null,
    },

    chats: {
      loaded: false,

      list: []
    }
  };

  // Get some functions from writable store...
  const { subscribe, set, update } = writable(store);

  // Return subscribe function and some other
  // functions to manipulate this store.
  return {
    subscribe,

    // clearStore
    // Clears this store
    clearChats: () => {
      update((object) => {
        object.chats = {
          loaded: false,
          list: []
        };

        return object;
      });
    },

    // updateUser
    // Function, that'll just
    // paste user information
    // in this store.
    updateUser: (user) => {
      update((object) => {
        object.user.loaded = true;

        object.user.id           = user.uid;
        object.user.token        = user.token;
        
        object.user.name         = user.name;

        object.user.avatar       = user.avatar;
        object.user.creationDate = user.creationDate;

        return object;
      });
    },

    // updateChats
    // Function, that'll update our
    // chats list
    updateChats: (chats) => {
      update((object) => {
        object.chats.loaded = true;

        object.chats.list = chats;
        
        return object;
      });
    },

    addChat: (chat) => {
      update((object) => {
        object.chats.list.push(chat);

        return object;
      });
    },

    // checkUser
    // Function, that'l check our
    // user (or it will create
    // new user);
    checkAccount: (token) => {
      if (token) {
        // Let's check our user.
        socket.emit('authorize', { token: token });
      } else {
        // Let's create our user.
        socket.emit('register', { name: "Test User" } );
      };
    }
  }
};

const user = createUserStore();

export { user };