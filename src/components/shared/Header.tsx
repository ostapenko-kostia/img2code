import React from "react";
import { Container } from "./Container";
import Link from "next/link";
import ThemeChangeButton from "./ThemeChangeButton";
import Image from "next/image";

export const Header: React.FC = () => {
  return (
    <header className="py-4 shadow-lg shadow-black/10 dark:shadow-white/10">
      <Container className="flex items-center justify-between">
        <Link href="/" className="flex items-center gap-4 group">
          <Image src="/favicon.png" alt="Img2code" width={48} height={48} className="group-hover:rotate-[360deg] transition-transform duration-1000" />
          <h1 className="text-3xl font-extrabold">
            Img2code
          </h1>
        </Link>
        <ThemeChangeButton />
      </Container>
    </header>
  );
};
