"use client";

import { Container } from "@/components/shared/Container";
import ProfileGeneralTab from "@/components/shared/ProfileGeneralTab";
import ProfileHistoryTab from "@/components/shared/ProfileHistoryTab";
import { Button } from "@/components/ui";
import useAuthStore from "@/store/authStore";
import { HistoryIcon, Settings2Icon, User2Icon } from "lucide-react";
import { useState } from "react";

const ProfilePage = () => {
  const { user } = useAuthStore();

  type tabs = "general" | "history";
  const [state, setState] = useState<tabs>("general");
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
      component: <ProfileGeneralTab />,
    },
    history: {
      title: "History",
      value: "history",
      icon: <HistoryIcon />,
      component: <ProfileHistoryTab />,
    },
  };

  return (
    <Container>
      <h2 className="font-bold text-3xl my-6">Personal Cabinet</h2>
      <div className="w-full flex max-md:flex-col gap-5 max-md:gap-12">
        <aside className="flex flex-col gap-3 items-start w-1/3 max-lg:w-2/4 max-md:w-full bg-neutral-50 dark:bg-neutral-900 rounded-lg">
          <ul className="w-full">
            <li className="w-full px-4 my-4 flex flex-col gap-4">
              <div className=" flex items-center justify-start gap-3">
                <User2Icon />{" "}
                <span className="text-lg font-bold max-[400px]:text-sm">
                  {user?.email ?? "Loading..."}
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
        <div className="w-full">{tabs[state].component}</div>
      </div>
    </Container>
  );
};

export default ProfilePage;
