import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const admintoken = req.cookies.get("adminsessionId")?.value;
  const usertoken = req.cookies.get("usersessionId")?.value;

  if (pathname === "/errorpage") {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  if (pathname.startsWith("/dashboard") && !usertoken) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  if (pathname.startsWith("/admin") && !admintoken) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }
}

export const config = {
  matcher: ["/errorpage", "/dashboard/:path*", "/admin"],
};
