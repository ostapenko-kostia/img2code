import { api } from "@/typing/enums";
import instance from "../axiosInstance";

const pricingService = {
  getLinks: async () => {
    return await instance.get<{
      premium_link: string;
      pro_link: string;
    }>(api.GET_LINKS);
  },

  getSubscriptionInfo: async () => {
    return await instance.get(api.GET_SUBSCRIPTION);
  },

  cancelSubscription: async () => {
    return await instance.post(api.CANCEL_SUBSCRIPTION);
  },
};

export default pricingService;
