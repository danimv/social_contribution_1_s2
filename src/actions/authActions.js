import axios from "axios";
import { api, setAuthToken } from './api';
// import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import { GET_ERRORS, SET_CURRENT_USER } from "./types";

// Register User
export const registerUser = (userData, history) => dispatch => {
  const token = 'your_actual_token_value';
  api
    .post("/api/users/register", userData, {
      headers: {
        'Authorization': 'Bearer ${token}',
        'Content-Type': 'application/json'
      }
    })
    .then(res => history.push("/login"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Login - get user token
export const loginUser = userData => dispatch => {
  api
    .post("/api/users/login", userData)
    .then(res => {
      // save to localStorage
      console.log(res);
      const { token } = res.data;

      // set token to local storage
      localStorage.setItem("jwtToken", token);

      // set token to auth header
      setAuthToken(token);

      // decode token to get user data
      const decoded = jwt_decode(token);

      // set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// set logged in user
export const setCurrentUser = decoded => {  
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// log user out
export const logoutUser = () => dispatch => {
  // remove token from localStorage
  localStorage.removeItem("jwtToken");

  // remove auth header
  setAuthToken(false);

  // set current user to empty object
  dispatch(setCurrentUser({}));
};
