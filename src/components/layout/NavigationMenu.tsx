"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
// import { Icons } from "@/components/icons";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Package2 } from "lucide-react";
import CustomSheet from "../common/CustomSheet";

const components: {
  name: string;
  products: string;
  link: string;
  icon: string;
}[] = [
  {
    name: "Designer",
    products: "8.2k",
    icon: "⭐",
    link: "/designers",
  },
  {
    name: "Suits",
    products: "8.9k",
    icon: "⚡",
    link: `/search/?category=${encodeURIComponent(JSON.stringify(["suits"]))}`,
  },
  {
    name: "T shirts",
    products: "18.2k",
    icon: "👕",
    link: `/search/?category=${encodeURIComponent(
      JSON.stringify(["t shirts"])
    )}`,
  },
  {
    name: "Trousers",
    products: "4.1k",
    icon: "🌿",
    link: `/search/?category=${encodeURIComponent(
      JSON.stringify(["trousers"])
    )}`,
  },
  {
    name: "Clothing",
    products: "22.9k",
    icon: "👜",
    link: `/search/?category=${encodeURIComponent(
      JSON.stringify(["clothing"])
    )}`,
  },

  {
    name: "Shop All Products",
    products: "12.8k",
    icon: "📘",
    link: `/search`,
  },

  // {
  //   name: "Custom Jeans",
  //   products: "12.8k",
  //   icon: "📘",
  //   link: `/search/?category=${encodeURIComponent(
  //     JSON.stringify(["custom jeans"])
  //   )}`,
  // },
];

export default function CustomNavigationMenu() {
  return (
    <NavigationMenu className="z-50">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className=" w-[120px] sm:w-[156px] font-bold">
            Category
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {components.map((component) => (
                <ListItem
                  key={component.name}
                  title={component.name}
                  href={component.link}
                >
                  {/* {component.icon} */}
                </ListItem>
              ))}
              <div className="pl-2 pt-1">{/* <CustomSheet /> */}</div>
              {/* <div className="pl-2 pt-3">
                <Link href="/search">Shop All Products</Link>
              </div> */}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem></NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
