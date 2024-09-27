import { NextRequest, NextResponse } from "next/server";

export const middleware = (req: NextRequest) => {
  const url = req.nextUrl;
  const token = url.searchParams.get("token");

  if (url.pathname === "/dashboard/token") {
    if (!token) {
      return NextResponse.redirect(new URL("/auth/login", url.origin));
    }

    const res = NextResponse.next();
    res.headers.set("Set-Cookie", `accessToken=${token};`);
    return res;
  }

  return NextResponse.next(); // Skip middleware if conditions are not met
};

export const config = {
  matcher: "/dashboard/token",
};