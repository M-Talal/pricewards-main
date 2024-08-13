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
export type Order = {
  _id: string;
  totalPrice: number;
  isPaid: boolean;
  userId: {
    _id: "667a5ebfbcdca4200b6b715a";
    firstName: "rizwan";
    lastName: "test";
    profileName: "John Doe";
  };
};

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "_id",
    header: "Order ID",
  },

  {
    accessorKey: "userId",
    header: "Customer Name",
    cell: ({ row }) => {
      return (
        <div>
          {row.original.userId.firstName} {row.original.userId.lastName}
        </div>
      );
    },
  },

  {
    accessorKey: "userId",
    header: "Customer Name",
    cell: ({ row }) => {
      return (
        <div>
          {row.original.userId.firstName} {row.original.userId.lastName}
        </div>
      );
    },
  },

  {
    accessorKey: "totalPrice",
    header: () => <div className="text-right">Order Price</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("totalPrice"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },

  {
    accessorKey: "isPaid",
    header: "Order Status",
    cell: ({ row }) => {
      return <div>{row.original.isPaid ? "Paid" : "Not Paid"}</div>;
    },
  },
  // {
  //   id: "actions",
  //   cell: ({ row }) => {
  //     const payment = row.original;
  //     const id = row.original._id;

  //     return (
  //       <DropdownMenu>
  //         <DropdownMenuTrigger asChild>
  //           <Button variant="ghost" className="min-w-16 outline-none">
  //             <span className="sr-only">Open menu</span>
  //             <MoreHorizontal className="h-4 w-4" />
  //           </Button>
  //         </DropdownMenuTrigger>
  //         <DropdownMenuContent align="end">
  //           <DropdownMenuLabel>Actions</DropdownMenuLabel>
  //           <DropdownMenuItem>
  //             <Link href={`/products/edit-product/${id}`}>Edit</Link>
  //           </DropdownMenuItem>
  //           {/* <DropdownMenuSeparator /> */}
  //           <DropdownMenuItem>Delete</DropdownMenuItem>
  //           {/* <DropdownMenuItem>View payment details</DropdownMenuItem> */}
  //         </DropdownMenuContent>
  //       </DropdownMenu>
  //     );
  //   },
  // },
];
