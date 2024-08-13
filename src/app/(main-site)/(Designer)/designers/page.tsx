import DesignerCard from "@/components/card/DesignerCard";
import ProductCard from "@/components/card/ProductCard";
import { CustomBreadcrumb } from "@/components/common/CustomBreadcrumb";
import FeaturedStyles from "@/components/layout/FeaturedStyles";
import {
  getAllCategoryProducts,
  getAllProducts,
} from "@/server-actions/product";
import { getAllDesigners } from "@/server-actions/user";
import Image from "next/image";
import React from "react";

const BREADCRUMB_LIST = [
  {
    id: 1,
    name: "Home",
    href: "/",
  },
  {
    id: 3,
    name: "Designer",
    href: "/categories/[category]",
    active: true,
  },
];

async function getAllDesigner() {
  // replace this with the actual server action
  // const data = await getAllCategoryDesigners(category);
  const data = await getAllDesigners();
  const designer = data?.designers;
  return designer;
}
export default async function CategoryPage({ params }: { params: any }) {
  const category = params.category;
  const designer = await getAllDesigner();
  console.log(designer);

  return (
    <div>
      <div className="max-w-7xl mx-auto px-6">
        <div className="mt-10 py-5">
          <CustomBreadcrumb breadCrumbItem={BREADCRUMB_LIST} />
        </div>

        <div className="mx-auto max-w-sm mb-5 py-10">
          <h1 className="text-2xl  font-bold">Showing Designers</h1>
          <p className="text-muted-foreground font-bold text-sm">
            Showing {1} - {designer?.length} Designers
          </p>
        </div>

        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4 pb-10">
          {designer?.map((product: any) => (
            <DesignerCard
              key={product._id}
              {...product}
              sold={product?.totalSold}
            />
          ))}
        </div>
      </div>
      <FeaturedStyles />
    </div>
  );
}
