import { Storage } from "@/typing/enums";
import Cookies from "js-cookie";

// Refresh Token
export const setRefreshToken = (refreshToken: string) =>
  Cookies.set(Storage.REFRESH_TOKEN, refreshToken, { secure: true, expires: 7 });
export const removeRefreshToken = () => Cookies.remove(Storage.REFRESH_TOKEN);
export const getRefreshToken = () => Cookies.get(Storage.REFRESH_TOKEN);

// Access Token
export const setAccessToken = (accessToken: string) =>
  Cookies.set(Storage.ACCESS_TOKEN, accessToken);
export const getAccessToken = () => Cookies.get(Storage.ACCESS_TOKEN);
export const removeAccessToken = () => Cookies.remove(Storage.ACCESS_TOKEN);