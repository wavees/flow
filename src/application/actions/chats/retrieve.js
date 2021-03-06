import axios from "axios";
import api from "../../configs/api.js";

const _function = (token) => {
  return new Promise((resolve, reject) => {
    // And now let's make request to our API
    axios.get(`${api.current.url}/${api.current.version}/chats`, { headers: { "Authorization": `Bearer ${token}` } })
    .then((response) => {
      resolve(response.data)
    }).catch((error) => {
      const response = error.response;
      
      reject(response == null ? { error: "NotFound" } : response.data == null ? { error: "NotFound" } : response.data );
    });
  });
};

export default _function;