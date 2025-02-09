import { IStatusTableDefinitions } from "@/interfaces/table.interface";
import { CheckCircledIcon, CrossCircledIcon } from "@radix-ui/react-icons";

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
