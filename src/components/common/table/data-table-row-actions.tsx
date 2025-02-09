"use client";

import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";
import { Pencil, Trash2 } from "lucide-react";

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
  const uuid = row.original?.uuid;

  if (!uuid) return null; 

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex h-8 w-8 p-0 data-[state=open]:bg-muted">
          <DotsHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open Menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => onEdit(uuid)}>
          <Pencil className="h-4 w-4 text-green-500 mr-2" />
          Update
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onDelete(uuid)}>
          <Trash2 className="h-4 w-4 text-red-500 mr-2" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
