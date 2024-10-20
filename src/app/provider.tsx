"use client";

import { PropsWithChildren } from "react";
import {
  FingerprintJSPro,
  FpjsProvider,
} from "@fingerprintjs/fingerprintjs-pro-react";
import WithAuth from "@/components/hoc/WithAuth";
import { GoogleOAuthProvider } from "@react-oauth/google";

const Provider: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <FpjsProvider
      loadOptions={{
        apiKey: process.env.NEXT_PUBLIC_FINGERPRINT_API_KEY ?? "",
        region: "eu",
        scriptUrlPattern: [FingerprintJSPro.defaultScriptUrlPattern],
      }}
    >
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? ""}>
        <WithAuth>{children}</WithAuth>
      </GoogleOAuthProvider>
    </FpjsProvider>
  );
};

export default Provider;
