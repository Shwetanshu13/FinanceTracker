import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/home",
    "/profile",
    "/transactions/:path*",
    "/auth/signup",
    "/auth/login",
    "/", // Landing page for unauthenticated users
  ],
};

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const url = request.nextUrl;

  // Redirect logged-in users away from public/auth routes to "/home"
  if (
    token &&
    (url.pathname === "/" || // Landing page
      url.pathname.startsWith("/auth/signup") ||
      url.pathname.startsWith("/auth/login"))
  ) {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  // Redirect unauthenticated users trying to access protected routes
  if (
    !token &&
    (url.pathname.startsWith("/home") ||
      url.pathname.startsWith("/profile") ||
      url.pathname.startsWith("/transactions"))
  ) {
    return NextResponse.redirect(new URL("/", request.url)); // Redirect to landing page
  }

  // Allow requests to proceed for valid cases
  return NextResponse.next();
}
