"use client";

import useAuthStore from "@/store/authStore";
import {
  Button,
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui";
import Link from "next/link";
import { TIER } from "@/typing/enums";
import pricingService from "@/api/pricingService/pricingService";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

interface Props {
  subscriptionInfo?: {
    plan_name: string;
    status: string;
    active_until: string;
    auto_renew: boolean;
  } | null;
}

const ProfileGeneralTab: React.FC<Props> = ({ subscriptionInfo }) => {
  const { logout, delete: deleteAcc, user } = useAuthStore();
  const [isCanceling, setIsCanceling] = useState<boolean>(false);

  const handleCancelSubscription = async () => {
    toast.loading("Canceling subscription...", { duration: 1000 });
    setIsCanceling(true);
    const res = await pricingService.cancelSubscription();
    if (res && res.data) {
      toast.success(res.data, { duration: 8000 });
      setIsCanceling(false);
    } else toast.error("Could not cancel subscription");
  };

  return user ? (
    <div style={{cursor: isCanceling ? "progress" : "initial"}}>
      <h3 className="text-3xl font-bold">General</h3>
      <ul className="w-full flex flex-col items-start gap-8 my-6 max-md:items-center max-md:text-center">
        <li className="w-full">
          <h4 className="font-semibold text-2xl">Info</h4>
          <ul className="pl-4 w-full flex items-start flex-col gap-2 my-2 [&>li>h5]:font-bold [&>li]:flex [&>li]:items-center [&>li]:gap-2 max-md:[&>li]:justify-center">
            <li className="w-full">
              <h5>Email: </h5>
              <span>{user.email}</span>
            </li>
            <li className="w-full">
              <h5>Credits left: </h5>
              <span>
                {user.tier === TIER.FREE ? user.credits : "Unlimited"}
              </span>
            </li>
            <li className="w-full">
              <h5>Tier: </h5>
              <span>{user.tier}</span>
              <Link href="/pricing" className="underline text-blue-700">
                Change
              </Link>
            </li>
          </ul>
        </li>
        {subscriptionInfo && (
          <li className="w-full">
            <h4 className="font-semibold text-2xl">Subscription Info</h4>
            <ul className="pl-4 w-full flex items-start flex-col gap-2 my-2 [&>li>h5]:font-bold [&>li]:flex [&>li]:items-center [&>li]:gap-2 max-md:[&>li]:justify-center">
              <li className="w-full">
                <h5>Active Until: </h5>
                <span>{subscriptionInfo.active_until}</span>
              </li>
              <li className="w-full">
                <h5>Auto Renew: </h5>
                <span>
                  {subscriptionInfo.auto_renew ? "Enabled" : "Disabled"}
                </span>
              </li>
              <li className="w-full">
                <h5>Status: </h5>
                <span>{subscriptionInfo.status.toUpperCase()}</span>
              </li>
            </ul>
          </li>
        )}

        <li className="w-full">
          <h4 className="text-red-600 font-semibold text-2xl">Danger Zone</h4>
          <ul className="w-full flex items-center gap-8 my-6 max-md:justify-center max-md:flex-col max-md:gap-4">
            <li>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive">Delete Account</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      your account and remove your data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={async () => {
                        deleteAcc({
                          cb: () => {
                            logout({});
                            window.location.reload();
                          },
                        });
                      }}
                    >
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </li>
            <li>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" disabled={isCanceling}>
                    Cancel Subscription
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently cancel
                      your subscription.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>No</AlertDialogCancel>
                    <AlertDialogAction onClick={handleCancelSubscription}>
                      Yes
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </li>
            <li>
              <Button
                onClick={() => logout({ cb: () => window.location.reload() })}
              >
                Logout
              </Button>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  ) : (
    "Loading..."
  );
};

export default ProfileGeneralTab;
