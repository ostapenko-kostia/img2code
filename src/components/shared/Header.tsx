import React from "react";
import { Container } from "./Container";
import Link from "next/link";
import ThemeChangeButton from "./ThemeChangeButton";
import Image from "next/image";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui";
import { MenuIcon, UserIcon } from "lucide-react";
import { cookies } from "next/headers";
import { Storage } from "@/typing/enums";
import ContactUsButton from "./ContactUsButton";
import { cn } from "@/lib/utils";

const HeaderLinks = ({ className }: { className?: string }) => {
  return (
    <div className={cn("flex items-center gap-8", className)}>
      <Link href="/convert-image" className="rainbow-text-animated">
        Convert
      </Link>
      <Link href="/pricing">Pricing</Link>
      <Link href="/privacy-policy">Privacy Policy</Link>
      <ContactUsButton />
    </div>
  );
};

const HeaderButtons = ({
  isAuth,
  className,
}: {
  isAuth: boolean;
  className?: string;
}) => {
  return (
    <div className={cn("flex items-center gap-4", className)}>
      <Link href={isAuth ? "/profile" : "/auth"}>
        <Button size="icon" variant="outline">
          <UserIcon />
        </Button>
      </Link>
      <ThemeChangeButton />
    </div>
  );
};

export const Header: React.FC = async () => {
  const cookiesStorage = await cookies();
  const isAuth = cookiesStorage.get(Storage.REFRESH_TOKEN);
  return (
    <header className="py-4 shadow-lg shadow-black/10 dark:shadow-white/10">
      <Container className="flex items-center justify-between w-full">
        <Link href="/" className="flex items-center gap-4 max-[340px]:gap-2">
          <Image
            src="/static/images/favicon.png"
            alt="Img2code"
            width={40}
            height={40}
          />
          <h1 className="text-3xl font-extrabold max-[400px]:text-2xl">
            Img2code
          </h1>
        </Link>
        <HeaderLinks className="max-md:hidden sticky left-1/2 -translate-x-1/2 max-lg:static max-lg:translate-x-0" />
        <HeaderButtons isAuth={!!isAuth} className="max-md:hidden" />
        <Dialog>
          <DialogTrigger asChild className="md:hidden">
            <Button size="icon" variant="outline">
              <MenuIcon />
            </Button>
          </DialogTrigger>
          <DialogContent className="w-[90%] rounded-2xl flex flex-col items-center">
            <DialogTitle className="mr-auto">Menu</DialogTitle>
            <HeaderLinks className="flex-col gap-4" />
            <HeaderButtons isAuth={!!isAuth} />
          </DialogContent>
        </Dialog>
      </Container>
    </header>
  );
};
