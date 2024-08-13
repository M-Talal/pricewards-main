"use client";
import React, { use, useEffect, useState } from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { ScrollArea } from "../ui/scroll-area";
import { CircleCheck, LayoutPanelLeft, User2Icon } from "lucide-react";
import CombinedImage from "./combined-image";
import { cn } from "@/lib/utils";
import CustomAccordion from "../common/CustomAccordion";
import { Accordion } from "../ui/accordion";
import { useFabric } from "@/context/fabric-wrapper";
import FabricCard from "../card/FabricCard";

// neck_single_breasted+buttons_2+lapel_medium+style_lapel_notch

type StyleObject = {
  [key: string]: {
    name: string;
    key: string;
    image: string;
    bottomKey?: string;
    zIndex?: number;
  };
};

const getFirstActiveStyle = (category: any) =>
  category.find((style: any) => style.active);

export default function CustomSuiting({ productData }: { productData: any }) {
  const pathName = usePathname();
  const custom_clothing_categories = productData;
  console.log(custom_clothing_categories);
  //   const searchParams = useSearchParams();
  //   const step = searchParams.get("step");

  const [step, setStep] = useState("fabric");
  const [index, setIndex] = useState(0);
  const [fabricIndex, setFabricIndex] = useState(0);
  const [selectedStyles, setSelectedStyles] = useState<any>({});
  const [selectedAllStyles, setSelectedAllStyles] = useState<any>({});
  const [selectedImages, setSelectedImages] = useState<any>([]);
  const { selectedFabrics, setSelectedFabrics, goToNextPage } = useFabric();

  useEffect(() => {
    if (custom_clothing_categories.mainStyles.length === 0) {
      return;
    }
    const product = custom_clothing_categories.mainStyles
      ? custom_clothing_categories.mainStyles[index].styles
      : [];

    const initialSelectedStyles: StyleObject = product.reduce(
      (acc: any, category: any) => {
        const key = category.name;
        acc[key] = {
          ...category.style[category.activeIndex],
          zIndex: category.zIndex,
        };
        return acc;
      },
      {} as StyleObject
    );

    console.log("initialSelectedStyles", initialSelectedStyles);

    setSelectedStyles(initialSelectedStyles);
    setSelectedAllStyles((prevState: any) => ({
      ...prevState,
      ...initialSelectedStyles,
    }));
    // setSelectedFabric Style
    setSelectedFabrics({
      fabric: custom_clothing_categories.fabrics[fabricIndex]?.fabric,
      color: custom_clothing_categories.fabrics[fabricIndex]?.color,
      key: custom_clothing_categories.fabrics[fabricIndex]?.key,
      image: custom_clothing_categories.fabrics[fabricIndex]?.image,
      cost: custom_clothing_categories.fabrics[fabricIndex]?.cost,
      style: initialSelectedStyles,
    });
  }, [index]);

  useEffect(() => {
    if (Object.keys(selectedStyles).length === 0) {
      return;
    }

    if (custom_clothing_categories.mainStyles.length === 0) {
      return;
    }

    console.log("selectedFabrics", selectedFabrics);
    console.log("selectedStyles", selectedStyles);
    console.log("selectedAllStyles", selectedAllStyles);

    const combineArray: any = custom_clothing_categories.mainStyles[index]
      .stylesCombined
      ? custom_clothing_categories.mainStyles[index].stylesCombined
      : [];

    if (combineArray?.length !== 0) {
      // extract style selected key, selected lapel and selected width from selectedStyles and combine them to form a key
      const combineSelected: any = combineArray.reduce(
        (acc: any, category: any) => {
          const selectedStyle = selectedStyles[category];
          if (selectedStyle) {
            // combine selected styles to form a key
            acc = {
              key: `${acc.key ? acc.key + "_" : ""}${selectedStyle.key}`,
              zIndex: selectedStyle.zIndex,
            };
          }
          return acc;
        },
        {} as any // Add type annotation here
      );

      console.log("newSlectedStyles", combineSelected);
      console.log(selectedStyles);
      // remove all the combine array objects from the selectedStyles
      const newSelectedStyles = Object.keys(selectedStyles).reduce(
        (acc: any, category: any) => {
          if (!combineArray.includes(category)) {
            acc[category] = selectedStyles[category];
          }
          return acc;
        },
        {} as any // Add type annotation here
      );

      console.log("newSelectedStyles", newSelectedStyles);

      const selectedImages = Object.keys(newSelectedStyles).map((key: any) => {
        return {
          key: selectedStyles[key]?.key,
          zIndex: selectedStyles[key]?.zIndex,
        };
      });

      if (combineSelected) {
        console.log(combineSelected);
        selectedImages.push({
          key: combineSelected.key,
          zIndex: combineSelected.zIndex,
        });
      }

      setSelectedImages(selectedImages as any);
    } else {
      setSelectedImages(
        Object.keys(selectedStyles).map((key: any) => {
          return {
            key: selectedStyles[key]?.key,
            zIndex: selectedStyles[key]?.zIndex,
          };
        }) as any
      );
    }

    const selectedBottomKey = Object.keys(selectedStyles).map((key: any) => {
      if (selectedStyles[key]?.bottomKey) {
        setSelectedImages((prevState: any) => [
          ...prevState,
          {
            key: selectedStyles[key]?.bottomKey,
            zIndex: selectedStyles[key]?.zIndex,
          },
        ]);
      }
    });

    if (selectedBottomKey.length) {
      console.log("selectedBottomKey", selectedBottomKey);
    }
  }, [selectedStyles]);

  const handleStyleChange = (key: any, newStyle: any, zIndex: any) => {
    console.log(key);
    console.log(newStyle);

    setSelectedStyles((prevSelectedStyles: any) => {
      console.log("Previous selectedStyles:", prevSelectedStyles);
      // Update logic for selectedStyles
      const updatedSelectedStyles = {
        ...prevSelectedStyles,
        [key]: { ...newStyle, zIndex },
      };

      console.log("Updated selectedStyles:", updatedSelectedStyles);
      return updatedSelectedStyles;
    });

    setSelectedAllStyles((prevState: any) => ({
      ...prevState,
      [key]: { ...newStyle, zIndex },
    }));

    setSelectedFabrics((prevSelectedFabrics: any) => ({
      ...prevSelectedFabrics,
      style: {
        ...selectedAllStyles,
        [key]: { ...newStyle, zIndex },
      },
    }));
  };

  const handleIndex = (idx: any) => {
    console.log("idx", idx);
    setIndex(idx);
  };

  return (
    <div className="grid lg:grid-cols-12 gap-2">
      {/* right panel: fabric, style */}
      <ScrollArea className="max-lg:order-last h-52 lg:h-screen lg:w-full lg:col-span-3 pt-4 px-6">
        {step === "style" && (
          <Accordion
            type="single"
            collapsible
            className="w-full"
            defaultValue={`item-${index + 1}`}
          >
            {custom_clothing_categories.mainStyles.map(
              (style: any, idx: any) => {
                const data = style.styles;
                console.log(data);
                return (
                  <CustomAccordion
                    key={`item-${idx + 1}`}
                    idx={`item-${idx + 1}`}
                    title={style.title}
                    handleAccordion={() => handleIndex(idx)}
                  >
                    <ScrollArea className="h-[70vh]">
                      <div className="space-y-8">
                        {data.map((category: any, index: any) => {
                          return (
                            <div key={index} className="">
                              <h2 className="py-2">{category.name} </h2>
                              <div className="grid gap-3 grid-cols-3">
                                {data[index].style.map(
                                  (styl: any, idx: any) => {
                                    console.log(category);
                                    return (
                                      <button
                                        onClick={() =>
                                          handleStyleChange(
                                            category?.name,
                                            styl,
                                            category.zIndex
                                          )
                                        }
                                        key={idx}
                                        className={`flex flex-col space-y-2`}
                                        // disabled={!style.active}
                                      >
                                        <div
                                          className={`relative ${
                                            selectedAllStyles?.[category?.name]
                                              ?.key === styl?.key &&
                                            "border-[2px] p-2 border-green-600"
                                          } `}
                                        >
                                          {/* {selectedAllStyles?.[category?.name]
                                            ?.key === styl?.key && (
                                            <CircleCheck
                                              className={`absolute -top-4 right-1/2 w-4 h-4  ${"text-green-500"}`}
                                            />
                                          )} */}
                                          <Image
                                            src={styl.image}
                                            alt="This is an icon image"
                                            height={500}
                                            width={500}
                                            className="h-20 w-20"
                                          />
                                        </div>

                                        <p className="text-muted-foreground text-start text-sm max-w-20">
                                          {styl.name}
                                        </p>
                                      </button>
                                    );
                                  }
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </ScrollArea>
                  </CustomAccordion>
                );
              }
            )}
          </Accordion>
        )}

        {step === "fabric" && (
          <div>
            <div className="grid gap-3 sm:grid-cols-2">
              {custom_clothing_categories.fabrics.map(
                (category: any, idx: any) => (
                  <div
                    key={idx}
                    className="cursor-pointer"
                    onClick={() => {
                      // setSelectedFabric(category);
                      console.log(selectedFabrics);
                      // setSelectedFabricIndex(idx);
                      setFabricIndex(idx);
                      setSelectedFabrics((prevSelectedFabrics: any) => ({
                        ...prevSelectedFabrics,
                        fabric: category.fabric,
                        color: category.color,
                        key: category.key,
                        image: category.image,
                        cost: category.cost,
                        style: selectedStyles,
                      }));
                    }}
                  >
                    <FabricCard
                      title={category.fabric}
                      image={category.image}
                      color={category.color}
                      price={category.cost}
                    />
                  </div>
                )
              )}
            </div>
          </div>
        )}
      </ScrollArea>

      {/* right panel image section */}
      <div className="lg:col-span-9 bg-[#F5F4F3] lg:h-svh h-[700px] lg:justify-between px-4 flex max-sm:flex-col max-sm:flex-wrap items-center ">
        <div className="pb-20 flex flex-col space-y-4 h-full justify-center">
          <button
            onClick={() => setStep("fabric")}
            className="max-w-20 flex items-center justify-center flex-col"
          >
            <Image
              src="https://res.cloudinary.com/ddmxsbxn6/image/upload/v1719622887/fabric_wloiq6.svg"
              alt="fabric"
              width={30}
              height={30}
              className="rounded-lg"
            />
            <p className="">Fabric</p>
          </button>
          <button
            onClick={() => setStep("style")}
            className="max-w-20 flex items-center justify-center flex-col"
          >
            <Image
              src="https://res.cloudinary.com/ddmxsbxn6/image/upload/v1719622887/style_vfg9ny.svg"
              alt="fabric"
              width={30}
              height={30}
              className="rounded-lg"
            />
            <p className="">Style</p>
          </button>
        </div>

        <div>
          {custom_clothing_categories.mainStyles.length !== 0 && (
            <CombinedImage
              images={[
                ...selectedImages,
                ...custom_clothing_categories.mainStyles[index].defaultImages,
              ]}
              bgImages={custom_clothing_categories.mainStyles[index].bgImages}
              category={custom_clothing_categories.category.toLowerCase()}
              name={custom_clothing_categories.name.toLowerCase()}
              fabricKey={selectedFabrics.key}
            />
          )}
        </div>

        {/* display initial selected style */}

        <div className="pb-20 space-y-4">
          {productData?.mainStyles?.length > 0 &&
            productData?.fabrics?.length > 0 && (
              <>
                <h1 className="text-4xl font-semibold max-w-54">
                  Your
                  <br />
                  {productData?.name}
                </h1>
                <p className="text-muted-foreground text-3xl text-end">
                  {selectedFabrics.cost}
                </p>
                <Button asChild>
                  <Link
                    href={`/measurement?id=${custom_clothing_categories?._id}`}
                  >
                    Next
                  </Link>
                </Button>
              </>
            )}
        </div>
      </div>
    </div>
  );
}
