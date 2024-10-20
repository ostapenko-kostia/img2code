import React from "react";
import { Container } from "./Container";
import Link from "next/link";
import ThemeChangeButton from "./ThemeChangeButton";
import Image from "next/image";
import { Button } from "../ui";
import { UserIcon } from "lucide-react";
import { cookies } from "next/headers";
import { Storage } from "@/typing/enums";

export const Header: React.FC = () => {
  const isAuth = cookies().get(Storage.REFRESH_TOKEN);
  return (
    <header className="py-4 shadow-lg shadow-black/10 dark:shadow-white/10">
      <Container className="flex items-center justify-between">
        <Link href="/" className="flex items-center gap-4 group">
          <Image
            src="/static/images/favicon.png"
            alt="Img2code"
            width={48}
            height={48}
            className="group-hover:rotate-[360deg] transition-transform duration-1000"
          />
          <h1 className="text-3xl font-extrabold max-[350px]:text-2xl">
            Img2code
          </h1>
        </Link>
        <div className="flex items-center gap-4">
          <Link href={isAuth ? "/profile" : "/auth"}>
            <Button size="icon" variant="outline">
              <UserIcon />
            </Button>
          </Link>
          <ThemeChangeButton />
        </div>
      </Container>
    </header>
  );
};
