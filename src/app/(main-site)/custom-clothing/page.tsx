import { getCustomProductsGroupedByCategory } from "@/server-actions/product";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function CustomClothingPage() {
  const customProducts = await getCustomProductsGroupedByCategory();

  const groupedProducts = customProducts?.groupedProducts;

  console.log(groupedProducts);
  return (
    <div className="px-10">
      <div className="my-5">
        <ul className="flex flex-col gap-10">
          {groupedProducts?.map((category: any, index: number) => (
            <li key={index} className="space-y-4">
              <div className="text-3xl font-semibold">{category?._id}</div>
              <div>
                <ul className="grid sm:grid-cols-3 gap-10">
                  {category?.products.map((product: any, index: number) => (
                    <li key={index}>
                      <Link
                        href={`/custom-clothing/${product.category}/${product._id}`}
                        className="space-y-2"
                      >
                        <div className="h-[400px]">
                          <Image
                            src={product?.imageUrl[0] || ""}
                            alt={product?.name}
                            height={800}
                            width={800}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="text-lg font-semibold">
                          {product?.name}
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
