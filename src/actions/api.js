import axios from 'axios';

// axios.defaults.withCredentials = true;
// const url ='http://192.168.1.23:5000';// 'https://s1-w5x5.onrender.com:5000';//'http://192.168.1.23:5000'//

const url = process.env.BACKEND_URL;
const api = axios.create({
  baseURL: url, //process.env.REACT_APP_API_URL, // Set the base URL for
    withCredentials: true, 
});

export default api;
