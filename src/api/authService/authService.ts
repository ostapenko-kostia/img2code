import { api } from "@/typing/enums";
import instance from "../axiosInstance";
import { IAuthResponse } from "@/typing/interfaces";

const authService = {
  login: async ({ email, password }: { email: string; password: string }) => {
    return (await instance.post<IAuthResponse>(api.LOGIN, {
      email,
      password,
    })).data;
  },

  register: async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    return (await instance.post<void>(api.REGISTER, {
      email,
      password,
    })).data;
  },

  refresh: async (refreshToken: string) => {
    return (await instance.post<IAuthResponse>(api.REFRESH, {
      token: refreshToken,
    })).data;
  },
};

export default authService;
