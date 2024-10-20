"use client";

import { Container } from "@/components/shared/Container";
import ProfileGeneralTab from "@/components/shared/ProfileGeneralTab";
import ProfileHistoryTab from "@/components/shared/ProfileHistoryTab";
import { Button } from "@/components/ui";
import useAuthStore from "@/store/authStore";
import { HistoryIcon, User2Icon } from "lucide-react";
import { useState } from "react";

const ProfilePage = () => {
  const { user } = useAuthStore();

  type tabs = "general" | "history";
  const [state, setState] = useState<tabs>("general");
  const tabs: {
    [key in tabs]: { title: string; value: tabs; icon: JSX.Element; component: JSX.Element };
  } = {
    general: { title: "General", value: "general", icon: <User2Icon />, component: <ProfileGeneralTab /> },
    history: { title: "History", value: "history", icon: <HistoryIcon />, component: <ProfileHistoryTab /> },
  };

  return (
    <Container>
      <h2 className="text-center font-bold text-3xl my-6">Personal Cabinet</h2>
      <div
        className="w-full grid grid-cols-2 gap-3 mt-2"
        style={{ gridTemplateColumns: "1fr 3fr" }}
      >
        <aside className="flex flex-col gap-3 items-start w-full bg-neutral-50 dark:bg-neutral-900 rounded-lg">
          <ul className="w-full">
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
        <div>{tabs[state].component}</div>
      </div>
    </Container>
  );
};

export default ProfilePage;
