import { api } from "@/typing/enums";
import instance from "./axiosInstance";

const convertService = {
  convert: async (image: File, comments: string | undefined) => {
    return (
      await instance.post(api.CONVERT, {
        file: image,
        comments: comments === "on" ? "true" : "false",
      })
    ).data;
  },
};

export default convertService;
