'use client';

import { useRef } from 'react';
import {
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table';
import { useExpenseQuery } from '@/hooks/useExpenseQuery';
import { TableControl } from '@/components/expenses/table/table-control';
import { columns } from '@/components/expenses/table/columns';
import { TransactionsTable } from '@/components/expenses/table/transactions-table';
import { Expense } from '@/interface/expense';

export default function ExpenseManagement() {
  const { data } = useExpenseQuery();
  const defaultTable = useReactTable<Expense>({
    data: [],
    columns: [],
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });
  const tableRef = useRef<{ table: ReturnType<typeof useReactTable<Expense>>; }>({ table: defaultTable });

  return (
    <>
      <TableControl table={ tableRef.current?.table } />
      <TransactionsTable columns={ columns } data={ data.expense } ref={ tableRef } />
    </>
  );
}
