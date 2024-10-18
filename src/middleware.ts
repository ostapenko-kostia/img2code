import { NextResponse, NextRequest } from "next/server";
import { Storage } from "./typing/enums";

const protectedRoutes = ["/profile"];

export default async function AuthMiddleware(req: NextRequest) {
  const refreshToken = req.cookies.get(Storage.REFRESH_TOKEN)?.value;

  if (!refreshToken && protectedRoutes.includes(req.nextUrl.pathname))
    return NextResponse.redirect(new URL("/auth", req.url));

  if (refreshToken && req.nextUrl.pathname === "/auth")
    return NextResponse.redirect(new URL("/profile", req.url));


  return NextResponse.next();
}

export const matcher = ["/:path*"];
