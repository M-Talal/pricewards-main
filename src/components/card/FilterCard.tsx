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
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import Link from "next/link";
import { useFilter } from "@/context/filter-wrapper";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Category = [
  {
    title: "Clothing",
    value: "clothing",
  },
  {
    title: "T shirts",
    value: "t shirts",
  },
  {
    title: "Trousers",
    value: "trousers",
  },
  {
    title: "Suits",
    value: "suits",
  },
  {
    title: "Custom Jeans",
    value: "custom jeans",
  },
];

export default function FilterCard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathName = usePathname();

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  useEffect(() => {
    const currentParams = new URLSearchParams(searchParams.toString());
    const categories = currentParams.get("category");
    setSelectedCategories(JSON.parse(categories || "[]"));
  }, [searchParams]);

  const handleCategoryChange = (categoryValue: string) => {
    console.log("categoryValue", categoryValue);
    const updatedCategories = selectedCategories.includes(categoryValue)
      ? selectedCategories.filter((cat) => cat !== categoryValue)
      : [...selectedCategories, categoryValue];
    setSelectedCategories(updatedCategories);

    const currentParams = new URLSearchParams(searchParams.toString());

    if (updatedCategories.length > 0) {
      currentParams.set("category", JSON.stringify(updatedCategories));
    } else {
      currentParams.delete("category");
    }
    router.push(`${pathName}?${currentParams.toString()}`);
  };

  const clearPriceFilter = () => {
    const currentParams = new URLSearchParams(searchParams.toString());
    currentParams.delete("minPrice");
    currentParams.delete("maxPrice");
    router.push(`${pathName}?${currentParams.toString()}`);
  };

  const handlePriceRangeChange = (minPrice: string, maxPrice: string) => {
    console.log("minPrice", minPrice);
    console.log("maxPrice", maxPrice);
    const currentParams = new URLSearchParams(searchParams.toString());
    currentParams.set("minPrice", minPrice);
    currentParams.set("maxPrice", maxPrice);
    router.push(`${pathName}?${currentParams.toString()}`);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-bold">Filter Option</CardTitle>
        {/* <CardDescription>Card Description</CardDescription> */}
        <div className="pt-2">
          <Separator className="" />
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="space-y-3">
          <Accordion type="single" defaultValue="category" collapsible>
            <AccordionItem value="category">
              <AccordionTrigger className="hover:no-underline text-lg font-semibold mb-1">
                Category
              </AccordionTrigger>
              <AccordionContent className="space-y-3">
                {Category.map((category, index) => (
                  <div key={index} className="flex gap-2 items-center">
                    <Checkbox
                      id={category.title}
                      checked={selectedCategories.includes(category.value)}
                      name={category.value}
                      onClick={() => handleCategoryChange(category.value)}
                    />
                    <Label
                      htmlFor={category.title}
                      className="text-muted-foreground"
                    >
                      {category.title}
                    </Label>
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="price">
              <AccordionTrigger className="hover:no-underline text-lg font-semibold mb-1">
                <div className="flex gap-4 justify-between">
                  <h3 className="">Price Range</h3>
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-3">
                <button
                  onClick={() => clearPriceFilter()}
                  className="flex items-center gap-1 justify-center "
                >
                  <X className="h-5 w-5 text-center pt-1" />{" "}
                  <span className="text-sm">clear</span>
                </button>
                <div className="flex flex-col space-y-2 max-w-32">
                  <button
                    className="border px-4 py-1 font-bold rounded-xl border-muted-foreground"
                    onClick={() => handlePriceRangeChange("0", "200")}
                  >
                    $0 - $200
                  </button>
                  <button
                    className="border px-4 py-1 rounded-xl border-muted-foreground"
                    onClick={() => handlePriceRangeChange("200", "500")}
                  >
                    $200 - $500
                  </button>
                  <button
                    className="border px-4 py-1 rounded-xl border-muted-foreground"
                    onClick={() => handlePriceRangeChange("500", "1500")}
                  >
                    $500 - $1500
                  </button>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </CardContent>
      {/* <CardFooter>
        <p>Card Footer</p>
      </CardFooter> */}
    </Card>
  );
}
