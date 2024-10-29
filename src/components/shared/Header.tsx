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
import { CoinsIcon, MenuIcon, UserIcon } from "lucide-react";
import { cookies } from "next/headers";
import { Storage } from "@/typing/enums";
import ContactUsButton from "./ContactUsButton";
import { cn } from "@/lib/utils";

const HeaderButtons = ({
  isAuth,
  className,
}: {
  isAuth: boolean;
  className?: string;
}) => {
  return (
    <div className={cn("flex items-center gap-4", className)}>
      <Link href="/pricing">
        <Button size="icon" variant="outline">
          <CoinsIcon />
        </Button>
      </Link>
      <Link href={isAuth ? "/profile" : "/auth"}>
        <Button size="icon" variant="outline">
          <UserIcon />
        </Button>
      </Link>
      <ContactUsButton />
      <ThemeChangeButton />
    </div>
  );
};

export const Header: React.FC = async () => {
  const cookiesStorage = await cookies();
  const isAuth = cookiesStorage.get(Storage.REFRESH_TOKEN);
  return (
    <header className="py-4 shadow-lg shadow-black/10 dark:shadow-white/10">
      <Container className="flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-4 group max-[340px]:gap-2"
        >
          <Image
            src="/static/images/favicon.png"
            alt="Img2code"
            width={40}
            height={40}
            className="group-hover:rotate-[360deg] transition-transform duration-1000"
          />
          <h1 className="text-3xl font-extrabold max-[400px]:text-2xl">
            Img2code
          </h1>
        </Link>
        <div>
          <HeaderButtons isAuth={!!isAuth} className="max-[450px]:hidden" />
          <div className="hidden max-[450px]:block">
            <Dialog>
              <DialogTrigger asChild>
                <Button size="icon" variant="outline">
                  <MenuIcon />
                </Button>
              </DialogTrigger>
              <DialogContent className="w-[90%] rounded-2xl">
                <DialogTitle>Menu</DialogTitle>
                <HeaderButtons isAuth={!!isAuth} />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </Container>
    </header>
  );
};
