"use client";

import {
    ChevronsUpDown,
    LogOut,
    User
} from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar";
import { useRouter } from "next/navigation";

export function NavUser({
  user,
}: {
  user: {
    name: string;
    email: string;
    isUserLogged: boolean;
  };
}) {
  const { isMobile } = useSidebar();
  const router = useRouter();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger onClick={() => {}} asChild>           
            <SidebarMenuButton
              size="lg"
              className={
                user.isUserLogged
                  ? "data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                  : ""
              }
              onClick={() => {
                if(!user.isUserLogged) {
                  router.push("/auth/signIn");
                }
              }}
            >
              <Avatar className="h-8 w-8 rounded-lg">
                {user.isUserLogged ? (
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                ) : (
                  <User className="rounded-lg"></User>
                )}
              </Avatar>

              <div className={"grid flex-1 text-left text-sm leading-tight"}>
                <span className="truncate font-semibold">
                  {user.isUserLogged ? user.name : "Sign In"}
                </span>
                <span className="truncate text-xs">
                  {user.isUserLogged ? user.email : "Login to your account"}
                </span>
              </div>
              {user.isUserLogged && <ChevronsUpDown className="ml-auto" />}
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          {user.isUserLogged && (
            <DropdownMenuContent
              className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
              side={isMobile ? "bottom" : "right"}
              align="end"
              sideOffset={4}
            >
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="h-8 w-8 rounded-lg">
                    {/* <AvatarImage src={user.avatar} alt={user.name} /> */}
                    <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{user.name}</span>
                    <span className="truncate text-xs">{user.email}</span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => { router.push("/auth/signOut") }}>
                <LogOut />
                Log out
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </DropdownMenuContent>
          )}
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
