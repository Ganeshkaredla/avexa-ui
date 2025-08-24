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

  // If not logged in and not already on /signin → send to /signin
  if (!isAuthed && pathname !== "/signin") {
    const url = req.nextUrl.clone();
    url.pathname = "/signin";
    return NextResponse.redirect(url);
  }

  // If logged in and trying to access /signin → send to /dashboard
  if (isAuthed && pathname === "/signin") {
    const url = req.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Apply to all routes except Next internals
export const config = {
  matcher: ["/((?!_next|favicon.ico).*)"],
};
