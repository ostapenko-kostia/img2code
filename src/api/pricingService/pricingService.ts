import { api } from "@/typing/enums";
import instance from "../axiosInstance";

const pricingService = {
  getLinks: async () => {
    return await instance.get<{
      premium_link: string;
      pro_link: string;
    }>(api.GET_LINKS);
  },
};

export default pricingService;
