'use client';

import { SortingState, getCoreRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import { useState } from 'react';
import { DataTable } from '@/components/wrapper/table';
import { ExpenseType, columns } from './columns';

interface ExpenseTableProps {
  data: ExpenseType[];
}

export function ExpenseTypeTable({ data }: ExpenseTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div>
      <DataTable columns={ columns } table={ table } />
    </div>
  );
}
