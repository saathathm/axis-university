import axios from "axios";
import { BASE_URL } from "../utils/constants.js";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Accept": "application/json",
  },
});
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

export default axiosInstance;
