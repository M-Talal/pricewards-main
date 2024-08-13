"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

export default function ProductImageGallery({ images }: { images: string[] }) {
  const [index, setIndex] = useState(0);
  return (
    <div>
      <div className="h-96">
        <Image
          src={images[index]}
          alt="productImage"
          height={500}
          width={800}
          className="h-full w-full"
        />
      </div>

      <div className="mt-4 flex items-center space-x-4">
        {images.map((image, index) => (
          <button
            onClick={() => {
              setIndex(index);
            }}
            key={index}
            className="sm:h-36 sm:w-36 h-20 w-20 relative "
          >
            <Image
              src={image}
              alt="productImage"
              height={100}
              width={100}
              className="h-full w-full rounded-lg"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
