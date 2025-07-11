import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const sessionToken = request.cookies.get("authjs.session-token");
  const isRoot = request.nextUrl.pathname === "/";

  if (sessionToken && isRoot) {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  return NextResponse.next();
}
