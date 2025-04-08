"use client";

import { ColumnDef } from "@tanstack/react-table";
import clsx from "clsx";

import { DataTableColumnHeader } from "@/components/common/table/data-table-column-header";
import { DataTableRowActions } from "@/components/common/table/data-table-row-actions";
import { requestStatusTableDefinitions } from "@/definitions/common.definition";
import { StatusRequestEnum } from "@/enums/request.enum";
import { IRequest } from "@/providers/http/requests/interface";

// Pass `handleUpdate` and `handleDelete` as props to columns
export const columns = ({
  handleUpdate,
  handleDelete,
}: {
  handleUpdate: (uuid: string) => void;
  handleDelete: (uuid: string) => void;
}): ColumnDef<IRequest>[] => [
  {
    accessorKey: "user.name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={"User"} />
    )
  },
  {
    accessorKey: "book.name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={"Book"} />
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={"Status"} />
    ),
    cell: ({ row }) => {
      const status = requestStatusTableDefinitions.find(
        (status) => status.value === row.getValue("status")
      );
      if (!status) {
        return null;
      }
      return (
        <div
          className={clsx("flex w-[100px] items-center", {
            "text-red-500": status.value === StatusRequestEnum.DENIED,
            "text-green-500": status.value === StatusRequestEnum.APPROVAL,
            "text-yellow-500": status.value === StatusRequestEnum.PENDING,
            "text-blue-500": status.value === StatusRequestEnum.BORROWED,
            "text-gray-500": status.value === StatusRequestEnum.COMPLETED,
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
