"use client";
import { MenuIcon, Package2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import ProfileDropdownMenu from "../common/ProfileDropdownMenu";
import { useSession } from "../form/auth-wrapper";
import Image from "next/image";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const DASHBOARD_NAVBAR_LINKS = [
  {
    id: 1,
    name: "Products",
    href: "/products",
  },
  {
    id: 2,
    name: "Pending Orders",
    href: "/pending-orders",
  },
  {
    id: 3,

    name: "Completed Orders",
    href: "/completed-orders",
  },
  {
    id: 4,
    name: "Refunded Orders",
    href: "/refunded-orders",
  },
  {
    id: 5,
    name: "Approve Requests",
    href: "/approve-products",
    adminOnly: true,
  },
];

function NavSheet({ filteredLinks }: { filteredLinks: any[] }) {
  const pathName = usePathname();
  return (
    <Sheet>
      <SheetTrigger>
        <MenuIcon className="h-6 w-6" />
      </SheetTrigger>
      <SheetContent>
        <div className="flex flex-col space-y-10">
          {filteredLinks.map((link) => (
            <Link
              key={link.id}
              href={link.href}
              className={`${
                pathName === link.href
                  ? "text-primary font-semibold"
                  : "text-black-500 hover:text-primary "
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}

function getNavbarLinks(userType: string) {
  return DASHBOARD_NAVBAR_LINKS.filter((link) => {
    if (link.adminOnly) {
      return userType === "admin";
    }
    return true;
  });
}

export default function DashboardNavbar() {
  const pathName = usePathname();
  const session = useSession();
  console.log(session?.user?.role);

  const filteredLinks = getNavbarLinks(session?.user?.role || "");

  console.log(filteredLinks);

  return (
    <nav className="px-4 flex py-4 border-b border-muted">
      {/* Logo */}
      <div className="">
        <Link href="/" className="absolute z-30 -mt-5 top-0 left-4">
          <Image
            src="https://res.cloudinary.com/ddmxsbxn6/image/upload/v1719601380/pricewards-logo-removebg-preview_pklmye.png"
            width={200}
            height={200}
            alt="logo"
          />
          {/* <Package2 className="h-4 w-4 transition-all group-hover:scale-110" /> */}
          <span className="sr-only">Pricewards</span>
        </Link>
        {/* <h1 className="text-2xl font-bold text-black-500">Pricewards</h1> */}
      </div>

      {/* Links */}
      <div className="max-lg:hidden flex space-x-10 items-center justify-center flex-1">
        {filteredLinks.map((link) => (
          <Link
            key={link.id}
            href={link.href}
            className={`${
              pathName === link.href
                ? "text-primary font-semibold"
                : "text-black-500 hover:text-primary "
            }`}
          >
            {link.name}
          </Link>
        ))}
      </div>

      <div className="max-lg:flex-1 flex justify-end">
        <ProfileDropdownMenu />
      </div>
      <div className="lg:hidden flex items-center pl-4">
        <NavSheet filteredLinks={filteredLinks} />
      </div>
    </nav>
  );
}
