import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import {
  getAllApproveOrder,
  getAllDeliveredOrder,
  getAllPendingOrder,
} from "@/server-actions/order";
import { Plus } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Product, columns } from "./column";

async function getAllOrders(): Promise<Product[]> {
  const data = await getAllApproveOrder();
  console.log("orders", data);
  return data?.products || [];
}

export default async function ApproveProductPage() {
  const orders = await getAllOrders();
  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="my-10 flex justify-between">
        <div className="flex items-center space-x-2">
          <h1 className="text-xl font-semibold">Total Products: </h1>
          <span>{orders?.length}</span>
        </div>
      </div>
      <div>
        <h1 className="text-3xl font-semibold text-center">Approve Products</h1>
        <DataTable columns={columns} data={orders} />
      </div>
    </div>
  );
}
