"use client";

import { PropsWithChildren } from "react";
import WithAuth from "@/components/hoc/WithAuth";
import { GoogleOAuthProvider } from "@react-oauth/google";

const Provider: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <GoogleOAuthProvider
      clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? ""}
    >
      <WithAuth>{children}</WithAuth>
    </GoogleOAuthProvider>
  );
};

export default Provider;
