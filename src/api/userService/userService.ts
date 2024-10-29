import { api } from "@/typing/enums";
import instance from "../axiosInstance";

const userService = {
  contactSupport: async ({
    email,
    message,
  }: {
    email: string;
    message: string;
  }) => {
    return await instance.post<void>(api.CONTACT_SUPPORT, {
      sender_email: email,
      message,
    });
  },
};

export default userService;
