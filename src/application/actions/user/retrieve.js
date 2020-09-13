import axios from "axios";
import api from "../../configs/api.js";

const _function = (token) => {
  return new Promise((resolve, reject) => {
    // Let's now try and get our user.
    axios.get(`${api.current.url}/${api.current.version}/account`, { headers: { "Authorization": `Bearer ${token}` } })
    .then((response) => {
      resolve(response.data);
    }).catch((error) => {
      const response = error.response;
      
      reject(response == null ? { error: "NotFound" } : response.data == null ? { error: "NotFound" } : response.data );
    });
  });
};

export default _function;