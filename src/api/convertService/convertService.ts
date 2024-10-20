import { api } from "@/typing/enums";
import instance from "../axiosInstance";

const convertService = {
  convert: async ({
    file,
    fingerprint,
    comments,
  }: {
    file: File;
    fingerprint: string;
    comments: string | undefined;
  }) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fingerprint", fingerprint);
    formData.append("comments", comments === "on" ? "1" : "0");
    return await instance.post(api.CONVERT, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
};

export default convertService;
