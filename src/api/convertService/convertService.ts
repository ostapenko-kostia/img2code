import { api } from "@/typing/enums";
import instance from "../axiosInstance";

const convertService = {
  convert: async (file: File, comments: string | undefined) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("comments", comments === "on" ? "1" : "0");
    return (
      await instance.post(api.CONVERT, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
    ).data;
  },
};

export default convertService;
