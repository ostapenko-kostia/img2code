"use client";

import { getRefreshToken } from "@/api/authService/authHelper";
import pricingService from "@/api/pricingService/pricingService";
import { Container } from "@/components/shared/Container";
import PricingCard from "@/components/shared/PricingCard";
import Link from "next/link";
import { useEffect, useState } from "react";

const PricingPage = () => {
  const [proLink, setProLink] = useState<string | undefined>(undefined);
  const [premiumLink, setPremiumLink] = useState<string | undefined>(undefined);

  const isAuth: boolean = !!getRefreshToken();

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

  return (
    <div>
      <h2 className="text-center font-bold text-4xl mt-4">Pricing</h2>
      <Container>
        <p className="text-center my-8 text-lg">
          Start with 10 free usage credits on us.{" "}
          <Link className="underline" href="/auth">
            Log in
          </Link>{" "}
          to start using the free credits.
        </p>
        <div className="w-full grid grid-cols-3 gap-4">
          <PricingCard link="/convert-image" variant="free" />
          <PricingCard
            link={premiumLink ?? "/auth"}
            outlined
            variant="premium"
          />
          <PricingCard link={proLink ?? "/auth"} outlined variant="pro" />
        </div>
      </Container>
    </div>
  );
};

export default PricingPage;
