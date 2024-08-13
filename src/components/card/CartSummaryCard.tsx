"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import Link from "next/link";
import { checkout } from "@/server-actions/cart";
import { useFormState } from "react-dom";
import { SubmitButton } from "../common/SubmitButton";
import { useEffect } from "react";
import { useToast } from "../ui/use-toast";

type item = {
  productId: {
    _id: string;
    name: string;
    description: string;
    imageUrl: string[];
    price: number;
    code: string;
    stock: number;
    length: number;
    width: number;
    category: string;
    seasonalCategory: string;
    fabricCategory: string;
    productGender: string;
    discount: number;
    freeShipping: boolean;
  };
  quantity: number;
};

export default function CartSummaryCard({ items }: { items: item[] }) {
  const actualPrice = items.reduce((acc, item) => {
    return acc + item.productId.price;
  }, 0);
  const totalDiscount = items.reduce((acc, item) => {
    return acc + item.productId.discount;
  }, 0);

  const [state, formAction] = useFormState(checkout, null);
  const { toast } = useToast();

  useEffect(() => {
    if (state?.success === false) {
      toast({
        title: "Error",
        description: state?.message,
      });
    }
  }, [state]);
  return (
    <Card className="">
      <CardHeader className="space-y-6">
        <CardTitle className="text-xl">Product Summary</CardTitle>
        <div className="space-y-2">
          {items.map((item, index) => (
            <div
              key={index}
              className="items-center gap-2 flex justify-between"
            >
              <p className="text-md font-bold line-clamp-1">
                {item.productId.name}
              </p>
              <p className="text-md font-bold line-clamp-1">
                ${item.productId.price}
              </p>
            </div>
          ))}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <Separator />
        <div className="items-center  gap-2 flex justify-between">
          <p className="text-md font-bold text-muted-foreground">
            Actual Price
          </p>
          <p className="text-md font-bold">${actualPrice}</p>
        </div>
        <div className="items-center  gap-2 flex justify-between">
          <p className="text-md font-bold text-muted-foreground">Discount</p>
          <p className="text-md font-bold">-${totalDiscount}</p>
        </div>
        <Separator />
        <div className="items-center gap-2 flex justify-between">
          <p className="text-md font-bold">Total</p>
          <p className="text-md font-bold">${actualPrice - totalDiscount}</p>
        </div>
      </CardContent>
      <CardFooter className="mt-4">
        <form action={formAction} className="w-full">
          <input
            type="hidden"
            name="amount"
            value={actualPrice - totalDiscount}
          />
          <SubmitButton text="Proceed to Checkout" />
          {/* <Button asChild variant="secondary" className="flex-1">
            <Link href={`/checkout/?amount=${actualPrice - totalDiscount}`}>
              Proceed to Checkout
            </Link>
          </Button> */}
        </form>
      </CardFooter>
    </Card>
  );
}
