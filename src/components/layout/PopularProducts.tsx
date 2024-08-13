import React from "react";
import ProductCard from "../card/ProductCard";
import { getBestSellingProducts } from "@/server-actions/product";
import Link from "next/link";

export default async function PopularProducts() {
  return (
    <>
      <div className="flex flex-col sm:flex-row items-center justify-center bg-[#F5F4EF] min-h-screen p-4 sm:p-10">
  <div className="flex flex-col justify-center max-w-md mb-6 sm:mb-0 sm:mr-10">
    <h1 className="text-3xl sm:text-5xl font-bold mb-4">Tech for a perfect fit</h1>
    <p className="text-base sm:text-lg mb-6">
      When your clothes are made with care, you can feel it. Before our
      tailors handcraft your piece, our algorithm uses a decade’s worth
      of sizing data to make sure it fits you right. Hard to believe,
      easy to prove.
    </p>
    <button className="px-6 py-2 w-[145px] text-black bg-transparent border rounded-full border-black">
      Know more
    </button>
  </div>
  <div className="relative w-full max-w-lg">
    <div className="p-4">
      <video
        src="https://d1fufvy4xao6k9.cloudfront.net/images/home/hockerty/designer/desktop.mp4"
        autoPlay
        muted
        loop
        className="w-full mb-4 rounded-lg"
      />
    </div>
  </div>
</div>

    </>
  );
}
