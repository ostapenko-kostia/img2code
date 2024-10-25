"use client";

import convertService from "@/api/convertService/convertService";
import pricingService from "@/api/pricingService/pricingService";
import { Container } from "@/components/shared/Container";
import ProfileGeneralTab from "@/components/shared/ProfileGeneralTab";
import ProfileHistoryTab from "@/components/shared/ProfileHistoryTab";
import { Button } from "@/components/ui";
import useAuthStore from "@/store/authStore";
import { TIER } from "@/typing/enums";
import { HistoryIcon, Settings2Icon, User2Icon } from "lucide-react";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ProfilePage = () => {
  const { user } = useAuthStore();

  type tabs = "general" | "history";
  const [state, setState] = useState<tabs>("general");
  const [subscriptionInfo, setSubscriptionInfo] = useState<{
    plan_name: string;
    status: string;
    active_until: string;
    auto_renew: boolean;
  } | null>(null);

  const [history, setHistory] = useState<
    | {
        user_id: string;
        file_url: string;
        code: string;
        code_language: string;
      }[]
    | null
  >(null);

  const tabs: {
    [key in tabs]: {
      title: string;
      value: tabs;
      icon: JSX.Element;
      component: JSX.Element;
    };
  } = {
    general: {
      title: "General",
      value: "general",
      icon: <Settings2Icon />,
      component: <ProfileGeneralTab subscriptionInfo={subscriptionInfo} />,
    },
    history: {
      title: "History",
      value: "history",
      icon: <HistoryIcon />,
      component: <ProfileHistoryTab history={history} />,
    },
  };

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
    async function fetchHistory() {
      try {
        const res = await convertService.getHistory();
        if (res.data) setHistory(res.data);
        else throw new Error("Something went wrong");
      } catch (error) {
        toast.error("Could not fetch history");
      }
    }

    fetchHistory();
    fetchSubscriptionInfo();
  }, []);

  return (
    <Container>
      {user && (user.tier === TIER.FREE || subscriptionInfo) && history ? (
        <>
          <h2 className="font-bold text-3xl my-6">Personal Cabinet</h2>
          <div className="w-full flex max-md:flex-col gap-5 max-md:gap-12">
            <aside className="flex flex-col gap-3 items-start w-1/3 max-lg:w-2/4 max-md:w-full bg-neutral-50 dark:bg-neutral-900 rounded-lg">
              <ul className="w-full">
                <li className="w-full px-4 my-4 flex flex-col gap-4">
                  <div className=" flex items-center justify-start gap-3">
                    <User2Icon />{" "}
                    <span className="text-lg font-bold max-[400px]:text-sm">
                      {user.email}
                    </span>
                  </div>
                  <hr className="w-full" />
                </li>
                {Object.values(tabs).map((tab) => (
                  <li key={tab.value} className="w-full">
                    <Button
                      variant="ghost"
                      onClick={() => setState(tab.value)}
                      className="flex gap-2 items-center justify-start w-full"
                      size="lg"
                    >
                      {tab.icon} {tab.title}
                    </Button>
                  </li>
                ))}
              </ul>
            </aside>
            {tabs[state].component}
          </div>
        </>
      ) : (
        <div className="text-center mt-6 text-3xl">Loading...</div>
      )}
    </Container>
  );
};

export default ProfilePage;
