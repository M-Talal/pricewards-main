"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Separator } from "../ui/separator";
import {
  Delete,
  DeleteIcon,
  Loader2,
  Minus,
  Plus,
  Trash,
  Trash2,
} from "lucide-react";
import { useState, useTransition } from "react";
import { useFormState } from "react-dom";
import { deleteCartItem, updateCartItem } from "@/server-actions/cart";

type Product = {
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
  userId: {
    profileName: string;
  };
};

type item = {
  productId: Product;
  quantity: number;
};

type ShoppingCartCardProps = {
  items: item[];
  _id: string;
};

export default function ShoppingCartCard({
  items,
  _id,
}: ShoppingCartCardProps) {
  console.log(items);
  return (
    <Card>
      <CardHeader>
        {/* <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription> */}
      </CardHeader>
      <CardContent className="space-y-6">
        {items.map((item, index) => (
          <div key={index} className="space-y-4">
            <ItemCard
              name={item.productId.name}
              designerName={item.productId.userId.profileName}
              price={item.productId.price}
              image={item.productId.imageUrl[0]}
              quantity={item.quantity}
              stock={item.productId.stock}
              id={item.productId._id}
            />
            <Separator />
          </div>
        ))}
      </CardContent>
      {/* <CardFooter>
        <p>Card Footer</p>
      </CardFooter> */}
    </Card>
  );
}

export function ItemCard({
  name,
  designerName,
  price,
  image,
  quantity,
  stock,
  id,
}: {
  name: string;
  designerName: string;
  price: number;
  image: string;
  quantity: number;
  stock: number;
  id: string;
}) {
  const [actualQuantity, setActualQuantity] = useState(quantity);
  const [isPending, startTransition] = useTransition();
  const [state, formAction] = useFormState(updateCartItem, null);
  const [deleteState, deleteFormAction] = useFormState(deleteCartItem, null);

  async function handleQuantity(value: number) {
    if (value > stock) {
      return;
    }
    if (value < 0) {
      return;
    }
    const formData = new FormData();
    formData.append("productId", id);
    formData.append("quantity", value.toString());

    startTransition(() => {
      formAction(formData);
    });
  }

  const handleDeleteCartItem = async () => {
    const formData = new FormData();
    formData.append("productId", id);

    startTransition(() => {
      deleteFormAction(formData);
    });
  };
  return (
    <div className="flex gap-4 items-center">
      <div className="p-2 bg-muted rounded-md">
        <Image
          src={image}
          width={200}
          height={200}
          alt="Picture of the author"
          className="rounded-lg h-16 w-16"
        />
      </div>
      <div>
        <h1 className="text-xl  font-bold">{name}</h1>
        <p className="text-muted-foreground font-bold text-sm">
          {designerName}
        </p>
        <p className="text-green-600 font-bold text-lg">${price}</p>
      </div>

      <div className="flex-1 flex flex-col justify-end items-end">
        <button onClick={() => handleDeleteCartItem()}>
          {isPending ? (
            <Loader2 className="animate-spin" />
          ) : (
            <Trash2 className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* <div className="flex-1">
        <p className="text-muted-foreground font-bold text-sm">Quantity</p>
        <p className="text-muted-foreground font-bold text-sm">{quantity}</p>
      </div> */}
    </div>
  );
}
