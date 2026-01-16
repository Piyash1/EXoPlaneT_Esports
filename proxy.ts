import { NextResponse, type NextRequest } from "next/server";

export default async function authMiddleware(request: NextRequest) {
  const response = await fetch(
    `${request.nextUrl.origin}/api/auth/get-session`,
    {
      headers: {
        cookie: request.headers.get("cookie") || "",
      },
    },
  );

  const session = await response.json();

  if (!session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If email is not verified, redirect to verification page (unless already there or on auth routes)
  if (
    !session.user.emailVerified &&
    !request.nextUrl.pathname.startsWith("/verify-email")
  ) {
    return NextResponse.redirect(new URL("/verify-email", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"],
};
