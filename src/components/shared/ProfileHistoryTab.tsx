"use client";

import useAuthStore from "@/store/authStore";
import { TIER } from "@/typing/enums";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui";
import ImageCard from "./ImageCard";
import Image from "next/image";

const ProfileHistoryTab = () => {
  const { user } = useAuthStore();

  const history: { image: string; comments: boolean }[] = [
    { image: "/static/images/js.png", comments: true },
    { image: "/static/images/java.webp", comments: false },
    { image: "/static/images/java.webp", comments: false },
    { image: "/static/images/java.webp", comments: false },
    { image: "/static/images/java.webp", comments: false },
  ];

  return user && user.tier === TIER.FREE ? (
    <div>
      You cannot see your history. Please,{" "}
      <Link href="/pricing" className="underline">
        Upgrade
      </Link>{" "}
      your subscription
    </div>
  ) : (
    <div className="flex flex-col max-lg:w-[50%] max-md:w-full">
      <Carousel>
        <div className="flex items-center justify-between gap-4 mb-5">
          <h3 className="w-full text-3xl font-bold">General</h3>

          <CarouselPrevious className="static translate-y-0" />
          <CarouselNext className="static translate-y-0" />
        </div>
        <CarouselContent>
          {history.map((item, index) => (
            <CarouselItem key={index} className="basis-1/3 max-lg:basis-full max-md:basis-1/2 max-[500px]:basis-full">
              <div className="flex flex-col items-center justify-center gap-4 p-3 border-2 border-solid rounded-xl">
                <div className="relative aspect-square w-full">
                  <Image
                    priority
                    src={item.image}
                    alt={`Convertation #${index}`}
                    fill
                    sizes="100%, 100%"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <ul>
                  <li>Comments: {item.comments ? "Yes" : "No"}</li>
                </ul>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default ProfileHistoryTab;
