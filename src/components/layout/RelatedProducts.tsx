import React, { Suspense } from "react";
import RelatedProduct from "../product/RelatedProduct";
import { Skeleton } from "../ui/skeleton";
import ProductCardSkeleton from "../skeleton/ProductCardSkeleton";

export default function RelatedProducts({ category }: { category: string }) {
  return (
    <div className="my-10">
      <Suspense
        fallback={
          <div className="">
            <div className="py-8">
              <Skeleton className="h-4 w-[200px]" />
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))}
            </div>
          </div>
        }
      >
        <RelatedProduct category={category} />
      </Suspense>
    </div>
  );
}
