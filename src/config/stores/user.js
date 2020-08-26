// import
import { writable } from "svelte/store";
import socket from "../../network/socket";

import Cookie from "cookie-universal";
const cookies = Cookie();

import api from "../application/api";

// We'll listen to any socket updates.
socket.on('account', (data) => {
  // Let's firstly check our user data
  // and then try to update it in our
  // store.
  const account = data.response;

  console.log("ACCOUNT UPDATE");
  console.log(account);

  if (account.type == "userAccount") {
    // So now we need to update our account
    // information.
    user.updateUser(account);

    // By the way, now we need to update user's
    // chat array.
    user.clearChats();
    socket.emit('getData', { type: "chats", token: account.token });
  };
});

socket.on('accountCreation', (data) => {
  const token     = data.response.token;
  const account   = data.response.user;

  console.log("USER CREATION");
  console.log(data);
  console.log(token);
  console.log(account);

  // And now let's just update our token
  // and user information!
  if (token.token != null) {
    cookies.set('_account_token', token.token, {
      path: "/"
    });
  };

  if (account.type == "userAccount") {
    user.updateUser(account)

    // And we need to update our chats list!
    user.clearChats();
    socket.emit('getData', { type: "chats", token: token.token })
  };
});

// Here we'll listen to any chats updates.
socket.on('chats', (data) => {
  // And now let's just update our chat information.
  const chats = data.response;

  console.log("CHATS UPDATE");

  console.log(chats);
  console.log(typeof chats);
  if (typeof chats == "array") {
    user.updateChats(chats);
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

    // checkUser
    // Function, that'l check our
    // user (or it will create
    // new user);
    checkAccount: (token) => {
      if (token) {
        console.log("CHECK ACCOUNT");
        // Let's check our user.
        socket.emit('getData', { type: "account", token: token });
      } else {
        console.log("CREATE NEW ACCOUNT");
        // Let's create our user.
        socket.emit('getData', { type: "createAccount", user: { name: "Test User" }});
      };
    }
  }
};

const user = createUserStore();

export { user };