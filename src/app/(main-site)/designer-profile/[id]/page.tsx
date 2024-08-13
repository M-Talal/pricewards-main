import ProductCard from "@/components/card/ProductCard";
import ProfileSection from "@/components/designer/ProfileSection";
import {
  getAllUserBestSellingProducts,
  getAllUserProducts,
} from "@/server-actions/product";
import Image from "next/image";
import React from "react";

async function getProducts(userId: string) {
  const data = await getAllUserBestSellingProducts(userId);
  console.log("data", data);
  return data;
}

export default async function DesignerProfilePage({ params }: { params: any }) {
  const id = params.id;
  const data = await getProducts(id);
  const products = data?.products;
  const user = data?.user;
  console.log("products", products);
  console.log("user", user);
  let product = null;

  if (products.length !== 0) {
    product = products[0];
  }
  if (!products) {
    return;
  }

  return (
    <div className="pt-6">
      <div className="">
        <ProfileSection
          product={product}
          name={user?.profileName}
          image={user?.image}
          description={user?.description}
        />
      </div>
      <div className="mx-auto max-w-sm mb-5 py-16 px-4">
        <h1 className="text-2xl  font-bold">My Designs</h1>
        <p className="text-muted-foreground font-bold text-sm">
          Explore some cool designs
        </p>
      </div>

      <div className="relative">
        {/* <div className="absolute -z-10">
          <Image
            src="/assets/images/out-fit-1.png"
            alt="hero"
            width={1920}
            height={1080}
            className="h-full w-full"
          />
        </div> */}
        <div className="bg-white max-w-7xl mx-auto grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4 pb-10">
          {products?.map((product: any) => (
            <ProductCard key={product._id} {...product} />
          ))}
        </div>
      </div>
    </div>
  );
}
