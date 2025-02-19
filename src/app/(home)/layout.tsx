import { AppSidebar } from "@/components/ui/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { IAppSidebarProps } from "@/interfaces/sidebar.interface";
import {
  Book,
  BookA,
  BookOpenCheck,
  BookType,
  BookUser,
  Building,
  Earth,
  Home,
  Languages,
  UserCog,
} from "lucide-react";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Menu items.
  const items: IAppSidebarProps[] = [
    {
      title: "Home",
      url: "/",
      icon: Home,
    },
    {
      title: "Authors",
      url: "/authors",
      icon: BookUser,
    },
    {
      title: "Books",
      url: "/books",
      icon: Book,
    },
    {
      title: "Bibliography Types",
      url: "/bibliography-types",
      icon: BookType,
    },
    {
      title: "Countries",
      url: "/countries",
      icon: Earth,
    },
    {
      title: "Languages",
      url: "/languages",
      icon: Languages,
    },
    {
      title: "Sciences",
      url: "/sciences",
      icon: BookA,
    },
    {
      title: "Employees",
      url: "/employees",
      icon: Building,
    },
    {
      title: "Users",
      url: "/users",
      icon: UserCog,
    },
    {
      title: "Loans Management",
      url: "/loans-management",
      icon: BookOpenCheck,
    },
  ];

  return (
    <SidebarProvider>
      <AppSidebar items={items} />
      <SidebarTrigger />

      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="grid auto-rows-min gap-4">{children}</div>
      </div>
    </SidebarProvider>
  );
}
