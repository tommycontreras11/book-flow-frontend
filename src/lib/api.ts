import axios from "axios";
import { config } from "./config";
import { getCookie } from "./auth.lib";

const api = axios.create({
  baseURL: config.apiURL, // Use your base URL here
});

// Add a request interceptor to include the JWT token automatically
api.interceptors.request.use(
  async (config) => {
    const jwt = await getCookie(); // Get the JWT from the cookie
    if (jwt) {
      config.headers.Authorization = jwt; // Add Authorization header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
