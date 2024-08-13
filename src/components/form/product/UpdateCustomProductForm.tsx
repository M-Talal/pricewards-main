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
import {
  addCustomProduct,
  updateCustomProduct,
} from "@/server-actions/product";
import { PlusIcon, Trash, Trash2Icon, UploadCloud } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import { useFormState } from "react-dom";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { ToastAction } from "@/components/ui/toast";

type Fabric = {
  fabric: string;
  color: string;
  key: string;
  cost: string;
  image: string;
};

export default function UpdateCustomProductForm({
  groupedProducts,
}: {
  groupedProducts: any;
}) {
  console.log(groupedProducts);

  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [isVariantOpen, setIsVariantOpen] = useState(false);
  const [isAssetsOpen, setIsAssetsOpen] = useState(false);
  const [isDefaultImageOpen, setIsDefaultImageOpen] = useState(false);

  const [selectedActiveIndex, setSelectedActiveIndex] = useState("0");
  const [selectedDefaultImage, setSelectedDefaultImage] = useState("");
  const [selectedDefaultImageKey, setSelectedDefaultImageKey] = useState("");

  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedProductValue, setSelectedProductValue] = useState<string>("");

  const [fabrics, setFabrics] = useState<Fabric[]>([]);
  const [selectedFabricValue, setSelectedFabricValue] = useState<string>("");
  const [fabricFormData, setFabricFormData] = useState<Fabric>({} as Fabric);
  const [fabricImage, setFabricImage] = useState<string>("");

  const [selectedStyleImage, setSelectedStyleImage] = useState<string>("");
  const [styleFormData, setStyleFormData] = useState<any>({});

  const [selectedProducts, setSelectedProducts] = useState<any[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<any>();

  const [styleMainIndex, setStyleMainIndex] = useState(0);
  const [styleIdx, setStyleIdx] = useState(0);
  const [styleInnerIdx, setStyleInnerIdx] = useState(0);

  const handleFabricFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFabricFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleStyleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStyleFormData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    console.log("Selected Category", selectedCategory);

    // find the products for the selected category
    const selectedProducts = groupedProducts.find(
      (group: any) => group._id === selectedCategory
    );

    console.log("Selected Products", selectedProducts);

    if (selectedProducts) {
      setSelectedProducts(selectedProducts.products);
    }
  }, [selectedCategory]);

  useEffect(() => {
    console.log("Selected Product", selectedProductValue);

    // find the products for the selected category
    const selectedProduct = selectedProducts.find(
      (product: any) => product._id === selectedProductValue
    );

    console.log("Selected Product", selectedProduct);
    console.log("Selected Product Fabrics", selectedProduct?.fabrics);

    if (selectedProduct) {
      setSelectedProduct(selectedProduct);
      setFabrics(selectedProduct.fabrics);
    }
  }, [selectedProductValue]);

  return (
    <div className="space-y-8">
      <div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="">
            <SelectValue placeholder="Select a Category" />
          </SelectTrigger>
          <SelectContent>
            {groupedProducts.map((group: any, idx: number) => (
              <SelectItem key={idx} value={group?._id}>
                {group._id}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Select
          value={selectedProductValue}
          onValueChange={setSelectedProductValue}
        >
          <SelectTrigger className="">
            <SelectValue placeholder="Select a Category" />
          </SelectTrigger>
          <SelectContent>
            {selectedProducts.map((product: any, idx: number) => (
              <SelectItem key={idx} value={product?._id}>
                {product.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Select
          value={selectedFabricValue}
          onValueChange={setSelectedFabricValue}
        >
          <SelectTrigger className="">
            <SelectValue placeholder="Select a Fabric" />
          </SelectTrigger>
          <SelectContent>
            {fabrics.map((fabric, idx: number) => (
              <SelectItem key={idx} value={fabric.key}>
                {fabric.fabric}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Fabrics</CardTitle>
          <CardDescription>Add fabrics for the product</CardDescription>
        </CardHeader>
        <Separator />
        <CardContent className="pt-4 space-y-4">
          {/* show Fabric Details here */}
          {fabrics.map((fabric, idx) => (
            <div
              key={idx}
              className="flex max-sm:flex-col sm:items-center justify-between"
            >
              <div className="space-y-2">
                <p className="text-lg font-semibold">{fabric.fabric}</p>
                {/* <p className="text-sm text-gray-500">{fabric.key} (key)</p> */}
                <div>
                  <Image
                    src={fabric.image}
                    alt={fabric.fabric}
                    height={100}
                    width={100}
                    className="rounded-lg"
                  />
                </div>
                <p className="text-sm text-gray-500">{fabric.color}</p>
              </div>
              <div className="flex space-x-4 items-center">
                <div>
                  <p className="text-lg font-semibold">{fabric.cost}</p>
                  <p className="text-sm text-gray-500">Cost</p>
                </div>
                <div>
                  <button
                    type="button"
                    onClick={() => {
                      console.log("Deleting Fabric", fabric);
                      setFabrics((prev) =>
                        prev.filter((f) => f.key !== fabric.key)
                      );
                    }}
                  >
                    <Trash2Icon className="mr-2" />
                  </button>
                </div>
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
                <SingleImageUpload
                  setImageUlr={setFabricImage}
                  imageUrl={fabricImage}
                />
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
                        image: fabricImage,
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

      <Card className="">
        <CardHeader>
          <CardTitle>Product Style Details</CardTitle>
          <CardDescription>Update product Style details</CardDescription>
        </CardHeader>
        <Separator />
        <CardContent className="pt-4 space-y-16">
          {
            // show product style details here
            selectedProduct &&
              selectedProduct?.mainStyles?.map(
                (mainStyle: any, mainIndex: number) => (
                  <div key={mainIndex} className="">
                    <div className="space-y-8">
                      <p className="text-2xl font-bold">
                        {mainIndex + 1} - {mainStyle.title}
                      </p>

                      {/* inner styles like  */}
                      {mainStyle.styles.map((innerStyle: any, idx: number) => (
                        <div key={idx} className="space-y-4 w-full">
                          <p className="text-md font-semibold">
                            {innerStyle.name}
                          </p>
                          {/* <p className="text-sm text-gray-500">
                            {innerStyle.zIndex}
                          </p> */}
                          {/* <p className="text-sm text-gray-500">
                            {innerStyle.activeIndex}
                          </p> */}

                          {/* inner styles have another styles array */}

                          {innerStyle.style.map((style: any, index: number) => (
                            <div
                              key={index}
                              className="space-y-2 flex justify-between items-center"
                            >
                              <p className="text-md font-semibold">
                                {index + 1} - {style.name}
                              </p>
                              {/* <p className="text-sm text-gray-500">
                                {style.key}
                              </p> */}
                              {/* <p className="text-sm text-gray-500">
                                {style.image}
                              </p> */}
                              {/* <div className="w-36 h-36">
                                <Image
                                  src={style.image}
                                  alt={style.name}
                                  height={100}
                                  width={100}
                                  className="rounded-lg"
                                />
                              </div> */}
                              {/* <p className="text-sm text-gray-500">
                                {style?.bottomKey}
                              </p> */}
                              <div className="flex gap-2">
                                {/* Delete Icon */}
                                <button
                                  type="button"
                                  onClick={() => {
                                    console.log("Deleting Style", style);
                                    console.log(mainIndex, idx, index);
                                    const updatedProduct = {
                                      ...selectedProduct,
                                    };
                                    console.log(
                                      "Updated Product",
                                      updatedProduct
                                    );

                                    // remove the style from the innerStyle using index and idx of the innerStyle
                                    updatedProduct.mainStyles[mainIndex].styles[
                                      idx
                                    ].style = updatedProduct.mainStyles[
                                      mainIndex
                                    ].styles[idx].style.filter(
                                      (s: any) => s.key !== style.key
                                    );

                                    setSelectedProduct(updatedProduct);

                                    console.log(
                                      "Updated Product",
                                      updatedProduct
                                    );
                                  }}
                                >
                                  <Trash2Icon className="mr-2" />
                                </button>

                                {/* upload assets */}
                                <button
                                  onClick={() => {
                                    setStyleMainIndex(mainIndex);
                                    setStyleIdx(idx);
                                    setStyleInnerIdx(index);
                                    setIsAssetsOpen(!isAssetsOpen);
                                  }}
                                >
                                  <UploadCloud className="mr-2" />
                                </button>
                              </div>
                            </div>
                          ))}

                          {/* add new Inner Style  */}
                          <Button
                            variant={"secondary"}
                            type="button"
                            onClick={() => {
                              setIsVariantOpen(!isVariantOpen);
                              console.log(mainIndex, idx);
                              setStyleMainIndex(mainIndex);
                              setStyleIdx(idx);
                            }}
                            className=""
                          >
                            <PlusIcon className="mr-2" />
                            Add new Variant
                          </Button>
                          <Modal
                            open={isVariantOpen}
                            setOpen={setIsVariantOpen}
                          >
                            <div className="space-y-6">
                              <div className="space-y-1">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                  id="name"
                                  name="name"
                                  // defaultValue={product?.name}
                                  placeholder="Wool Blends"
                                  onChange={handleStyleFormChange}
                                  // onChange={handleFabricFormChange}
                                  required
                                />
                              </div>

                              {/* <Select
                                value={selectedFabricValue}
                                onValueChange={setSelectedFabricValue}
                              >
                                <SelectTrigger className="">
                                  <SelectValue placeholder="Select a Fabric" />
                                </SelectTrigger>
                                <SelectContent>
                                  {fabrics.map((fabric, idx: number) => (
                                    <SelectItem key={idx} value={fabric.key}>
                                      {fabric.fabric}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select> */}

                              {/* add fabric cost field */}
                              <div className="space-y-1">
                                <Label htmlFor="inner-style-image">
                                  Style Icon Image
                                </Label>
                                <SingleImageUpload
                                  setImageUlr={setSelectedStyleImage}
                                  imageUrl={selectedStyleImage}
                                />
                              </div>
                              <div className="text-end">
                                <Button
                                  type="button"
                                  onClick={() => {
                                    console.log("Adding inner style");
                                    const updatedProduct = {
                                      ...selectedProduct,
                                    };
                                    console.log(
                                      "Updated Product",
                                      updatedProduct
                                    );

                                    console.log(mainIndex, idx);

                                    console.log(styleFormData);

                                    // add the new style to the innerStyle using index and idx of the innerStyle
                                    updatedProduct.mainStyles[
                                      styleMainIndex
                                    ].styles[styleIdx].style = [
                                      ...updatedProduct.mainStyles[
                                        styleMainIndex
                                      ].styles[styleIdx].style,
                                      {
                                        key: generateRandomKey(
                                          styleFormData.name
                                        ),
                                        name: styleFormData.name,
                                        image: selectedStyleImage,
                                      },
                                    ];

                                    console.log(updatedProduct);

                                    setSelectedProduct(updatedProduct);
                                    setIsVariantOpen(false);
                                  }}
                                >
                                  Add Variant
                                </Button>
                              </div>
                            </div>
                          </Modal>
                        </div>
                      ))}

                      <Separator className="w-full" />
                      {/* display default images */}
                      <div className="text-xl font-bold">Default Images</div>
                      <div className="space-y-4">
                        {mainStyle.defaultImages.map(
                          (imageStyle: any, index: number) => (
                            <div key={index} className="space-y-4">
                              {/* <p className="text-sm text-gray-500">
                              Image key: {imageStyle.key}
                            </p> */}

                              <div className="flex justify-between gap-4 items-center p-4 border border-primary rounded-lg">
                                <div className="h-36 w-36">
                                  <Image
                                    src={`https://res.cloudinary.com/dosndnyp5/image/upload/${selectedCategory}/${selectedProduct.name}/${selectedFabricValue}/${imageStyle.key}.png`}
                                    alt="default image"
                                    width={100}
                                    height={100}
                                  />
                                </div>
                                {/* Delete Icon */}
                                <button
                                  type="button"
                                  onClick={() => {
                                    const updatedProduct = {
                                      ...selectedProduct,
                                    };
                                    console.log(
                                      "Updated Product",
                                      updatedProduct
                                    );
                                    const updatedDefaultImages =
                                      updatedProduct.mainStyles[
                                        mainIndex
                                      ].defaultImages.filter(
                                        (img: any) => img.key !== imageStyle.key
                                      );
                                    updatedProduct.mainStyles[
                                      mainIndex
                                    ].defaultImages = updatedDefaultImages;
                                    setSelectedProduct(updatedProduct);
                                  }}
                                  className="pt-10"
                                >
                                  <Trash2Icon className="mr-2" />
                                </button>
                              </div>
                            </div>
                          )
                        )}
                      </div>

                      <div>
                        <Button
                          type="button"
                          onClick={() => {
                            setStyleMainIndex(mainIndex);
                            setIsDefaultImageOpen(!isDefaultImageOpen);
                          }}
                        >
                          Add Default Image
                        </Button>
                      </div>
                    </div>
                  </div>
                )
              )
          }
        </CardContent>
      </Card>

      <Modal open={isAssetsOpen} setOpen={setIsAssetsOpen}>
        <div className="space-y-6">
          {/* add fabric cost field */}
          <div className="space-y-1">
            <Label htmlFor="inner-style-image">Style Image</Label>
            <SingleImageUpload
              imageFolder={`${selectedCategory}/${selectedProduct?.name}/${selectedFabricValue}`}
              fileName={
                selectedProduct?.mainStyles[styleMainIndex].styles[styleIdx]
                  .style[styleInnerIdx]?.key
              }
            />
          </div>
          <div className="text-end">
            <Button
              type="button"
              onClick={() => {
                setIsAssetsOpen(false);
              }}
            >
              Add Assets
            </Button>
          </div>
        </div>
      </Modal>

      <Modal open={isDefaultImageOpen} setOpen={setIsDefaultImageOpen}>
        <div className="space-y-6">
          <div>
            <Label htmlFor="activeIndex">Default Image</Label>
            <Select
              value={selectedActiveIndex}
              onValueChange={setSelectedActiveIndex}
            >
              <SelectTrigger className="">
                <SelectValue placeholder="Select a z-index" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">0</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="30">30</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <Label htmlFor="inner-style-image">Default Image</Label>
            <SingleImageUpload
              imageFolder={`${selectedCategory}/${selectedProduct?.name}/${selectedFabricValue}/defaultImages`}
              imageUrl={selectedDefaultImage}
              setImageUlr={setSelectedDefaultImage}
              setImageFileName={setSelectedDefaultImageKey}
            />
          </div>
          <div className="text-end">
            <Button
              type="button"
              onClick={() => {
                const updatedProduct = { ...selectedProduct };
                console.log("Updated Product", updatedProduct);

                // add new default image to the mainStyle
                updatedProduct.mainStyles[styleMainIndex].defaultImages = [
                  ...updatedProduct.mainStyles[styleMainIndex].defaultImages,
                  {
                    key: `defaultImages/${selectedDefaultImageKey}`,
                    zIndex: selectedActiveIndex,
                  },
                ];
                setSelectedProduct(updatedProduct);
                setIsDefaultImageOpen(false);
              }}
            >
              Add
            </Button>
          </div>
        </div>
      </Modal>

      <div className="flex justify-end">
        <Button
          onClick={async () => {
            console.log("Updating Product", selectedProduct);

            startTransition(async () => {
              const res = await updateCustomProduct(selectedProduct, fabrics);

              if (res?.success) {
                console.log("Product Updated Successfully");
                toast({
                  title: "Product Added",
                  description: "Product has been updated successfully",
                });
                router.push("/products");
              } else {
                toast({
                  variant: "destructive",
                  title: "Uh oh! Something went wrong.",
                  description: "There was a problem with your request.",
                  action: (
                    <ToastAction altText="Try again">Try again</ToastAction>
                  ),
                });
              }
            });
          }}
          disabled={isPending}
        >
          {isPending ? "...Updating Product" : "Update Product"}
        </Button>
      </div>
    </div>
  );
}
