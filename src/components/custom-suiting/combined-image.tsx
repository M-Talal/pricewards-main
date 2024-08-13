"use client";
import Image from "next/image";
import part1 from "@/assets/images/suits/part_1.png";
import React from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

const originalUrl = "https://res.cloudinary.com/dosndnyp5/image/upload";

type image = {
  key: string;
  zIndex: number;
};

export default function CombinedImage({
  images,
  bgImages,
  category,
  name,
  fabricKey,
}: {
  images: image[];
  bgImages: string[];
  category: string;
  name: string;
  fabricKey: string;
}) {
  console.log(images);

  console.log(category);
  console.log(name);
  console.log(fabricKey);
  return (
    <div className="relative w-[500px] h-[90vh] max-sm:h-[300px] max-sm:w-[300px]">
      {/* <Button
        onClick={async () => {
          await changeImageColor(images[0], "#FF0000");
        }}
      >
        Change Color
      </Button> */}
      {images.map(
        (src, index) => (
          console.log(
            `https://res.cloudinary.com/dosndnyp5/image/upload/${category}/${name}/${fabricKey}/${
              src.key
            }.png ${index + 1} ${src.zIndex}`
          ),
          (
            <Image
              key={index}
              height={800}
              width={800}
              src={`https://res.cloudinary.com/dosndnyp5/image/upload/${category}/${name}/${fabricKey}/${src.key}.png`}
              alt={`Part ${index + 1}`}
              className={cn(
                "absolute z-10 top-0 left-0 w-full h-full object-cover",
                `z-${src.zIndex}`
              )}
            />
          )
        )
      )}
    </div>
  );
}
