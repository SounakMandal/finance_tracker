'use client';

import { Transactions } from '@/components/expenses/transactions';
import { TableControl } from '@/components/expenses/table-control';

export default function ExpenseManagement() {
  return (
    <>
      <TableControl />
      <Transactions />
    </>
  );
}
