"use client";

import { ChangeEvent, useState } from 'react';
import { columns } from '@/components/expense/transactions/table/columns';
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
import { Input } from '../../../ui/input';
import { AddExpense } from '../form/add-expense';
import { getUserExpense } from '@/data/expense';

export function Transactions() {
  const data = getUserExpense();
  const [sorting, setSorting] = useState<SortingState>([]);
  // const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  // const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  // const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
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
      <div className="flex items-center justify-between py-4">
        {/* <Input
          placeholder="Filter emails..."
          value={ (table.getColumn("email")?.getFilterValue() as string) ?? "" }
          onChange={ handleFilterChange }
          className="max-w-sm"
        /> */}
        <div className='flex gap-1'>
          {/* <DataTableViewOptions table={ table } /> */ }
          <AddExpense />
        </div>
      </div>

      <DataTable columns={ columns } table={ table } />

      {/* <DataTablePagination table={ table } /> */ }
    </>
  );
}
