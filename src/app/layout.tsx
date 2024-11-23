import type { Metadata, Viewport } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { cn } from "../lib/utils";
import { Header } from "@/components/shared/Header";
import { Toaster } from "react-hot-toast";
import Provider from "./provider";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Img2code",
  icons: "/static/images/favicon.png",
};

export const viewport: Viewport = {
  colorScheme: "light dark",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-C7JWNV82BF"
        ></script>
        <script>
          window.dataLayer = window.dataLayer || []; function gtag()
          {dataLayer.push(arguments)}
          gtag('js', new Date()); gtag('config', 'G-C7JWNV82BF');
        </script>
      </head>
      <body className={cn("min-h-screen", nunito.className)}>
        <Provider>
          <Toaster
            toastOptions={{ className: "dark:bg-neutral-900 dark:text-white" }}
          />
          <Header />
          {children}
        </Provider>
      </body>
    </html>
  );
}
