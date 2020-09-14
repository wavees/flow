import axios from "axios";

const _function = (length = 2) => {
  return new Promise((resolve, reject) => {
    axios.get(`https://random-word-api.herokuapp.com/word?number=${length}&swear=0`)
    .then((response) => {
      resolve(response.data);
    }).catch((error) => {
      const response = error.response;
      
      reject(response == null ? { error: "NotFound" } : response.data == null ? { error: "NotFound" } : response.data );
    });
  });
};

export default _function;