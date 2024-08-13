import {
  getAllCategoryProducts,
  getAllProducts,
  getAllSearchProducts,
  getWishlistProducts,
} from "@/server-actions/product";
import React from "react";
import ProductCard from "../card/ProductCard";

async function fetchWishlistProduct(search: any) {
  console.log(search);
  const result = await getWishlistProducts(search);
  console.log(result);
  const productList = result?.wishlist?.products;
  return productList;
}

export default async function WishlistProduct({
  searchParams,
}: {
  searchParams?: any;
}) {
  const products = await fetchWishlistProduct(searchParams);
  console.log(products);
  return (
    <div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products?.map((product: any) => (
          <ProductCard key={product.id} {...product} wishlist={false} />
        ))}
      </div>
    </div>
  );
}
