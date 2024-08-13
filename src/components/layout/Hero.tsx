import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="grid lg:grid-cols-2  lg:h-[600px] max-lg:px-4 md:pl-8 lg:pl-16">
      <div className="relative max-lg:order-last">
        <div className="">
          <Image
            src="/assets/images/hero-bg.png"
            alt="hero"
            width={500}
            height={500}
            className="lg:h-[600px] sm:h-[500px] h-[660px] w-full bg-cover"
          />

          <div className="absolute inset-0 px-5">
            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-bold mt-20 tracking-tight">
              Upgrade Your Wardrobe With Our custom designs
            </h1>
            <p className="text-muted-foreground font-semibold mt-5 max-w-lg my-4">
              We offer unique and custom designs to our customer with finest
              quality. Explore our web to find something amazing fo you
            </p>

            <div className="flex flex-wrap justify-center items-center gap-4 sm:space-x-4 pt-20">
              <Button asChild>
                <Link href="/search">Buy More Products</Link>
              </Button>
              <Button asChild variant="outline" className="bg-transparent">
                <Link href="/designers"> View All Designers</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="sm:h-[600px] ">
        <Image
          src="/assets/images/hero-1.png"
          alt="hero"
          width={500}
          height={500}
          className="w-full h-full bg-cover"
        />
      </div>
    </div>
  );
}
