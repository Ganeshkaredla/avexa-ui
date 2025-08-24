import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const session = req.cookies.get("session")?.value;
  const isAuthed = session === "1";
  const { pathname } = req.nextUrl;

  // Allow Next internals and API routes to pass through
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  // If user is NOT logged in → always send them to /signin
  if (!isAuthed && pathname !== "/signin") {
    const url = req.nextUrl.clone();
    url.pathname = "/signin";
    return NextResponse.redirect(url);
  }

  // If user IS logged in and tries to access /signin → send them to /dashboard
  if (isAuthed && pathname === "/signin") {
    const url = req.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Apply middleware to all routes
export const config = {
  matcher: ["/((?!_next|favicon.ico).*)"],
};
