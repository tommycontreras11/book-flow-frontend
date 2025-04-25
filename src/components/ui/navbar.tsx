"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useAuth } from "@/contexts/auth-context";
import { UserRoleEnum } from "@/enums/common.enum";
import { cn } from "@/lib/utils";
import {
  Book,
  BookUser,
  ClipboardList,
  Library,
  LogIn,
  NotepadText,
  User,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useMemo } from "react";

export default function Navbar() {
  const { isLoggedIn, user } = useAuth();

  const isEmployee = useMemo(
    () => user?.role === UserRoleEnum.EMPLOYEE,
    [user]
  );

  const pathname = usePathname();
  const router = useRouter();

  const navigation = [
    { name: "Explore", href: "/", icon: Book },
    { name: "My Books", href: "/my-books", icon: BookUser },
    { name: "My Requests", href: "/my-requests", icon: ClipboardList },
    ...(isEmployee ? [{ name: "Management", href: "/admin", icon: NotepadText }] : []),
  ];

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4 max-w-7xl mx-auto">
        <Link href="/" className="flex items-center gap-2 mr-6">
          <Library className="h-6 w-6" />
          <span className="text-xl font-semibold">BookFlow</span>
        </Link>
        <nav className="flex items-center gap-4 flex-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-colors",
                pathname === item.href
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <User className="h-4 w-4" />
                <span className="sr-only">Open user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">Account</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    Manage your account
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem
                  onClick={() =>
                    router.push(
                      `${isLoggedIn ? "/auth/sign-out" : "/auth/sign-in"}`
                    )
                  }
                >
                  <LogIn className="mr-2 h-4 w-4" />
                  <span>{isLoggedIn ? "Sign Out" : "Sign In"}</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
