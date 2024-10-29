"use client";

import { getRefreshToken } from "@/api/authService/authHelper";
import pricingService from "@/api/pricingService/pricingService";
import { Container } from "@/components/shared/Container";
import PricingCard from "@/components/shared/PricingCard";
import useAuthStore from "@/store/authStore";
import { TIER } from "@/typing/enums";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const PricingPage = () => {
  const [proLink, setProLink] = useState<string | undefined>(undefined);
  const [premiumLink, setPremiumLink] = useState<string | undefined>(undefined);
  const [subscriptionInfo, setSubscriptionInfo] = useState<{
    plan_name: string;
    status: string;
    active_until: string;
    auto_renew: boolean;
  } | null>(null);

  const isAuth: boolean = !!getRefreshToken();
  const { user } = useAuthStore();

  useEffect(() => {
    async function fetchLinks() {
      if (isAuth) {
        const res = await pricingService.getLinks();
        setProLink(res.data.pro_link);
        setPremiumLink(res.data.premium_link);
      }
    }

    fetchLinks();
  }, [isAuth]);

  useEffect(() => {
    const fetchSubscriptionInfo = async () => {
      try {
        const response = await pricingService.getSubscriptionInfo();
        if (response.data) {
          setSubscriptionInfo(response.data);
        } else {
          throw new Error("Something went wrong");
        }
      } catch {}
    };
    fetchSubscriptionInfo();
  }, []);

  return !isAuth || user?.tier === TIER.FREE || subscriptionInfo ? (
    <div className="my-6">
      <h2 className="text-center font-bold text-4xl mt-4">Pricing</h2>
      <Container className="my-6">
        <div className="w-full grid grid-cols-3 gap-4 max-md:grid-cols-1">
          <PricingCard link="/convert-image" variant="free" />
          <PricingCard
            link={premiumLink ?? "/auth"}
            outlined
            variant="premium"
            disabled={isAuth && subscriptionInfo?.auto_renew}
          />
          <PricingCard
            link={proLink ?? "/auth"}
            outlined
            variant="pro"
            disabled={isAuth && subscriptionInfo?.auto_renew}
          />
        </div>
      </Container>
    </div>
  ) : (
    <h3 className="text-center text-2xl mt-6">Loading...</h3>
  );
};

export default dynamic(() => Promise.resolve(PricingPage), { ssr: false });
