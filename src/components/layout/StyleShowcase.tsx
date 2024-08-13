import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import outfitIdeas from "@/assets/images/out-fit-ideas.png";
import Link from "next/link";

export default function StyleShowcase() {
  return (
    <div className="grid md:grid-cols-12 bg-peach  rounded-xl">
      <div className="md:col-span-4 relative">
        <Image
          src={outfitIdeas}
          alt="Picture of the author"
          width={800}
          height={800}
          className="w-full h-96 bg-cover rounded-l-xl"
        />
      </div>
      <div className="md:col-span-8 px-4 py-12 flex justify-center items-center">
        <div className="space-y-4">
          <h1 className="sm:text-4xl text-2xl font-bold">Outfit Ideas</h1>
          <p className=" text-gray-500 font-semibold">
            unique designs with outclass designs and quality fabric
          </p>
          <Button variant="secondary" asChild>
            <Link href="/designers">Explore More</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
