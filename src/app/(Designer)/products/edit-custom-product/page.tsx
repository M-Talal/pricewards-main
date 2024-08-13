import AddCustomProductForm from "@/components/form/product/AddCustomProductForm";
import UpdateCustomProductForm from "@/components/form/product/UpdateCustomProductForm";
import { getCustomProductsGroupedByCategory } from "@/server-actions/product";
import React from "react";

export default async function AddCustomProductPage() {
  const customProductData = await getCustomProductsGroupedByCategory();

  console.log(customProductData);

  if (!customProductData?.success) {
    return;
  }
  return (
    <div className="max-w-4xl mx-auto my-10 px-10">
      <h1 className="text-2xl font-semibold text-center mb-10">
        Update Custom Product
      </h1>
      {/* <AddCustomProductForm /> */}
      <UpdateCustomProductForm
        groupedProducts={customProductData?.groupedProducts}
      />
    </div>
  );
}
