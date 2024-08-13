import FilterCard from "@/components/card/FilterCard";
import { CustomBreadcrumb } from "@/components/common/CustomBreadcrumb";
import FeaturedStyles from "@/components/layout/FeaturedStyles";
import SearchProductList from "@/components/product/SearchProductList";
import React, { Suspense } from "react";
import { getAllProducts, getAllSearchProducts } from "@/server-actions/product";
import ProductCard from "@/components/card/ProductCard";
import RelatedProduct from "@/components/product/RelatedProduct";
import ProductCardSkeleton from "@/components/skeleton/ProductCardSkeleton";
import { Skeleton } from "@/components/ui/skeleton";
import { FilterProvider } from "@/context/filter-wrapper";
import WishlistProduct from "@/components/product/WishlistProduct";

// async function fetchProductList(search: string) {
//   let result;
//   if (search) {
//     result = await getAllSearchProducts(search);
//   } else {
//     result = await getAllProducts();
//   }
//   console.log(result);
//   const productList = result?.products;
//   return productList;
// }

export default async function SearchPage({
  searchParams,
}: {
  searchParams: any;
}) {
  // const search = searchParams?.q || "Men";
  // const category = searchParams?.category;
  // console.log(search);
  // console.log(category);
  // const products = await fetchProductList(search);
  // console.log(products);

  const wishlist = searchParams?.wishlist;

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4">
        <div className="mt-10 py-5">
          <CustomBreadcrumb
            breadCrumbItem={[
              {
                id: 1,
                name: "Home",
                href: "/",
              },
              {
                id: 2,
                name: wishlist ? "Wishlist" : "Search",
                href: wishlist ? "/search?wishlist=true" : "/search",
                active: true,
              },
            ]}
          />
        </div>

        <div className="my-6">
          <h1 className="text-2xl font-bold">
            Showing &apos;{wishlist ? "Wishlist" : "Product List"}&apos;
          </h1>
          {/* <span className="text-gray-500 font-semibold">
            Showing 1-10 of 1000 results
          </span> */}
        </div>

        <div className="pt-6 grid grid-cols-1 px-4 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-3">
            <FilterCard />
          </div>
          <div className="lg:col-span-9">
            {/* <div>
              <div className="grid grid-cols-3 gap-4">
                {products?.map((product: any) => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </div>
            </div> */}
            {wishlist ? (
              <WishlistProduct searchParams={searchParams} />
            ) : (
              <SearchProductList searchParams={searchParams} />
            )}
          </div>
        </div>

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
            {/* <RelatedProduct category={products[0]?.category} /> */}
          </Suspense>
        </div>
      </div>

      <div className="pt-10">
        <FeaturedStyles />
      </div>
    </div>
  );
}
