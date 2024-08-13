import Link from "next/link";
import React from "react";

export default function CategoryCard({
  name,
  products,
  imageUrl,
  link,
}: {
  name: string;
  products: string;
  imageUrl: string;
  link: string;
}) {
  return (
    <>
      <div className="m-1">
        <Link href={link} className="shadow-lg">
          <div className="card-container cursor-pointer rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 mx-3">
            <img src={imageUrl} alt={name} className="w-full  object-cover" />
            <div className="p-4 bg-white text-center">
              <h2 className="text-lg font-semibold">{name}</h2>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
}
