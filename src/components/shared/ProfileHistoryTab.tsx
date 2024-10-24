"use client";

import useAuthStore from "@/store/authStore";
import { TIER } from "@/typing/enums";
import Link from "next/link";

const ProfileHistoryTab = () => {
  const { user } = useAuthStore();
  return user && user.tier === TIER.FREE ? (
    <div>
      You cannot see your history. Please,{" "}
      <Link href="/pricing" className="underline">
        Upgrade
      </Link>{" "}
      your subscription
    </div>
  ) : (
    <div>History</div>
  );
};

export default ProfileHistoryTab;
