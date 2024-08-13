import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import {
  getAllDeliveredOrder,
  getAllPendingOrder,
} from "@/server-actions/order";
import { Plus } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Order, columns } from "./columns";

async function getAllOrders(): Promise<Order[]> {
  const data = await getAllDeliveredOrder();
  console.log("orders", data);

  return data?.deliveredOrders || [];
}

export default async function CompletedOrderPage() {
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
        <h1 className="text-3xl font-semibold text-center">Completed Orders</h1>
        <DataTable columns={columns} data={orders} />
      </div>
    </div>
  );
}
