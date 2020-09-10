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
  const { subscribe, update } = writable(store);

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

    // checkUser
    // Function, that'l check our
    // user (or it will create
    // new user);
    checkAccount: (token) => {
      if (token) {
        // Let's check our user.
        axios.get(`${api.current.url}/${api.current.version}/account`, { headers: { "Authorization": `Bearer ${token}` } })
        .then((response) => {
          user.updateUser(response.data);

          socket.emit('authorize', { token });
        }).catch((error) => {
          console.log("ERROR");
          console.log(error.response.data);
        });
      } else {
        // Let's create our user.
        
        // But Firstly let's get random user's username
        axios.get('https://random-word-api.herokuapp.com/word?number=1&swear=0')
        .then((response) => {
          let name = response.data.map((string) => string.charAt(0).toUpperCase() + string.slice(1)).join(' ');
          
          axios.post(`${api.current.url}/${api.current.version}/account`, { name })
          .then((response) => {
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