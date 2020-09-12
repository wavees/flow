// import
import { writable } from "svelte/store";
import axios from 'axios';

import socket from "../../network/socket.js";

import moment from "moment";
import api from "../application/api";

import Cookie from "cookie-universal";
const cookies = Cookie();

function createUserStore() {
  // Default object for the store
  let store = {
    loaded: false,

    uid: null,
    token: null,

    name: null,

    chats: {
      loaded: false,

      list: []
    }
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
        object.loaded = true;

        object.uid           = user.uid;
        object.token        = user.token;
        
        object.name         = user.name;

        object.avatar       = user.avatar;
        object.creationDate = user.creationDate;

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
        
        // Let's update our loaded state (if needed)
        if (object.chats.loaded != true) {
          object.chats.loaded = true;
        };

        return object;
      });
    },

    changeChat: (cid, chat) => {
      update((object) => {
        let chats = object.chats.list;

        // And now let's try to update this
        // chat info in our chats array...
        let itemIndex = chats.indexOf(chats.find(x => x.id == cid));

        if (itemIndex !== -1) {
          chats[itemIndex] = chat;
        };

        object.chats.list = chats;

        return object;
      });
    },

    // startService
    // Small "service", that'll
    // update our user's information
    // whatever our token changes.
    startService: () => {
      // Update user whatevet our
      // cookie changes.

      let previousCookie;
      // Cookie Change Listener
      setInterval(() => {
        let cookie = cookies.get("_account_token", { path: "/" });

        if (previousCookie != cookie) {
          console.log("UPDATE USER INFO");
          console.log(cookie);

          previousCookie = cookie;
          user.checkAccount(cookie);
        };
      }, 1250);
    },

    // checkUser
    // Function, that'l check our
    // user (or it will create
    // new user);
    checkAccount: (token) => {
      if (token) {
        // Let's check our user.
        axios.get(`${api.current.url}/${api.current.version}/account`, { headers: { "Authorization": `Bearer ${token}` } })
        .then((response) => {
          const data = response.data;
          console.log("UPDATE USER");

          // By the way, let's clear our store
          // (if needed)
          // const unsubsctibe = subscribe((object) => {
          //   if (object.uid != data.uid) {
          //     // Let's clear our store.
          //     user.clearStore();
          //     unsubscribe();
          //   };
          // });

          user.updateUser(data);

          // And now let's authorize in our websocket
          // connection.
          socket.emit('authorize', { token });
        }).catch((error) => {
          console.log("ERROR");
          console.log(error);
        });
      } else {
        // Let's create our user.
        
        // But Firstly let's get random user's username
        axios.get('https://random-word-api.herokuapp.com/word?number=1&swear=0')
        .then((response) => {
          let name = response.data.map((string) => string.charAt(0).toUpperCase() + string.slice(1)).join(' ');
          
          axios.post(`${api.current.url}/${api.current.version}/account`, { name })
          .then((response) => {
            // Firstly we need to clear our store
            // (in case there are some old or junky information)
            user.clearStore();

            // Let's now save user's token.
            cookies.set('_account_token', response.data.token.token, { expires: moment().add(1, 'year').toDate() });
  
            user.updateUser({
              token: response.data.token.token,
  
              // Another user information...
              name: response.data.user.name,
              uid: response.data.user.uid,
              avatar: response.data.user.avatar,
              creationDate: response.data.user.creationDate
            });

            // And let's authorize in our socket.
            socket.emit('authorize', { token: response.data.token.token });
          }).catch((error) => {
            console.log("ERROR WHILE CREATING USER");
            console.log(error.response.data);
          });
        });
      };
    }
  }
};

const user = createUserStore();

export { user };