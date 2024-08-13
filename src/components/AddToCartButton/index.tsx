"use client";
import React, { useEffect } from "react";
import { Button } from "../ui/button";
import { Loader2, ShoppingCart } from "lucide-react";
import { useFormState, useFormStatus } from "react-dom";
import { addToCart } from "@/server-actions/cart";
import { useSession } from "../form/auth-wrapper";
import { useToast } from "../ui/use-toast";

export function AddToCartButton({ productId }: { productId: string }) {
  const session = useSession();
  const [state, formAction] = useFormState(addToCart, null);
  const { toast } = useToast();

  useEffect(() => {
    if (state?.loginError) {
      toast({
        title: "Login Required",
        description: "You need to login to add to cart",
      });
    }
    if (state?.success) {
      toast({
        title: "Success",
        description: "Product added to cart",
      });
    }
  }, [state]);

  return (
    <form action={formAction}>
      <input type="hidden" name="productId" value={productId} />
      <input type="hidden" name="quantity" value={1} />
      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button onClick={() => {}} variant="secondary" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Please wait
        </>
      ) : (
        <>
          <ShoppingCart className="mr-2" />
          Add to Cart
        </>
      )}
    </Button>
  );
}
