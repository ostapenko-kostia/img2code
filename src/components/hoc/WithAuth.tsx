"use client";

import { PropsWithChildren, useEffect } from "react";
import useAuthStore from "@/store/authStore";
import { getRefreshToken } from "@/api/authService/authHelper";
import toast from "react-hot-toast";

const WithAuth: React.FC<PropsWithChildren> = ({ children }) => {
  const code =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search).get("code")
      : "";

  const refreshToken = getRefreshToken();
  const { refresh, logout, githubRegister } = useAuthStore();

  useEffect(() => {
    const checkAuth = async () => {
      if (code) {
        toast.promise(githubRegister({ code }), {
          success: "Github authorization was successful!",
          error:
            "Something went wrong. Maybe user with that email already exists",
          loading: "Loading...",
        });
      }
      if (refreshToken && refreshToken != "") {
        try {
          await refresh(refreshToken);
        } catch {
          logout({ cb: () => window.location.reload() });
        }
      }
    };
    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{children}</>;
};

export default WithAuth;
