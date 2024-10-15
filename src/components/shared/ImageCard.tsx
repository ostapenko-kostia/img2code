import Image from "next/image";
import React from "react";
import { Badge } from "../ui";

interface Props {
  file: File;
}

const ImageCard: React.FC<Props> = ({ file }) => {
  return (
    <article className="flex w-full items-center gap-4 rounded-xl border-2 border-solid p-4 justify-start max-sm:flex-col max-sm:items-center max-sm:text-center">
      <Image
        src={URL.createObjectURL(file)}
        width={200}
        height={200}
        alt="Image"
        className="rounded-md aspect-square object-cover"
      />
      <div>
        <p className="text-2xl font-bold max-md:text-lg">{file.name}</p>
        <Badge>Converted</Badge>
      </div>
    </article>
  );
};

export default ImageCard;
