import { UserRoleEnum } from "@/enums/common.enum";
import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

export interface IAppSidebarProps {
  navMain: IAppSidebarNavMainItemProps[];
  navSecondary: IAppSidebarNavSecondaryItemProps[];
}

export interface IAppSidebarNavSecondaryItemProps extends IAppSidebarItemProps {
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  visibleProps?: IAppSidebarVisibleProps;
  isActive?: boolean;
  items: IAppSidebarItemProps[];
}

export interface IAppSidebarItemProps {
  title: string;
  url: string;
  visibleProps?: IAppSidebarVisibleProps;
}

export interface IAppSidebarNavMainItemProps
  extends Partial<Omit<IAppSidebarNavSecondaryItemProps, "items">> {
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  name: string;
  url: string;
}

export interface IAppSidebarUserProps {
  name: string;
  email: string;
  isUserLogged?: boolean;
}

export interface IAppSidebarVisibleProps {
  userRole?: UserRoleEnum;
  bothRoles?: boolean;
  default?: boolean;
}
