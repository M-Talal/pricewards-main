import Image from "next/image";
import React from "react";

export default function CartItemCard() {
  return (
    <div>
      <div>
        <Image
          src="/assets/images/out-fit-ideas.png"
          alt="Picture of the author"
          width={100}
          height={100}
          className="h-20 w-20"
        />
      </div>
      <div className="mb-5 py-10">
        <h1 className="text-2xl  font-bold">Showing Designers</h1>
        <p className="text-muted-foreground font-bold text-sm">
          Showing your chosen product
        </p>
      </div>
    </div>
  );
}
