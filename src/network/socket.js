// Importing
import io from "socket.io-client";
import api from "../config/application/api";

// Let's now run our socket
const socket = io(api.current.url);

// And now let's just export our
// socket instance.
export default socket;