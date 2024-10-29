import Link from "next/link";
import { Container } from "./Container";
import HeroBlockJava from "./HeroBlockJava";
import HeroBlockJS from "./HeroBlockJS";
import MouseEffectBlock from "./MouseEffectBlock";
import { Button } from "../ui";
import { cookies } from "next/headers";
import { Storage } from "@/typing/enums";

const Hero = async () => {
  const cookiesStorage = await cookies();
  const isAuth = !!cookiesStorage.get(Storage.REFRESH_TOKEN);
  return (
    <section className="py-12 shadow-lg shadow-black/10 dark:shadow-white/10">
      <Container className="flex items-center justify-center">
        <div className="flex items-center justify-center gap-6 flex-col max-w-[600px] max-sm:gap-3 max-sm:max-w-none">
          <h2 className="font-bold text-5xl max-xs:text-4xl">AI that</h2>
          <MouseEffectBlock
            className="max-md:w-full max-sm:[&>div>div>div>p]:text-sm max-xs:px-1 max-xs:[&>div>div>div]:gap-2 max-[360px]:[&>div>div>div>img]:w-8 max-[360px]:[&>div>div>div>p]:text-xs"
            block1={<HeroBlockJS />}
            block2={<HeroBlockJava />}
          />
          <h3 className="text-4xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 max-xs:text-2xl">
            in a click of a button
          </h3>
          <p className="text-lg tracking-wide px-10 text-gray-600 text-center dark:text-gray-400 max-sm:px-0 max-xs:text-sm">
            Image conversion has never been easier—turn complex images into
            clean, functional code in seconds. Save time and effort while
            transforming your visuals into fully editable, developer-ready
            formats.
          </p>
          <Link href="/convert-image">
            <Button>{isAuth ? "Convert" : "Try for free!"}</Button>
          </Link>
        </div>
      </Container>
    </section>
  );
};

export default Hero;
