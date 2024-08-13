import {
  getAllCategoryProducts,
  getAllProducts,
  getAllSearchProducts,
} from "@/server-actions/product";
import React from "react";
import ProductCard from "../card/ProductCard";

async function fetchProductList(search: any) {
  console.log(search);
  const result = await getAllProducts(search);
  console.log(result);
  const productList = result?.products;
  return productList;
}

export default async function SearchProductList({
  searchParams,
}: {
  searchParams?: any;
}) {
  const products = await fetchProductList(searchParams);
  console.log(products);
  return (
    <div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products?.map((product: any) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
}
