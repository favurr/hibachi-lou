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

    // Check for Better Auth session cookie presence (all possible names)
    const cookieNames = [
      "session_token",
      "better-auth.session_token",
      "__secure-session_token",
      "__secure-better-auth.session_token",
      "__host-session_token",
      "__host-better-auth.session_token",
    ];

    const hasSession = cookieNames.some((name) => request.cookies.has(name));

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
