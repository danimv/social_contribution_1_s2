import axios from 'axios';
import { api } from './api';
import { GET_ERRORS, STATS } from './types';


// add post
export const getStats = (postData) => (dispatch)  => {  
  api
    .get('api/users/stats', postData)
    .then((res) => ({
      payload: res.data,
    }))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};
