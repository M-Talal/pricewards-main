"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logout } from "@/server-actions/auth";
import { Heart, LogOut, Mail, Phone } from "lucide-react";
import { useSession } from "../form/auth-wrapper";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";

export default function ProfileDropdownMenu() {
  const session = useSession();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={session?.user?.image || ""} />
          <AvatarFallback>
            {session.user.firstName && session.user.firstName[0]}
            {session.user.lastName && session.user.lastName[0]}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="sm:min-w-72">
        <DropdownMenuItem className="space-x-4">
          <Avatar>
            <AvatarImage src={session?.user?.image || ""} />
            <AvatarFallback>
              {session.user.firstName && session.user.firstName[0]}
              {session.user.lastName && session.user.lastName[0]}
            </AvatarFallback>
          </Avatar>

          <div>
            <p className="text-sm font-semibold">
              {session.user.firstName} {session.user.lastName} (
              {session.user.role})
            </p>
          </div>
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        <div className="py-2">
          <DropdownMenuLabel className="text-muted-foreground">
            Personal
          </DropdownMenuLabel>
          <DropdownMenuItem className="flex items-center">
            <Mail className="mr-2 h-4 w-4" />
            <p className="text-sm text-muted-foreground">
              {session.user.email}
            </p>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center">
            <Phone className="mr-2 h-4 w-4" />
            <p className="text-sm text-muted-foreground">
              {session.user.phoneNumber}
            </p>
          </DropdownMenuItem>
        </div>

        <DropdownMenuSeparator />
        <div>
          <DropdownMenuLabel className="text-muted-foreground">
            Menu
          </DropdownMenuLabel>
          <DropdownMenuItem className="">
            <Link className="flex items-center" href="/search?wishlist=true">
              <Heart className="mr-2 h-4 w-4" />
              <p className="text-sm text-muted-foreground">wishlist</p>
            </Link>
          </DropdownMenuItem>
        </div>

        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={async () => {
            await logout();
          }}
          className=""
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sign Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
