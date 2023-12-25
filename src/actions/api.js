import axios from 'axios';

// axios.defaults.withCredentials = true;
const url ='http://192.168.1.23:3006';// 'https://s1-wcfn.onrender.com';//'http://192.168.1.23:3006'//

const api = axios.create({
  baseURL: url, //process.env.REACT_APP_API_URL, // Set the base URL for
    withCredentials: true, 
});

export default api;
