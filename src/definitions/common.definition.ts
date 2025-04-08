import { IStatusTableDefinitions } from "@/interfaces/table.interface";
import { CheckCircledIcon, CrossCircledIcon } from "@radix-ui/react-icons";
import { ArrowDown, BookmarkCheck, BookOpenCheck, CircleDashed, X } from "lucide-react";

export const commonStatusTableDefinitions: IStatusTableDefinitions[] = [
  {
    value: "ACTIVE",
    label: "Active",
    icon: CheckCircledIcon,
  },
  {
    value: "INACTIVE",
    label: "Inactive",
    icon: CrossCircledIcon,
  },
];

export const requestStatusTableDefinitions: IStatusTableDefinitions[] = [
  {
    value: "COMPLETED",
    label: "Completed",
    icon: CheckCircledIcon,
  },
  {
    value: "BORROWED",
    label: "Borrowed",
    icon: BookmarkCheck,
  },
  {
    value: "APPROVAL",
    label: "Approval",
    icon: BookOpenCheck,
  },
  {
    value: "DENIED",
    label: "Denied",
    icon: X,
  },
  {
    value: "PENDING",
    label: "Pending",
    icon: CircleDashed,
  },
];

export const loanStatusTableDefinitions: IStatusTableDefinitions[] = [
  {
    value: "BORROWED",
    label: "Borrowed",
    icon: BookmarkCheck,
  },
  {
    value: "RETURNED",
    label: "Returned",
    icon: ArrowDown,
  },
];
