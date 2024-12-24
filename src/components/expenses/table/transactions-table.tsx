'use client';

import { forwardRef, useImperativeHandle, useState } from 'react';
import {
  type ColumnDef,
  type ColumnFiltersState,
  SortingState,
  type TableOptions,
  type VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { DataTable, DataTablePagination } from '@/components/wrapper/table';
import { type Expense } from '@/interface/expense';

interface TransactionsTableProps extends Partial<Omit<TableOptions<Expense>, 'data' | 'columns'>> {
  data: Expense[];
  columns: ColumnDef<Expense>[];
}

export const TransactionsTable = forwardRef<any, TransactionsTableProps>(({ data, columns, ...rest }, ref) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  // const [rowSelection, setRowSelection] = useState({});

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
    // onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      // rowSelection
    },
    ...rest,
  });

  useImperativeHandle(ref, () => ({
    table,
  }));

  return (
    <>
      <DataTable columns={ columns } table={ table } />
      <DataTablePagination table={ table } />
    </>
  );
});
