'use client';

import { useExpenseQuery } from '@/hooks/useExpenseQuery';
import { TransactionsTable } from './table/transactions-table';
import { columns as actualColumns } from './table/columns';

export function Transactions() {
  const { data } = useExpenseQuery();
  return (
    <TransactionsTable data={ data.expense } columns={ actualColumns } />
  );
}
