import {
  removeAccessToken,
  removeRefreshToken,
  setAccessToken,
  setRefreshToken,
} from "@/api/authService/authHelper";
import authService from "@/api/authService/authService";
import { IUser } from "@/typing/interfaces";
import { create } from "zustand";

interface AuthState {
  user: IUser | null;
  setUser: (user: IUser) => void;

  login: ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => Promise<void>;

  register: ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => Promise<void>;

  refresh: (refreshToken: string) => Promise<void>;
  logout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),

  login: async ({ email, password }) => {
    const res = await authService.login({ email, password });
    set({ user: res.user_details });
    setAccessToken(res.access_token);
    setRefreshToken(res.refresh_token);
  },
  register: async ({ email, password }) => {
    await authService.register({ email, password });
  },
  refresh: async (refreshToken) => {
    const res = await authService.refresh(refreshToken);
    set({ user: res.user_details });
    setAccessToken(res.access_token);
    setRefreshToken(res.refresh_token);
  },
  logout: () => {
    set({ user: null });
    removeAccessToken();
    removeRefreshToken();
  },
}));

export default useAuthStore;
