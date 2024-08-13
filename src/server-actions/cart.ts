"use server";

import { redirect } from "next/navigation";
import { getSession } from "./auth";
import { base } from "@/utils/config";
import { revalidatePath, revalidateTag } from "next/cache";

export async function addToCart(prevState: any, formData: FormData) {
  try {
    const session = await getSession();
    if (!session) {
      return {
        loginError: "Please login to add to cart",
      };
    }
    console.log("session", session);
    const productId = formData.get("productId");
    const quantity = formData.get("quantity");
    console.log("productId", productId);
    console.log("quantity", quantity);
    const response = await fetch(`${base.URL}/api/cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": session?.user?.token,
      },
      body: JSON.stringify({
        productId,
        quantity: parseInt(quantity as string),
      }),
    });
    const data = await response.json();
    console.log("data", data);
    if (!data?.success) return data;
    return data;
  } catch (error) {
    console.log("Error adding to cart", error);
    {
      error: "Error adding to cart";
    }
  }
  // revalidateTag("cart");
}

export async function customAddToCart(prevState: any, formData: FormData) {
  let data;
  try {
    const productId = formData.get("productId");
    const chest = formData.get("chest");
    const waist = formData.get("waist");
    const hip = formData.get("hips");
    const inseam = formData.get("inseam");
    const sleeve = formData.get("sleeve");
    const neck = formData.get("neck");
    const shoulder = formData.get("shoulder");
    const price = formData.get("price");

    console.log(formData.get("customProductDetails"));

    // convert customProductDetails to object
    const customProductDetails = JSON.parse(
      formData.get("customProductDetails") as any
    );

    console.log(customProductDetails);

    const session = await getSession();
    console.log("session", session);
    if (!session) {
      return {
        loginError: "Please login to add to cart",
      };
    }

    const response = await fetch(
      `${base.URL}/api/product/placeOrderForCustomProduct`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": session?.user?.token,
        },
        body: JSON.stringify({
          productId,
          customProductDetails,
          price,
          chest,
          waist,
          hip,
          inseam,
          sleeve,
          neck,
          shoulder,
        }),
      }
    );

    data = await response.json();
    console.log("data", data);
    if (!data?.success) return data;
  } catch (error) {
    console.log("Error adding to cart", error);
    {
      error: "Error adding to cart";
    }
    return {
      error: "Error adding to cart",
    };
  }
  redirect(
    `checkout?amount=${data?.order?.totalPrice}&orderId=${data?.order?._id}`
  );
}

export async function updateCartItem(prevState: any, formData: FormData) {
  try {
    const session = await getSession();
    if (!session) {
      return {
        loginError: "Please login to add to cart",
      };
    }
    console.log("session", session);
    const productId = formData.get("productId");
    const quantity = formData.get("quantity");
    console.log("productId", productId);
    console.log("quantity", quantity);
    const response = await fetch(`${base.URL}/api/cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": session?.user?.token,
      },
      body: JSON.stringify({
        productId,
        quantity: parseInt(quantity as string),
      }),
    });
    const data = await response.json();
    console.log("data", data);
    if (!data?.success) return data;
  } catch (error) {
    console.log("Error adding to cart", error);
    {
      error: "Error adding to cart";
    }
  }
  revalidateTag("cart");
  redirect("/cart");
}

export async function deleteCartItem(prevState: any, formData: FormData) {
  try {
    const session = await getSession();
    if (!session) {
      return {
        loginError: "Please login to add to cart",
      };
    }
    console.log("session", session);
    const productId = formData.get("productId");

    console.log("productId", productId);

    const response = await fetch(`${base.URL}/api/cart`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": session?.user?.token,
      },
      body: JSON.stringify({
        productId,
      }),
    });
    const data = await response.json();
    console.log("data", data);
    if (!data?.success) return data;
  } catch (error) {
    console.log("Error adding to cart", error);
    {
      error: "Error adding to cart";
    }
  }
  revalidateTag("cart");
  redirect("/cart");
}

export async function getCart() {
  try {
    const session = await getSession();
    const response = await fetch(`${base.URL}/api/cart`, {
      headers: {
        "x-access-token": session?.user?.token,
      },
      next: {
        tags: ["cart"],
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error getting cart", error);
    return {
      error: "Error getting cart",
    };
  }
}

export async function checkout(prevState: any, formData: FormData) {
  const amount = formData.get("amount");
  let orderId;
  try {
    const shippingAddress = {
      address: "123 Main St",
      city: "New York",
      postalCode: "10001",
      country: "USA",
    };
    const paymentMethod = "Stripe";

    const session = await getSession();
    const response = await fetch(`${base.URL}/api/cart/checkout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": session?.user?.token,
      },
      body: JSON.stringify({
        amount,
        shippingAddress,
        paymentMethod,
      }),
    });
    const data = await response.json();
    console.log("data", data);
    if (!data?.success) return data;
    orderId = data?.order?._id;
    console.log("orderId", orderId);
  } catch (error) {
    console.log("Error getting cart", error);
    return {
      error: "Error getting cart",
    };
  }
  revalidateTag("/products");
  redirect(`/checkout/?amount=${amount}&orderId=${orderId}`);
}

export async function confirmPayment(paymentIntentId: string) {
  try {
    const session = await getSession();
    const response = await fetch(`${base.URL}/api/payment/confirm-payment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": session?.user?.token,
      },
      body: JSON.stringify({
        paymentIntentId,
      }),
    });

    const data = await response.json();
    console.log("data", data);
    return data;
  } catch (error) {
    console.log("Error getting cart", error);
    return {
      error: "Error getting cart",
    };
  }
}
