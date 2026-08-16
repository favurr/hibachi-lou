import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect admin routes
  if (pathname.startsWith("/admin")) {
    // Let login route pass through
    if (pathname === "/admin/login") {
      return NextResponse.next();
    }

    // Check for Better Auth session cookie presence
    const sessionCookie = 
      request.cookies.get("better-auth.session_token") || 
      request.cookies.get("__secure-better-auth.session_token");

    if (!sessionCookie) {
      // Redirect to login page
      const loginUrl = new URL("/admin/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
