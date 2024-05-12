"use client";

import { ChangeEvent, useState } from 'react';
import { Payment, columns } from '@/components/expense/transactions/columns';
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
import { Input } from '../../ui/input';
import { AddExpense } from './add-expense';

function getData(): Payment[] {
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "success",
      email: "m@example.com",
    },
    {
      id: "728ed52g",
      amount: 200,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "828ed52f",
      amount: 140,
      status: "pending",
      email: "n@example.com",
    },
    {
      id: "928ed52f",
      amount: 350,
      status: "pending",
      email: "m@example.com",
    }
  ];
}

export function Transactions() {
  const data = getData();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection
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
        <Input
          placeholder="Filter emails..."
          value={ (table.getColumn("email")?.getFilterValue() as string) ?? "" }
          onChange={ handleFilterChange }
          className="max-w-sm"
        />
        <div className='flex gap-1'>
          {/* <DataTableViewOptions table={ table } /> */ }
          <AddExpense />
        </div>
      </div>

      {/* <DataTable columns={ columns } table={ table } /> */ }

      {/* <DataTablePagination table={ table } /> */ }
    </>
  );
}
