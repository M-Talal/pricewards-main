"use client";

import { ColumnDef } from "@tanstack/react-table";
import {
  ArrowUpDown,
  Delete,
  DeleteIcon,
  Loader2,
  MoreHorizontal,
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
// import { deleteUser } from "@/actions/user";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
// import { ReloadIcon } from "@radix-ui/react-icons";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Product = {
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
  size: string[];
};

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: "Product Name",
    cell: ({ row }) => {
      const name = row.original.name;
      const pic = row.original.imageUrl[0];
      return (
        <Link href={`/dashboard/test-takers/${row.original._id}`}>
          <div className="flex items-center space-x-4">
            <Avatar className="rounded-md h-28 w-28">
              <AvatarImage
                src={pic ? pic : "https://github.com/shadcn.png"}
                alt="@shadcn"
              />
              <AvatarFallback>{name}</AvatarFallback>
            </Avatar>
            <div className="ml-2 flex-1">{name}</div>
          </div>
        </Link>
      );
    },
  },
  // {
  //   accessorKey: "email",
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant="ghost"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //       >
  //         Email
  //         <ArrowUpDown className="ml-2 h-4 w-4" />
  //       </Button>
  //     );
  //   },
  // },

  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => {
      return <div>{row.original.category}</div>;
    },
  },

  {
    accessorKey: "code",
    header: "Product Code",
  },

  {
    accessorKey: "stock",
    header: "Product Stock",
  },

  {
    accessorKey: "price",
    header: "Product Price",
  },

  // {
  //   accessorKey: "amount",
  //   header: () => <div className="text-right">Amount</div>,
  //   cell: ({ row }) => {
  //     const amount = parseFloat(row.getValue("amount"));
  //     const formatted = new Intl.NumberFormat("en-US", {
  //       style: "currency",
  //       currency: "USD",
  //     }).format(amount);

  //     return <div className="text-right font-medium">{formatted}</div>;
  //   },
  // },

  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original;
      const id = row.original._id;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="min-w-16 outline-none">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>
              <Link href={`/products/edit-product/${id}`}>Edit</Link>
            </DropdownMenuItem>
            {/* <DropdownMenuSeparator /> */}
            <DropdownMenuItem>Delete</DropdownMenuItem>
            {/* <DropdownMenuItem>View payment details</DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
