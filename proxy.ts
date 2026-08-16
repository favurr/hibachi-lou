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

    // Check for ANY session-like cookie (better-auth uses various names)
    const allCookies = request.cookies.getAll();
    const hasSession = allCookies.some((cookie) => {
      const name = cookie.name.toLowerCase();
      return (
        name.includes("session") ||
        name.includes("auth") ||
        name === "session_token"
      );
    });

    // Debug: log what cookies we see (check Vercel function logs)
    console.log("[MIDDLEWARE] Path:", pathname, "Cookies:", allCookies.map(c => c.name));

    if (!hasSession) {
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
