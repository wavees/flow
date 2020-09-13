// import
import { writable } from "svelte/store";

// axios
import axios from "axios";

// moment.js
import moment from "moment";

// Socket Manager
import socket from "../../network/socket";

// Error Manager
import ErrorManager from "./ErrorManager.js";

// Cookie Manager
import Cookie from "cookie-universal";
const cookies = Cookie();

// Let's now import some needed
// actions

// @action user/retrieve
import UserRetrieve from "../actions/user/retrieve.js";

// @action user/register
import UserCreate from "../actions/user/create.js";

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

      let previousCookie = 0;
      // Cookie Change Listener
      setInterval(() => {
        let cookie = cookies.get("_account_token", { path: "/" });

        if (previousCookie != cookie) {
          previousCookie = cookie;
          _store.checkAccount(cookie);
        };
      }, 150);
    },

    // checkUser
    // Function, that'l check our
    // user (or it will create
    // new user);
    checkAccount: (token) => {
      // Let's now try to retrieve our user
      // information.
      UserRetrieve(token).then((response) => {
        // Let's now update our user information.
        _store.updateUser(response);
      }).catch((response) => {
        console.log("RESPONSE:");
        console.log(response);

        // Our user exists or no?
        if (response.error == "InvalidToken") {
          console.log("YEAH");
          // So now we need to create new user account...
          axios.get('https://random-word-api.herokuapp.com/word?number=1&swear=0')
          .then((response) => {
            let name = response.data.map((string) => string.charAt(0).toUpperCase() + string.slice(1)).join(' ');

            console.log("CREATE WITH NAME:");
            console.log(name);

            UserCreate({ name })
            .then((response) => {

              const token = response.token;
              const user  = response.user;

              // Let's firstly update our
              // _account_token cookie
              cookies.set('_account_token', token.token, { expires: moment().add(1, 'year').toDate() });

              console.log("USER && TOKEN:");
              console.log(token);
              console.log(user);

              user.token = token.token;
              // And now let's update our user.
              _store.updateUser(user);

              // Now let's authorize in our SocketManager.
              // WIP: Refactor this
              socket.emit('authorize', { token: token.token });
            }).catch((error) => {
              // Let's now log this error;
              ErrorManager.log({ error, zone: "user/registration" });
            });
          }).catch((error) => {
            // Let's log this error to our Error Manager.
            ErrorManager.log({ error, zone: "user/registration" });
          });
        } else {
          console.log("NO");

          // Let's try to check this user again.
          _store.checkAccount(token);
        };
      });
    }
  }
};

const _store = createUserStore();

export default _store;