import { Product } from "@/app/(Designer)/products/columns";
import { getAllCategoryProducts } from "@/server-actions/product";
import React from "react";
import ProductCard from "../card/ProductCard";

async function getCategoryProducts(category: string): Promise<Product[]> {
  const data = await getAllCategoryProducts(category);
  console.log(data);
  return data?.products;
}

export default async function RelatedProduct({
  category,
}: {
  category: string;
}) {
  console.log(category);
  const products = await getCategoryProducts(category);
  return (
    <div>
      <div className="py-8">
        <h1 className="text-2xl  font-bold">Related Products</h1>
      </div>

      <div className="bg-white max-w-7xl mx-auto grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-4 pb-10">
        {products?.slice(0, 3).map((product: any) => (
          <ProductCard key={product._id} {...product} />
        ))}
      </div>
    </div>
  );
}
