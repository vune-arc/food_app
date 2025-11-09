// axiosInstance.js
import axios from "axios";

const isLocal = typeof window !== "undefined" ? window.location.hostname === "localhost" : __DEV__;
const baseURL = isLocal
  ? (typeof window !== "undefined" ? "http://localhost:8085" : "http://192.168.1.10:8085")
  : "https://your-production-api.com";

const axiosInstance = axios.create({
  baseURL,
  timeout: 10000,
  // withCredentials: false, // không gửi cookie
  headers: {
    "Content-Type": "application/json",
  },
});

// Giữ interceptor response để log lỗi và redirect nếu muốn
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API error:", error.response?.data || error.message);
    const status = error.response?.status;
    if (status === 404) {
      console.warn("404 - Not Found");
    } else if (status >= 500) {
      console.error("Server error");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
