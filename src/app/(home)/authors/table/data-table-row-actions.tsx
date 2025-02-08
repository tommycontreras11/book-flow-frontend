"use client";

import Link from "next/link";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";
import { Eye, Pencil, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
  onEdit: (uuid: string) => void;
  onDelete: (uuid: string) => void;
}

export function DataTableRowActions<TData>({ row, onEdit, onDelete }: DataTableRowActionsProps<TData>) {
  const uuid = row.original.uuid;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex h-8 w-8 p-0 data-[state=open]:bg-muted">
          <DotsHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">{"Open Menu"}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>
          <Button
            variant={"ghost"}
            size={"sm"}
            className={"justify-start w-full"}
            onClick={() => onEdit(uuid)} // Trigger the edit action with the uuid
          >
            <Pencil className="h-4 w-4 text-green-500" />
            {<span className="ml-2">{"Update"}</span>}
          </Button>
        </DropdownMenuItem>

        <DropdownMenuItem>
          <Button
            variant={"ghost"}
            size={"sm"}
            className={"justify-start w-full"}
            onClick={() => onDelete(uuid)} // Trigger the delete action with the uuid
          >
            <Trash2 className="h-4 w-4 text-red-500" />
            {<span className="ml-2">{"Delete"}</span>}
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
