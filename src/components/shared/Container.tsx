import { cn } from "@/lib/utils";
import React, { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  className?: string;
}

export const Container: React.FC<Props> = ({ children, className }) => {
  return (
    <div className={cn("container mx-auto max-sm:px-3", className)}>
      {children}
    </div>
  );
};
