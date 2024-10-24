"use client";

import { cn } from "@/lib/utils";
import React from "react";

interface Props {
  block1: React.ReactNode;
  block2: React.ReactNode;
  className?: string;
}

const MouseEffectBlock: React.FC<Props> = ({ block1, block2, className }) => {
  const [currentWidth, setCurrentWidth] = React.useState(100);
  const [linePosition, setLinePosition] = React.useState(0);
  const [rotate, setRotate] = React.useState(0);

  const eventHandler = (e: React.MouseEvent) => {
    const div = e.currentTarget as HTMLDivElement;
    const rect = div.getBoundingClientRect();
    const relativeX = e.clientX - rect.left;
    setCurrentWidth(100 - (relativeX / rect.width) * 100);
    setLinePosition((relativeX / rect.width) * 100);
    setRotate(e.movementX);
  };

  const clearState = () => {
    setCurrentWidth(100);
    setLinePosition(0);
    setRotate(0);
  };

  return (
    <div
      className={cn(
        "px-4 border-2 border-solid border-gray-300 bg-white dark:bg-black dark:border-gray-900 rounded-lg w-[500px] h-[70px] mx-auto text-nowrap",
        className
      )}
    >
      <div
        className="relative w-full h-full flex items-center justify-start"
        onMouseMove={eventHandler}
        onMouseLeave={clearState}
      >
        <hr
          className={cn(
            "absolute top-0 h-full w-2 bg-gradient-to-b from-transparent via-purple-800 dark:via-purple-400 to-transparent border-none z-[1000] transition-opacity duration-300",
            linePosition < 1 && "transition-all duration-1000"
          )}
          style={{
            left: linePosition + `%`,
            opacity: linePosition < 1 || linePosition > 99 ? "0" : "1",
            rotate: rotate + "deg",
            display: linePosition > 100 ? "none" : "block",
          }}
        />
        <div
          className="overflow-hidden absolute top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-black w-full"
          style={{ clipPath: `inset(0 ${currentWidth}% 0 0)` }}
        >
          {block2}
        </div>
        <div className="w-full">{block1}</div>
      </div>
    </div>
  );
};

export default MouseEffectBlock;
