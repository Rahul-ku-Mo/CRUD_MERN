import { NextRequest, NextResponse } from "next/server";

export const middleware = (req: NextRequest) => {
  const url = req.nextUrl;
  const token = url.searchParams.get("token");

  const res = NextResponse.redirect(new URL(url.pathname, url.origin));
  res.headers.set("Set-Cookie", `accessToken=${token};`);

  return res;
};

export const config = {
  matcher: "/dashboard",
};
