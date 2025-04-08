"use client";

import { ColumnDef } from "@tanstack/react-table";
import clsx from "clsx";

import { DataTableColumnHeader } from "@/components/common/table/data-table-column-header";
import { DataTableRowActions } from "@/components/common/table/data-table-row-actions";
import { loanStatusTableDefinitions } from "@/definitions/common.definition";
import { LoanManagementEnum } from "@/enums/loan-management.enum";
import { ILoanManagement } from "@/providers/http/loans-management/interface";

// Pass `handleUpdate` and `handleDelete` as props to columns
export const columns = ({
  handleUpdate,
  handleDelete,
}: {
  handleUpdate: (uuid: string) => void;
  handleDelete: (uuid: string) => void;
}): ColumnDef<ILoanManagement>[] => [
  {
    accessorKey: "loan_number",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={"Number"} />
    )
  },
  {
    accessorKey: "date_loan",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={"Date Loan"} />
    ),
  },
  {
    accessorKey: "date_return",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={"Date Return"} />
    ),
  },
  {
    accessorKey: "amount_day",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={"Amount Days"} />
    ),
  },
  {
    accessorKey: "quantity_day",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={"Quantity Days"} />
    ),
  },
  {
    accessorKey: "comment",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={"Comment"} />
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={"Status"} />
    ),
    cell: ({ row }) => {
      const status = loanStatusTableDefinitions.find(
        (status) => status.value === row.getValue("status")
      );
      if (!status) {
        return null;
      }
      return (
        <div
          className={clsx("flex w-[100px] items-center", {
            "text-blue-500": status.value === LoanManagementEnum.BORROWED,
            "text-green-500": status.value === LoanManagementEnum.RETURNED,
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
