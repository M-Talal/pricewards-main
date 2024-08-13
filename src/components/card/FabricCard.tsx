import Image from "next/image";
import React from "react";

export default function FabricCard({
  title,
  image,
  color,
  price,
}: {
  title: string;
  image: string;
  color: string;
  price: string;
}) {
  return (
    <div>
      <Image
        src={image}
        alt={title}
        width={200}
        height={200}
        className="rounded-lg h-[150px] w-[150px]"
      />
      <div className="flex justify-between pt-3">
        <h3 className="text-md font-semibold">{title}</h3>
        <p className="text-muted-foreground text-sm">{price}</p>
      </div>
      <p className="text-muted-foreground text-start text-sm">{color}</p>
    </div>
  );
}
