"use client";

import { ColumnDef } from "@tanstack/react-table";
import clsx from "clsx";

import { DataTableColumnHeader } from "@/components/common/table/data-table-column-header";
import { DataTableRowActions } from "@/components/common/table/data-table-row-actions";
import { commonStatusTableDefinitions } from "@/definitions/common.definition";
import { StatusEnum } from "@/enums/common.enum";
import { IBook } from "@/providers/http/books/interface";

// Pass `handleUpdate` and `handleDelete` as props to columns
export const columns = ({
  handleUpdate,
  handleDelete,
}: {
  handleUpdate: (uuid: string) => void;
  handleDelete: (uuid: string) => void;
}): ColumnDef<IBook>[] => [
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
    accessorKey: "topographicalSignature",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={"Topographical Signature"} />
    ),
  },
  {
    accessorKey: "isbn",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={"Isbn"} />
    ),
  },
  {
    accessorKey: "publishedDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={"Published Date"} />
    ),
  },
  {
    accessorKey: "bibliographyType.name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={"Bibliography Type"} />
    ),
  },
  {
    accessorKey: "publisher.name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={"Publisher"} />
    ),
  },
  {
    accessorKey: "language.name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={"Language"} />
    ),
  },
  {
    accessorKey: "science.name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={"Science"} />
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
