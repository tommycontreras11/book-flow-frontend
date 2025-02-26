// "use client";

// import { AppSidebar } from "@/components/ui/app-sidebar";
// import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
// import { UserRoleEnum } from "@/enums/common.enum";
// import { IMeUser } from "@/interfaces/auth.interface";
// import { IAppSidebarProps } from "@/interfaces/sidebar.interface";
// import { me } from "@/lib/auth.lib";
// import {
//   Book,
//   BookA,
//   BookOpenCheck,
//   BookType,
//   BookUser,
//   Building,
//   ClipboardList,
//   Earth,
//   Home,
//   Languages,
//   UserCog,
// } from "lucide-react";
// import { useEffect, useState } from "react";

// export default function HomeLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   const [user, setUser] = useState<IMeUser>();

//   useEffect(() => {
//     me()
//       .then((res) => setUser(res.data))
//       .catch((err) => console.log(err));
//   }, []);

//   // Menu items.
//   const items: IAppSidebarProps[] = [
//     {
//       title: "Home",
//       url: "/",
//       icon: Home,
//       default: true,
//       bothRoles: true
//     },
//     {
//       title: "Authors",
//       url: "/authors",
//       icon: BookUser,
//       userRole: UserRoleEnum.EMPLOYEE,
//     },
//     {
//       title: "Books",
//       url: "/books",
//       icon: Book,
//       userRole: UserRoleEnum.EMPLOYEE,
//     },
//     {
//       title: "Bibliography Types",
//       url: "/bibliography-types",
//       icon: BookType,
//       userRole: UserRoleEnum.EMPLOYEE,      
//     },
//     {
//       title: "Countries",
//       url: "/countries",
//       icon: Earth,
//       userRole: UserRoleEnum.EMPLOYEE,
//     },
//     {
//       title: "Languages",
//       url: "/languages",
//       icon: Languages,
//       userRole: UserRoleEnum.EMPLOYEE,
//     },
//     {
//       title: "Sciences",
//       url: "/sciences",
//       icon: BookA,
//       userRole: UserRoleEnum.EMPLOYEE,
//     },
//     {
//       title: "Employees",
//       url: "/employees",
//       icon: Building,
//       userRole: UserRoleEnum.EMPLOYEE,
//     },
//     {
//       title: "Users",
//       url: "/users",
//       icon: UserCog,
//       userRole: UserRoleEnum.EMPLOYEE,
//     },
//     {
//       title: "Loans Management",
//       url: "/loans-management",
//       icon: BookOpenCheck,
//       userRole: UserRoleEnum.EMPLOYEE,
//     },
//     {
//       title: "Requests",
//       url: "/requests",
//       icon: ClipboardList,
//       bothRoles: true,
//     },
//   ];

//   return (
//     <SidebarProvider>
//       <AppSidebar items={items} userLogged={user} />
//       <SidebarTrigger />

//       <div className="flex flex-1 flex-col gap-4 p-4">
//         <div className="grid auto-rows-min gap-4">{children}</div>
//       </div>
//     </SidebarProvider>
//   );
// }
"use client";

import { AppSidebar } from "@/components/ui/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger
} from "@/components/ui/sidebar"

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
          </div>
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
