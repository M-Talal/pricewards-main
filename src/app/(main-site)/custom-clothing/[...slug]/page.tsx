import CustomSuiting from "@/components/custom-suiting/CutomSuitingPage";
import { getProductById } from "@/server-actions/product";
import { notFound } from "next/navigation";
import React from "react";

export default async function page({
  params,
  searchParams,
}: {
  params: { slug: string[] };
  searchParams: { step: string };
}) {
  const productData = await getProductById(params.slug[1]);

  console.log("productData", productData);

  if (!productData) {
    return;
  }

  const product = productData?.product;
  return (
    <div className="my-5">
      <CustomSuiting productData={product} />
    </div>
  );
}
