import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const config = {
  matcher: ["/((?!_next|favicon.ico|robots.txt|sitemap.xml).*)"]
};

export async function middleware(req: NextRequest) {
  const host = req.headers.get("host") || "";
  // Pass host through header for server components / routes to use.
  const res = NextResponse.next();
  res.headers.set("x-tenant-host", host);
  return res;
}