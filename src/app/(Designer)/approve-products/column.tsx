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
import { useState, useTransition } from "react";
import { useFormState } from "react-dom";
import { approveProduct } from "@/server-actions/product";
// import { ReloadIcon } from "@radix-ui/react-icons";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Product = {
  _id: string;
  price: number;
  isPaid: boolean;
  name: string;
  userId: {
    _id: string;
    firstName: string;
    lastName: string;
    profileName: string;
  };
};

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "_id",
    header: "Product ID",
  },

  {
    accessorKey: "userId",
    header: "Designer Name",
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
    header: "Brand Name",
    cell: ({ row }) => {
      return <div>{row.original.userId.profileName}</div>;
    },
  },

  {
    accessorKey: "name",
    header: "Product Name",
  },

  {
    accessorKey: "price",
    header: () => <div className="text-right">Product Price</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("price"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },

  {
    id: "actions",
    cell: function Tablecell({ row }) {
      const payment = row.original;
      const id = row.original._id;
      const [isOpen, setIsOpen] = useState(false);
      const [isAlertOpen, setIsAlertOpen] = useState(false);

      const [state, formAction] = useFormState(approveProduct, null);
      const [isPending, startTransition] = useTransition();

      const handleDeliver = async () => {
        const formData = new FormData();
        formData.append("productId", id);
        startTransition(() => {
          formAction(formData);
        });
      };
      return (
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="min-w-16 outline-none">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => setIsAlertOpen(!isAlertOpen)}>
                Approve
              </DropdownMenuItem>
              {/* <DropdownMenuSeparator /> */}

              {/* <DropdownMenuItem>View payment details</DropdownMenuItem> */}
            </DropdownMenuContent>
          </DropdownMenu>
          <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently approve
                  the products
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <Button
                  onClick={() => {
                    handleDeliver();
                    setIsAlertOpen(false);
                  }}
                >
                  {isPending ? <Loader2 className="h-5 w-5" /> : "Approve"}
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      );
    },
  },
];
