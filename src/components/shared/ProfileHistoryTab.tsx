"use client";

import useAuthStore from "@/store/authStore";
import { TIER } from "@/typing/enums";
import Link from "next/link";
import {
  Button,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui";
import Image from "next/image";
import { useEffect, useState } from "react";
import CodeBlock from "./CodeBlock";

interface Props {
  history: {
    user_id: string;
    code: string;
    code_language: string;
    file_url: string;
  }[] | null;
}

const ProfileHistoryTab: React.FC<Props> = ({history}) => {
  const { user } = useAuthStore();
  return user && user.tier === TIER.FREE ? (
    <div>
      You cannot see your history. Please,{" "}
      <Link href="/pricing" className="underline">
        Upgrade
      </Link>{" "}
      your subscription
    </div>
  ) : history ? (
    <div className="flex flex-col w-full max-lg:w-[50%] max-md:w-full">
      <Carousel>
        <div className="flex items-center justify-between gap-4 mb-5">
          <h3 className="w-full text-3xl font-bold">History</h3>

          <CarouselPrevious className="static translate-y-0" />
          <CarouselNext className="static translate-y-0" />
        </div>
        <CarouselContent>
          {history.map((item, index) => (
            <CarouselItem
              key={index}
              className="basis-1/3 max-lg:basis-full max-md:basis-1/2 max-[500px]:basis-full"
            >
              <div className="flex flex-col items-center justify-center gap-4 p-3 border-2 border-solid rounded-xl">
                <div className="relative aspect-square w-full">
                  <Image
                    priority
                    src={item.file_url}
                    alt={`Convertation #${index}`}
                    fill
                    sizes="100%, 100%"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <ul>
                  <Dialog>
                    <DialogTrigger>
                      <Button>Show Code Snippet</Button>
                    </DialogTrigger>
                    <DialogContent className="min-w-[70%] px-3 max-lg:max-w-full max-md:min-w-0 max-md:max-w-[80%]">
                      <DialogHeader>
                        <DialogTitle>Code Snippet</DialogTitle>
                      </DialogHeader>
                      <div className="w-full relative max-md:w-[75svw]">
                        <CodeBlock
                          code={item.code}
                          language={item.code_language}
                        />
                      </div>
                    </DialogContent>
                  </Dialog>
                </ul>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  ) : (
    "Loading..."
  );
};

export default ProfileHistoryTab;
