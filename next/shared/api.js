import axios from "axios";
import { config } from "../config";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_DRUPAL_BASE_URL,
});

// Add a request interceptor
instance.interceptors.request.use(
  (conf) => {
    // Insert authorization token on request call
    conf.headers["authToken"] = config.authToken;
    return conf;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // dispatch(logout());
      window.location.href = "/";
      return Promise.reject(error.response);
    } else {
      return Promise.reject(error.response);
    }
  }
);

export default instance;
