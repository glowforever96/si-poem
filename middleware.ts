import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const cookie =
    request.cookies.get("__Secure-authjs.session-token") ??
    request.cookies.get("authjs.session-token");
  const isRoot = request.nextUrl.pathname === "/";

  if (cookie && isRoot) {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};
