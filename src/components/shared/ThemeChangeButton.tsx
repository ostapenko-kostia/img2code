"use client";

import { MoonIcon, SunIcon } from "lucide-react";
import { Button, Popover } from "@/components/ui";
import React from "react";
import { cn } from "@/lib/utils";
import { PopoverContent, PopoverTrigger } from "../ui/popover";
import dynamic from "next/dynamic";

const ThemeChangeButton: React.FC<{ className?: string }> = ({ className }) => {
  const [theme, setTheme] = React.useState(localStorage.theme);

  React.useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className={cn(className)}>
          {theme === "light" ? <SunIcon /> : <MoonIcon />}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 py-1 -translate-x-5">
        <ul>
          <li className="w-full">
            <Button
              className="w-full"
              onClick={() => {
                localStorage.theme = "light";
                setTheme("light");
              }}
              variant="ghost"
            >
              Light
            </Button>
          </li>
          <li className="w-full">
            <Button
              className="w-full"
              onClick={() => {
                localStorage.theme = "dark";
                setTheme("dark");
              }}
              variant="ghost"
            >
              Dark
            </Button>
          </li>
          <li className="w-full">
            <Button
              className="w-full"
              onClick={() => {
                localStorage.removeItem("theme");
                setTheme(localStorage.theme);
              }}
              variant="ghost"
            >
              System
            </Button>
          </li>
        </ul>
      </PopoverContent>
    </Popover>
  );
};

export default dynamic(() => Promise.resolve(ThemeChangeButton), {
  ssr: false,
});
