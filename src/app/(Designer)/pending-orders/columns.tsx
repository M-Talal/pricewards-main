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
import { use, useState, useTransition } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Modal } from "@/components/common/modal";
import { useFormState } from "react-dom";
import { deliverOrder } from "@/server-actions/order";

// import { ReloadIcon } from "@radix-ui/react-icons";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

type item = {
  productId: {
    name: string;
    price: number;
    code: string;
  };
};

export type Order = {
  _id: string;
  isPaid: boolean;
  userId: {
    _id: string;
    firstName: string;
    lastName: string;
    profileName: string;
    email: string;
    phoneNumber: string;
    address: string;
  };
  items: item[];
  createdAt: string;
  paidAt: string;
  paymentMethod: string;
  totalPrice: number;
  shippingAddress: {
    address: string;
    city: string;
    postalCode: string;
    country: string;
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
    header: "Payment Status",
    cell: ({ row }) => {
      return <div>{row.original.isPaid ? "Paid" : "Not Paid"}</div>;
    },
  },
  {
    id: "actions",
    cell: function Tablecell({ row }) {
      const payment = row.original;
      const id = row.original._id;
      const [isOpen, setIsOpen] = useState(false);
      const [isAlertOpen, setIsAlertOpen] = useState(false);

      const [state, formAction] = useFormState(deliverOrder, null);
      const [isPending, startTransition] = useTransition();

      const date = new Date(row.original.paidAt);

      console.log("date", row.original.paidAt);
      const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

      const formattedDate = date.toLocaleDateString("en-US", {
        timeZone: userTimeZone || "UTC",
      });
      const formattedTime = date.toLocaleTimeString("en-US", {
        timeZone: userTimeZone || "UTC",
      });

      const handleDeliver = async () => {
        const formData = new FormData();
        formData.append("orderId", id);
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
                Deliver
              </DropdownMenuItem>
              {/* <DropdownMenuSeparator /> */}
              <DropdownMenuItem onClick={() => setIsOpen(!isOpen)}>
                view
              </DropdownMenuItem>
              {/* <DropdownMenuItem>View payment details</DropdownMenuItem> */}
            </DropdownMenuContent>
          </DropdownMenu>
          <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delivers
                  order
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <Button
                  type="button"
                  onClick={() => {
                    handleDeliver();
                    setIsAlertOpen(false);
                  }}
                >
                  {isPending ? <Loader2 className="h-5 w-5" /> : "Deliver"}
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <Modal open={isOpen} setOpen={setIsOpen}>
            <div className="p-6">
              <div className="max-w-2xl mx-auto p-6">
                <h2 className="text-2xl font-bold mb-4">Order Details</h2>
                <div className="mb-4">
                  <p>
                    <strong>Order ID:</strong> {row.original._id}
                  </p>
                  <p>
                    <strong>Customer Name:</strong>{" "}
                    {row.original.userId.firstName}{" "}
                    {row.original.userId.lastName}
                  </p>
                  <p>
                    <strong>Customer email:</strong> {row.original.userId.email}
                  </p>
                  <p>
                    <strong>Customer phone:</strong>{" "}
                    {row.original.userId.phoneNumber}
                  </p>
                  <p>
                    <strong>Address: </strong>
                    {row.original.userId.address || "No address provided"}
                  </p>
                  <p>
                    <strong>Date:</strong> {formattedDate}
                  </p>
                  <p>
                    <strong>Time:</strong> {formattedTime}
                  </p>
                </div>
                <div className="mb-4">
                  <h3 className="text-xl font-semibold mb-2">Order Items</h3>
                  {row.original.items.map((item, idx) => {
                    return (
                      <div key={idx} className="flex justify-between">
                        <p>
                          {item.productId.name} ({item.productId.code} )
                        </p>
                        <p>$ {item.productId.price}</p>
                      </div>
                    );
                  })}
                </div>
                <div className="mb-4">
                  <p>
                    <strong>Payment Method:</strong>{" "}
                    {row.original.paymentMethod}
                  </p>
                </div>
                <div>
                  <p className="text-xl font-bold">
                    <strong>Total Order Amount:</strong> ${" "}
                    {row.original.totalPrice}
                  </p>
                </div>
              </div>
            </div>
          </Modal>
        </div>
      );
    },
  },
];
