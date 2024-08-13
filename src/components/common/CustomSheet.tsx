import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { getCustomProductsGroupedByCategory } from "@/server-actions/product";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

// const custom_clothing_categories = [
//   {
//     text: "Suits",
//     category: [
//       {
//         title: "Tailored Suits",
//         image:
//           "https://res.cloudinary.com/ddmxsbxn6/image/upload/v1719622749/tailored_suits_sli1yl.jpg",
//         link: "/custom-clothing/suits/tailored-suits",
//       },
//     ],
//   },

//   {
//     text: "Shirts",
//     category: [
//       {
//         title: "Custom Dress Shirts",
//         image:
//           "https://res.cloudinary.com/ddmxsbxn6/image/upload/v1719624257/custom_dress_shirts_imqycu.jpg",
//         link: "/custom-clothing/shirts/custom-dress-shirt",
//       },
//     ],
//   },

//   {
//     text: "Pants",
//     category: [
//       {
//         title: "Dress Pants",
//         image:
//           "https://res.cloudinary.com/ddmxsbxn6/image/upload/v1719624425/dress_pants_wkuqgk.jpg",
//         link: "/custom-clothing/pants/dress-pant",
//       },
//     ],
//   },
//   {
//     text: "Polo Shirts",
//     category: [
//       {
//         title: "Polo Shirt",
//         image:
//           "https://res.cloudinary.com/ddmxsbxn6/image/upload/v1719842907/Polo_Shirts_fsoegt.jpg",
//         link: "/custom-clothing/polo-shirts/polo-shirt",
//       },
//     ],
//   },
// ];

export default function CustomSheet() {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedCustomCategory, setSelectedCustomCategory] = useState<any>();
  const [customProducts, setCustomProducts] = useState<any>();

  useEffect(() => {
    async function getCustomProducts() {
      const customProducts = await getCustomProductsGroupedByCategory();
      console.log(customProducts);
      if (customProducts) {
        setCustomProducts(customProducts?.groupedProducts);
        setSelectedCustomCategory(customProducts?.groupedProducts[0]);
      }
    }
    getCustomProducts();
  }, []);

  console.log(customProducts);
  console.log(selectedCustomCategory);
  return (
    <Sheet>
      <SheetTrigger className="text-sm font-medium">
        Custom suiting
      </SheetTrigger>
      <SheetContent side={"top"} className="px-4">
        <SheetHeader>
          <SheetTitle className="text-2xl md:text-3xl">
            Shop by product
          </SheetTitle>
          {/* <SheetDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </SheetDescription> */}
        </SheetHeader>

        <div className="my-5">
          <ul className="flex flex-col  md:flex-row gap-10 lg:gap-20">
            {customProducts?.map((category: any, index: number) => (
              <li key={index} className="text-xl font-semibold">
                <button
                  onClick={() => {
                    setIsOpen(true);
                    setSelectedCustomCategory(category);
                  }}
                  className={`${
                    selectedCustomCategory?._id === category._id
                      ? "border-primary border-b-2 text-primary"
                      : ""
                  }  hover:border-primary`}
                >
                  {category?._id}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {isOpen && (
          <div>
            <ul className="flex flex-wrap gap-20">
              {selectedCustomCategory?.products.map(
                (item: any, index: number) => (
                  <li key={index} className="text-center space-y-4 ">
                    <Link
                      href={`/custom-clothing/${item.category}/${item._id}`}
                      className=""
                    >
                      <Image
                        src={item.imageUrl[0]}
                        alt={item.name}
                        width={200}
                        height={200}
                        className="rounded-lg"
                      />
                    </Link>
                    <span className="">{item.name}</span>
                  </li>
                )
              )}
            </ul>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
