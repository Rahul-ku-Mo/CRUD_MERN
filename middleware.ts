import { NextRequest, NextResponse } from "next/server";

export const middleware = (req: NextRequest) => {
  const url = req.nextUrl;
  const token = url.searchParams.get("accessToken");

  if (!token || token.length !== 32) {
    // Redirect only if token is missing or invalid
    return NextResponse.redirect(new URL(url.pathname, url.origin));
  }

  const res = NextResponse.next(); // Don't redirect if token is valid
  res.headers.set(
    "Set-Cookie",
    `accessToken=${token}; Path=/; ${
      process.env.NODE_ENV === "production" ? "HttpOnly; Secure" : ""
    }`
  );
  return res;
};

export const config = {
  matcher: "/dashboard",
};
