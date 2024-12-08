"use client";

import { useUserExpense } from '@/hooks/useUserExpense';
import { TableControl } from './table/table-control';
import { TransactionsTable } from './table/transactions-table';

export function Transactions() {
  const { data } = useUserExpense();
  return (
    <>
      <TableControl />
      <TransactionsTable data={ data.expense } />
    </>
  );
}
