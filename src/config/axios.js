import axios from "axios";
import localstorage from "../tokenCheck/localstorage";

axios.interceptors.request.use(
    config => {
    if(config.url.includes('http://localhost:3000/login') || config.url.includes('http://localhost:3000/register')){
        return config;
        } else {
        config.headers['Authorization'] = `Bearer ${localstorage.getToken()}`;
        return config;
        }
    },
    error => {
          return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    res => {
        return res;
    },
    err => {
        if(err.response && err.response.status === 401){
            localstorage.removeToken();
            window.location.reload();
            return Promise.reject(err);
        }
        return Promise.reject(err);
    }

  )

  export default axios;
  