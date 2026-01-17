import { NextResponse, type NextRequest } from "next/server";

export default async function authMiddleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const response = await fetch(
    `${request.nextUrl.origin}/api/auth/get-session`,
    {
      headers: {
        cookie: request.headers.get("cookie") || "",
      },
    },
  );

  const session = await response.json();

  // Redirect logged in users away from auth pages
  if (pathname === "/login" || pathname === "/signup") {
    if (session) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    return NextResponse.next();
  }

  // Authentication check for protected routes
  if (!session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Admin protection
  if (pathname.startsWith("/admin")) {
    if (session.user.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // Email verification check (if applicable)
  if (!session.user.emailVerified && !pathname.startsWith("/verify-email")) {
    return NextResponse.redirect(new URL("/verify-email", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*",
    "/profile/:path*",
    "/login",
    "/signup",
  ],
};
