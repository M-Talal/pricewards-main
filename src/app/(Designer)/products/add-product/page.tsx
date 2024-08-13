import ProductForm from "@/components/form/product/AddProductForm";
import React from "react";

export default async function AddProductPage() {
  return (
    <div className="max-w-4xl mx-auto my-10">
      <h1 className="text-2xl font-semibold text-center">Add New Product</h1>
      <ProductForm />
    </div>
  );
}
