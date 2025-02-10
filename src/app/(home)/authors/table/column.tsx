"use client";

import { ColumnDef } from "@tanstack/react-table";
import clsx from "clsx";

import { IAuthor } from "@/interfaces/author.interface";
import { StatusEnum } from "@/enums/common.enum";
import { commonStatusTableDefinitions } from "@/definitions/common.definition";
import { DataTableColumnHeader } from "@/components/common/table/data-table-column-header";
import { DataTableRowActions } from "@/components/common/table/data-table-row-actions";

// Pass `handleUpdate` and `handleDelete` as props to columns
export const columns = ({
  handleUpdate,
  handleDelete,
}: {
  handleUpdate: (uuid: string) => void;
  handleDelete: (uuid: string) => void;
}): ColumnDef<IAuthor>[] => [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={"Name"} />
    ),
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue("name")}</div>;
    },
  },
  {
    accessorKey: "birthCountryName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={"Birth Country"} />
    ),
  },
  {
    accessorKey: "nativeLanguageDescription",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={"Native Language"} />
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={"Status"} />
    ),
    cell: ({ row }) => {
      const status = commonStatusTableDefinitions.find(
        (status) => status.value === row.getValue("status")
      );
      if (!status) {
        return null;
      }
      return (
        <div
          className={clsx("flex w-[100px] items-center", {
            "text-red-500": status.value === StatusEnum.INACTIVE,
            "text-green-500": status.value === StatusEnum.ACTIVE,
          })}
        >
          {status.icon && (
            <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{status.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <DataTableRowActions
        row={row}
        onEdit={handleUpdate}
        onDelete={handleDelete}
      />
    ),
  },
];
