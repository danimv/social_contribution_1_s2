import axios from "axios";

const setAuthToken = token => {
  if (token) {
    console.log("setting the toker to header..." + token)
    // apply to every req
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    // delete auth header
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default setAuthToken;
