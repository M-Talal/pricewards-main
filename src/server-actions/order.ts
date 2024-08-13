"use server";

import { base } from "@/utils/config";
import { getSession } from "./auth";
import { revalidatePath } from "next/cache";

enum TrackingStatus {
  Delivered = "delivered",
  InTransit = "in_transit",
  Pending = "pending",
  // Add other statuses as needed
}

export async function getAllPendingOrder() {
  try {
    const session = await getSession();
    const response = await fetch(`${base.URL}/api/orders/pending`, {
      headers: {
        "x-access-token": session?.user?.token,
      },
      cache: "no-cache",
    });
    const data = await response.json();
    console.log("Pending orders", data);
    return data;
  } catch (error) {
    console.log("Error getting pending order", error);
    return {
      error: "Error getting pending orders",
    };
  }
}

export async function getAllApproveOrder() {
  try {
    const session = await getSession();
    const response = await fetch(
      `${base.URL}/api/product?isAdminApproval=true`,
      {
        headers: {
          "x-access-token": session?.user?.token,
        },
        cache: "no-cache",
      }
    );
    const data = await response.json();
    console.log("Approve orders", data);
    return data;
  } catch (error) {
    console.log("Error getting approve order", error);
    return {
      error: "Error getting approve orders",
    };
  }
}

export async function deliverOrder(prevState: any, formData: FormData) {
  try {
    const id = formData.get("orderId");
    console.log("orderId", id);
    const session = await getSession();

    const response = await fetch(
      `${base.URL}/api/orders/${id}/tracking-status`,
      {
        method: "PUT",
        headers: {
          "x-access-token": session?.user?.token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ trackingStatus: "delivered" }),
      }
    );
    const data = await response.json();
    console.log("Deliver order", data);
    console.log("Deliver order", data?.success);
    if (data?.success) {
    } else {
      return data;
    }
    console.log("Deliver order", data);
  } catch (error) {
    console.log("Error delivering order", error);
    return {
      error: "Error delivering order",
    };
  }
  revalidatePath("/pending-orders");
}

export async function refundOrder(prevState: any, formData: FormData) {
  try {
    const id = formData.get("orderId");
    console.log("orderId", id);
    const session = await getSession();

    const response = await fetch(`${base.URL}/api/orders/refund`, {
      method: "POST",
      headers: {
        "x-access-token": session?.user?.token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ orderId: id }),
    });
    const data = await response.json();
    console.log("Deliver order", data);
    console.log("Deliver order", data?.success);
    if (data?.success) {
    } else {
      return data;
    }
    console.log("refund order", data);
  } catch (error) {
    console.log("Error delivering order", error);
    return {
      error: "Error delivering order",
    };
  }
  revalidatePath("/completed-orders");
}

export async function getAllDeliveredOrder() {
  try {
    const session = await getSession();
    const response = await fetch(`${base.URL}/api/orders/delivered`, {
      headers: {
        "x-access-token": session?.user?.token,
      },
      next: {
        tags: ["orders"],
      },
    });
    const data = await response.json();
    console.log("Delivered orders", data);
    return data;
  } catch (error) {
    console.log("Error getting pending order", error);
    return {
      error: "Error getting pending orders",
    };
  }
}

export async function getAllRefundOrder() {
  try {
    const session = await getSession();
    const response = await fetch(`${base.URL}/api/orders/refunded`, {
      headers: {
        "x-access-token": session?.user?.token,
      },
      next: {
        tags: ["orders"],
      },
    });
    const data = await response.json();
    console.log("Refund orders", data);
    return data;
  } catch (error) {
    console.log("Error getting refund order", error);
    return {
      error: "Error getting refund orders",
    };
  }
}
