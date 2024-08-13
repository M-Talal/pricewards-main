import Image from "next/image";
import React from "react";

export default function FeaturedStyles() {
  return (
    <div className="relative mt-10">
      <Image
        src={"/assets/images/category-page-1.png"}
        width={1440}
        height={400}
        alt="Category Page Image"
        className="w-full h-[300px] sm:h-[350px] md:h-[500px] lg:h-[739px] object-cover"
      />
      <h1 className="absolute top-3/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl font-semibold text-white">
        A ground breaking Experience
      </h1>
    </div>
  );
}
