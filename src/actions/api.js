import axios from 'axios';

const url = 'https://s1-w5x5.onrender.com';//process.env.BACKEND_URL;
const api = axios.create({
  baseURL: url,
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    // Get the token from local storage
    const token = localStorage.getItem('jwtToken');
    // Set auth token in the request headers
    if (token) {
      config.headers['Authorization'] = token;
    }
    return config;
  },
  (error) => {
    // Do something with the request error
    return Promise.reject(error);
  }
);

const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = token;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

export { api, setAuthToken };
