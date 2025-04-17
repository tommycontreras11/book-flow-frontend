import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { UserRoleEnum } from "./enums/common.enum";
import { getCookie, me } from "./lib/auth.lib";

const protectedRoutes = [
  "/admin",
  "/admin/genres",
  "/admin/languages",
  "/admin/bibliography-types",
  "/admin/sciences",
  "/admin/publishers",
  "/admin/authors",
  "/admin/countries",
  "/admin/employees",
  "/admin/users",
  "/admin/requests",
  "/requests/my-requests",
  "/admin/loans-management",
  "/loans-management/my-loans",
  "/admin/books",
];

// Helper function to check if a path is protected
function isProtectedRoute(path: string): boolean {
  return protectedRoutes.some((route) => path.startsWith(route));
}

export async function middleware(request: NextRequest) {
  const cookie = await getCookie()
  const user = cookie ? await me() : null;

  const currentPath = request.nextUrl.pathname;

  if (currentPath === "/auth/signIn") {
    return NextResponse.next();
  }

  if (isProtectedRoute(currentPath) && !user) {
    return NextResponse.redirect(new URL("auth/signIn", request.url));
  }

  let allowedRoutes = [...protectedRoutes];

  if (
    (currentPath === "/requests/my-requests" || currentPath === "/loans-management/my-loans") &&
    user?.data?.role === UserRoleEnum.USER
  ) {
    allowedRoutes = allowedRoutes.filter(
      (route) => route !== "/requests/my-requests" && route !== "/loans-management/my-loans"
    );
  }

  if (
    user?.data?.role === UserRoleEnum.USER &&
    isProtectedRoute(currentPath) &&
    !["/requests/my-requests", "/loans-management/my-loans"].includes(currentPath)
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

// Optionally, you can add a matcher to optimize performance
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
