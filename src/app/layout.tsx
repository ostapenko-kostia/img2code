import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { cn } from "../lib/utils";
import { Header } from "@/components/shared/Header";
import { Toaster } from "react-hot-toast";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Img2code",
  icons: "/favicon.ico",
  colorScheme: "light dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn("min-h-screen", nunito.className)}>
        <Toaster toastOptions={{className: "dark:bg-neutral-900 dark:text-white"}} />
        <Header />
        {children}
      </body>
    </html>
  );
}
