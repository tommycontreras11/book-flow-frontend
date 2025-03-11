import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useAuth } from "@/contexts/auth-context";
import { UserRoleEnum } from "@/enums/common.enum";
import { IAppSidebarProps } from "@/interfaces/sidebar.interface";
import {
  Book,
  BookA,
  BookOpenCheck,
  BookType,
  BookUser,
  Building,
  ClipboardList,
  Earth,
  Home,
  Languages,
  UserCog,
} from "lucide-react";
import * as React from "react";
import { NavMain } from "./nav-main";
import { NavSecondary } from "./nav-secondary";
import { NavUser } from "./nav-user";
import { TeamSwitcher } from "./team-switcher";

// This is sample data.
const data: IAppSidebarProps = {
  navMain: [
    {
      name: "Home",
      url: "/",
      icon: Home,
      isActive: true,
      visibleProps: {
        bothRoles: true,
        default: true,
      },
    },
    {
      name: "Authors",
      url: "/authors",
      icon: BookUser,
      visibleProps: {
        userRole: UserRoleEnum.EMPLOYEE,
      },
    },
    {
      name: "Books",
      url: "/books",
      icon: Book,
      visibleProps: {
        userRole: UserRoleEnum.EMPLOYEE,
      },
    },
    {
      name: "Bibliography Types",
      url: "/bibliography-types",
      icon: BookType,
      visibleProps: {
        userRole: UserRoleEnum.EMPLOYEE,
      },
    },
    {
      name: "Countries",
      url: "/countries",
      icon: Earth,
      visibleProps: {
        userRole: UserRoleEnum.EMPLOYEE,
      },
    },
    {
      name: "Languages",
      url: "/languages",
      icon: Languages,
      visibleProps: {
        userRole: UserRoleEnum.EMPLOYEE,
      },
    },
    {
      name: "Sciences",
      url: "/sciences",
      icon: BookA,
      visibleProps: {
        userRole: UserRoleEnum.EMPLOYEE,
      },
    },
    {
      name: "Employees",
      url: "/employees",
      icon: Building,
      visibleProps: {
        userRole: UserRoleEnum.EMPLOYEE,
      },
    },
    {
      name: "Users",
      url: "/users",
      icon: UserCog,
      visibleProps: {
        userRole: UserRoleEnum.EMPLOYEE,
      },
    },
    {
      name: "Loans Management",
      url: "/loans-management",
      icon: BookOpenCheck,
      visibleProps: {
        userRole: UserRoleEnum.USER,
      },
    },
  ],
  navSecondary: [
    {
      title: "Requests",
      url: "#",
      icon: ClipboardList,
      visibleProps: {
        bothRoles: true,
      },
      items: [
        {
          title: "Manage",
          url: "/requests/manage",
          visibleProps: {
            userRole: UserRoleEnum.EMPLOYEE,
          },
        },
        {
          title: "Requests",
          url: "/requests",
          visibleProps: {
            bothRoles: true,
          },
        },
      ],
    },
  ],
};
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user, isLoggedIn } = useAuth();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavMain
          items={data.navMain.filter((nav) =>
            !user?.uuid
              ? nav.visibleProps?.default
              : nav.visibleProps?.userRole == user.role ||
                nav.visibleProps?.bothRoles
          )}
        />
        {isLoggedIn && (
          <NavSecondary
            items={data.navSecondary.filter((nav) =>
              !user?.uuid
                ? nav.visibleProps?.default
                : nav.visibleProps?.userRole == user.role ||
                  nav.visibleProps?.bothRoles
            )}
          />
        )}
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
