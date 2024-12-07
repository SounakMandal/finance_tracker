import DailyExpense from '@/components/expense/daily';
import CategoryExpense from '@/components/expense/category';
import { Transactions } from '@/components/expense/transactions/table/transactions-table';
import { getExpenseAmountData } from '@/actions/user';

export default async function ExpenseManagement() {
  const expense = await getExpenseAmountData();
  return (
    <>
      <div className='flex flex-row w-full gap-4'>
        <DailyExpense className='flex-grow' />
        <CategoryExpense expense={ expense } className='flex-grow' />
      </div>
      <Transactions />
    </>
  );
}
