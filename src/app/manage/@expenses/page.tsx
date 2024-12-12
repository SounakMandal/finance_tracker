"use client";

import DailyExpense from '@/components/expenses/daily';
import CategoryExpense from '@/components/expenses/category';
import { Transactions } from '@/components/expenses/transactions';
import { useUserQuery } from '@/hooks/useUserQuery';
import { TableControl } from '@/components/expenses/table-control';

export default function ExpenseManagement() {
  const { data } = useUserQuery(
    expenseTypes => Object.entries(expenseTypes)
      .map(([category]) => {
        return {
          name: category,
          total: Math.floor(Math.random() * 5000) + 1000,
        };
      })
  );
  return (
    <>
      <div className='flex flex-row w-full gap-4'>
        <DailyExpense className='flex-grow' />
        <CategoryExpense expense={ data ?? [] } className='flex-grow' />
      </div>
      <TableControl />
      <Transactions />
    </>
  );
}
