import ProductCardSkeleton from "@/components/skeleton/ProductCardSkeleton";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mt-10 py-5">
        <Skeleton className="h-4 w-[200px]" />
      </div>
      <div className="my-6 space-y-2">
        <Skeleton className="h-4 w-[200px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
      <div className="pt-6 grid grid-cols-12 gap-8">
        <div className="col-span-3"></div>
        <div className="col-span-9">
          <div className="grid grid-cols-3 gap-4">
            {Array.from({ length: 10 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
