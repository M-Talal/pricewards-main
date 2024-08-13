"use client";

import ImageUpload from "@/components/common/ImageUpload";
import { Modal } from "@/components/common/modal";
import SingleImageUpload from "@/components/common/SingleImageUpload";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { generateRandomKey } from "@/lib/generateKey";
import { addCustomProduct } from "@/server-actions/product";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { useFormState } from "react-dom";

type Fabric = {
  fabric: string;
  color: string;
  key: string;
  cost: string;
  image: string;
};

export default function AddCustomProductForm() {
  const [state, action, isPending] = useFormState(addCustomProduct, null);

  // modal state
  const [open, setOpen] = useState(false);

  // imagesUrl state
  const [uploadImagesUrl, setUploadImagesUrl] = useState<string[]>([]);
  // fabric state
  const [fabrics, setFabrics] = useState<Fabric[]>([]);
  const [fabricFormData, setFabricFormData] = useState<Fabric>({} as Fabric);
  const [image, setImage] = useState<string>("");

  //
  const handleFabricFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFabricFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form action={action} className="space-y-4">
      {/* Product Details */}
      <Card>
        <CardHeader>
          <CardTitle>Details</CardTitle>
          <CardDescription>name, category and image</CardDescription>
        </CardHeader>
        <Separator />
        <CardContent className="pt-4">
          <div className="space-y-6">
            <div className="space-y-1">
              <Label htmlFor="name">Product Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                // defaultValue={product?.name}
                placeholder="Custom Tailored Dress"
                required
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                name="category"
                type="text"
                // defaultValue={product?.name}
                placeholder="suits"
                required
              />
            </div>

            {/* upload product image */}
            <div className="">
              <Label htmlFor="product-image">Product Image</Label>
              <SingleImageUpload />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* <Button type="submit" disabled={isPending}>
        Add Product
      </Button> */}

      {/* Product Fabrics Detail */}
      <Card>
        <CardHeader>
          <CardTitle>Fabrics</CardTitle>
          <CardDescription>Add fabrics for the product</CardDescription>
        </CardHeader>
        <Separator />
        <CardContent className="pt-4 space-y-4">
          {/* show Fabric Details here */}
          {fabrics.map((fabric, idx) => (
            <div key={idx} className="flex items-center justify-between">
              <div>
                <p className="text-lg font-semibold">{fabric.fabric}</p>
                <p className="text-sm text-gray-500">{fabric.color}</p>
                <p className="text-sm text-gray-500">{fabric.key} (key)</p>
                <p className="text-sm text-gray-500">
                  {" "}
                  {fabric.image} (image){" "}
                </p>
              </div>
              <div>
                <p className="text-lg font-semibold">{fabric.cost}</p>
                <p className="text-sm text-gray-500">Cost</p>
              </div>
            </div>
          ))}

          {/* Add new Fabric button */}
          <Button
            variant={"secondary"}
            type="button"
            onClick={() => setOpen(!open)}
            className=""
          >
            <PlusIcon className="mr-2" />
            Add Fabric
          </Button>
          <Modal open={open} setOpen={setOpen}>
            <div className="space-y-6">
              <div className="space-y-1">
                <Label htmlFor="fabric">Name</Label>
                <Input
                  id="fabric"
                  name="fabric"
                  type="text"
                  // defaultValue={product?.name}
                  placeholder="Wool Blends"
                  onChange={handleFabricFormChange}
                  required
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="color">Color</Label>
                <Input
                  id="color"
                  name="color"
                  type="text"
                  // defaultValue={product?.name}
                  placeholder="Cotton - Year Round"
                  onChange={handleFabricFormChange}
                  required
                />
              </div>

              {/* add fabric cost field */}
              <div className="space-y-1">
                <Label htmlFor="cost">Cost</Label>
                <Input
                  id="cost"
                  name="cost"
                  // defaultValue={product?.name}
                  placeholder="$5000"
                  onChange={handleFabricFormChange}
                  required
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="fabric-image">Fabric Image</Label>
                <SingleImageUpload />
              </div>

              <div className="text-end">
                <Button
                  type="button"
                  onClick={() => {
                    console.log("Adding fabric", fabricFormData);
                    setFabrics((prev) => [
                      ...prev,
                      {
                        ...fabricFormData,
                        key: generateRandomKey(fabricFormData.fabric),
                      },
                    ]);
                    setOpen(false);
                  }}
                >
                  Add Fabric
                </Button>
              </div>
            </div>
          </Modal>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Main Styles</CardTitle>
          <CardDescription>Add styles for the product</CardDescription>
        </CardHeader>
        <Separator />
        <CardContent className="pt-4 space-y-4">
          {/* show Fabric Details here */}
          {fabrics.map((fabric, idx) => (
            <div key={idx} className="flex items-center justify-between">
              <div>
                <p className="text-lg font-semibold">{fabric.fabric}</p>
                <p className="text-sm text-gray-500">{fabric.color}</p>
                <p className="text-sm text-gray-500">{fabric.key} (key)</p>
                <p className="text-sm text-gray-500">
                  {" "}
                  {fabric.image} (image){" "}
                </p>
              </div>
              <div>
                <p className="text-lg font-semibold">{fabric.cost}</p>
                <p className="text-sm text-gray-500">Cost</p>
              </div>
            </div>
          ))}

          <div className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                type="text"
                // defaultValue={product?.name}
                placeholder="Shirt Style"
                required
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="defaultImages">Default Images</Label>
              <ImageUpload
                setUploadImagesUrl={setUploadImagesUrl}
                uploadImagesUrl={uploadImagesUrl}
              />
            </div>

            <div className="flex justify-end">
              <Button className="">Add Style</Button>
            </div>
          </div>

          {/* Add new Fabric button */}
          <Button
            variant={"secondary"}
            type="button"
            onClick={() => setOpen(!open)}
            className=""
          >
            <PlusIcon className="mr-2" />
            Add new main Style
          </Button>
          <Modal open={open} setOpen={setOpen}>
            <div className="space-y-6">
              <div className="space-y-1">
                <Label htmlFor="fabric">Name</Label>
                <Input
                  id="fabric"
                  name="fabric"
                  type="text"
                  // defaultValue={product?.name}
                  placeholder="Wool Blends"
                  onChange={handleFabricFormChange}
                  required
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="color">Color</Label>
                <Input
                  id="color"
                  name="color"
                  type="text"
                  // defaultValue={product?.name}
                  placeholder="Cotton - Year Round"
                  onChange={handleFabricFormChange}
                  required
                />
              </div>

              {/* add fabric cost field */}
              <div className="space-y-1">
                <Label htmlFor="cost">Cost</Label>
                <Input
                  id="cost"
                  name="cost"
                  // defaultValue={product?.name}
                  placeholder="$5000"
                  onChange={handleFabricFormChange}
                  required
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="fabric-image">Fabric Image</Label>
                <SingleImageUpload />
              </div>

              <div className="text-end">
                <Button
                  type="button"
                  onClick={() => {
                    console.log("Adding fabric", fabricFormData);
                    setFabrics((prev) => [
                      ...prev,
                      {
                        ...fabricFormData,
                        key: generateRandomKey(fabricFormData.fabric),
                      },
                    ]);
                    setOpen(false);
                  }}
                >
                  Add Fabric
                </Button>
              </div>
            </div>
          </Modal>
        </CardContent>
      </Card>
    </form>
  );
}
