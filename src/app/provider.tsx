"use client";

import { PropsWithChildren } from "react";
import {
  FingerprintJSPro,
  FpjsProvider,
} from "@fingerprintjs/fingerprintjs-pro-react";
import WithAuth from "@/components/hoc/WithAuth";

const Provider: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <FpjsProvider
      loadOptions={{
        apiKey: process.env.NEXT_PUBLIC_FINGERPRINT_API_KEY ?? "",
        region: "eu",
        scriptUrlPattern: [FingerprintJSPro.defaultScriptUrlPattern],
      }}
    >
      <WithAuth>{children}</WithAuth>
    </FpjsProvider>
  );
};

export default Provider;
