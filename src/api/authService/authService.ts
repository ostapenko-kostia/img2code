import { api } from "@/typing/enums";
import instance from "../axiosInstance";
import { IAuthResponse } from "@/typing/interfaces";

const authService = {
  login: async ({ email, password }: { email: string; password: string }) => {
    return await instance.post<IAuthResponse>(api.LOGIN, {
      email,
      password,
    });
  },

  register: async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    return await instance.post<void>(api.REGISTER, {
      email,
      password,
    });
  },

  refresh: async (refreshToken: string) => {
    return await instance.post<IAuthResponse>(api.REFRESH, {
      token: refreshToken,
    });
  },

  googleRegister: async ({ credentials }: { credentials: string }) => {
    const formData = new FormData();
    formData.append("credentials", credentials);
    return await instance.post<IAuthResponse>(api.GOOGLE_REGISTER, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  githubRegister: async ({ code }: { code: string }) => {
    const formData = new FormData();
    formData.append("code", code);
    return await instance.post<IAuthResponse>(api.GITHUB_REGISTER, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  delete: async () => await instance.delete<void>(api.DELETE),

  resetPassword: async ({ email }: { email: string }) => {
    return await instance.post<void>(api.RESET_PASSWORD, { email });
  },

  changePassword: async ({
    email,
    otp,
    password,
  }: {
    email: string;
    otp: string;
    password: string;
  }) => {
    return await instance.post<void>(api.CHANGE_PASSWORD, {
      email,
      code: otp,
      password,
      repeated_password: password,
    });
  },
};

export default authService;
