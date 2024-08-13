import { Heart, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function DesignerCard({
  firstName,
  lastName,
  description,
  image,
  sold,
  _id,
  profileName,
}: {
  firstName: string;
  lastName: string;
  description: string;
  image: string;
  sold: number;
  _id: string;
  profileName: string;
}) {
  console.log(sold);
  return (
    <Link href={`/designer-profile/${_id}`} className="group">
      <div className="bg-[#F6F6F6] py-12 flex justify-center rounded-lg relative">
        {/* <div className="absolute top-4 right-4 p-1.5 bg-white rounded-full">
          <Heart className="h-5 w-5" />
        </div> */}
        <Image
          src={
            image ||
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
          <h3 className="text-lg font-bold line-clamp-1">
            {firstName} {lastName}
          </h3>
        </div>
        <p className="text-muted-foreground font-semibold pt-6">
          {profileName}
        </p>
        {/* <div className="flex items-center space-x-4 mt-2">
          <span className="font-bold"> {sold} Sold</span>
        </div> */}
      </div>
    </Link>
  );
}
