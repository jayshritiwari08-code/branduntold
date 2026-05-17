import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const isLoggedIn = !!req.auth;
  const isAdminRole = req.auth?.user?.role === "admin";

  // Protect all /admin routes except the login page
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    if (!isLoggedIn || !isAdminRole) {
      const loginUrl = new URL("/admin/login", req.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // If logged in as admin and trying to access login page, redirect to dashboard
  if (pathname === "/admin/login") {
    if (isLoggedIn && isAdminRole) {
      return NextResponse.redirect(new URL("/admin", req.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*"],
};
