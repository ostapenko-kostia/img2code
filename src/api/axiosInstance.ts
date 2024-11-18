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
import { api } from "@/typing/enums";
import toast from "react-hot-toast";

export const API_URL = process.env.NEXT_PUBLIC_API_URL;

const instance = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

instance.interceptors.request.use((config) => {
  const refreshToken = getRefreshToken();
  const accessToken = getAccessToken();
  if (
    accessToken &&
    refreshToken &&
    config &&
    !config.url?.includes(api.REFRESH)
  ) {
    config.headers["Authorization"] = `Bearer ${accessToken}`;
  }
  return config;
});

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const refreshToken = getRefreshToken();

    if (
      (error?.response?.status === 401 || error?.response?.status === 403) &&
      !originalRequest?._isRetry &&
      refreshToken
    ) {
      originalRequest._isRetry = true;
      try {
        const data = (await authService.refresh(refreshToken)).data;
        if (data) {
          useAuthStore.setState({ user: data.user_details });
          setAccessToken(data.access_token);
          setRefreshToken(data.refresh_token);
        } else {
          throw new Error("Failed to refresh token");
        }

        return instance.request(originalRequest);
      } catch {
        useAuthStore.setState({ user: null });
        removeAccessToken();
        removeRefreshToken();
      }
    }

    if (error?.response?.data?.errors) {
      const { errors } = error.response.data;
      Object.values(errors).forEach((message) => {
        toast.error(`${message}`);
      });
    } else if (
      error?.response?.status !== 401 &&
      error?.response?.status !== 403
    ) {
      toast.error("Something went wrong. Try again later.");
    }
  }
);

export default instance;
