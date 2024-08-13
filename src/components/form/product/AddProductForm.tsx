"use client";
import { Product } from "@/app/(Designer)/products/columns";
import { CustomSelect } from "@/components/common/CustomeSelect";
import ImageUpload from "@/components/common/ImageUpload";
import { SubmitButton } from "@/components/common/SubmitButton";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { addProduct, updateProduct } from "@/server-actions/product";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";

export default function ProductForm({ product }: { product?: Product }) {
  const [uploadImagesUrl, setUploadImagesUrl] = useState<string[]>(
    product?.imageUrl || []
  );

  console.log("product", product);
  const [isDiscount, setIsDiscount] = useState<boolean>(
    product?.discount !== 0 && true
  );
  const [state, formAction] = useFormState(
    product ? updateProduct : addProduct,
    null
  );
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    if (state?.success) {
      toast({
        title: "Product Added",
        description: "Product has been added successfully",
      });
      router.push("/products");
    }
    if (state?.error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
  }, [state]);
  return (
    <form action={formAction} className="space-y-4">
      {product && <input type="hidden" name="id" value={product?._id} />}
      <div className="space-y-1">
        <Label htmlFor="name">Product Name</Label>
        <Input
          id="name"
          name="name"
          type="text"
          defaultValue={product?.name}
          placeholder="Summer Khaddi - Pure Boski"
          required
        />
      </div>

      <div className="space-y-1">
        <Label htmlFor="description">Product Description</Label>
        <Textarea
          id="description"
          name="description"
          placeholder="Type your product description here"
          defaultValue={product?.description}
          required
        />
      </div>

      <div className="space-y-1">
        <Label htmlFor="price">Product Price</Label>
        <Input
          id="price"
          name="price"
          type="number"
          placeholder="1000"
          defaultValue={product?.price}
          step="any"
          required
        />
      </div>

      <div className="space-y-1">
        <Label htmlFor="code">Product Code</Label>
        <Input
          id="code"
          name="code"
          defaultValue={product?.code}
          placeholder="KKK-1002-Sky Blue"
          required
        />
      </div>

      <div className="space-y-1">
        <Label htmlFor="stock">Product Stock</Label>
        <Input
          id="stock"
          name="stock"
          type="number"
          placeholder="10"
          defaultValue={product?.stock}
          required
        />
      </div>

      <div className="space-y-1">
        <Label htmlFor="length">Length (Meters)</Label>
        <Input
          id="length"
          name="length"
          type="number"
          placeholder="7"
          defaultValue={product?.length}
          step="any"
          required
        />
      </div>

      <div className="space-y-1">
        <Label htmlFor="width">Width (Yard)</Label>
        <Input
          id="width"
          name="width"
          step="any"
          type="number"
          placeholder="2"
          defaultValue={product?.width}
          required
        />
      </div>

      {/* <div className="flex items-center space-x-2">
        <Checkbox
          defaultChecked={product?.discount ? true : false}
          id="discount"
          onClick={() => setIsDiscount(!isDiscount)}
        />
        <Label htmlFor="discount">Add to Discount?</Label>
      </div> */}

      <div className="space-y-1">
        <Label htmlFor="discount-price">Discount Price</Label>
        <Input
          id="discount-price"
          name="discount-price"
          type="number"
          placeholder="40"
          defaultValue={product?.discount}
          step="any"
          required
        />
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          defaultChecked={product?.freeShipping && true}
          id="free-shipping"
          name="free-shipping"
        />
        <Label htmlFor="free-shipping">Eligible for free shipping?</Label>
      </div>

      <div className="space-y-1">
        <Label htmlFor="size" className="">
          Size
        </Label>
        <div className="flex gap-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="s"
              name="s"
              defaultChecked={product?.size.includes("S") && true}
            />
            <Label htmlFor="s">S</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="m"
              name="m"
              defaultChecked={product?.size.includes("M") && true}
            />
            <Label htmlFor="m">M</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="l"
              name="l"
              defaultChecked={product?.size.includes("L") && true}
            />
            <Label htmlFor="l">L</Label>
          </div>
        </div>
      </div>

      <div className="space-y-1">
        <Label htmlFor="category">Category</Label>
        <CustomSelect
          item={[
            { title: "Clothing", value: "Clothing" },
            { title: "T shirts", value: "T shirts" },
            { title: "Trousers", value: "Trousers" },
            { title: "Suits", value: "Suits" },
            {
              title: "Custom Jeans",
              value: "Custom Jeans",
            },
          ]}
          name="category"
          placeholder="---Select a Category---"
          defaultValue={product?.category}
        />
      </div>

      <div className="space-y-1">
        <Label htmlFor="seasonal-category">Seasonal Category</Label>
        <CustomSelect
          item={[
            { title: "Spring", value: "spring" },
            { title: "Summer", value: "summer" },
            { title: "Winter", value: "winter" },
            { title: "Autumn", value: "autumn" },
          ]}
          name="seasonal-category"
          placeholder="---Select Seasonal Category---"
          defaultValue={product?.seasonalCategory}
        />
      </div>

      <div className="space-y-1">
        <Label htmlFor="fabric-category">Fabric Category</Label>
        <CustomSelect
          item={[
            { title: "Cotton", value: "cotton" },
            { title: "Silk", value: "silk" },
            { title: "Linen", value: "linen" },
            { title: "Wool", value: "wool" },
          ]}
          name="fabric-category"
          placeholder="---Select Fabric Category---"
          defaultValue={product?.fabricCategory}
        />
      </div>

      <div className="space-y-1">
        <Label htmlFor="product-gender">Product Gender</Label>
        <CustomSelect
          item={[
            {
              title: "Male",
              value: "male",
            },
            {
              title: "Female",
              value: "female",
            },
            {
              title: "Unisex",
              value: "unisex",
            },
          ]}
          name="product-gender"
          placeholder="---Select Product Gender---"
          defaultValue={product?.productGender}
        />
      </div>

      <div>
        <ImageUpload
          uploadImagesUrl={uploadImagesUrl}
          setUploadImagesUrl={setUploadImagesUrl}
        />
      </div>

      <div className="max-w-32 ml-auto">
        <SubmitButton text={product ? "Update Product" : "Add Product"} />
      </div>
    </form>
  );
}
