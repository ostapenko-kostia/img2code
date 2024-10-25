"use client";

import { PropsWithChildren, useEffect } from "react";
import useAuthStore from "@/store/authStore";
import { getRefreshToken } from "@/api/authService/authHelper";

const WithAuth: React.FC<PropsWithChildren> = ({ children }) => {
  const refreshToken = getRefreshToken();
  const { refresh, logout } = useAuthStore();

  useEffect(() => {
    const checkAuth = async () => {
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
