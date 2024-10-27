"use client";

import { PropsWithChildren, useEffect } from "react";
import useAuthStore from "@/store/authStore";
import { getRefreshToken } from "@/api/authService/authHelper";
import { useSearchParams } from "next/navigation";

const WithAuth: React.FC<PropsWithChildren> = ({ children }) => {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");

  const refreshToken = getRefreshToken();
  const { refresh, logout, githubRegister } = useAuthStore();

  useEffect(() => {
    const checkAuth = async () => {
      if (code) {
        await githubRegister({ code });
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
