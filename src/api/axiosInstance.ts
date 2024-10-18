import axios from "axios";
import {
  getAccessToken,
  getRefreshToken,
  removeAccessToken,
  removeRefreshToken,
  setAccessToken,
  setRefreshToken,
} from "./authService/authHelper";
import useAuthStore from "@/store/authStore";
import authService from "./authService/authService";

export const API_URL = process.env.NEXT_PUBLIC_API_URL;

const instance = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

instance.interceptors.request.use((config) => {
  const refreshToken = getRefreshToken();
  const accessToken = getAccessToken();
  if (accessToken && refreshToken && config) {
    config.headers["Authorization"] = `Bearer ${accessToken}`;
  }
  return config;
});

instance.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalRequest = error.config;
    const refreshToken = getRefreshToken();

    if (
      (error.response.status === 401 || error.response.status === 403) &&
      !error.config._isRetry &&
      refreshToken
    ) {
      originalRequest._isRetry = true;
      try {
        const res = await authService.refresh(refreshToken);
        useAuthStore.setState({ user: res.user_details });
        setAccessToken(res.access_token);
        setRefreshToken(res.refresh_token);
        return instance.request(originalRequest);
      } catch {
        useAuthStore.setState({ user: null });
        removeAccessToken();
        removeRefreshToken();
      }
    }
  }
);

export default instance;
