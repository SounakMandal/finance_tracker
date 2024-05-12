"use client";

import { DataTable } from '@/components/wrapper/table/table';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { ExpenseType, columns } from './columns';

interface ExpenseTableProps {
  data: ExpenseType[];
}

export function ExpenseTypeTable({ data }: ExpenseTableProps) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      <DataTable columns={ columns } table={ table } />
    </div>
  );
}
