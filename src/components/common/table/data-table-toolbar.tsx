"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { IStatusTableDefinitions } from "@/interfaces/table.interface";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { DataTableViewOptions } from "./data-table-view-options";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  definitions: IStatusTableDefinitions[];
}

const verifyIfColumnExists = (table: Table<any>, column: string): boolean => {
  return !!table.getAllColumns().find((col) => col.id === column);
};

export function DataTableToolbar<TData>({
  table,
  definitions,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  const nameColumn = verifyIfColumnExists(table, "name") ? table?.getColumn("name") : null;

  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        {nameColumn && (
          <Input
            placeholder={"Filter"}
            value={(nameColumn?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              nameColumn?.setFilterValue(event.target.value)
            }
            className="h-8 w-[150px] lg:w-[250px]"
          />
        )}

          <DataTableFacetedFilter
            column={table?.getColumn("status")}
            title={"Status"}
            options={definitions}
          />
        

        {isFiltered && (
          <Button
            variant="outline"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            {"Clean Filters"}
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
