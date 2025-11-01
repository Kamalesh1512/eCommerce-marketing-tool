import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export const runtime = "nodejs"; 

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = request.nextUrl;

  // Public routes that don't require authentication
  const publicRoutes = [
    "/",
    "/login",
    "/signup",
    "/forgot-password",
    "/reset-password",
    "/api/auth/signup",
    "/api/auth/verify-email",
    "/api/auth/forgot-password",
    "/api/auth/reset-password",
  ];

  const isPublicRoute = publicRoutes.some((route) => pathname.startsWith(route));
  const isAuthenticated = !!token;

  // Redirect unauthenticated users from protected routes
  if (!isAuthenticated && !isPublicRoute) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isAuthenticated) {
    // Redirect authenticated users away from auth pages
    if (pathname === "/login" || pathname === "/signup") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    // Redirect to onboarding if brand profile not completed
    if (!token.hasCompletedOnboarding && pathname !== "/onboarding" && !pathname.startsWith("/api")) {
      return NextResponse.redirect(new URL("/onboarding", request.url));
    }

    // Redirect to dashboard if trying to access onboarding with completed profile
    if (token.hasCompletedOnboarding && pathname === "/onboarding") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
