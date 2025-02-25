import { UserRoleEnum } from "@/enums/common.enum";
import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

export interface IAppSidebarProps { 
    title: string;
    url: string;
    icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
    userRole?: UserRoleEnum,
    bothRoles?: boolean;
    default?: boolean;
  }
  