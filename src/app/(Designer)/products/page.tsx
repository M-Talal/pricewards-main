import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Plus } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Product, columns } from "./columns";
import { getAllProducts, getAllUserProducts } from "@/server-actions/product";
import { getSession } from "@/server-actions/auth";

async function getProducts(): Promise<Product[]> {
  const data = await getAllUserProducts();
  console.log("products", data);

  if (data?.error) {
    throw new Error(data.error);
  }

  return data?.products;
}

export default async function ProductPage() {
  const products = await getProducts();
  const session = await getSession();

  console.log("session", session);

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="my-10 max-sm:flex-col flex justify-between">
        <div className="flex items-center space-x-2">
          <h1 className="text-xl font-semibold">Total Products: </h1>
          <span>{products?.length}</span>
        </div>
        <div className="flex flex-col space-y-2 ">
          <Button asChild className="mt-5" variant="outline">
            <Link href="/products/add-product">
              <Plus className="h-5 w-5 mr-2" />
              Add New Product
            </Link>
          </Button>
          {session?.user?.role === "admin" && (
            <Button asChild className="mt-5" variant="outline">
              <Link href="/products/edit-custom-product">
                <Plus className="h-5 w-5 mr-2" />
                Update Custom Product
              </Link>
            </Button>
          )}
        </div>
      </div>

      <div>
        <h1 className="text-3xl font-semibold text-center">Current Products</h1>
        <DataTable columns={columns} data={products} />
      </div>
    </div>
  );
}
