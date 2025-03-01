import { useEffect } from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { UserRoleEnum } from "@/enums/common.enum";
import { IMeUser } from "@/interfaces/auth.interface";
import { IAppSidebarProps } from "@/interfaces/sidebar.interface";
import { me } from "@/lib/auth.lib";
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
  SquareTerminal,
  UserCog,
} from "lucide-react";
import * as React from "react";
import { NavMain } from "./nav-main";
import { NavProjects } from "./nav-projects";
import { NavUser } from "./nav-user";
import { TeamSwitcher } from "./team-switcher";

// This is sample data.
const data: IAppSidebarProps = {
  projects: [
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
        userRole: UserRoleEnum.EMPLOYEE,
      },
    },
    {
      name: "Requests",
      url: "/requests",
      icon: ClipboardList,
      visibleProps: {
        bothRoles: true,
      },
    },
  ],
  navMain: [
    {
      title: "Playground",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "History",
          url: "#",
        },
        {
          title: "Starred",
          url: "#",
        },
        {
          title: "Settings",
          url: "#",
        },
      ],
    },
  ],
};
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [user, setUser] = React.useState<IMeUser>();

  useEffect(() => {
    me()
      .then((res) => setUser(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavProjects
          projects={data.projects.filter((project) =>
            !user?.uuid
              ? project.visibleProps?.default
              : project.visibleProps?.userRole == user.role ||
                project.visibleProps?.bothRoles
          )}
        />
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
