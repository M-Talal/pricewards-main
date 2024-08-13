import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decrypt } from "./lib/session";

// 1. Specify protected and public routes
const protectedRoutes = [
  "/products",
  "/pending-orders",
  "/completed-orders",
  "/refunded-orders",
];
const publicRoutes = ["/custom-clothing", "/signup", "/", "pricing", ""];
const adminROutes = ["/approve-products", "/products/edit-custom-product"];

export default async function middleware(req: NextRequest) {
  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname;
  console.log("path : ", path);
  const isProtectedRoute = protectedRoutes.includes(path);
  console.log("protected route : ", isProtectedRoute);
  const isPublicRoute = publicRoutes.includes(path);

  // 3. Decrypt the session from the cookie
  const cookie = cookies().get("session")?.value;
  const session = (await decrypt(cookie)) as any;

  console.log("session : ", session);

  // 4. Redirect
  if (isProtectedRoute && !session?.user) {
    // find search params in current url
    if (session?.user?.role === "admin" && adminROutes.includes(path)) {
      return NextResponse.next();
    }
    const searchParams = new URLSearchParams(req.nextUrl.search).toString();
    return NextResponse.redirect(new URL(`/`, req.nextUrl));
  }

  if (
    isPublicRoute &&
    (session?.user?.role === "admin" || session?.user?.role === "client")
  ) {
    return NextResponse.redirect(new URL("/products", req.nextUrl));
  }

  //   if (
  //     isPublicRoute &&
  //     session?.userId &&
  //     !req.nextUrl.pathname.startsWith("/dashboard")
  //   ) {
  //     return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  //   }

  return NextResponse.next();
}
