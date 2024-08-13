import CartSummaryCard from "@/components/card/CartSummaryCard";
import ShoppingCartCard from "@/components/card/ShoppingCartCard";
import RelatedProducts from "@/components/layout/RelatedProducts";
import { Skeleton } from "@/components/ui/skeleton";
import { getCart } from "@/server-actions/cart";
import React, { Suspense } from "react";

export default async function CartPage() {
  const data = await getCart();
  const cart = data?.cart;
  console.log(cart);

  return (
    <div>
      <div className="bg-muted">
        <div className="max-w-7xl mx-auto my-4 h-64 px-5">
          <div className="mb-10 py-10">
            <h1 className="text-2xl  font-bold">Showing Designers</h1>
            <p className="text-muted-foreground font-bold text-sm">
              Showing your chosen product
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto -mt-28 grid lg:grid-cols-12 gap-4 px-5">
        <div className="md:col-span-8">
          <ShoppingCartCard items={cart?.items} _id={cart?._id} />
        </div>
        <div className="lg:col-span-4">
          <CartSummaryCard items={cart?.items} />
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-5">
        <RelatedProducts category="t shirts" />
      </div>
    </div>
  );
}
