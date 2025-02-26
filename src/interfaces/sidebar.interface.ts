import { UserRoleEnum } from "@/enums/common.enum";
import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

export interface IAppSidebarProps {
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  visibleProps?: IAppSidebarVisibleProps;
  items?: IAppSidebarItemProps[];
}

export interface IAppSidebarItemProps {
  title: string;
  url: string;
  visibleProps?: IAppSidebarVisibleProps;
}

export interface IAppSidebarUserProps {
  name: string;
  email: string;
  isUserLogged?: IAppSidebarVisibleProps;
}

export interface IAppSidebarVisibleProps {
  userRole?: UserRoleEnum;
  bothRoles?: boolean;
  default?: boolean;
}
