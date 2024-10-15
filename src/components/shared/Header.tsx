import React from "react";
import { Container } from "./Container";
import Link from "next/link";
import ThemeChangeButton from "./ThemeChangeButton";

export const Header: React.FC = () => {
  return (
    <header className="py-4 shadow-lg shadow-black/10 dark:shadow-white/10">
      <Container className="flex items-center justify-between">
        <Link href="/">
          <h1 className="text-3xl font-extrabold hover:scale-105 transition-ease transition-transform duration-300">
            Img2code
          </h1>
        </Link>
        <ThemeChangeButton />
      </Container>
    </header>
  );
};
