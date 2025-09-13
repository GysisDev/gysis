import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware((_auth, req: NextRequest) => {
  const host = req.headers.get("host") || "";
  // Pass host through header for server components / routes to use.
  const res = NextResponse.next();
  res.headers.set("x-tenant-host", host);
  return res;
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};