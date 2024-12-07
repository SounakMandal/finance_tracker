"use client";

import { ChangeEvent, useState } from 'react';
import { DataTablePagination } from '@/components/wrapper/table/pagination';
import { DataTable } from '@/components/wrapper/table/table';
import { DataTableViewOptions } from '@/components/wrapper/table/view-options';
import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { type Expense } from '@/interface/expense';
import { columns } from './columns';

export function TransactionsTable({ data }: { data: Expense[]; }) {
  const [sorting, setSorting] = useState<SortingState>([]);
  // const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  // const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  // const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    getRowId: (row: Expense) => row._id.toString(),
    getCoreRowModel: getCoreRowModel(),
    // getPaginationRowModel: getPaginationRowModel(),
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
  });

  const handleFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log("Filtering email");
    table.getColumn("email")?.setFilterValue(event.target.value);
    console.log("Email filtered successfully");
  };

  return (
    <>
      <DataTable columns={ columns } table={ table } />
      {/* <DataTablePagination table={ table } /> */ }
    </>
  );
}
