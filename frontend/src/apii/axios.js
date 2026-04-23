import axios from "axios";

// Create axios instance for API calls
const axiosInstance = axios.create({
  baseURL: "https://community-aid-ezps.onrender.com/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

// Automatically attach JWT token if it exists
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;