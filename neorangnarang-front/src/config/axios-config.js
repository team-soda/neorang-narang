import axios from "axios";
import { API_BASE_URL } from "./url-config";

const accessToken = sessionStorage.getItem("accessToken");
console.log(accessToken);

const instance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    accept: "*/*",
    //Authorization: `Bearer ${accessToken}`,
  },
});

instance.interceptors.request.use(
  (config) => {
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const imgAxios = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "multipart/form-data",
    //Authorization: `Bearer ${accessToken}`,
  },
});

imgAxios.interceptors.request.use(
  (config) => {
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;
