import Image from "next/image";
import React from "react";
import ProductCard from "../card/ProductCard";

export default function ProfileSection({
  name,
  description,
  image,
  product,
}: {
  name: string;
  description?: string;
  image: string;
  product: any;
}) {
  return (
    <div className="min-h-[540px] relative">
      <div className="pt-12  grid md:grid-cols-2 lg:grid-cols-3 gap-16 px-10">
        <div className="max-w-[320px] mx-auto space-y-2">
          <h1 className="text-3xl font-bold  line-clamp-6">{name}</h1>
          <p className=" tracking-wider">
            {description ||
              "I offer unique styles to my customers Always high quality Non  I offer unique styles to my customers Always high quality Non copyrights I offer unique styles to my customers Always high qualit Non copyrights I offer unique styles to my customers Always high quality Non copyrights I offer unique styles to my customers Alway high quality Non copyright"}
          </p>
        </div>

        <div className="relative flex justify-center pt-8 max-md:overflow-hidden">
          <div className="flex absolute w-full -z-10 -top-10 flex-col space-y-4">
            {Array.from({ length: 15 }).map((_, index) => (
              <div className="h-5 bg-black" key={index}></div>
            ))}
          </div>
          <Image
            src={image}
            alt="ProfileImage"
            height={500}
            width={500}
            className="h-64 w-64 rounded-full border-2 border-black"
          />
        </div>

        <div className="space-y-10 mx-auto mb-10">
          <h1 className="text-3xl font-bold">Most Popular Design</h1>
          {product && (
            <div className="bg-white max-w-[280px] border border-black rounded-md p-2">
              <ProductCard {...product} />
            </div>
          )}
        </div>
      </div>
      <div className="">
        <Image
          src="/assets/images/hero-bg.png"
          alt="hero"
          layout="fill"
          className="w-full bg-cover absolute -top-10 -z-20 "
        />
      </div>
    </div>
  );
}
