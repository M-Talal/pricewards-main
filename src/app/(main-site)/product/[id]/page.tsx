import { CustomBreadcrumb } from "@/components/common/CustomBreadcrumb";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { CustomSelect } from "@/components/common/CustomeSelect";
import ProductImageGallery from "@/components/product/ProductImageGallery";
import ProductDetailsTab from "@/components/tab/ProductDetailsTab";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { getProductById } from "@/server-actions/product";
import { ShoppingCart, Star } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { AddToCartButton } from "@/components/AddToCartButton";

const BREADCRUMB_LIST = [
  {
    id: 1,
    name: "Home",
    href: "/",
  },
  {
    id: 2,
    name: "Product",
    href: "/product",
  },
  {
    id: 3,
    name: "Product Page",
    href: "/product/[id]",
    active: true,
  },
];

async function getProduct(id: string) {
  const data = await getProductById(id);
  const product = data?.product;
  return product;
}

export default async function ProductDetailsPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const product = await getProduct(params.id);
  console.log("product", product);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-10">
      <div className="mt-10 py-5">
        <CustomBreadcrumb breadCrumbItem={BREADCRUMB_LIST} />
      </div>

      <div className="grid lg:grid-cols-2 gap-10 max-w-7xl">
        <div className="">
          <ProductImageGallery images={product?.imageUrl} />
        </div>
        <div className="space-y-5">
          <div className="space-y-3">
            <h1 className="text-2xl sm:text-3xl font-bold">{product?.name}</h1>
            <div className="flex items-center space-x-2">
              <Star className="text-yellow-600 h-5 w-5" />
              <span className="font-bold">4,5</span>
              <span className="pl-4">{product?.sold} Sold</span>
            </div>
            <h2 className="text-2xl font-bold text-primary">
              ${product?.price}
            </h2>
          </div>

          <p className="text-muted-foreground font-semibold">
            {product?.description}
          </p>
          <Separator />

          <div className="space-y-2">
            <h1 className="font-bold">Product Variant:</h1>
            <div className="flex space-x-4">
              <div className="space-y-1">
                <Label className="font-bold">Size</Label>
                <CustomSelect
                  item={[
                    { title: "S", value: "s" },
                    { title: "L", value: "l" },
                    { title: "XL", value: "xl" },
                  ]}
                  name="size"
                  placeholder="Select a size"
                  className="w-52"
                />
              </div>
              <div className="space-y-1">
                <Label className="font-bold">Fabric</Label>
                {/* <CustomSelect
                  item={[
                    { title: "S", value: "s" },
                    { title: "L", value: "l" },
                    { title: "XL", value: "xl" },
                  ]}
                  name="size"
                  placeholder="Select a size"
                  className="w-32"
                /> */}
                <p>{product?.fabricCategory}</p>
              </div>
            </div>
          </div>

          <div className="flex space-x-4 pt-5">
            {/* <Button>Buy Now</Button> */}
            <AddToCartButton productId={product?._id} />
          </div>
        </div>
      </div>

      <div className="my-8">
        {/* <ProductDetailsTab /> */}

        <div>
          <Tabs defaultValue="detail" className="">
            <TabsList className="mb-6">
              <TabsTrigger value="detail">Detail Product</TabsTrigger>
              <TabsTrigger value="merchant">Merchant</TabsTrigger>
            </TabsList>
            <TabsContent value="detail" className="max-w-[400px]">
              <div className="space-y-4 ">
                <h1 className="text-2xl font-bold">{product?.name}</h1>
                <p className="text-muted-foreground font-semibold">
                  {product?.description}
                </p>
              </div>
              <div className="mt-5">
                <h1 className="text-xl font-bold">Specification</h1>
                <div className="mt-2 space-y-1">
                  <div className="grid grid-cols-3 justify-between  bg-muted p-2 items-center rounded-sm">
                    <Label className="font-bold text-muted-foreground">
                      Brand
                    </Label>
                    <h2 className="text-md font-bold">
                      {product?.userId?.profileName}
                    </h2>
                  </div>
                  <div className="grid grid-cols-3 p-2 items-center rounded-sm">
                    <Label className="font-bold text-muted-foreground">
                      Fabric
                    </Label>
                    <h2 className="text-md font-bold">
                      {product?.fabricCategory}
                    </h2>
                  </div>
                  <div className="grid grid-cols-3 bg-muted p-2 items-center rounded-sm">
                    <Label className="font-bold text-muted-foreground">
                      Category
                    </Label>
                    <h2 className="text-md font-bold">{product?.category}</h2>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="merchant" className="space-y-4">
              <h1 className="text-2xl font-bold">Merchant Information</h1>
              <div className="flex justify-between">
                <div className="flex gap-4 items-center">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={product?.userId?.image} />
                    <AvatarFallback className="uppercase">
                      {" "}
                      {product?.userId?.firstName[0]}{" "}
                      {product?.userId?.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h1 className="text-lg font-bold">
                      {product?.userId?.profileName}
                    </h1>
                    <p className="text-muted-foreground text-md font-semibold">
                      {product?.userId?.firstName.charAt(0).toUpperCase() +
                        product?.userId?.firstName.slice(1).toLowerCase()}{" "}
                      {product?.userId?.lastName.charAt(0).toUpperCase() +
                        product?.userId?.lastName.slice(`1`).toLowerCase()}
                    </p>
                  </div>
                </div>

                <Button variant="outline" asChild>
                  <Link href={`/designer-profile/${product?.userId?._id}`}>
                    Visit Merchant
                  </Link>
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
