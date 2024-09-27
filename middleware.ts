import { NextRequest, NextResponse } from "next/server";

export const middleware = (req: NextRequest) => {
  const url = req.nextUrl;
  const token = url.searchParams.get("token");

  if (!token) {
    return NextResponse.next(); // Skip middleware if no token
  }

  if (url.pathname.startsWith("/")) {
    return NextResponse.redirect(new URL("/auth/login", url.origin));
  }

  const res = NextResponse.redirect(new URL(url.pathname, url.origin));
  res.headers.set("Set-Cookie", `accessToken=${token};`);

  return res;
};

export const config = {
  matcher: "/dashboard",
};
