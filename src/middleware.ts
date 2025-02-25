import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { me } from "./lib/auth.lib";
import { UserRoleEnum } from "./enums/common.enum";

const protectedRoutes = [
  "/languages",
  "/bibliography-types",
  "/sciences",
  "/publishers",
  "/authors",
  "/countries",
  "/employees",
  "/requests",
  "/users",
  "/loans-management",
  "/books",
];

// Helper function to check if a path is protected
function isProtectedRoute(path: string): boolean {
  return protectedRoutes.some((route) => path.startsWith(route));
}

export async function middleware(request: NextRequest) {
  const user = await me();

  const currentPath = request.nextUrl.pathname;

  if (currentPath === "/auth/signIn") {
    return NextResponse.next();
  }

  if (isProtectedRoute(currentPath) && user?.message) {
    return NextResponse.redirect(new URL("auth/signIn", request.url));
  }

  if(user?.data?.role === UserRoleEnum.USER && isProtectedRoute(currentPath)) {
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
