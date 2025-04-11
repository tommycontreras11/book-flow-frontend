import { StatusEnum } from "@/enums/common.enum";
import { LoanManagementEnum } from "@/enums/loan-management.enum";
import { StatusRequestEnum } from "@/enums/request.enum";
import { IStatusTableDefinitions } from "@/interfaces/table.interface";
import { CheckCircledIcon, CrossCircledIcon } from "@radix-ui/react-icons";
import { ArrowDown, BookmarkCheck, BookOpenCheck, CircleDashed, X } from "lucide-react";

export const commonStatusTableDefinitions: IStatusTableDefinitions[] = [
  {
    value: StatusEnum.ACTIVE,
    label: "Active",
    icon: CheckCircledIcon,
  },
  {
    value: StatusEnum.INACTIVE,
    label: "Inactive",
    icon: CrossCircledIcon,
  },
];

export const requestStatusTableDefinitions: IStatusTableDefinitions[] = [
  {
    value: StatusRequestEnum.COMPLETED,
    label: "Completed",
    icon: CheckCircledIcon,
  },
  {
    value: StatusRequestEnum.BORROWED,
    label: "Borrowed",
    icon: BookmarkCheck,
  },
  {
    value: StatusRequestEnum.APPROVAL,
    label: "Approval",
    icon: BookOpenCheck,
  },
  {
    value: StatusRequestEnum.DENIED,
    label: "Denied",
    icon: X,
  },
  {
    value: StatusRequestEnum.PENDING,
    label: "Pending",
    icon: CircleDashed,
  },
];

export const loanStatusTableDefinitions: IStatusTableDefinitions[] = [
  {
    value: LoanManagementEnum.BORROWED,
    label: "Borrowed",
    icon: BookmarkCheck,
  },
  {
    value: LoanManagementEnum.RETURNED,
    label: "Returned",
    icon: ArrowDown,
  },
];
