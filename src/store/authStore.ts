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

  googleRegister: ({ credentials }: { credentials: string }) => Promise<void>;
  githubRegister: ({ code }: { code: string }) => Promise<void>;

  refresh: (refreshToken: string) => Promise<void>;
  logout: ({ cb }: { cb?: () => void }) => void;
  delete: ({ cb }: { cb?: () => void }) => Promise<void>;
}

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),

  login: async ({ email, password }) => {
    const data = (await authService.login({ email, password }))?.data;
    if (data) {
      set({ user: data.user_details });
      setAccessToken(data.access_token);
      setRefreshToken(data.refresh_token);
    } else throw new Error("Log in failed");
  },
  register: async ({ email, password }) => {
    await authService.register({ email, password })
  },

  googleRegister: async ({ credentials }) => {
    const res = await authService.googleRegister({ credentials });
    if (res && res.data) {
      set({ user: res.data.user_details });
      setAccessToken(res.data.access_token);
      setRefreshToken(res.data.refresh_token);
    } else throw new Error("Error while auth with google");
  },
  githubRegister: async ({ code }) => {
    const res = await authService.githubRegister({ code });
    if (res && res.data) {
      set({ user: res.data.user_details });
      setAccessToken(res.data.access_token);
      setRefreshToken(res.data.refresh_token);
    } else throw new Error("Error while auth with github");
  },
  refresh: async (refreshToken) => {
    const data = (await authService.refresh(refreshToken))?.data;
    if (data) {
      set({ user: data.user_details });
      setAccessToken(data.access_token);
      setRefreshToken(data.refresh_token);
    } else {
      throw new Error();
    }
  },
  logout: ({ cb }) => {
    set({ user: null });
    removeAccessToken();
    removeRefreshToken();
    if (cb) cb();
  },

  delete: async ({ cb }) => {
    const res = await authService.delete();
    if (res && res.status === 200 && cb) cb();
  },
}));

export default useAuthStore;
