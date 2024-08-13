import ProductForm from "@/components/form/product/AddProductForm";
import { getProductById } from "@/server-actions/product";
import React from "react";

async function getProduct(id: string) {
  const data = await getProductById(id);
  return data?.product;
}

export default async function EditProductPage({ params }: { params: any }) {
  const product = await getProduct(params?.id);
  console.log("product", product);
  return (
    <div className="max-w-4xl mx-auto my-10">
      <h1 className="text-2xl font-semibold text-center">Update Product</h1>
      <ProductForm product={product} />
    </div>
  );
}
