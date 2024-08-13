"use client";
import { AddToWishlistProduct } from "@/server-actions/product";
import { Heart } from "lucide-react";
import React, { useEffect, useTransition } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { useToast } from "../ui/use-toast";

export default function AddToWishlist({ id }: { id: string }) {
  const [state, formAction] = useFormState(AddToWishlistProduct, null);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  useEffect(() => {
    if (state?.success) {
      toast({
        title: "Success",
        description: "Product added to wishlist",
      });
    }
    if (state?.success === false) {
      toast({
        title: "Success",
        description: state?.message,
      });
    }
  }, [state]);

  const handleSubmit = (e: any) => {
    e.stopPropagation();
    const formData = new FormData();
    formData.append("productId", id);
    startTransition(() => {
      formAction(formData);
    });
  };
  return (
    <div className="absolute top-4 right-4 p-1.5 bg-white rounded-full">
      {/* <form>
        <input hidden name="productId" value={id} />

        <SubmitButton />
      </form> */}
      <button onClick={handleSubmit} disabled={isPending}>
        {isPending ? (
          <Heart className="animate-spin h-5 w-5" />
        ) : (
          <Heart className=" h-5 w-5" />
        )}
      </button>
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending}>
      {pending ? (
        <Heart className="animate-spin h-5 w-5" />
      ) : (
        <Heart className=" h-5 w-5" />
      )}
    </button>
  );
}
