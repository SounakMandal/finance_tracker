"use client";

import { ChangeEvent, useState } from 'react';
import { DataTable, DataTablePagination } from '@/components/wrapper/table';
import {
  type ColumnDef,
  ColumnFiltersState,
  SortingState,
  type TableOptions,
  VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { type Expense } from '@/interface/expense';

interface TransactionsTableProps extends Partial<Omit<TableOptions<Expense>, 'data' | 'columns'>> {
  data: Expense[];
  columns: ColumnDef<Expense>[];
}

export function TransactionsTable({ data, columns, ...rest }: TransactionsTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  // const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  // const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  // const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    // onColumnFiltersChange: setColumnFilters,
    // getFilteredRowModel: getFilteredRowModel(),
    // onColumnVisibilityChange: setColumnVisibility,
    // onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      // columnFilters,
      // columnVisibility,
      // rowSelection
    },
    ...rest,
  });

  const handleFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log("Filtering email");
    table.getColumn("email")?.setFilterValue(event.target.value);
    console.log("Email filtered successfully");
  };

  return (
    <>
      <DataTable columns={ columns } table={ table } />
      <DataTablePagination table={ table } />
    </>
  );
}
