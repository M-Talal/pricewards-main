import { Heart, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import AddToWishlist from "../product/AddToWishlist";

export default function ProductCard({
  name,
  description,
  imageUrl,
  price,
  sold,
  discount,
  _id,
  profileName,
  wishlist = true,
}: {
  name: string;
  description: string;
  imageUrl: string[];
  price: number;
  sold: number;
  discount: number;
  _id: string;
  profileName: string;
  wishlist?: boolean;
}) {
  return (
    <div className="relative">
      {wishlist && <AddToWishlist id={_id} />}
      <Link href={`/product/${_id}`} className="group">
        <div className="bg-[#F6F6F6] py-12 flex justify-center rounded-lg ">
          <Image
            src={
              imageUrl[0] ||
              "https://res.cloudinary.com/dosndnyp5/image/upload/v1718981531/santhosh-kumar-RqYTuWkTdEs-unsplash-removebg-preview_tlkuim.png"
            }
            alt="Product"
            width={300}
            height={300}
            className="w-[185px] h-[172px] object-cover transform transition-transform duration-300 group-hover:scale-110"
          />
        </div>
        <div className="mt-4 space-y-1">
          <div className="flex justify-between gap-2">
            <h3 className="text-lg font-bold line-clamp-1">{name}</h3>
            <p className="text-green-600 font-bold text-lg">
              ${(price - discount).toFixed(2)}
            </p>
          </div>
          <div className="flex justify-between">
            <p className="text-muted-foreground font-semibold ">
              {profileName}
            </p>
            <p className="text-muted-foreground line-through font-bold text-md">
              ${price}
            </p>
          </div>
          {/* <div className="flex items-center space-x-4 mt-2">
          <div className="flex items-center space-x-2">
            <Star className="text-yellow-600 h-5 w-5" />
            <span className="font-bold">4,5</span>
          </div>
          <span className="font-bold"> {sold} Sold</span>
        </div> */}
        </div>
      </Link>
    </div>
  );
}
